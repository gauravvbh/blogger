import { connectDb } from "@/lib/config/db";
import BlogModel from "@/lib/models/BlogModel";
import { writeFile } from 'fs/promises'
const fs = require('fs');

const { NextResponse } = require("next/server");

const LoadDB = async () => {
    await connectDb();
}
LoadDB();


//api end point for getting all blog posts
export async function GET(req) {
    const blogId = req.nextUrl.searchParams.get('id');
    if (blogId) {
        const blog = await BlogModel.findById(blogId);
        return NextResponse.json(blog);
    }
    const blogs = await BlogModel.find({});
    return NextResponse.json(blogs);
}

//api end point for uploading blog posts
export async function POST(req) {

    const formData = await req.formData();
    console.log(formData);
    const timestamp = Date.now();

    const image = formData.get('image');
    const imageByteData = await image.arrayBuffer();
    const buffer = Buffer.from(imageByteData);
    const path = `./public/${timestamp}_${image.name}`;
    await writeFile(path, buffer);
    const imageUrl = `/${timestamp}_${image.name}`;

    const blogData = {
        title: `${formData.get('title')}`,
        description: `${formData.get('description')}`,
        category: `${formData.get('category')}`,
        author: `${formData.get('author')}`,
        image: imageUrl,
        authorImg: `${formData.get('authorImg')}`
    }

    await BlogModel.create(blogData);



    return NextResponse.json({ success: true, message: "Blog created successfully" })
}


//api end point for deleting blog posts
export async function DELETE(req) {
    const blogId = req.nextUrl.searchParams.get('id');
    const blog = await BlogModel.findById(blogId);
    fs.unlink(`./public/${blog.image}`, () => { });
    await BlogModel.findByIdAndDelete(blogId);

    return NextResponse.json({ success: true, message: "Blog deleted successfully" })
}