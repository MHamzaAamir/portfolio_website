import dbConnect from '@/lib/mongodb';
import Work from '@/models/Work';
import { NextResponse } from 'next/server';
import { verifyAuth } from '@/lib/auth';

// GET all works
export async function GET() {
  await dbConnect();

  const works = await Work.find({});
  return NextResponse.json({ works });
}

// DELETE a work by ID
export async function DELETE(req) {
  try {
    await verifyAuth();
    await dbConnect();

    const { id } = await req.json();

    await Work.findByIdAndDelete(id);

    return NextResponse.json({ message: 'deleted' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function PATCH(req) {
  try {
    await dbConnect()
    const { id, name, description, link, category } = await req.json()

    const res = await Work.findByIdAndUpdate(id,{
      name,
      description,
      link,
      category
    })

    return NextResponse.json({ id, name, description, link, category })

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }


}

// POST new work
export async function POST(req) {
  try {
    // await verifyAuth();
    await dbConnect();

    const { name, description, link, category } = await req.json();

    const work = await Work.create({ name, description, link, category });

    return NextResponse.json({ work, message: 'created' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
