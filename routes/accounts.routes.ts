import express, { Request, Response } from "express";
import { promises } from "fs";

import logger from "../logger";

import { accountFileJson } from "../enum";
import IAccountDTO from "../dtos/IAccountDTO";

const fs = promises;
const router = express.Router();

router.post("/", async (request: Request, response: Response) => {
  let account = request.body;
  try {
    let data = await fs.readFile(accountFileJson, "utf-8");
    let json = JSON.parse(data);

    account = { id: json.nextID++, ...account };
    json.accounts.push(account);
    delete account.nextID;

    await fs
      .writeFile(accountFileJson, JSON.stringify(json))
      .then(() => {
        logger.info(`POST /accounts - ${JSON.stringify(account)}`);
        response.send(account);
      })
      .catch((err) => {
        logger.error(`POST /accounts - ${err.message}`);
        response.status(400).send({ error: err.message });
      });
  } catch (err) {
    logger.error(`POST /accounts - ${err.message}`);
    response.status(400).send({ error: err.message });
  }
});

router.get("/", async (_, response: Response) => {
  try {
    let data = await fs.readFile(accountFileJson, "utf-8");
    let result = JSON.parse(data);

    delete result.nextID;

    logger.info(`LIST /accounts - ${JSON.stringify(result)}`);
    response.send(result);
  } catch (err) {
    logger.error(`LIST /accounts - ${err.message}`);
    response.status(400).send({ error: err.message });
  }
});

router.get("/:id", async (request: Request, response: Response) => {
  try {
    let data = await fs.readFile(accountFileJson, "utf-8");
    let id = Number(request.param("id"));
    let result = JSON.parse(data);

    let account = result.accounts.find(
      (account: IAccountDTO) => account.id === id
    );
    if (!account) {
      logger.error(`GET /accounts:id - Not Found`);
      response.status(400).send({ error: "Not Found" });
      return;
    }
    logger.info(`GET /accounts:id - ${JSON.stringify(account)}`);
    response.send(account);
  } catch (err) {
    logger.error(`GET /accounts:id - ${err.message}`);
    response.status(400).send({ error: err.message });
  }
});

router.delete("/:id", async (request: Request, response: Response) => {
  try {
    let data = await fs.readFile(accountFileJson, "utf-8");
    let id = Number(request.param("id"));
    let result = JSON.parse(data);

    const account = result.accounts.find(
      (account: IAccountDTO) => account.id === id
    );
    if (!account) {
      logger.error(`DELETE /accounts:id - Not Found`);
      response.status(400).send({ error: "Not Found" });
      return;
    }

    const accounts = result.accounts.filter(
      (account: IAccountDTO) => account.id !== id
    );
    if (!accounts) {
      logger.error(`DELETE /accounts:id - Not Found`);
      response.status(400).send({ error: "Not Found" });
      return;
    }
    result.accounts = accounts;

    await fs
      .writeFile(accountFileJson, JSON.stringify(result))
      .then(() => {
        logger.info(`DELETE /accounts - ${JSON.stringify(account)}`);
        response.send(account);
      })
      .catch((err) => {
        logger.error(`DELETE /accounts:id - ${err.message}`);
        response.status(400).send({ error: err.message });
      });
  } catch (err) {
    logger.error(`DELETE /accounts:id - ${err.message}`);
    response.status(400).send({ error: err.message });
  }
});

router.put("/:id", async (request: Request, response: Response) => {
  try {
    let { name, balance } = request.body;
    let data = await fs.readFile(accountFileJson, "utf-8");
    let id = Number(request.param("id"));
    let result = JSON.parse(data);

    const oldAccount = result.accounts.findIndex(
      (account: IAccountDTO) => account.id === id
    );
    if (oldAccount === -1) {
      logger.error(`PUT /accounts:id - Not Found`);
      response.status(400).send({ error: "Not Found" });
      return;
    }

    result.accounts[oldAccount].name = name;
    result.accounts[oldAccount].balance = balance;

    await fs
      .writeFile(accountFileJson, JSON.stringify(result))
      .then(() => {
        logger.info(
          `PUT /accounts - ${JSON.stringify(result.accounts[oldAccount])}`
        );
        response.send(result.accounts[oldAccount]);
      })
      .catch((err) => {
        logger.error(`PUT /accounts:id - ${err.message}`);
        response.status(400).send({ error: err.message });
      });
  } catch (err) {
    logger.error(`PUT /accounts:id - ${err.message}`);
    response.status(400).send({ error: err.message });
  }
});

router.post("/transaction", async (request: Request, response: Response) => {
  try {
    let { id, value } = request.body;
    let data = await fs.readFile(accountFileJson, "utf-8");
    let result = JSON.parse(data);

    id = Number(id);
    value = Number(value);

    const index = result.accounts.findIndex(
      (account: IAccountDTO) => account.id === id
    );
    if (index === -1) {
      logger.error(`POST /accounts/transaction - Not Found`);
      response.status(400).send({ error: "Not Found" });
      return;
    }

    if (value < 0 && result.accounts[index].balance + value < 0) {
      logger.error(`POST /accounts/transaction - Insufficient Funds`);
      throw new Error("Insufficient Funds");
    }

    result.accounts[index].balance += value;

    await fs
      .writeFile(accountFileJson, JSON.stringify(result))
      .then(() => {
        logger.info(
          `POST /accounts/transaction - ${JSON.stringify(
            result.accounts[index]
          )}`
        );
        response.send(result.accounts[index]);
      })
      .catch((err) => {
        logger.error(`POST /accounts/transaction - ${err.message}`);
        response.status(400).send({ error: err.message });
      });
  } catch (err) {
    logger.error(`POST /accounts/transaction - ${err.message}`);
    response.status(400).send({ error: err.message });
  }
});

router.post("/transfer", async (request: Request, response: Response) => {
  try {
    let { to, from, value } = request.body;
    let data = await fs.readFile(accountFileJson, "utf-8");
    let result = JSON.parse(data);

    const toID = Number(to);
    const fromID = Number(from);
    value = Number(value);

    if (value <= 0) {
      logger.error(
        `POST /accounts/transfer - Operation is not valid, negative value to transfer`
      );
      throw new Error("Operation is not valid, negative value to transfer");
    }

    const toIndex = result.accounts.findIndex(
      (account: IAccountDTO) => account.id === toID
    );
    if (toIndex === -1) {
      logger.error(`POST /accounts/transfer - To Account Not Found`);
      response.status(400).send({ error: "To Account Not Found" });
      return;
    }

    const fromIndex = result.accounts.findIndex(
      (account: IAccountDTO) => account.id === fromID
    );
    if (fromIndex === -1) {
      logger.error(`POST /accounts/transfer - From Account Not Found`);
      response.status(400).send({ error: "From Account Not Found" });
      return;
    }

    if (result.accounts[toIndex].balance - value < 0) {
      logger.error(`POST /accounts/transfer - Insufficient Funds`);
      throw new Error("Insufficient Funds");
    }

    result.accounts[toIndex].balance -= value;
    result.accounts[fromIndex].balance += value;

    await fs
      .writeFile(accountFileJson, JSON.stringify(result))
      .then(() => {
        logger.info(
          `POST /accounts/transfer - ${JSON.stringify(
            result.accounts[toIndex]
          )}`
        );
        response.send(result.accounts[toIndex]);
      })
      .catch((err) => {
        logger.error(`POST /accounts/transfer - ${err.message}`);
        response.status(400).send({ error: err.message });
      });
  } catch (err) {
    logger.error(`POST /accounts/transfer - ${err.message}`);
    response.status(400).send({ error: err.message });
  }
});

export default router;
