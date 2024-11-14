import { decimal, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  fname: varchar("fname", { length: 20 }).notNull(),
  lname: varchar("lname", { length: 20 }).notNull(),
  email: varchar("email", { length: 30 }).notNull().unique(),
  provider: varchar("provider", { length: 20 }),
  image: text("image"),
  role: varchar("role", { length: 20 }).notNull().default("customer"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const products = pgTable("products", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 20 }).notNull(),
  image: text("image"),
  description: varchar("description", { length: 1000 }).notNull(),
  price: decimal("price").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
