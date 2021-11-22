import { Router } from "express";
import { AuthenticateUserController } from "../modules/accounts/useCases/authenticateUser/AuthenticateController";
import { CreateUserController } from "../modules/accounts/useCases/createUser/CreateUserController";
import { FavoriteController } from "../modules/accounts/useCases/favorite/FavoriteController";
import { ListFavoriteController } from "../modules/accounts/useCases/listFavorite/listFavoriteController";
import { ensureAuthenticated } from "../shared/middlewares/EnsureAuthenticated";

const userRouter = Router();

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();
const favoriteController = new FavoriteController();
const listFavoriteController = new ListFavoriteController();

userRouter.post("/user", createUserController.handle);
userRouter.post("/login", authenticateUserController.handle);
userRouter.patch("/user/favorite", ensureAuthenticated, favoriteController.handle);
userRouter.get("/user/favorite", ensureAuthenticated, listFavoriteController.handle);

export { userRouter };
