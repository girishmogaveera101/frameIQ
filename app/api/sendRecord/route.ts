import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(req: Request) {
    try {
        const { username, record, date } = await req.json();
        if (!username || !record || !date) {
            return NextResponse.json({ error: "Details are empty" }, { status: 400 });
        }
        console.log(username, record)
        // mongodb connection
        const client = await clientPromise;
        const db = client.db("frameFlix");
        const insertedRecord = await db.collection("scoreboard").insertOne({
            username: username, record: record, date:date
        });
        return NextResponse.json({ insertedRecord }, { status: 200 });

    }
    catch (err) {
        console.error("Mongo error", err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}