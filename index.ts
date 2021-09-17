import "reflect-metadata";
import "express-async-errors";
import express from "express";
import cors from "cors";

import "@shared/container";

import { promises } from "fs";

import logger from "./src/utils/logger";

import { accountFileJson } from "./src/utils/enum";
import { router } from "@shared/infra/http/routes";

const fs = promises;
const app = express();

app.use(express.json());
app.use(cors());

app.use(router);

app.listen(3000, async () => {
  try {
    await fs.readFile(accountFileJson, "utf-8");
  } catch (err) {
    const initalJson = {
      nextID: 1,
      accounts: [],
    };
    fs.writeFile(accountFileJson, JSON.stringify(initalJson)).catch((err) => {
      logger.error(err);
    });
  }
  console.log("Server is running on port 3000");
});
