'use client'

import { cn } from '@/lib/utils'
import { signIn } from 'next-auth/react'
import * as React from 'react'
import { FC } from 'react'
import { Button } from './ui/button'
import { AtSign } from 'lucide-react'




interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const UserAuthForm: FC<UserAuthFormProps> = ({ className, ...props }) => {

  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  const loginWithGoogle = async () => {
    setIsLoading(true)

    try {
      await signIn('google')
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={cn('flex justify-center', className)} {...props}>
    <Button
    //@ts-ignore
  isLoading={isLoading}
  type="button"
  size="sm"
  className="w-full mr-8"
  onClick={loginWithGoogle}
  disabled={isLoading}
>
  {!isLoading && <AtSign className="h-4 w-4 mr-2" />}
  Google
</Button>
    </div>
  )
}

export default UserAuthForm