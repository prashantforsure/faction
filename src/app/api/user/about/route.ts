import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { UserSchema } from "@/lib/validators/profileValidator";
import { NextRequest, NextResponse } from "next/server";

export async function UPDATE(req: NextRequest) {
try{
    const session = await getAuthSession();
        if (!session?.user) {
            return NextResponse.json({
                message: "Unauthorized"
            }, {
                status: 403
            });
        }
       const body = await req.json();
       const { about } = UserSchema.parse(body);

        const user = await db.user.findUnique({
            where: {
                id: session.user.id
            }
        });
        if (!user) {
            return NextResponse.json({
                message: "User not found"
            }, {
                status: 404
            });
        }
        const updateAbout  = await db.user.update({
            where: {
                id: session.user.id
            },
            data: {
                about: about
            }
        })
        return NextResponse.json({
            updateAbout
        },{
            status: 200
        }
    )
}catch(error){
    console.error(error);
    return NextResponse.json({
        message: "Something went wrong"
    }, {
        status: 500
    });
}
}