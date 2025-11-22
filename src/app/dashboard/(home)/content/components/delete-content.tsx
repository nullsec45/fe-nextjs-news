"use client"

import {FC} from "react";
import Swal from "sweetalert2";
import { deleteContent } from "../lib/action";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

interface DeleteContentPageProps {
    id:number;
}

const DeleteContent:FC<DeleteContentPageProps> = ({id}) => {
    const handleDelete=async() => {
        const result=await Swal.fire({
            title:'Apakah Anda yakin ?',
            text:'Konten ini akan dihapus secara permanen!',
            icon:'warning',
            showCancelButton:true,
            confirmButtonColor:'#3085d6',
            cancelButtonColor:'rgba(165, 165, 55, 1)',
            confirmButtonText:'Iya, Silahkan dihapus.'
        });

        if(result.isConfirmed){
            try{
                await deleteContent(id);
                Swal.fire({
                    icon:'success',
                    title:'success',
                    text:'Konten berhasil dihapus',
                    toast:true,
                    showConfirmButton:false,
                    timer:3000
                });

                window.location.reload();
            }catch(error){
                Swal.fire({
                    icon:'error',
                    title:'Oops!',
                    text:'ID Konten tidak ada',
                    toast:true,
                    showConfirmButton:false,
                    timer:3000
                });
            }
        }
    }

    return (
        <Button size={"sm"} variant={"destructive"} onClick={handleDelete}>
            <Trash className="mr-2 h-4 w-4" />
            Hapus
        </Button>
    )
}

export default DeleteContent;