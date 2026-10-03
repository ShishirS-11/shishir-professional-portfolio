-- Portfolio data remains readable by the public. Content changes require the
-- custom Supabase Auth app_metadata role: { "role": "admin" }.

create schema if not exists private;

create or replace function private.is_admin()
returns boolean
language sql
stable
security invoker
set search_path = ''
as $$
  select coalesce((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin', false);
$$;

grant usage on schema private to authenticated;
grant execute on function private.is_admin() to authenticated;

-- This trigger helper runs internally. It must not be exposed as an RPC.
alter function public.handle_new_user() set search_path = public, pg_temp;
revoke execute on function public.handle_new_user() from public, anon, authenticated;

-- Preserve the function for existing database dependencies, but do not expose
-- it as a public RPC. RLS policies below use private.is_admin() instead.
revoke execute on function public.is_admin() from public, anon, authenticated;

-- Pin the trigger function's resolution path to prevent object shadowing.
alter function public.update_updated_at() set search_path = public, pg_temp;

do $$
declare
  content_table text;
begin
  foreach content_table in array array[
    'achievements',
    'certifications',
    'education',
    'experience',
    'projects',
    'skill_categories',
    'skills',
    'social_links'
  ]
  loop
    execute format(
      'drop policy if exists %I on public.%I',
      'Authenticated users can insert ' || replace(content_table, '_', ' '),
      content_table
    );
    execute format(
      'drop policy if exists %I on public.%I',
      'Authenticated users can update ' || replace(content_table, '_', ' '),
      content_table
    );
    execute format(
      'drop policy if exists %I on public.%I',
      'Authenticated users can delete ' || replace(content_table, '_', ' '),
      content_table
    );

    execute format(
      'create policy %I on public.%I for insert to authenticated with check ((select private.is_admin()))',
      'Only admins can insert ' || replace(content_table, '_', ' '),
      content_table
    );
    execute format(
      'create policy %I on public.%I for update to authenticated using ((select private.is_admin())) with check ((select private.is_admin()))',
      'Only admins can update ' || replace(content_table, '_', ' '),
      content_table
    );
    execute format(
      'create policy %I on public.%I for delete to authenticated using ((select private.is_admin()))',
      'Only admins can delete ' || replace(content_table, '_', ' '),
      content_table
    );
  end loop;
end;
$$;

-- One-time setup in the Supabase SQL Editor, after finding your user ID in
-- Authentication > Users (replace the placeholder before running):
-- update auth.users
-- set raw_app_meta_data = coalesce(raw_app_meta_data, '{}'::jsonb)
--   || jsonb_build_object('role', 'admin')
-- where id = 'YOUR-USER-ID'::uuid;
