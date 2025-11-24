"use client";

import { User } from "@/model/User";
import { FC, useEffect, useState} from "react";
import { setupInterceptor } from "@/lib/axios";
import { useRouter } from "next/navigation";
// import { userFormSchema } from "../lib/validation";
// import { createUser, editUser } from "../lib/action";
import Swal from "sweetalert2";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SubmitButtonForm from "../../components/submit-button-form";
import { updatePassword } from "../lib/action";
import { deleteCookie } from "cookies-next";
import axios from "axios";


interface FormUserProps {
    type?:"ADD" | "EDIT"
    defaultValues?:User | null
}

const FormUserPage:FC<FormUserProps> = ({type, defaultValues}) => {
    setupInterceptor();
    const router=useRouter();

    const [name, setName]=useState('');
    const [email, setEmail]=useState('');
    const [password, setPassword]=useState('');
    const [newPassword, setNewPassword]=useState('');
    const [confirmPassword, setConfirmPassword]=useState('');
    const [error, setError]=useState<string[]>([]);

    useEffect(() => {
        if (defaultValues){
            setName(defaultValues.name);
            setEmail(defaultValues.email);
            setPassword(defaultValues.password);
        }
    },[defaultValues]);

    const handleUser=async(e:React.FormEvent) => {
        e.preventDefault();
        setError([]);

        const result=await Swal.fire({
            title:'Apakah Anda yakin ?',
            text:'Password akan diubah ke yang baru!',
            icon:'warning',
            showCancelButton:true,
            confirmButtonColor:'#3085d6',
            cancelButtonColor:'rgba(165, 165, 55, 1)',
            confirmButtonText:'Iya, Silahkan diubah.'
        });

        if(result.isConfirmed){
            try{
                const result=await updatePassword({
                    current_password:password,
                    new_password:newPassword,
                    confirm_password:confirmPassword,
                });

                if(result.status == false){
                    Swal.fire({
                        icon:'error',
                        title:'Oops!',
                        text:result.message,
                        toast:true,
                        showConfirmButton:false,
                        timer:1500
                    });

                    setError(result.message);
                }

                Swal.fire({
                    icon:'success',
                    title:'success',
                    text:'Password berhasil diubah',
                    toast:true,
                    showConfirmButton:false,
                    timer:3000
                });

                deleteCookie('accessToken');    
                window.location.reload();
            }catch(error:any){
                if (axios.isAxiosError(error) && error.response) {
                    const status = error.response.status; // <= ini HTTP status (500)
                    const data = error.response.data as { status?: boolean; message?: string };

                    const msg =
                        data?.message ||
                        (status === 500
                        ? "Terjadi kesalahan pada server."
                        : "Terjadi kesalahan.");

                    Swal.fire({
                        icon: "error",
                        title: "Oops!",
                        text: msg,
                        toast: true,
                        showConfirmButton: false,
                        timer: 1500,
                    });

                    setError([msg]); // state-mu tipe-nya string[]
                } else {
                    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occured';

                    Swal.fire({
                        icon: "error",
                        title: "Oops!",
                        text: errorMessage,
                        toast: true,
                        showConfirmButton: false,
                        timer: 1500,
                    });

                    setError([errorMessage]);
                }
            }
        }
    };

    return (
        <form onSubmit={handleUser} className="w-[100%] space-y-4">
            {error.length > 0 && (
                <div className="mx-auto my-7 bg-red-500 w-[400px] p-4 round-lg text-white">
                    <div className="font-bold mb-4">
                        <ul className="list-disc list-inside">
                            {error.map((value,index) => (
                                <li key={index}>{value}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="name">Nama</Label>
                    <Input placeholder="Nama..." name="name" id="name" value={name} disabled />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input placeholder="Email..." name="email" id="email" value={email} disabled />
                </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="password">Password Saat Ini</Label>
                    <Input placeholder="Password Saat Ini..." type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="new_password">Password Baru</Label>
                    <Input placeholder="Password Baru..." type="password" name="new_password" id="new_password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="confirm_password">Konfirmasi Password</Label>
                    <Input placeholder="Konfirmasi Password..." type="password" name="confirm_password" id="confirm_password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                </div>
            </div>

            {/* <div className="grid grid-cols-2 gap-4"> */}
            <div className="space-y-2">
                <SubmitButtonForm/>
            </div>
            {/* </div> */}
        </form>
    )
}

export default FormUserPage;