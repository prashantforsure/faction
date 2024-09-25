import { authOptions } from '@/lib/auth'
import { BookOpenText, HomeIcon } from 'lucide-react'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import React from 'react'
import { Button, buttonVariants } from './ui/button'
import { UserAccountNav } from './UserAccountNav'

const Navbar = async () => {
    const session = await getServerSession(authOptions)
  return (
    <div className='fixed top-0 inset-x-0 h-fit  border-b backdrop-blur-md border-gray-200 z-[10] py-2'>
      <div className='container max-w-7xl h-full mx-auto flex items-center justify-between gap-2'>
        {/* logo */}
        <Link href='/' className='flex gap-2 items-center'>
        <HomeIcon className="h-8 w-8 text-orange-500" />
          <p className='hidden  text-xl text-red-600 font-extrabold  md:block'>Faction</p>
        </Link>

        {/* search bar */}
       

        {/* actions */}
        {session?.user ? (
          <UserAccountNav user={session.user} />
        ) : (
          <Link href='/sign-in'> <Button className='bg-black border-b rounded-xl'> 
          <span className='text-white hover:text-black'>Sign In</span>
          
          </Button>
            
          </Link>
        )}
      </div>
    </div>
  )
}

export default Navbar