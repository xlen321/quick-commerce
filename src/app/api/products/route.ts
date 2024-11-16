/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from "@/db";
import { products } from "@/db/schema";
import { productSchema } from "@/validators/productSchema";
import { desc } from "drizzle-orm";
import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import path from "node:path";

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();

    const validatedData = productSchema.safeParse({
      name: data.get("name"),
      description: data.get("description"),
      price: Number(data.get("price")),
      image: data.get("image"),
    });

    if (!validatedData.success) {
      return NextResponse.json(
        {
          message: validatedData.error.issues[0].message,
        },
        { status: 400 }
      );
    }

    const fileName = `${Date.now()}.${validatedData.data.image.name
      .split(".")
      .slice(-1)}`;

    const buffer = Buffer.from(await validatedData.data.image.arrayBuffer());

    await writeFile(
      path.join(process.cwd(), "public/assets", fileName),
      buffer
    );

    const newProduct = (await db.insert(products).values({...validatedData.data, image: fileName}).returning({id: products.id}))[0];

    if (!newProduct) {
      return NextResponse.json({
        success: false,
        message: "Failed to add a product",
      });
    }

    return NextResponse.json(
      {
        success: true,
        message: "Product added successfully",
        data: newProduct,
      },
      { status: 201 }
    );
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

export async function GET() {
  try {
    const allProducts = await db.select().from(products).orderBy(desc(products.id));
    return NextResponse.json({
      success: true,
      message: "Products fetched successfully",
      data: allProducts
    }, {status: 200});
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      messagge: `Failed to get products: ${error.message}`
    }, {status: 500});    
  }
}