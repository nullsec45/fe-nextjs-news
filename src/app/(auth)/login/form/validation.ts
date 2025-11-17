import {z} from "zod";

export const formSchema=z.object({
    email:z.email({message:'Email tidak valid'}),
    password:z.string().min(8, {message:'Password harus diisi minimal 8 karakter'})
});