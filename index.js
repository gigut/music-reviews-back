import express, { json } from "express";
import multer from "multer";
import mongoose from "mongoose";
import cors from 'cors';
import {
  loginValidation,
  postCreateValidation,
  registerValidation,
} from "./validations.js";

import { handleValidationErrors, checkAuth } from './utils/index.js';
import { UserController, PostController } from "./controllers/index.js";

mongoose
  .connect(
    "mongodb+srv://user:123@cluster0.vsyi9gw.mongodb.net/music-reviews?retryWrites=true&w=majority"
  )
  .then(() => console.log("Ok"))
  .catch((err) => console.log("Error", err));

const app = express();

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "uploads");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

app.use(express.json());
app.use(cors())
app.use("/uploads", express.static("uploads"));

app.post(
  "/auth/register",
  registerValidation,
  handleValidationErrors,
  UserController.register
);
app.post(
  "/auth/login",
  loginValidation,
  handleValidationErrors,
  UserController.login
);
app.get("/auth/me", checkAuth, UserController.getMe);

app.post("/upload", checkAuth, upload.single("image"), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

app.post(
  "/posts",
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  PostController.create
);
app.get("/tags", PostController.getLastTags);
app.get("/posts", PostController.getAll);
app.get("/posts/tags", PostController.getLastTags);
app.get("/posts/:id", PostController.getOne);
app.delete("/posts/:id", checkAuth, PostController.remove);
app.patch(
  "/posts/:id",
  checkAuth,
  handleValidationErrors,
  PostController.update
);

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log("server start at port 4444");
});