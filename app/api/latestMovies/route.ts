import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("frameFlix");
    const data = await db.collection("latestMovies").find({}).toArray();

    console.log("Fetched from Mongo:", data);

    return NextResponse.json(data); // Must return NextResponse
  } catch (error) {
    console.error("BROKE BACKEND", error);
    return NextResponse.json(
      { error: "Backend exploded" }, 
      { status: 500 }
    );
  }
}


// import { NextResponse } from "next/server";

// export async function GET() {
//   // your fetch / db logic here
//   const data = {_id:'3232', title: "avatar" };

//   return NextResponse.json(data);
// }