import { Request, Response, Router } from "express";
const router = Router();

router.get("/docs", async (req: Request, res: Response) => {
	return res.render("docs/index", {
		title: "Music API",
	});
});

export default router;
