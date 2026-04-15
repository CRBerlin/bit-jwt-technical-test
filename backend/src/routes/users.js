import { Router } from "express";
import usersController from "../controllers/users.js";
import authMiddleware from "../middleware/authMiddleware.js"; //Autenticación por token.
import roleMiddleware from "../middleware/roleMiddleware.js"; //Autenticación por roles.

const usersRouter = Router();

usersRouter.post("/", usersController.create);
usersRouter.get(
    "/",
    authMiddleware,
    usersController.readAll
);
usersRouter.get(
    "/:id",
    authMiddleware,
    roleMiddleware("admin", "trainer", "user"),
    usersController.read
);

usersRouter.put(
    "/:id",
    authMiddleware,
    roleMiddleware("admin", "trainer", "user"),
    usersController.update
);

usersRouter.delete(
    "/:id",
    authMiddleware,
    roleMiddleware("admin"),
    usersController.delete
);

export default usersRouter;