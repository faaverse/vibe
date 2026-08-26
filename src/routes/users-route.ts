import { Elysia, t } from "elysia";
import { registerUser } from "../services/users-service";

export const usersRoute = new Elysia()
  .post(
    "/api/users",
    async ({ body, set }) => {
      try {
        await registerUser(body);
        return { data: "ok" };
      } catch (error: any) {
        if (error.message === "email sudah terdaftar") {
          set.status = 400;
          return { error: "email sudah terdaftar" };
        }
        set.status = 500;
        return { error: "Internal server error" };
      }
    },
    {
      body: t.Object({
        name: t.String(),
        email: t.String(),
        password: t.String(),
      }),
    }
  );
