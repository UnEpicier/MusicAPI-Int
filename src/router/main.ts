import { Request, Response, Router } from "express";

const router = Router();

router.get("/", (_: Request, res: Response) => {
	res.render("pages/index", {
		title: "Music API",
	});
});

export default router;
