import { createClient } from '@supabase/supabase-js';

// The '!' tells TypeScript "I promise these exist in the .env file"
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);