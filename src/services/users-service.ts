import { eq } from "drizzle-orm";
import { db } from "../db";
import { users } from "../db/schema";

export interface RegisterUserInput {
  name: string;
  email: string;
  password: string;
}

export async function registerUser(input: RegisterUserInput) {
  // Cek apakah email sudah terdaftar
  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, input.email))
    .limit(1);

  if (existingUser.length > 0) {
    throw new Error("email sudah terdaftar");
  }

  // Hash password menggunakan bcrypt
  const hashedPassword = await Bun.password.hash(input.password, {
    algorithm: "bcrypt",
    cost: 10,
  });

  // Insert user baru ke database
  await db.insert(users).values({
    name: input.name,
    email: input.email,
    password: hashedPassword,
  });

  return { data: "ok" };
}
