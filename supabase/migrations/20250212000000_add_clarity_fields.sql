-- Add Clarity quiz result fields to leads
alter table public.leads
  add column if not exists answers_json jsonb,
  add column if not exists chosen_directions text[],
  add column if not exists exam_focus jsonb;
