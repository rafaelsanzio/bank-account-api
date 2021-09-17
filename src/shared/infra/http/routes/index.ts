import { Router } from "express";

import accountsRouter from "./accounts.routes";

const router = Router();

router.use("/accounts", accountsRouter);

export { router };
