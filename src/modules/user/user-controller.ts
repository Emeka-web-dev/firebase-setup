import { Request, Response } from "express";
import { db, auth } from "../../config/firebase";
import { User, CreateUserDTO } from "./user-model";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { email, password, displayName }: CreateUserDTO = req.body;

    // Create Firebase Authentication user
    const userRecord = await auth.createUser({
      email,
      password,
      displayName,
    });

    // Create user document in Firestore
    const userDoc: User = {
      id: userRecord.uid,
      email,
      displayName,
      createdAt: new Date(),
      role: "user",
    };

    await db.collection("users").doc(userRecord.uid).set(userDoc);

    res.status(201).json({
      message: "User created successfully",
      userId: userRecord.uid,
    });
  } catch (error: any) {
    res.status(400).json({
      message: "User creation failed",
      error: error.message,
    });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const userDoc = await db.collection("users").doc(userId).get();

    if (!userDoc.exists) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(userDoc.data());
  } catch (error: any) {
    res.status(500).json({
      message: "Error fetching user",
      error: error.message,
    });
  }
};
