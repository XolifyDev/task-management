"use client";
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import JoinCompanyModal from './modals/JoinCompany';
import { Button } from './ui/button';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { AuthSession } from '@supabase/supabase-js';
import { SessionStatus, User } from '@/lib/types';
import { getUserData } from '@/lib/db/actions';
const DashboardSideBar = () => {
    const supabase = createClientComponentClient();
    const [session, setSession] = useState<User | undefined>(undefined);
    const [sessionStatus, setSessionStatus] = useState<SessionStatus>("loading");
    const [joinCompanyModal, setJoinCompanyModal] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        get();
    }, []);

    const get = async () => {
        const user = await getUserData();

        setSession(user as User);
        setSessionStatus(!user ? "unauthenticated" : "authenticated")
    }

    return (
        <div className="w-72 flex flex-col items-center gap-4 py-4 px-7 border-r-2">
            {sessionStatus === "authenticated" ? (
                <>
                    <Avatar className="h-20 w-20 mt-20">
                        <AvatarImage className="bg-neutral-400 dark:bg-neutral-800" src={session?.avatar_url!} />
                        <AvatarFallback className='text-3xl'>{session?.full_name?.slice(0, 1)}</AvatarFallback>
                    </Avatar>
                    <p className="text-xl font-bold">
                        Hey {session?.full_name}! <span className="text-2xl">👋</span>
                    </p>
                </>
            ) : null}
            <div className="flex w-full flex-col mt-20 gap-2 items-center">
                <Link className={cn('w-full text-center py-1 px-2 rounded-md bg-sky-800 hover:bg-sky-950 transition', pathname.includes("my-companies") && "font-bold bg-sky-950 ")} href={'/dashboard/my-companies'}>
                    My Companies
                </Link>
                <Link className={cn('w-full text-center py-1 px-2 rounded-md bg-sky-800 hover:bg-sky-950 transition', pathname.includes("/companies") && "font-bold bg-sky-800")} href={'/dashboard/companies'}>
                    Companies
                </Link>
                <Button onClick={() => setJoinCompanyModal(true)} className='w-full text-center'>
                    Join a company
                </Button>
            </div>
            <JoinCompanyModal open={joinCompanyModal} setOpen={setJoinCompanyModal} />
        </div>
    )
}

export default DashboardSideBar