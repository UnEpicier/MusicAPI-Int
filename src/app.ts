import express, { Application, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import { create } from "express-handlebars";
import createError from "http-errors";
import logger from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser";
import helpers from "./helpers";

// * ROUTER FILES HERE
import main from "./router/main";
import docs from "./router/docs";
// * END ROUTER FILES

dotenv.config();

const app: Application = express();
const port = process.env.PORT ?? 3000;

const hbs = create({
	encoding: "utf-8",
	defaultLayout: "main", // * DEFAULT LAYOUT NAME (file name) HERE
	extname: "hbs",
	layoutsDir: `${process.cwd()}/views/layouts`,
	partialsDir: `${process.cwd()}/views/partials`,
	helpers: helpers,
});

app.set("views", `${process.cwd()}/views`);
app.set("view engine", "hbs");
app.engine("hbs", hbs.engine);

app.use(cors());
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Serve static files
app.use(express.static(`${process.cwd()}/public`));

// * ADD ROUTERS TO EXPRESS HERE
app.use(main);
app.use(docs);
// * END ROUTERS TO EXPRESS

// Catch 404 and forward to error handler
app.use((_: Request, __: Response, next: NextFunction) => {
	next(createError(404));
});

app.use((err: any, req: Request, res: Response, _: NextFunction) => {
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	res.status(err.status ?? 500);

	res.render("global/_error", {
		title: "404 Error", // * 404 PAGE TITLE HERE
	});
});

// Start server
app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
