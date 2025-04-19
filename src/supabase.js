import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://efrlhixtcpxepeqkbyro.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVmcmxoaXh0Y3B4ZXBlcWtieXJvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ5NDA4MzMsImV4cCI6MjA2MDUxNjgzM30.LHOPROeUssnX7jVqO-nOnKE7x4KClIm0_nL5Mb4hKmU'
export const supabase = createClient(supabaseUrl, supabaseKey)