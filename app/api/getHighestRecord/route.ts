import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
    try {
        // mongodb connection
        const client = await clientPromise;
        const db = client.db("frameFlix");

        const highrecord = await db.collection("scoreboard")
        .find()
        .sort({ record: -1 }) 
        .limit(3)
        .toArray();

        return NextResponse.json({ highrecord }, { status: 200 });

    } catch (err) {
        console.error("Mongo error", err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
