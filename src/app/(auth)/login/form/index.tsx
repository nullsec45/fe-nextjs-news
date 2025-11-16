"use client"

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input";


const FormSignIn=() => {
    const router=useRouter();

    return (
        <div className="w-full h-screen">
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-96">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                            Sign In to Dashboard
                        </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:mx-w-sm">
                    <form action="" className="space-y-6">
                        <Input type="email" placeholder="E-mail" name="email" required/>
                        <Input type="password" placeholder="Password" name="password" required/>

                        <Button>Submit</Button>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default FormSignIn