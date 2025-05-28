import { NextResponse } from "next/server";

const token = process.env.NEXT_PUBLIC_TMDB_URI;

export async function POST(req: Request) {
  try {
    const { pageNumber } = await req.json();

    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?language=en-US&page=${pageNumber}&release_date.gte=1990-01-01&release_date.lte=2025-05-01&vote_average.gte=6&vote_count.gte=1500&with_original_language=en`,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const resData = await response.json();
    console.log(resData)
    return NextResponse.json(resData.results, { status: 200 });
  }
  
  catch (err) {
    console.error("API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
