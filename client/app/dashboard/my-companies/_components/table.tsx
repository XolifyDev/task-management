"use client";

import { DataTable } from './data-table';
import { getMyCompanies } from '@/lib/db/actions'
import React, { useEffect, useState } from 'react'
import { Company, columns } from './columns';

const Table = () => {
    const [data, setData] = useState<any>([]);

    useEffect(() => {
        set();
    }, [])

    const set = async () => {
        // @ts-ignore
        const s: Company[] = await getMyCompanies();
        setData(s.map((c) => {
            return {
                name: c.name,
                created_at: c.created_at
            }
        }));
    }

    return (
        <DataTable data={data as Company[]} columns={columns} label='Filter by company name...' sortingField='name' />
    )
}

export default Table