-- Extend leads table with role-based and source fields without dropping existing data
alter table public.leads
  add column if not exists city text,
  add column if not exists subject text,
  add column if not exists position text,
  add column if not exists child_grade text,
  add column if not exists role_type text,
  add column if not exists source_page text;

