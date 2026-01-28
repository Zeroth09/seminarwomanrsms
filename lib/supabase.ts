import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types untuk database
export interface Pendaftar {
  id?: string
  nama_lengkap: string
  email: string
  no_telepon: string
  institusi: string
  profesi: string
  alamat: string
  created_at?: string
}
