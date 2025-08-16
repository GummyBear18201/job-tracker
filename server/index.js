import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import jobTableRoutes from "./routes/jobTableRoutes.js";
import registrationRoutes from "./routes/registrationRoutes.js";
import settingRoutes from "./routes/settingRoutes.js";
import generateCoverLetter from "./routes/generateCoverLetter.js";
const app = express();
app.use(cors());
app.use(bodyParser.json());

const port = 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/api/jobTable", jobTableRoutes);

app.use("/logIn", registrationRoutes);

app.use("/setting", settingRoutes);

app.use("/api", generateCoverLetter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
