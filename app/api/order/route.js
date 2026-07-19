import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request) {
  try {
    const body = await request.json();
    const { color, waist, length } = body;

    if (!color || !waist || !length) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    const validColors = ["Black", "Light Blue", "Dark Blue", "Mustard"];
    if (!validColors.includes(color)) {
      return NextResponse.json(
        { error: "Invalid color selected." },
        { status: 400 }
      );
    }

    const waistNum = parseInt(waist, 10);
    const lengthNum = parseInt(length, 10);

    if (isNaN(waistNum) || waistNum < 24 || waistNum > 50) {
      return NextResponse.json(
        { error: "Waist must be a number between 24 and 50." },
        { status: 400 }
      );
    }

    if (isNaN(lengthNum) || lengthNum < 28 || lengthNum > 40) {
      return NextResponse.json(
        { error: "Length must be a number between 28 and 40." },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from("pants")
      .insert([{ color, waist: waistNum, length: lengthNum }]);

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { error: "Failed to place order. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Order placed successfully!" },
      { status: 200 }
    );
  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
