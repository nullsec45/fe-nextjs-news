import axiosInstance from "@/lib/axios";
import { ContentRequest } from "@/model/Content";

export const uploadImage=async (fileUpload:File) => {
    try{
        const formData=new FormData();
        formData.append("image", fileUpload);
        const response=await axiosInstance.post("/admin/contents/upload-image",formData,{
            headers:{
                'Content-Type':'multipart/form-data'
            }
        });

        return response.data;
    }catch(error){
        throw error;
    }
}

export const createContent=async(contentData:ContentRequest) => {
    try{
        const response=await axiosInstance.post("admin/contents", contentData);
        return response.data;
    }catch(error){  
        throw error;
    }
}