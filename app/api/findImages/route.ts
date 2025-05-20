import { NextResponse } from "next/server";

const token = process.env.NEXT_PUBLIC_TMDB_URI;

export async function POST(req: Request) {
  try {
    const { idNumber } = await req.json();

        const response = await fetch(
            `https://api.themoviedb.org/3/movie/${idNumber}/images`,
            {
                headers: {
                    accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
    const resData = await response.json();
    return NextResponse.json(resData.backdrops, { status: 200 });
  }
  
  catch (err) {
    console.error("API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
