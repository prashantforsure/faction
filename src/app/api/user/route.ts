import { getAuthSession } from "@/lib/auth";
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
        const body = await req.json();
        const { name } = use.parse(body);

    }
}