"use client";

import { Skeleton } from '@/components/ui/skeleton';
import { signIn, useSession } from 'next-auth/react';
import React, { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import JoinCompanyModal from '@/components/modals/JoinCompany';

const Page = () => {
    const { data: session, status: sessionStatus } = useSession();
    const [joinCompanyModal, setJoinCompanyModal] = useState(false);

    if (sessionStatus === "unauthenticated") return signIn("google");

    if (sessionStatus === "loading") return (
        <div className="flex flex-row w-full h-screen max-h-[92.98vh] container">
            <div className="w-72 flex flex-col items-center gap-4 py-4 px-7 border-r-2">
                <Skeleton className='h-20 w-20 mt-20 rounded-full' />
            </div>
            <div className="flex flex-grow ">

            </div>
        </div>
    )


    return (
        <div className="flex flex-row w-full h-screen max-h-[92.98vh] container">
            <div className="w-72 flex flex-col items-center gap-4 py-4 px-7 border-r-2">
                {sessionStatus === "authenticated" ? (
                    <>
                        <Avatar className="h-20 w-20 mt-20">
                            <AvatarImage className="bg-neutral-400 dark:bg-neutral-800" src={session.user?.image} />
                            <AvatarFallback>{session.user?.name?.slice(0, 1)}</AvatarFallback>
                        </Avatar>
                        <p className="text-xl font-bold">
                            Hey {session.user?.name}! <span className="text-2xl">👋</span>
                        </p>
                    </>
                ) : null}
                <div className="flex w-full flex-col mt-20 gap-2 items-center">
                    <Link className='w-full text-center py-1 px-2 rounded-md bg-sky-800 hover:bg-sky-950 transition' href={'/dashboard/my-companies'}>
                        My Companies
                    </Link>
                    <Link className='w-full text-center py-1 px-2 rounded-md bg-sky-800 hover:bg-sky-950 transition' href={'/dashboard/companies'}>
                        Companies
                    </Link>
                    <Button onClick={() => setJoinCompanyModal(true)} className='w-full text-center'>
                        Join a company
                    </Button>
                </div>
            </div>
            <div className="flex flex-grow py-2 px-5">

            </div>
            <JoinCompanyModal open={joinCompanyModal} setOpen={setJoinCompanyModal} />
        </div>
    )
}

export default Page