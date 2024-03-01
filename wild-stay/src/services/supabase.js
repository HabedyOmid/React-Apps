import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://tkmltxfmzxvzgsmuzsrg.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRrbWx0eGZtenh2emdzbXV6c3JnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkwMDE1NDIsImV4cCI6MjAyNDU3NzU0Mn0.AiHORx9oQztjjTdtJtyYBOlzZKizAg5Sq9BhuzDK5Iw';
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
