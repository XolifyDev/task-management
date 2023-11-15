import React from 'react'
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

const UserNav = () => {
    const { data: session, status } = useSession();
    return (
        <>
            {status === "loading" ? (
                <Skeleton className='h-10 w-10 rounded-full' />
            ) : status === "authenticated" && session ? (
                <DropdownMenu>
                    <DropdownMenuTrigger className='cursor-pointer' asChild>
                        <Avatar>
                            <AvatarImage className="bg-neutral-400 dark:bg-neutral-800" src={session.user?.image} />
                            <AvatarFallback>{session.user?.name?.slice(0, 1)}</AvatarFallback>
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
                <Button variant={'secondary'} onClick={() => signIn('google')}>
                    Login
                </Button>
            )}
            <ModeToggle />
        </>
    )
}

export default UserNav