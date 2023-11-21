"use client";

import { DataTable } from './data-table';
import { getMyCompanies } from '@/lib/db/actions'
import React, { useEffect, useState } from 'react'
import { Company, columns } from './columns';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

const Table = () => {
    const [data, setData] = useState<any>([]);
    const supabase = createClientComponentClient();

    useEffect(() => {
        const channel = supabase.realtime.channel("my_companies").on("postgres_changes",
            {
                event: "*",
                schema: "public"
            },
            (payload) => {
                set();
            }
        ).subscribe();
        set();

        return () => {
            channel.unsubscribe();
        }
    }, [])

    const set = async () => {
        // @ts-ignore
        const s: Company[] = await getMyCompanies();
        setData(s.map((c) => {
            return {
                name: c.name,
                created_at: c.created_at,
                id: c.id
            }
        }));
    }

    return (
        <DataTable data={data as Company[]} columns={columns} label='Filter by company name...' sortingField='name' />
    )
}

export default Table