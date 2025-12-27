"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"
import FormSignUp from "./form"

const SignUpPage=() => {
    const router=useRouter()

    return <FormSignUp/>
}

export default SignUpPage;