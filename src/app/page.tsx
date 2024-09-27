import { Suspense } from 'react'
import Link from 'next/link'
import { Home as HomeIcon, TrendingUp, Star, Plus } from 'lucide-react'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { getAuthSession } from '@/lib/auth'

import { buttonVariants } from '@/components/ui/button'
import CustomFeed from '@/components/homepage/CustomFeed'
import GeneralFeed from '@/components/homepage/GeneralFeed'

export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

export default async function Home() {
  const session = await getAuthSession()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="sr-only">Breadit - Your Personal Feed</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <aside className="md:col-span-1 space-y-6">
          <Card>
            <CardHeader className="bg-orange-100">
              <CardTitle className="flex items-center gap-2 text-lg">
                <HomeIcon className="h-5 w-5" />
                Home
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <p className="text-sm text-zinc-500 mb-4">
                Your personal Breadit frontpage. Come here to check in with your
                favorite communities.
              </p>
              <Link
                className={buttonVariants({
                  className: 'w-full',
                })}
                href="/r/create"
              >
                Create Community
              </Link>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Top Communities</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {['r/AskBreadit', 'r/funny', 'r/gaming', 'r/pics', 'r/science'].map((community) => (
                  <li key={community} className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-orange-500" />
                    <Link href={`/${community}`} className="text-sm hover:underline">
                      {community}
                    </Link>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </aside>

        <main className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Your Feed</CardTitle>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<div>Loading feed...</div>}>
              
                {session ? <CustomFeed /> : <GeneralFeed />}
              </Suspense>
            </CardContent>
          </Card>
        </main>

        <aside className="md:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Popular Posts</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {['Exciting news in tech!', 'Cute animal pictures', 'Amazing travel destinations', 'Delicious recipes', 'Funny memes'].map((post, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <Link href="#" className="text-sm hover:underline">
                      {post}
                    </Link>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Create Post</CardTitle>
            </CardHeader>
            <CardContent>
              <Link
                className={buttonVariants({
                  className: 'w-full',
                })}
                href="/submit"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Post
              </Link>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  )
}