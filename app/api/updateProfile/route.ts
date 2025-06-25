import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function PUT(req: Request) {
    try {
        const { username, fullname, age, email, phone, bio } = await req.json();
        if (!username) {
            return NextResponse.json({ error: "Details are empty" }, { status: 400 });
        }
        console.log(username)
        // mongodb connection
        const client = await clientPromise;
        const db = client.db("frameFlix");
        const trueUser = await db.collection("Users").updateOne(
            { username: username },
            {
                $set: {
                    fullname: fullname,
                    age: age,
                    email: email,
                    phone: phone,
                    bio: bio,
                    updatedAt: new Date(),
                },
            },
            { upsert: false }
        );

        return NextResponse.json({ trueUser }, { status: 200 });

    }
    catch (err) {
        console.error("Mongo error", err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}