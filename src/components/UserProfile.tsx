'use client'
import React, { useState, useEffect } from 'react'
import { User } from '@/lib/validators/profileValidator'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { MailIcon, MapPinIcon, CalendarIcon, CameraIcon, BookmarkIcon } from 'lucide-react'
import axios from 'axios'

export default function UserProfile() {
  const [user, setUser] = useState<User | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('/api/user');
        setUser(response.data.user);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message || 'An error occurred while fetching the user profile.');
        } else {
          setError('An unexpected error occurred.');
        }
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);
  if (loading) {
    return (
      <Card className="w-full max-w-3xl mx-auto">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
            <Skeleton className="h-32 w-32 rounded-full" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-8 w-2/3" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Alert variant="destructive" className="w-full max-w-3xl mx-auto">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  if (!user) {
    return (
      <Alert className="w-full max-w-3xl mx-auto">
        <AlertDescription>Unable to retrieve user profile information.</AlertDescription>
      </Alert>
    )
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
          <Avatar className="h-32 w-32 border-4 border-primary">
            <AvatarImage src={user.image || '/placeholder.svg'} alt={user.name || 'User'} />
            <AvatarFallback className="text-4xl">{user.name?.charAt(0) || 'U'}</AvatarFallback>
          </Avatar>
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold mb-2">{user.name || 'N/A'}</h1>
            <p className="text-xl text-muted-foreground mb-4">@{user.username || 'username'}</p>
            <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4">
              <div className="flex items-center text-sm text-muted-foreground">
                <MailIcon className="w-4 h-4 mr-1" />
                {user.email || 'N/A'}
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPinIcon className="w-4 h-4 mr-1" />
                Location, Country
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <CalendarIcon className="w-4 h-4 mr-1" />
                Joined 2023
              </div>
            </div>
            <div className="flex flex-wrap justify-center md:justify-start gap-2">
              <Button>Edit Profile</Button>
              <Button variant="outline">Share Profile</Button>
            </div>
          </div>
        </div>
        
        <Tabs defaultValue="posts" className="mt-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="saved">Saved</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
          </TabsList>
          <TabsContent value="posts" className="mt-4">
            <div className="grid grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="aspect-square bg-muted rounded-md flex items-center justify-center">
                  <CameraIcon className="w-8 h-8 text-muted-foreground" />
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="saved" className="mt-4">
            <div className="grid grid-cols-3 gap-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="aspect-square bg-muted rounded-md flex items-center justify-center">
                  <BookmarkIcon className="w-8 h-8 text-muted-foreground" />
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="about" className="mt-4">
            <p className="text-muted-foreground">
              This is a brief bio about the user. They can share information about their interests,
              work, or anything else they'd like others to know.
            </p>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}