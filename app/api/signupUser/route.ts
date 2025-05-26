import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    const { username, password, favCharacter } = await req.json();
    if (!username || !password) {
      return NextResponse.json({ error: "details are empty" }, { status: 400 });
    }
    // mongodb connection
    const client = await clientPromise;
    const db = client.db("frameFlix");
    const existingUser = await db.collection("Users").find({
      username: username
    }).toArray();
    console.log(existingUser)
    if (existingUser.length == 0) {
      const user = await db.collection('Users').insertOne(
        {
          username: username,
          password: password,
          favCharacter: favCharacter
        }
      );
      return NextResponse.json({ user }, { status: 200 });
    }
    return NextResponse.json({ msg: "Username already used" }, { status: 400 });

  }
  catch (err) {
    console.error("Mongo error", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}