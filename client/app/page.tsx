"use client";

import { Button } from '@/components/ui/button';
import { signIn, useSession } from 'next-auth/react';
import Image from 'next/image'
import { useRouter } from 'next/navigation';

export default function Home() {
  const { data: session, status: sessionStatus } = useSession();
  const router = useRouter();

  const onClick = async () => {
    if (sessionStatus === "unauthenticated") return signIn('google');
    if (sessionStatus === "authenticated") return router.push("/dashboard?getstarted=true");
  }
  return (
    <main className="container">
      <div className="wrapper px-2 w-full flex flex-col">
        <p className='px-auto text-center mt-20 text-xl'>Need a task management platform that is easy to setup?</p>
        <div className="flex flex-row mt-20">
          <Image src={'https://www.chanty.com/blog/wp-content/uploads/2020/10/Task-manager-apps-740x380.jpg'} className='h-[248px] w-[482px] rounded-md' height={740} width={400} alt='image' />
          <p className="text-xl text-center my-auto w-[600px] ml-auto">
            Say nothing else! Try our new task management platform where you can create your own companies and have task set on mulitple employees.
          </p>
        </div>
        <Button onClick={onClick} className='mt-7 w-96 mx-auto'>
          Get Started
        </Button>
      </div>
    </main>
  )
}
