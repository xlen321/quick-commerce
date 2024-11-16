/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from "@/db";
import { products } from "@/db/schema";
import { desc } from "drizzle-orm";

import { NextResponse } from "next/server";

export async function GET() {
  try {
    const allProducts = await db
      .select()
      .from(products)
      .orderBy(desc(products.id));
    return NextResponse.json(
      {
        success: true,
        message: "Products fetched successfully",
        data: allProducts,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        messagge: `Failed to get products: ${error.message}`,
      },
      { status: 500 }
    );
  }
}
