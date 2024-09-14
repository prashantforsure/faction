'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import React, { useState } from 'react'
import axios, { AxiosError } from 'axios'
import { CreateSubredditPayload } from '@/lib/validators/subreddit'
import { toast } from '@/app/hooks/use-toast'
const  page = () => {
    const [input , setInput] = useState<string>("")
    const router = useRouter()
    const { mutate: createCommunity, isLoading } = useMutation({
        mutationFn: async () => {
          const payload: CreateSubredditPayload = {
            name: input,
          }
    
          const { data } = await axios.post('/api/subreddit', payload)
          return data as string
        },
        onError: (err) => {
          if (err instanceof AxiosError) {
            if (err.response?.status === 409) {
              return toast({
                title: 'Subreddit already exists.',
                description: 'Please choose a different name.',
                variant: 'destructive',
              })
            }
    
            if (err.response?.status === 422) {
              return toast({
                title: 'Invalid subreddit name.',
                description: 'Please choose a name between 3 and 21 letters.',
                variant: 'destructive',
              })
            }
    
            if (err.response?.status === 401) {
              return loginToast()
            }
          }
    
          toast({
            title: 'There was an error.',
            description: 'Could not create subreddit.',
            variant: 'destructive',
          })
        },
        onSuccess: (data) => {
          router.push(`/r/${data}`)
        },
      })
  return (
    <div className='flex items-center h-full max-w-3xl mx-auto container'>
        <div className='relative bg-white h-fit p-4 rounded-lg space-y-5 w-full border-zinc-100 border-2'>
            <div className='flex items-center justify-center'>
                <h1 className='text-xl font-semibold text-black'>Create Community</h1>
            </div>
            <div>
                <p className='text-lg font-medium'>Name</p>
                <p className='text-xs pb-2'>
                    Let this community maintain content policy
                </p>
                <div className='relative'>
                    <p className='absolute text-s left-0 w-8 inset-y-0 grid place-items-center text-zinc-400'>
                        /r
                    </p>
                    <Input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      className='pl-6'
                    />
                </div>
            </div>
             <div className='flex justify-end gap-4'>
                <Button 
                 disabled={isLoading}
                 variant='subtle'
                 onClick={() => router.back()}>
                    cancel
                </Button>
                <Button
            isLoading={isLoading}
            disabled={input.length === 0}
            onClick={() => createCommunity()}>
            Create Community
          </Button>
             </div>
        </div>
    </div>
  )
}

export default  page