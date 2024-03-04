import { Router } from "express";
import { auth } from "../middleware/Auth";
import DonataionsController from "../Controllers/DonataionsController";

const donataionsController = new DonataionsController();
const donatationsRoute = Router();
donatationsRoute.put(
    "/donation/add",
    [
        auth,
        // validate(fundController),
        donataionsController.create.bind(donataionsController)
    ]
);
donatationsRoute.put(
    "/donation/collection/add",
    [
        auth,
        // validate(fundController),
        donataionsController.createCollection.bind(donataionsController)
    ]
);

donatationsRoute.get("/donation/all/:page/:perPage/:col?/:q?", [auth, donataionsController.all.bind(donataionsController)]);

donatationsRoute.get("/donation/:id", [auth, donataionsController.get.bind(donataionsController)]);

donatationsRoute.delete("/donation/delete/:id", [auth, donataionsController.delete.bind(donataionsController)]);

donatationsRoute.post("/donation/edit/:id", [auth, donataionsController.update.bind(donataionsController)]);


export default donatationsRoute;
