import { AuthView } from '@neondatabase/auth/react';

export const dynamicParams = false;

export default async function AuthPage({
    params
}: {
    params: Promise<{ path: string }>
}) {
    const { path } = await params;

    return (
        <div className="mx-auto min-h-[calc(100vh-4rem)] flex grow flex-col items-center justify-center gap-3 self-center p-4 md:p-6">
            <AuthView
                className='
                    rounded-2xl  
                    bg-transparent border-0
                    lg:bg-card lg:border
                '
                path={path}
            />
        </div>
    );
}