"use client";

import { DataTable } from './data-table';
import { getCompaniesImIn, leaveCompany } from '@/lib/db/actions'
import React, { useEffect, useState } from 'react'
import { Company, UserCompanies } from '@/lib/types';
import { ColumnDef } from '@tanstack/react-table';
import dayjs from "dayjs"
import { DotsHorizontalIcon, ExitIcon, Pencil2Icon, TrashIcon } from "@radix-ui/react-icons";
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
import { toast } from "react-hot-toast"

const Table = () => {
    const [data, setData] = useState<any>([]);

    useEffect(() => {
        set();
    }, [])

    const columns: ColumnDef<Company>[] = [
        {
            accessorKey: "name",
            header: "Name",
        },
        {
            accessorKey: "joindate",
            header: "Join Date",
            cell: ({ row }) => {
                const date = row.getValue("joindate")
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
                            <DropdownMenuItem onClick={async () => {
                                const res = await leaveCompany(row.original.id);

                                if (res.error) return toast.error(res.error.message, {
                                    style: {
                                        backgroundColor: "#333",
                                        color: "white",
                                    },
                                });

                                return
                            }} className="cursor-pointer">
                                Leave
                                <DropdownMenuShortcut><ExitIcon color="red" className="h-5 w-5" fontSize={20} /></DropdownMenuShortcut>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            },
        },
    ]


    const set = async () => {
        // @ts-ignore
        const s: UserCompanies[] = await getCompaniesImIn();
        setData(s.map((c) => {
            return {
                name: c.company.name,
                joinDate: c.created_at,
                id: c.company.id
            }
        }));
    }

    return (
        <DataTable data={data as Company[]} columns={columns} label='Filter by company name...' sortingField='name' />
    )
}

export default Table