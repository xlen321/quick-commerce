/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from "@/db";
import { products } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    const product = (
      await db.select().from(products).where(eq(products.id, id)).limit(1)
    )[0];

    if (!product) {
      return NextResponse.json(
        {
          success: false,
          message: "Product not found",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        mwssage: "Product fetched successfully",
        data: product,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: `Failed to get product: ${error.message}`,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    const productId = await db
      .delete(products)
      .where(eq(products.id, id))
      .returning({ deletedId: products.id });

    if (!productId) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Product deleted successfully",
        data: productId,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: `Failed to delete product: ${error.message}`,
      },
      { status: 500 }
    );
  }
}
