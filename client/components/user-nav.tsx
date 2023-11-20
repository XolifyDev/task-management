"use client";

import React, { useEffect, useState } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ModeToggle } from './theme-toggler';
import { Button, buttonVariants } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Skeleton } from './ui/skeleton';
import { signIn, useSession } from 'next-auth/react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { SessionStatus, User } from '@/lib/types';
import { getUserData } from '@/lib/db/actions';

const UserNav = () => {
    const supabase = createClientComponentClient();
    const [session, setSession] = useState<User | undefined>(undefined);
    const [status, setSessionStatus] = useState<SessionStatus>("loading");

    useEffect(() => {
        get();
    }, []);

    const get = async () => {
        const user = await getUserData();
        // console.log(user);
        setSession(user as User);
        setSessionStatus(!user ? "unauthenticated" : "authenticated")
    }

    return (
        <>
            {status === "loading" ? (
                <Skeleton className='h-10 w-10 rounded-full' />
            ) : status === "authenticated" && session ? (
                <DropdownMenu>
                    <DropdownMenuTrigger className='cursor-pointer' asChild>
                        <Avatar>
                            <AvatarImage className="bg-neutral-400 dark:bg-neutral-800" src={session?.avatar_url!} />
                            <AvatarFallback>{session?.full_name?.slice(0, 1)}</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="center">
                        <DropdownMenuItem>
                            Light
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            Dark
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            System
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ) : (
                <Button variant={'secondary'} onClick={async () => {
                    const { data } = await supabase.auth.signInWithOAuth({
                        provider: "google"
                    });
                    // window.location.href = data.url;
                }}>
                    Login
                </Button >
            )}
            <ModeToggle />
        </>
    )
}

export default UserNav