'use client'


import { usePathname, useRouter, useSearchParams } from 'next/navigation';


export function useSearch(param: string) {
    const searchParams = useSearchParams();
    const { replace } = useRouter();
    const pathname = usePathname()
    const currentSearch = searchParams.get(param)

    function handleSearchChange(term: string) {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set(param, term);
        } else {
            params.delete(param);
        }
        replace(`${pathname}?${params.toString()}`);
    };

    return {
        currentSearch,
        handleSearchChange
    }
}