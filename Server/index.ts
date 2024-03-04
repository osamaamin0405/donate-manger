import { json, urlencoded } from "body-parser";
import express, { Express } from "express";
import cors from "cors";
import morgan from "morgan"; 
import userRoutes from "./routes/userRoute";
import caseRouter from "./routes/CaseRoute";
import authRoutes from "./routes/AuthRoute";
import categoryRoute from "./routes/CategoryRoutes";
import donatationsRoute from "./routes/DonatationsRoute";
import PageNotFound from "./errorsController/PageNotFound";
import fileUpload from "express-fileupload"
import { config } from "dotenv";
import path from "path";
config();

const app: Express = express();

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors());
app.use(fileUpload());
app.use(userRoutes);
app.use(caseRouter);
app.use(authRoutes);
app.use(categoryRoute);
app.use(donatationsRoute)
app.use(express.static("uploads"));
app.use("*", PageNotFound);
const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Listening on port http://127.0.0.1:${port}`);
});

export default app;

