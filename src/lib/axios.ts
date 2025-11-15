import axios from "axios";

const baseUrl=process.env.NEXT_PUBLIC_API_URL;


const axiosInstance=axios.create({
    baseURL:baseUrl,
    headers:{
        'Content-Type':'application/json'
    }
})