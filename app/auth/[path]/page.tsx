import { AuthView } from '@neondatabase/auth/react';

export const dynamicParams = false;

export default async function AuthPage({ params }: { params: Promise<{ path: string }> }) {
    const { path } = await params;

    return (
        <div className="container mx-auto  flex grow flex-col items-center justify-center gap-3 self-center p-4 md:p-6">
            <AuthView classNames={{ continueWith: 'hidden' }} className='lg:w-1/2 rounded-2xl' path={path} />
        </div>
    );
}