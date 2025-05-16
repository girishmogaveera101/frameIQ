import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title } = body;

    if (!title) {
      return NextResponse.json({ error: "No title, bro. Send SOMETHING 😭" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("frameFlix");

    // Look for existing entry (case-insensitive)
    const existingMovie = await db.collection("latestMovies").findOne({
      title: { $regex: `^${title}$`, $options: "i" }
    });

    if (existingMovie) {
      return NextResponse.json({
        success: true,
        message: "Movie found in DB 📀",
        data: existingMovie
      }, { status: 200 });
    }

    // If not found, return that info
    return NextResponse.json({
      success: false,
      message: "Movie not found 🕵️",
      data: null
    }, { status: 404 });

  } catch (err) {
    console.error("Mongo tripped on a rock 💥", err);
    return NextResponse.json({ error: "Internal server error 😵" }, { status: 500 });
  }
}


// import { NextResponse } from "next/server";

// export async function GET() {
//   // your fetch / db logic here
//   const data = {_id:'3232', title: "avatar" };

//   return NextResponse.json(data);
// }