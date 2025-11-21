import { z } from "zod";

export const contentFormSchema = z.object({
    title: z.string({message: 'Title harus diisi.'}),
    excerpt:z.string({message:'Kutipan harus diisi.'}),
    description:z.string({message:'Description harus diisi.'}),
    categoryId:z.string({message:"Kategori harus diisi."})
})