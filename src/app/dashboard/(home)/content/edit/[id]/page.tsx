"use client";

import React, {FC, useState, useEffect} from "react";
import { setupInterceptor } from "@/lib/axios";
import { Content } from "@/model/Content";
import { Category } from "@/model/Category";
import axiosInstance from "@/lib/axios";
import { ApiResponse } from "@/model/ApiResponse";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import FormContentPage from "../../components/form-content";


type Params={
    id:number;
}

interface EditContentPageProps{
    params:Promise<Params>;
}

const EditContentPage: FC<EditContentPageProps>=({ params }) => {
    setupInterceptor();

    const resolvedParams=React.use(params);
    const [content, setContent]=useState<Content | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError]=useState<string | null>(null);
    const [categories, setCategories]=useState<Category[]>([])

    
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axiosInstance.get<ApiResponse<Content>>(`/admin/contents/${resolvedParams.id}`);
                setContent(response.data.data);
            } catch (error: any) {
                setError(error.message || "Error Fetching Data");
            } finally{
                setLoading(false);
            }
        }

        const fetchDataCategory=async() => {
            try{
                const response=await axiosInstance.get<ApiResponse<Category[]>>("/admin/categories");
                setCategories(response.data.data);
            }catch(error:any){
                setError(error.message || "Error Fetching Data Kategori")
            }
        }

        fetchDataCategory();
        fetchData();
    }, [resolvedParams.id])


    if (loading) {
        return <div>Loading...</div>;
    }

    if(error)  {
            return (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4">
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                        {error}
                    </AlertDescription>
                </AlertCircle>
            </Alert>
        )
    }

    return (
        <div>
            <div className="flex flex-row items-center justify-between">
                <div className="my-5 text-2xl font-bold">Ubah Konten</div>
            </div>

            <FormContentPage type="EDIT" categoryList={categories} defaultValues={content} />
        </div>           
    )
}

export default EditContentPage;