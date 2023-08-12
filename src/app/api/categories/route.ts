import { NextResponse } from "next/server";


export const GET = () => {
    return new NextResponse("hello", { status: 200 });
}

