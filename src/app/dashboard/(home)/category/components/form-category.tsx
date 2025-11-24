"use client";

import { Category } from "@/model/Category";
import { FC, useEffect, useState} from "react";
import { setupInterceptor } from "@/lib/axios";
import { useRouter } from "next/navigation";
import { categoryFormSchema } from "../lib/validation";
import { createCategory, editCategory } from "../lib/action";
import Swal from "sweetalert2";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SubmitButtonForm from "../../components/submit-button-form";
import axios from "axios";


interface FormCategoryProps {
    type?:"ADD" | "EDIT"
    defaultValues?:Category | null
}

const FormCategoryPage:FC<FormCategoryProps> = ({type, defaultValues}) => {
    setupInterceptor();
    const router=useRouter();

    const [title, setTitle]=useState('');
    const [error, setError]=useState<string[]>([]);

    useEffect(() => {
        if (type == "EDIT" && defaultValues){
            setTitle(defaultValues.title);
        }
    },[type,defaultValues]);

    const handleCategory=async(e:React.FormEvent) => {
        e.preventDefault();
        setError([]);

        try{
            const validation=categoryFormSchema.safeParse({
                title,
            });

            if(!validation.success){
                const errorMessage=validation.error.issues.map((issue) => issue.message);
                setError(errorMessage);
                return;
            }

            if (type == "ADD") {
                await createCategory({title}); 
                Swal.fire({
                    icon:'success',
                    title:'success',
                    text:'Kategori berhasil disimpan',
                    toast:true,
                    showConfirmButton:false,
                    timer:1500
                });
            }else{
                if(defaultValues?.id){
                    await editCategory({title}, defaultValues.id);
                    Swal.fire({
                        icon:'success',
                        title:'success',
                        text:'Kategori berhasil diubah',
                        toast:true,
                        showConfirmButton:false,
                        timer:3000
                    });
                }else {
                    Swal.fire({
                        icon:'error',
                        title:'Oops!',
                        text:'ID Kategori tidak ada',
                        toast:true,
                        showConfirmButton:false,
                        timer:3000
                    });

                }
            }

            router.push("/dashboard/category");
           
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
    };

    return (
        <form onSubmit={handleCategory} className="space-y-4">
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

            <div className="space-y-2">
                <Label htmlFor="title">Judul</Label>
                <Input placeholder="Judul..." name="title" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                <SubmitButtonForm/>
            </div>
        </form>
    )
}

export default FormCategoryPage;