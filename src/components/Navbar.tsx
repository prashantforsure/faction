import { authOptions } from '@/lib/auth'
import { BookOpenText, HomeIcon } from 'lucide-react'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import React from 'react'
import { Button, buttonVariants } from './ui/button'
import { UserAccountNav } from './UserAccountNav'
import Logo from './logo'

const Navbar = async () => {
    const session = await getServerSession(authOptions)
  return (
    <div className='fixed top-0 inset-x-0 h-16 border-b border-gray-200 bg-background/80 backdrop-blur-md z-[10]'>
      <div className='container max-w-7xl h-full mx-auto flex items-center justify-between'>
        <Link href='/' className='flex items-center gap-2'>
          <Logo />
          <p className='hidden text-xl font-extrabold md:block'>Faction</p>
        </Link>

        <div className='flex items-center gap-4'>
          {session?.user ? (
            <>
              <Link href='/community'>
                <Button 
                  variant="default" 
                  className='rounded-xl px-4 transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-0.5 hover:bg-primary/90'
                >
                  Join Community
                </Button>
              </Link>
              <UserAccountNav user={session.user} />
            </>
          ) : (
            <Link href='/sign-in'>
              <Button 
                variant="default" 
                className='rounded-xl px-4 transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-0.5 hover:bg-primary/90'
              >
                Sign In
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar