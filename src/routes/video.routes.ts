import { Router } from "express";
import { SearchByIdController } from "../modules/videos/useCases/searchById/searchByIdController";
import { ListDataController } from "../modules/videos/useCases/listData/listDataController";
import { SearchByIdCacheMiddleare } from "../modules/videos/useCases/searchById/searchByIdCacheMiddleware";
import { SearchByIdMongoMiddleare } from "../modules/videos/useCases/searchById/searchByIdMongoMiddleware";

const videoRouter: Router = Router();
const listDataController = new ListDataController();
const searchByIdController = new SearchByIdController();
const searchByIdCacheMiddleare = new SearchByIdCacheMiddleare();
const searchByIdMongoMiddleare = new SearchByIdMongoMiddleare();

videoRouter.get("/", listDataController.handle);
videoRouter.get(
  "/:id",
  searchByIdCacheMiddleare.handle,
  searchByIdMongoMiddleare.handle,
  searchByIdController.handle
);

export { videoRouter };
