import dbConnect from '@/lib/mongodb';
import Skill from '@/models/Skills';
import { NextResponse } from 'next/server';
import { verifyAuth } from '@/lib/auth';

// GET all skill categories
export async function GET() {
  await dbConnect();
  const skills = await Skill.find({});
  return NextResponse.json({ skills });
}

// POST a new skill category
export async function POST(req) {
  try {
    await verifyAuth();
    await dbConnect();

    const { name, skillSet } = await req.json();
    const skill = await Skill.create({ name, skillSet });

    return NextResponse.json({ skill, message: 'created' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function PATCH(req) {
  try {
    await verifyAuth()
    await dbConnect()

    const { id, name, skillSet } = await req.json()
    const skill = await Skill.findByIdAndUpdate(id, {
      name, skillSet
    })
    return NextResponse.json({
      skill: {
        _id: skill._id,
        name,
        skillSet
      }
    })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}


export async function DELETE(req) {
  try {
    await verifyAuth()
    await dbConnect()

    const { id } = await req.json()
    await Skill.findByIdAndDelete(id)

    return NextResponse.json({ message: "Deleted" })

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

}