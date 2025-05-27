import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(req: Request) {
    try {
        const { username, password } = await req.json();
        if (!username || !password) {
            return NextResponse.json({ error: "details are empty" }, { status: 400 });
        }
        console.log(username, password)
        // mongodb connection
        const client = await clientPromise;
        const db = client.db("frameFlix");
        const findUser = await db.collection("Users").findOne({ username: username });
        const trueUser = await db.collection("Users").findOne({
            username: username, password: password
        });
        console.log(findUser)
        if (findUser == null) {
            return NextResponse.json({ msg: "Account not found" }, { status: 404 });
        }
        if (findUser != null && trueUser == null) {
            return NextResponse.json({ msg: "Incorrect password" }, { status: 403 });
        }
        return NextResponse.json({ findUser }, { status: 200 });

    }
    catch (err) {
        console.error("Mongo error", err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}