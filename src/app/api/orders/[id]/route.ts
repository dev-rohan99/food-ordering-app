import { prisma } from "@/utilities/connect";
import { NextRequest, NextResponse } from "next/server";


export const PUT = async (req: NextRequest, { params }: { params: { id: string } }) => {
    try{

        const { id } = params;
        const body = req.json();
        
        await prisma.order.update({
            where: {
                id: id
            },
            data: { status: body },
        });

        return new NextResponse(JSON.stringify({ message: "Order has been updated!" }), { status: 200 });

    }catch(err){
        console.log(err);
        return new NextResponse(JSON.stringify({ message: "Something went wrong!" }), { status: 500 });
    }
}

