import express from "express";
import { Storage } from "@google-cloud/storage";

const server = express();
const storage = new Storage();
const bucket = storage.bucket("images-nodejs-test");
const file = bucket.file("banner.jpg");

server.get("/", async (req, res) => {
  const fivemins = new Date();
  fivemins.setMinutes(fivemins.getMinutes() + 5);

  const url = await file.getSignedUrl({
    action: "read",
    expires: fivemins,
  });

  return res.json({
    url,
  });
});

const port = process.env.PORT || 8000;
server.listen(port, () => {
  console.log("Listening on http://localhost:" + port);
});
