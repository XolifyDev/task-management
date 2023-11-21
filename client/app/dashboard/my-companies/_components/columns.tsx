"use client"

import { DotsHorizontalIcon, Pencil2Icon, TrashIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table"
import dayjs from "dayjs"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button";
import { removeCompany } from "@/lib/db/actions";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export type Company = {
    id: bigint;
    ownerId: any,
    name: string,
    description: string;
    image: string;
    accessCode: string;
    created_at: any
}

export const columns: ColumnDef<Company>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "created_at",
        header: "Create Date",
        cell: ({ row }) => {
            const date = row.getValue("created_at")
            const formatted = dayjs(date as string).format("ddd, MMM D, YYYY h:mm A")


            return <div className="text-left font-medium">{formatted}</div>
        },
    },
    {
        accessorKey: "actions",
        header: () => {
            return (
                <Button variant={"ghost"} className="h-8 w-8 p-0">
                    <DotsHorizontalIcon className="h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            return <div className="text-left font-medium">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant={"ghost"} className="h-8 w-8 p-0">
                            <DotsHorizontalIcon className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="center">
                        <DropdownMenuItem className="cursor-pointer">
                            Edit
                            <DropdownMenuShortcut><Pencil2Icon className="h-[18px] w-[18px]" fontSize={20} /></DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => removeCompany(row.original.id)} className="cursor-pointer">
                            Delete
                            <DropdownMenuShortcut><TrashIcon color="red" className="h-5 w-5" fontSize={20} /></DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        },
    },
]
