"use server";

import { createSupabaseServerClient } from "../config"

export async function signUpWithEmailAndPassword(email, password, confirmPassword, firstName, middleName, lastName, role) {
    const supabase = await createSupabaseServerClient();

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
                }
            }
        }
    )

    return JSON.stringify(result)
}

export const signInWithEmailAndPassword = async(email, password) => {
    const supabase = await createSupabaseServerClient();
    const result = await supabase.auth.signInWithPassword({
        email, 
        password
    })
    return JSON.stringify(result)
}

export const signOut = async() => {
    const supabase = await createSupabaseServerClient();
    await supabase.auth.signOut();
}

export const readUserSession = async() => {
    const supabase = await createSupabaseServerClient();
    return supabase.auth.getSession();
}

// export const retrieveUser = async() => {
//     const supabase = await createSupabaseServerClient();
//     const user = await supabase.auth.getUser();
//     console.log(user)
//     return JSON.stringify(user);
// }

