"use server";

import { createClient } from "@/supabase/server"
import { headers } from "next/headers";

export async function signUpWithEmailAndPassword(email, password, confirmPassword, firstName, middleName, lastName, role) {
    const supabase = createClient();

    if (password !== confirmPassword) {
        console.log("Password does not match")
        return
    }

    const origin = headers().get('origin')

    const result = await supabase.auth.signUp(
        // Need to lowercase email to safely compare it in the future
        {
            email: email.toLowerCase(),
            password: password,
            options: {
                data: {
                    role: role,
                    firstName: firstName,
                    middleName: middleName,
                    lastName: lastName,
                },
                options: {
                    emailRedirectTo: `${origin}/auth/callback`
                }
            }
        }
    )

    return JSON.stringify(result)
}

export const signInWithEmailAndPassword = async(email, password) => {
    const supabase = await createClient();
    const result = await supabase.auth.signInWithPassword({
        email, 
        password
    })
    return JSON.stringify(result)
}

export const signOut = async() => {
    const supabase = await createClient();
    await supabase.auth.signOut();
}

// export const readUserSession = async() => {
//     const supabase = await createClient();
//     return supabase.auth.getSession();
// }

// export const retrieveUser = async() => {
//     const supabase = await createSupabaseServerClient();
//     const user = await supabase.auth.getUser();
//     console.log(user)
//     return JSON.stringify(user);
// }

// export const listenAuthState = async() => {
//     const supabase = await createSupabaseServerClient();
//     supabase.auth.onAuthStateChange((_event, session) => {
//         if (session) {
//             console.log("logged in!")
//         } else {
//             console.log("logged out!")
//         }

//     })     
// }





