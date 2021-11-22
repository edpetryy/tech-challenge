import { container } from "tsyringe";
import { OMDbDataApiRepository } from "../../modules/videos/repositories/implementation/OMDbDataApiRepository";
import { IOMDbDataApiRepository } from "../../modules/videos/repositories/IOMDbDataApiRepository";

container.registerSingleton<IOMDbDataApiRepository>("OMDbDataApiRepository", OMDbDataApiRepository);
