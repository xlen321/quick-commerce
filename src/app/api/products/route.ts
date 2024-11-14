/* eslint-disable @typescript-eslint/no-explicit-any */
import { productSchema } from "@/validators/productSchema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();

    const validatedData = productSchema.safeParse({
      ...data,
      price: Number(data.get("price")),
    });

    if (!validatedData.success) {
      return NextResponse.json(
        {
          message: validatedData.error.issues[0].message,
        },
        { status: 400 }
      );
    }

    const fileName = `${Date.now()}.${validatedData.data.image.name.split(".").slice(-1)}`;
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: `Failed to add a product: ${error.message}`,
      },
      { status: 500 }
    );
  }
}
