import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
// export const supabase = createClient('https://cmjneigcbfqgdcvlqswp.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNtam5laWdjYmZxZ2Rjdmxxc3dwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI2Njg0NzQsImV4cCI6MjAyODI0NDQ3NH0.IGgrtMxZIyhdLDpyJ7ZCv-0TTC_YZE378L4E2H68mOw')