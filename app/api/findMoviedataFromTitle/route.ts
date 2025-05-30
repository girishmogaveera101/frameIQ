import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(req: Request) {
    try {
        const { title } = await req.json();
        if (!title) {
            return NextResponse.json({ error: "Details are empty" }, { status: 400 });
        }
        console.log(title)
        // mongodb connection
        const client = await clientPromise;
        const db = client.db("frameFlix");
        const findMovie = await db.collection("latestMovies").findOne({ title: title });
        console.log("data : ",findMovie)
        if (findMovie == null) {
            return NextResponse.json({ msg: "Movie not found" }, { status: 404 });
        }
        return NextResponse.json({ findMovie}, { status: 200 });

    }
    catch (err) {
        console.error("Mongo error", err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}