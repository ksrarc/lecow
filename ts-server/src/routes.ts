import { ErrorRequestHandler, RequestHandler, Router } from "express";
import continuator from "./lib/continue.decorator";
import { createUser, getAllUsers } from "./controllers/users";
import {
  commitDatabase,
  connectDatabase,
  rollbackDatabase,
} from "./lib/database.middleware";

const router = Router();

// keep this at the begining
router.use(connectDatabase as RequestHandler);

// app routers below
router.get("/api/v1/users", continuator(getAllUsers));
router.post("/api/v1/users", continuator(createUser));

// keep this at the end
router.use(commitDatabase as RequestHandler);
router.use(rollbackDatabase as ErrorRequestHandler);

export default router;
