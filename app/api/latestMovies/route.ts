import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("frameFlix");
    const data = await db.collection("latestMovies").find({}).sort({_id:-1}).limit(20).toArray();
    // console.log("Fetched movies :", data);
    return NextResponse.json(data);
  }
  catch (error) {
    console.error("Could not fetch the movies", error);
    return NextResponse.json(
      { error: "could not fetch the movies" },
      { status: 500 }
    );
  }
}