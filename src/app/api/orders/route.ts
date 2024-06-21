

// FETCH ALL ORDERS DATA

import { getAuthSession } from "@/utilities/auth";
import { prisma } from "@/utilities/connect";
import { NextResponse } from "next/server";

export const GET = async () => {
    const session = await getAuthSession();
    if(session){

        try{

            if(session.user.isAdmin){
                const orders = prisma.order.findMany();
                return new NextResponse(JSON.stringify(orders), {
                    status: 200
                });
            }

            const orders = prisma.order.findMany({
                where: {
                    userEmail: session.user.email!
                }
            });
            
            return new NextResponse(JSON.stringify(orders), {
                status: 200
            });

        }catch(err){
            return new NextResponse(JSON.stringify({message: "Something went wrong!"}), {
                status: 500
            });
        }

    }else{
        return new NextResponse(JSON.stringify({message: "Something went wrong!"}), {
            status: 401
        });
    }
}