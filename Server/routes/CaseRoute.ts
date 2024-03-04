import { Router } from "express";
import CaseController from "../Controllers/CaseController";
import AddcaseRequestValidation from "../middleware/CaseRequestValidation";
import validate from "../middleware/ValidationRuner";
import { auth } from "../middleware/Auth";

const caseRouter = Router();
const caseController: CaseController = new CaseController();
caseRouter.put(
  "/case/add",
  [
    auth,
    validate(AddcaseRequestValidation),
    caseController.create.bind(caseController)
  ]
);

caseRouter.get("/case/all/:page/:perPage/:col?/:q?", [auth, caseController.all.bind(caseController)]);
caseRouter.get("/case/get/:id", [auth, caseController.get.bind(caseController)]);

caseRouter.post("/case/edit/:id", [auth, caseController.update.bind(caseController)]);
caseRouter.delete("/case/delete/:id", [auth, caseController.delete.bind(caseController)]);
caseRouter.get("/case/info/:id", [auth, caseController.allInfo.bind(caseController)]);



export default caseRouter;
