import { NextResponse } from "next/server";
import { verifyAuth } from "@/lib/auth";

export async function POST() {
  try {
    await verifyAuth();

    const hookUrl = process.env.VERCEL_DEPLOY_HOOK;
    if (!hookUrl) {
      return NextResponse.json({ error: "Deploy hook not configured" }, { status: 500 });
    }

    const res = await fetch(hookUrl, { method: "POST" });

    if (!res.ok) {
      return NextResponse.json({ error: "Deploy trigger failed" }, { status: res.status });
    }

    return NextResponse.json({ message: "Deployment started" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
