import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    const { title } = await req.json();
    // const { title } = body;
    if (!title) {
      return NextResponse.json({ error: "movie title is empty" }, { status: 400 });
    }
    // mongodb connection
    const client = await clientPromise;
    const db = client.db("frameFlix");
    const existingMovie = await db.collection("latestMovies").find({
      title: { $regex: `^${title}`, $options: "i" }
    }).limit(5).toArray();
    if (existingMovie) {
      return NextResponse.json({ existingMovie }, { status: 200 });
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