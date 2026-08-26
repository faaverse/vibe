import { describe, it, expect, mock, spyOn } from "bun:test";
import { app } from "../src/index";
import * as usersService from "../src/services/users-service";

describe("User Registration API", () => {
  it("POST /api/users - Success", async () => {
    // Mock registerUser to simulate success
    const registerSpy = spyOn(usersService, "registerUser").mockResolvedValueOnce({
      data: "ok",
    });

    const response = await app.handle(
      new Request("http://localhost/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "eko",
          email: "eko@localhost",
          password: "rahasia",
        }),
      })
    );

    expect(response.status).toBe(200);
    const body = await response.json();
    expect(body).toEqual({ data: "ok" });
    expect(registerSpy).toHaveBeenCalledWith({
      name: "eko",
      email: "eko@localhost",
      password: "rahasia",
    });
  });

  it("POST /api/users - Error: Email sudah terdaftar", async () => {
    // Mock registerUser to simulate duplicate email error
    spyOn(usersService, "registerUser").mockRejectedValueOnce(
      new Error("email sudah terdaftar")
    );

    const response = await app.handle(
      new Request("http://localhost/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "eko",
          email: "eko@localhost",
          password: "rahasia",
        }),
      })
    );

    expect(response.status).toBe(400);
    const body = await response.json();
    expect(body).toEqual({ error: "email sudah terdaftar" });
  });

  it("POST /api/users - Error: Invalid Payload", async () => {
    const response = await app.handle(
      new Request("http://localhost/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "eko",
        }),
      })
    );

    expect(response.status).toBe(422);
  });
});
