import express from "express";
import { promises } from "fs";
import winston from "winston";
import cors from "cors";

import accountsRouter from "./routes/accounts.js";

const fs = promises;
const app = express();

const { combine, timestamp, label, printf } = winston.format;
const logFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

global.accountFileJson = "accounts.json";
global.logger = winston.createLogger({
  level: "silly",
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "bank-accounts-api.log" }),
  ],
  format: combine(label({ label: "my-bank-api" }), timestamp(), logFormat),
});

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
