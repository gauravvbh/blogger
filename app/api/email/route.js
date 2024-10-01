import { connectDb } from "@/lib/config/db";
import EmailModel from "@/lib/models/EmailModel";
import { NextResponse } from "next/server";


await connectDb();

export async function POST(req) {
    try {
        const formData = await req.formData();
        const email = formData.get('email');

        const isThere = await EmailModel.findOne({ email });
        if (isThere) {
            return NextResponse.json({ success: false, message: "Email already exists!" });
        }

        const emailData = { email };
        await EmailModel.create(emailData);

        return NextResponse.json({ success: true, message: "Subscribed!" });
    }
    catch (error) {
        console.log("Errror")
        console.error(error);
        return NextResponse.json({ success: false, message: "An error occurred!" });
    }
}


export async function GET(req) {
    try {
        const emails = await EmailModel.find({});
        return NextResponse.json(emails);
    }
    catch (error) {
        return NextResponse.json({ success: false, message: "An error occurred!" });
    }
}


export async function DELETE(req) {
    try {
        const id = req.nextUrl.searchParams.get('id');
        await EmailModel.findByIdAndDelete(id);
        return NextResponse.json({ success: true, message: "Email deleted!" });
    }
    catch (error) {
        return NextResponse.json({ success: false, message: "An error occurred!" });
    }
}