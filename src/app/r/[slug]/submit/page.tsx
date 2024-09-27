import { Editor } from '@/components/Editor'
import { Button } from '@/components/ui/button'
import { db } from '@/lib/db'
import { notFound } from 'next/navigation'
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface PageProps {
  params: {
    slug: string
  }
}

export default async function Page({ params }: PageProps) {
  const subreddit = await db.subreddit.findFirst({
    where: {
      name: params.slug,
    },
  })

  if (!subreddit) return notFound()

  return (
    <Card className="max-w-2xl mx-auto mt-8">
      <CardHeader className="border-b border-gray-200">
        <div className="flex items-center space-x-4">
          <Avatar className="w-10 h-10">
            <AvatarImage src={`https://avatar.vercel.sh/${params.slug}`} alt={`r/${params.slug}`} />
            <AvatarFallback>r/</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Create a post</h3>
            <p className="text-sm text-gray-500">in r/{params.slug}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <Editor subredditId={subreddit.id} />
      </CardContent>
      <CardFooter className="bg-gray-50">
        <Button type="submit" className="w-full" form="subreddit-post-form">
          Post
        </Button>
      </CardFooter>
    </Card>
  )
}