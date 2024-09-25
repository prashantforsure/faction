"use client"
import React, { useState, useEffect } from 'react';

import axios, { AxiosError } from 'axios';
import { useCustomToasts } from '@/app/hooks/use-custom-toasts';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CreateSubredditPayload } from '@/lib/validators/subreddit';

import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';

 
//create page function


const Page = () => {
    const router = useRouter()
    const [input, setInput] = useState<string>('')
    const { loginToast } = useCustomToasts()
  


    const { mutate: createCommunity } = useMutation({
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
      <div className='container flex items-center h-full max-w-3xl mx-auto'>
        <div className='relative bg-white w-full h-fit p-4 rounded-lg space-y-6'>
          <div className='flex justify-between items-center'>
            <h1 className='text-xl font-semibold text-black'>Create a Community</h1>
          </div>
  
          <hr className='bg-red-500 h-px' />
  
          <div>
            <p className='text-lg font-medium text-black'>Name</p>
            <p className='text-xs pb-2'>
              Community names including capitalization cannot be changed.
            </p>
            <div className='relative'>
              <p className='absolute text-sm left-0 w-8 inset-y-0 grid place-items-center text-zinc-400'>
                r/
              </p>
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className='pl-6 text-black'
              />
            </div>
          </div>
  
          <div className='flex justify-end gap-4'>
            <Button
             
              onClick={() => router.back()}>
              Cancel
            </Button>
            <Button
              
              disabled={input.length === 0}
              onClick={() => createCommunity()}>
              Create Community
            </Button>
          </div>
        </div>
      </div>
    )
  }
  
  export default Page