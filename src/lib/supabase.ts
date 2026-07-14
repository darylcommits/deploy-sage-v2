import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://jtzscqppleronlkkwjqa.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp0enNjcXBwbGVyb25sa2t3anFhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQwMTg5ODIsImV4cCI6MjA5OTU5NDk4Mn0.uyBIlm_2O41tmjIj7l6Mak0F_KfegODyZQU5NN4khMI'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
