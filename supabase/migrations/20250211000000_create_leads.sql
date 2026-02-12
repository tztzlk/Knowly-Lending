-- Create leads table (run in Supabase SQL Editor or via Supabase CLI)
create table if not exists leads (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null unique,
  phone text,
  role text,
  school text,
  grade text,
  language text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Enable RLS
alter table leads enable row level security;

-- Policy: user can only access their own leads (when using anon key with app.current_user_email set)
-- Server-side inserts use service_role key and bypass RLS.
drop policy if exists "user_can_access_own_leads" on leads;
create policy "user_can_access_own_leads" on leads
  for all
  using (email = current_setting('app.current_user_email', true)::text)
  with check (email = current_setting('app.current_user_email', true)::text);

-- Trigger to update updated_at
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trigger_leads_updated_at on leads;
create trigger trigger_leads_updated_at
  before update on leads
  for each row
  execute function set_updated_at();
