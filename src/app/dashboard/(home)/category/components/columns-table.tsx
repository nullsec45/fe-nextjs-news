"use client"

import { Category } from "@/model/Category"
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Pencil } from "lucide-react";
import DeleteCategory from "./delete-category"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: "title",
    header: "Judul",
  },
  {
    accessorKey: "slug",
    header: "Slug",
  },
  {
    accessorKey: "actions",
    cell:({row}) => {
        const category=row.original;

        return (
            <div className="inline-flex gap-5 items-end">
                <Button variant="secondary" size="sm" asChild>
                    <Link href={`/dashboard/category/edit/${category.id}`}>
                        <Pencil className="mr-2 h-4 w-4"/>
                        Edit
                    </Link>
                </Button>
                    <DeleteCategory id={category.id}/>
            </div>
        )
    }
  },
]