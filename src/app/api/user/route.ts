import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { UserSchema } from "@/lib/validators/profileValidator";
import { UsernameValidator } from "@/lib/validators/username";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest){
    try{
        const session = await getAuthSession();
        if(!session?.user){
            return NextResponse.json({
                message: " unauthorised"
            },{
                status: 403
            })
        }
       
        const getuser = await db.user.findFirst({
            where: {
                id: session.user.id
            }
        })
    }catch(error){
        console.log(error);
        return NextResponse.json({
          message: "something went wrong"
      }, {
          status: 500
      }
      )
    }
}