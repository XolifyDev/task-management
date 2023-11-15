"use client";

import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils';
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'
import { Icons } from './icons';
import { ModeToggle } from './theme-toggler';
import { Button, buttonVariants } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Skeleton } from './ui/skeleton';
import { signIn, useSession } from 'next-auth/react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import UserNav from './user-nav';

const SiteHeader = () => {
    const pathname = usePathname();
    const { data: session, status } = useSession();
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container py-2 flex flex-row justify-between">
                <div className="flex flex-row">
                    <Link href="/" className="mr-6 flex items-center space-x-2">
                        <Image
                            src={'/favicon.ico'}
                            height={100}
                            width={100}
                            alt='Logo'
                            className='h-10 w-10'
                        />
                        <span className="hidden font-bold sm:inline-block">
                            {siteConfig.name}
                        </span>
                    </Link>
                    <nav className="flex items-center space-x-6 text-sm font-medium">
                        <Link
                            href="/dashboard"
                            className={cn(
                                "transition-colors hover:text-foreground/80",
                                pathname === "/docs" ? "text-foreground" : "text-foreground/60"
                            )}
                        >
                            Dashboard
                        </Link>
                        <Link
                            href="/contact"
                            className={cn(
                                "transition-colors hover:text-foreground/80",
                                pathname?.startsWith("/docs/components")
                                    ? "text-foreground"
                                    : "text-foreground/60"
                            )}
                        >
                            Contact Us
                        </Link>
                        <Link
                            href="/dashboard/companies"
                            className={cn(
                                "transition-colors hover:text-foreground/80",
                                pathname?.startsWith("/themes")
                                    ? "text-foreground"
                                    : "text-foreground/60"
                            )}
                        >
                            Companies
                        </Link>
                        <Link
                            href={siteConfig.links.github}
                            className={cn(
                                "hidden text-foreground/60 transition-colors hover:text-foreground/80 lg:block"
                            )}
                        >
                            GitHub
                        </Link>
                    </nav>
                </div>
                <div className="flex flex-row gap-2">
                    <nav className="flex items-center gap-2">
                        <UserNav /> 
                    </nav>
                </div>
            </div>
        </header>
    )
}

export default SiteHeader