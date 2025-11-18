import { z } from "zod";

export const categoryFormSchema = z.object({
    title: z.string({message: 'Title harus diisi.'})
})