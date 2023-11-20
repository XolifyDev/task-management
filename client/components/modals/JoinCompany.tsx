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
// import { findCompanyWithAccessCode, getUserData, joinCompany } from '@/lib/db/actions';
import { toast } from "react-hot-toast"
import { useSession } from 'next-auth/react';

type Props = {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}
const formSchema = z.object({
    accessCode: z.string().min(2).max(50),
})

const JoinCompanyModal = ({ open, setOpen }: Props) => {
    // const { data: session } = useSession();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            accessCode: ""
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        // const company = await findCompanyWithAccessCode(values.accessCode);
        // const user = await getUserData();
        // // console.log(user)

        // if (!company) return toast.error('Invalid Access Code', {
        //     style: {
        //         backgroundColor: "#333",
        //         color: "white"
        //     }
        // });


        // const join = await joinCompany(company.id, user?.id!);
        // console.log(join);
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
                                    name="accessCode"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Access Code</FormLabel>
                                            <FormControl>
                                                <Input placeholder="⁎⁎⁎⁎⁎⁎⁎⁎⁎" {...field} />
                                            </FormControl>
                                            <FormDescription>
                                                Use the companies access code to join!
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit" className='w-full'>Join</Button>
                            </form>
                        </Form>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default JoinCompanyModal