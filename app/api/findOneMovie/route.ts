import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db("frameFlix");
        const movie = await db.collection("latestMovies").aggregate([{ $sample: { size: 1 } }]).toArray();
        if (movie) {
            return NextResponse.json(movie[0], { status: 200 });
        }
        return NextResponse.json({
            message: "Movie not found"
        }, { status: 404 });
    }
    catch (err) {
        console.error("Mongo error", err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}