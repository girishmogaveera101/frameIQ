import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    const {
      description,
      director,
      imageURL,
      key,
      rating,
      releaseDate,
      title,
      username} = await req.json();

    console.log(key)
    if (!key || !title) {
      return NextResponse.json({ error: "movie details are empty" }, { status: 400 });
    }
    console.log("inputs recieved")
    const client = await clientPromise;
    const db = client.db("frameFlix");
    const findImageURL = await db.collection('latestMovies').findOne({imageURL:imageURL});
    if(findImageURL!=null){
      return NextResponse.json({ error: "Frame already exits in databse" }, { status: 403 });
    }
    const newMovie = await db.collection("latestMovies").insertOne({
      key, title, imageURL, rating,
      releaseDate, description,
      director, username
    })
    if (newMovie) {
      return NextResponse.json({ newMovie }, { status: 200 });
    }
    return NextResponse.json({
      message: "Movie not inserted"
    }, { status: 404 });
  }
  catch (err) {
    console.error("Mongo error", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}