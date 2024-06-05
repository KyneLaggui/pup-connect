"use client";

import { supabase } from "../client";

export async function signUpWithEmailAndPassword(email, password, confirmPassword, firstName, middleName, lastName, role) {
    if (password !== confirmPassword) {
        console.log("Password does not match")
        return
    }
    
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
            }
        }
    )
    console.log(result)
    return JSON.stringify(result)
}

export const signInWithEmailAndPassword = async (email, password) => {
    const result = await supabase.auth.signInWithPassword({
        email, 
        password
    })
    return JSON.stringify(result)
}

export const signOut = async() => {
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





