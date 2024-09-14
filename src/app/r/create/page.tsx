"use client"
import React, { useState, useEffect } from 'react';

import axios, { AxiosError } from 'axios';
import { useCustomToasts } from '@/app/hooks/use-custom-toasts';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SubredditValidator, CreateSubredditPayload } from '@/lib/validators/subreddit';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';

// interface Subreddit {
//   id: string;
//   name: string;
//   // Add other fields as necessary
// }

// const SubredditPage: React.FC = () => {
//   const router = useRouter();
//   const { loginToast } = useCustomToasts();
//   const [subreddits, setSubreddits] = useState<Subreddit[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [input, setInput] = useState('');
//   const [inputError, setInputError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchSubreddits = async () => {
//       setIsLoading(true);
//       try {
//         const { data } = await axios.get('/api/subreddits');
//         setSubreddits(data);
//       } catch (error) {
//         if (error instanceof AxiosError) {
//           if (error.response?.status === 401) {
//             loginToast();
//           } else {
//             toast({
//               title: 'Error fetching subreddits',
//               description: 'Please try again later.',
//               variant: 'destructive',
//             });
//           }
//         }
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchSubreddits();
//   }, []);

//   const validateInput = (value: string): boolean => {
//     try {
//       SubredditValidator.parse({ name: value });
//       setInputError(null);
//       return true;
//     } catch (error) {
//       if (error instanceof z.ZodError) {
//         setInputError(error.errors[0].message);
//       } else {
//         setInputError('Invalid input');
//       }
//       return false;
//     }
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     setInput(value);
//     validateInput(value);
//   };

//   const handleCreateCommunity = async () => {
//     if (!validateInput(input)) return;

//     setIsLoading(true);
//     try {
//       const payload: CreateSubredditPayload = { name: input };
//       const { data } = await axios.post('/api/subreddit', payload);
//       router.push(`/r/${data}`);
//     } catch (error) {
//       if (error instanceof AxiosError) {
//         if (error.response?.status === 409) {
//           toast({
//             title: 'Subreddit already exists.',
//             description: 'Please choose a different name.',
//             variant: 'destructive',
//           });
//         } else if (error.response?.status === 422) {
//           toast({
//             title: 'Invalid subreddit name.',
//             description: 'Please choose a name between 3 and 21 letters.',
//             variant: 'destructive',
//           });
//         } else if (error.response?.status === 401) {
//           loginToast();
//         } else {
//           toast({
//             title: 'There was an error.',
//             description: 'Could not create subreddit.',
//             variant: 'destructive',
//           });
//         }
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className='container flex items-center h-full max-w-3xl mx-auto'>
//       <div className='relative bg-white w-full h-fit p-4 rounded-lg space-y-6'>
//         <div className='flex justify-between items-center'>
//           <h1 className='text-xl font-semibold'>Create a Community</h1>
//         </div>

//         <hr className='bg-red-500 h-px' />

//         <div>
//           <p className='text-lg font-medium'>Name</p>
//           <p className='text-xs pb-2'>
//             Community names including capitalization cannot be changed.
//           </p>
//           <div className='relative'>
//             <p className='absolute text-sm left-0 w-8 inset-y-0 grid place-items-center text-zinc-400'>
//               r/
//             </p>
//             <Input
//               value={input}
//               onChange={handleInputChange}
//               className='pl-6'
//             />
//           </div>
//           {inputError && <p className='text-red-500 text-sm mt-1'>{inputError}</p>}
//         </div>

//         <div className='flex justify-end gap-4'>
//           <Button onClick={() => router.back()}>
//             Cancel
//           </Button>
//           <Button
//             disabled={isLoading || input.length === 0 || !!inputError}
//             onClick={handleCreateCommunity}>
//             Create Community
//           </Button>
//         </div>

//         {isLoading ? (
//           <p>Loading subreddits...</p>
//         ) : (
//           <ul>
//             {subreddits.map((subreddit) => (
//               <li key={subreddit.id}>{subreddit.name}</li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Page;

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
            <p className='text-xs pb-2 text-black'>
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