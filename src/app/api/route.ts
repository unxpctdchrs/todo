import { NextResponse, NextRequest } from "next/server";

export async function GET(request: Request) {

    // JSON Response
    const results = {
        message: "Hello world!"
    }

    // Response with the JSON object
    return NextResponse.json(results)
}