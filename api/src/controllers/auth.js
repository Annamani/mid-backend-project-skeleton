import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import express from "express";
import knex from "#configs/database.js";
import z from "zod";

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined");
}
const router = express.Router();
//SignUp Schema
const signupSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
});
//Login schema
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export async function signUp(req, res, next) {
  try {
    const result = signupSchema.safeParse(req.body);
    if (!result.success)
      return res.status(400).json({ error: result.error.issues });
    const { name, email, password } = result.data;
    const existing = await knex("users").where({ email }).first();
    if (existing) {
      return res.status(409).json({ message: "Email already exists" });
    }
    const hashed_password = await bcrypt.hash(password, 10);
    const [id] = await knex("users")
      .insert({
        name,
        email,
        password: hashed_password,
      })
      .returning(["id", "name", "email"]);
    res.status(201).json({ id, name, email });
  } catch (error) {
    next(error);
  }
}
export async function logIn(req, res, next) {
  try {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json(parsed.error.flatten());
    }
    const { email, password } = parsed.data;
    const user = await knex("users").where({ email }).first();
    if (!user) {
      return res.status(404).json({ error: "Invalid credentials" });
    }
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name },
      JWT_SECRET,
      { expiresIn: "1h" },
    );
    res.json({ token });
  } catch (err) {
    next(err);
  }
}
export async function me(req, res, next) {
  try {
    const user = await knex("users")
      .where({ id: req.user.id })
      .select("id", "name", "email")
      .first();

    if (!user) {
      return res.status(404).json({ error: "USER_NOT_FOUND" });
    }

    res.json({ data: user });
  } catch (error) {
    next(error);
  }
}
