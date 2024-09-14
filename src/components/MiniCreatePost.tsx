import { Session } from 'next-auth'
import React from 'react'
import { UserAvatar } from './UserAvatar'
import { Input } from "@/components/ui/input"
import { usePathname, useRouter } from 'next/navigation'
import { ImageIcon, Link } from 'lucide-react'
import { Button } from './ui/button'
interface ParamType {
session : Session | null
}
const MiniCreatePost = async ({ session }: ParamType) => {
    const router = useRouter()
    const pathname = usePathname()
  return (
    <div className='rounded-sm border-zinc-300 overflow-hidden shadow-sm'>
        <div className='flex justify-between h-full py-4 px-6 gap-5'>
            <div className='relative'>
            <UserAvatar
            user={{
              name: session?.user.name || null,
              image: session?.user.image || null,
            }}
          />
            </div>
            <Input type='text'  placeholder="Email" onClick={() => {router.push(pathname + '/submit')}} />
            <Button
          onClick={() => router.push(pathname + '/submit')}
          variant='ghost'>
          <ImageIcon className='text-zinc-600' />
        </Button>
        <Button
          onClick={() => router.push(pathname + '/submit')}
          variant='ghost'>
          <Link className='text-zinc-600' />
        </Button>
        </div>
    </div>
  )
}

export default MiniCreatePost