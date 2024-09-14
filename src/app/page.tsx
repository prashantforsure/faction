import { Button, buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
   <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-x-4 py-6">
    <div className="overflow-hidden border rounded-lg border-gray-300 order-fist md:order-last">
      <div className="bg-zinc-700 flex items-center gap-1.5">
        <p className="font-semibold py-3 px-3 flex items-center gap-2">
          Home
        </p>
      </div>
      <dl className='-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6'>
            <div className='flex justify-between gap-x-4 py-3'>
              <p className='text-zinc-500'>
                Your personal Breadit frontpage. Come here to check in with your
                favorite communities.
              </p>
            </div>

            <Link
              className={buttonVariants({
                className: 'w-full mt-4 mb-6 bg-zinc-700',
              })}
              href={`/r/create`}>
              Create Community
            </Link>
          </dl>
    </div>
   </div>
  );
}
 