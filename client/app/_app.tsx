"use client";

import { AppProps } from "next/app";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

function MyApp({ Component, pageProps }: AppProps) {
    const supabase = createClientComponentClient();
    return (
        <SessionContextProvider supabaseClient={supabase}>
            <Component {...pageProps} />
        </SessionContextProvider>
    )
}