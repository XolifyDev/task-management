"use client";
import React, { Dispatch, SetStateAction } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
// import { db } from '@/lib/db/db';
import { eq } from 'drizzle-orm';
// import { companies } from '@/lib/db/schema2';
// import { createCompany, findCompanyWithAccessCode, getUserData, joinCompany } from '@/lib/db/actions';
import { toast } from "react-hot-toast"
import { useSession } from 'next-auth/react';
import { Textarea } from '../ui/textarea';
import { createCompany } from '@/lib/db/actions';

type Props = {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}
const formSchema = z.object({
    name: z.string().min(2).max(50),
    description: z.string().min(2),
    image: z.string().min(2),
})

const CreateCompanyModal = ({ open, setOpen }: Props) => {
    // const { data: session } = useSession();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            image: "",
            description: ""
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const company = await createCompany(values);

        // @ts-ignore
        if (company?.error) return toast.error(company?.error?.message, {
            style: {
                backgroundColor: "#333",
                color: "white",
            },
        });


        setOpen(false);
        return toast.success("Company created!", {
            style: {
                backgroundColor: "#333",
                color: "white",
            },
        });
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Join a company!</DialogTitle>
                    <DialogDescription>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-4">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Company Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Xolify Development" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Company Description</FormLabel>
                                            <FormControl>
                                                <Textarea placeholder="Xolify Development's Task management Platform" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="image"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Company Logo</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Image URL" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit" className='w-full'>Create</Button>
                            </form>
                        </Form>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default CreateCompanyModal