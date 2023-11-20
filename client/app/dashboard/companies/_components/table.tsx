"use client";

import { DataTable } from './data-table';
import { getCompaniesImIn } from '@/lib/db/actions'
import React, { useEffect, useState } from 'react'
import { columns } from './columns';
import { Company, UserCompanies } from '@/lib/types';

const Table = () => {
    const [data, setData] = useState<any>([]);

    useEffect(() => {
        set();
    }, [])

    const set = async () => {
        // @ts-ignore
        const s: UserCompanies[] = await getCompaniesImIn();
        setData(s.map((c) => {
            return {
                name: c.company.name,
                joinDate: c.created_at
            }
        }));
    }

    return (
        <DataTable data={data as Company[]} columns={columns} label='Filter by company name...' sortingField='name' />
    )
}

export default Table