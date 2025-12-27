"use client"

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"; // Import Label
import { useFormStatus } from "react-dom";
import { useState } from "react";
import { formSchema } from "./validation";
import axiosInstance from "@/lib/axios";
import { setCookie } from 'cookies-next';
import axios from "axios";
import Link from "next/link";


const SubmitButton = () => {
    const { pending } = useFormStatus();

    return (
        <Button disabled={pending} className="w-full" type="submit">
            {pending ? 'Loading...' : 'Submit'}
        </Button>
    )
}

const FormSignUp = () => {
    const router = useRouter();

    // Fix: Menambahkan state untuk name
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmationPassword, setConfirmationPassword] = useState('')
    const [error, setError] = useState<string[]>([]);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError([]);

        const validation = formSchema.safeParse({
            name, 
            email,
            password,
            confirmation_password:confirmationPassword
        });

        console.log(password);
        console.log(confirmationPassword);
        

        if (!validation.success) {
            const errorMessage = validation.error.issues.map((issue) => issue.message)
            setError(errorMessage);
            return;
        }

        await axiosInstance.post('/auth/register', { name, email, password, confirm_password:confirmationPassword })
            .then((response) => {
                router.push('/login');
            }).catch((error:any) => {
                if (axios.isAxiosError(error) && error.response) {
                    const status = error.response.status; // <= ini HTTP status (500)
                    const data = error.response.data as { status?: boolean; message?: string };

                    const msg = data?.message || ( status === 500 ? "Terjadi kesalahan pada server." : "Terjadi kesalahan.");


                    setError([msg]);
                } else {
                    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occured';


                    setError([errorMessage]);
                }
            });
    }

    return (
        <div className="w-full h-screen flex items-center justify-center ">
            <div className="w-full sm:max-w-lg px-6 py-12 bg-white shadow-md rounded-lg"> 
                <div className="sm:mx-auto sm:w-full">
                    <h2 className="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Sign Up
                    </h2>
                </div>

                {error.length > 0 && (
                    <div className="mx-auto my-7 bg-red-500 w-full p-4 rounded-lg text-white text-sm">
                        <div className="font-bold mb-2">Error Message</div>
                        <ul className="list-disc list-inside">
                            {error?.map((value, index) => (
                                <li key={index}>{value}</li>
                            ))}
                        </ul>
                    </div>
                )}

                <div className="mt-10 sm:mx-auto sm:w-full">
                    <form onSubmit={handleRegister} className="space-y-6">
                        
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="name">Full Name</Label>
                            <Input 
                                id="name"
                                type="text" 
                                onChange={(e) => setName(e.target.value)} 
                                placeholder="Enter your full name" 
                                name="name" 
                                required 
                            />
                        </div>

                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="email">Email Address</Label>
                            <Input 
                                id="email"
                                type="email" 
                                onChange={(e) => setEmail(e.target.value)} 
                                placeholder="Enter your email" 
                                name="email" 
                                required 
                            />
                        </div>

                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="password">Password</Label>
                            <Input 
                                id="password"
                                type="password" 
                                onChange={(e) => setPassword(e.target.value)} 
                                placeholder="******" 
                                name="password" 
                                required 
                            />
                        </div>

                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="confirmation_password">Konfirmasi Password</Label>
                            <Input 
                                id="confirmation_password"
                                type="password" 
                                onChange={(e) => setConfirmationPassword(e.target.value)} 
                                placeholder="******" 
                                name="confirmation_password" 
                                required 
                            />
                        </div>

                        <span className="text-sm text-gray-600">
                            Sudah punya akun ?  <Link href={"/login"} className="font-semibold text-blue-600 hover:text-blue-500 hover:underline transition-colors duration-200"> Login</Link>
                        </span>
                        <SubmitButton />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default FormSignUp