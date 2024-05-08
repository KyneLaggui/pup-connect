"use server"
import { createBrowserClient, createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const createSupabaseServerClient = async () => {
    const cookieStore = cookies();

    return createServerClient(
        supabaseUrl,
        supabaseAnonKey, 
        {
            cookies: {
                get(name) {
                    return cookieStore.get(name)?.value
                },
                set(name, value, options) {
                    cookieStore.set({ name, value, ...options })
                },
                remove(name, options) {
                    cookieStore.set({ name, value: "", ...options })
                }
            }
        }
    )
}

export const createSupabaseComponentClient = async () => {
    const cookieStore = cookies();

    return createBrowserClient(
        supabaseUrl,
        supabaseAnonKey,
    )
}
