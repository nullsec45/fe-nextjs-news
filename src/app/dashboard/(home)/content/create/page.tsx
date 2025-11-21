"use client";

import { Category } from "@/model/Category";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import { ApiResponse } from "@/model/ApiResponse";
import axios from "axios";
import FormContentPage from "../components/form-content";
import Swal from "sweetalert2";

const CreateContentPage=() => {
    const [categories, setCategories]=useState<Category[]>([]);
    useEffect(() => {
        const fetchData=async() => {
            try{
                const response=await axiosInstance.get<ApiResponse<Category[]>>("/admin/categories")
                setCategories(response.data.data);
            }catch(error){
                const errorMessage = error instanceof Error ? error.message : 'Gagal mengambil data kategori';

                Swal.fire({
                    icon:'error',
                    title:'Oops!',
                    text:errorMessage,
                    toast:true,
                    showConfirmButton:false,
                    timer:1500
                });
            }
        }
        fetchData();
    },[]);

    return (
        <div>
            <div className="flex flex-row items-center justify-between">
                <div className="my-5 text-2xl font-bold">Tambah Kategori</div>
            </div>

            <FormContentPage type="ADD" categoryList={categories}/>
        </div>
    )
}

export default CreateContentPage;