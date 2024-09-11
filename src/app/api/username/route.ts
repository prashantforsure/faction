import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { UsernameValidator } from '@/lib/validators/username';
import { NextRequest, NextResponse } from 'next/server'

import { z } from 'zod'

export async function PATCH(req: NextRequest){
    try{
        const session = await getAuthSession();
        if(!session?.user){
            return NextResponse.json({
                message: " unauthorised"
            },{
                status: 403
            })
        }
        const body = await req.json();
        const { name } = UsernameValidator.parse(body);

        const findUser = await db.user.findFirst({
            where: {
                username: name
            }
        })
        if(findUser){
            return NextResponse.json({
                message: "username already exist"
            })
        }
        await db.user.update({
            where: {
                //@ts-ignore
                id: session.user.id,
            }, data:{
                username: name,
            }
        })
        return NextResponse.json({
            message: "done"
        })
    }catch(e){
  console.log(e);
  return NextResponse.json({
    message: "something went wrong"
}, {
    status: 500
}
)
    }
}