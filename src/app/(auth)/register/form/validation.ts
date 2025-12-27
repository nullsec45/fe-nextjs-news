import {z} from "zod";

export const formSchema=z.object({
    name:z.string(),
    email:z.email({message:'Email tidak valid'}),
    // role:z.enum(['admin','editor','viewer']),
    password:z.string().min(8, {message:'Password harus diisi minimal 8 karakter'}),
    confirmation_password:z.string().min(8, {message:'Konfirmasi password minimal 8 karakter'})
}).refine((data) => data.password === data.confirmation_password, {
    message: "Password dan konfirmasi password tidak sama",
    path: ["confirmation_password"],
});