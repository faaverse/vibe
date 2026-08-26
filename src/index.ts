import { Elysia } from "elysia";
import { db } from "./db";
import { users } from "./db/schema";
import { usersRoute } from "./routes/users-route";

const port = process.env.PORT || 3000;

export const app = new Elysia()
  .use(usersRoute)
  .get("/", () => ({ message: "Hello World" }))
  .get("/users", async () => {
    try {
      return await db.select().from(users);
    } catch (error) {
      console.error("Database error:", error);
      return { error: "Failed to fetch users" };
    }
  })
  .listen(port);


console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
