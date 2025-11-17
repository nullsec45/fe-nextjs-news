"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"
import {getCookie} from "cookies-next";

export default function Dashboard(){
    const router=useRouter();

    useEffect(() => {
        const token=getCookie("accessToken");

        if(!token) {
            router.push("/login");
        }
    }, []);

    return (
        <div>
            <h1>Dashboard Page</h1>
            
        </div>        
    )
}