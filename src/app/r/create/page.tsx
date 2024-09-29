"use client"

import React, { useState } from 'react'
import axios, { AxiosError } from 'axios'
import { useCustomToasts } from '@/app/hooks/use-custom-toasts'
import { toast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { CreateSubredditPayload } from '@/lib/validators/subreddit'
import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { AlertCircle, ArrowLeft } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

const Page = () => {
  const router = useRouter()
  const [input, setInput] = useState<string>('')
  const { loginToast } = useCustomToasts()
//@ts-ignore
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
            title: 'Community already exists',
            description: 'Please choose a different name.',
            variant: 'destructive',
          })
        }
        if (err.response?.status === 422) {
          return toast({
            title: 'Invalid community name',
            description: 'Please choose a name between 3 and 21 characters.',
            variant: 'destructive',
          })
        }
        if (err.response?.status === 401) {
          return loginToast()
        }
      }
      toast({
        title: 'An error occurred',
        description: 'Could not create community. Please try again.',
        variant: 'destructive',
      })
    },
    onSuccess: (data) => {
      router.push(`/r/${data}`)
    },
  })

  return (
    <div className="container max-w-2xl mx-auto py-8">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Create a Community</CardTitle>
          <CardDescription>
            Choose a unique name for your community. You can't change this later.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Important</AlertTitle>
            <AlertDescription>
              Community names including capitalization cannot be changed.
            </AlertDescription>
          </Alert>
          <div className="space-y-1">
            <Label htmlFor="community-name">Community Name</Label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-sm text-muted-foreground">
                r/
              </span>
              <Input
                id="community-name"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="pl-7"
                placeholder="AmazingCommunity"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Cancel
          </Button>
          <Button
            onClick={() => createCommunity()}
            disabled={input.length === 0 || isLoading}
          >
            {isLoading ? 'Creating...' : 'Create Community'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Page