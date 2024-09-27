
import SignIn from '@/components/SignIn'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function page() {
  return (
    <div className="min-h-screen from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <Link
          href="/"
          className={cn(
            buttonVariants({ variant: 'ghost' }),
            'absolute top-8 left-8 md:left-12 flex items-center mt-8'
          )}
        >
          <ArrowLeft className="mr-2 h-4 w-4 " />
          Back to Home
        </Link>
        
        <div className="bg-white dark:bg-gray-800 shadow-2xl mb-32 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="px-6 py-8 sm:px-10">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
                Sign in to your account
              </h2>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Or{' '}
                <Link href="/register" className="font-medium text-primary hover:text-primary/80">
                  create a new account
                </Link>
              </p>
            </div>
            
            <div className="mt-8">
              <SignIn />
            </div>
          </div>
          
          <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600">
            <div className="text-center text-xs text-gray-600 dark:text-gray-400">
              <Link href="/terms" className="font-medium hover:text-primary">
                Terms of Service
              </Link>
              {' • '}
              <Link href="/privacy" className="font-medium hover:text-primary">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}