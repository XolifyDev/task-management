"use client";

"use client";

import { Skeleton } from '@/components/ui/skeleton';
import { signIn, useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import JoinCompanyModal from '@/components/modals/JoinCompany';
import DashboardSideBar from '@/components/DashboardSideBar';
import { Icons } from '@/components/icons';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { AuthSession } from '@supabase/supabase-js';
import { SessionStatus, User } from '@/lib/types';
import { getUserData } from '@/lib/db/actions';
import Table from './_components/table';

const Page = () => {
    const [joinCompanyModal, setJoinCompanyModal] = useState(false);
    const supabase = createClientComponentClient();
    const [session, setSession] = useState<User | undefined>(undefined);
    const [sessionStatus, setSessionStatus] = useState<SessionStatus>("loading");


    useEffect(() => {
        get();
    }, []);

    const get = async () => {
        const user = await getUserData();

        setSession(user as User);
        setSessionStatus(!user ? "unauthenticated" : "authenticated")
    }


    const signInGoogle = async () => {
        await supabase.auth.signInWithOAuth({
            provider: "google"
        });
    }
    if (sessionStatus === "unauthenticated") return signInGoogle();


    if (sessionStatus === "loading") return <Icons.spinner className='h-20 w-20 mx-auto animate-spin' />

    return (
        <div className='flex flex-col w-full'>
            <div className="mt-20 h-1"></div>
            <h1 className="text-xl font-bold text-left">
                My Companies
            </h1>
            <Table />
        </div>
    )
}

export default Page