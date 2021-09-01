import express from "express";
import cors from "cors";

import { promises } from "fs";

import logger from "./logger";
import accountsRouter from "./routes/accounts.routes";

import { accountFileJson } from "./enum";

const fs = promises;
const app = express();

app.use(express.json());
app.use(cors());

app.use("/accounts", accountsRouter);

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
});
