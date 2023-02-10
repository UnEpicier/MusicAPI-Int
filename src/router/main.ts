import { Request, Response, Router } from "express";

const router = Router();

router.get("/", (_: Request, res: Response) => {
	fetch("http://localhost:3000/api/artists")
		.then((response) => response.json())
		.then((data) => {
			res.render("pages/index", {
				title: "Music API",
				data: data,
			});
		});
});

router.post("/", (req: Request, res: Response) => {
	const search = req.body.search;
	const by = req.body.by;

	if (search == "" || search == null) {
		fetch("http://localhost:3000/api/artists")
			.then((response) => response.json())
			.then((data) => {
				res.render("pages/index", {
					title: "Music API",
					data: data,
				});
			});
	} else {
		console.log(search);

		if (by == "By group name") {
			fetch(`http://localhost:3000/api/artists/name/${search}`)
				.then((response) => response.json())
				.then((data) => {
					return res.render("pages/index", {
						title: "Music API",
						data: data,
					});
				});
		} else if (by == "By member name") {
			fetch(`http://localhost:3000/api/artists/members/${search}`)
				.then((response) => response.json())
				.then((data) => {
					return res.render("pages/index", {
						title: "Music API",
						data: data,
					});
				});
		} else if (by == "By creation date") {
			console.log("By creation date");

			fetch(`http://localhost:3000/api/artists/creation/${search}`)
				.then((response) => response.json())
				.then((data) => {
					return res.render("pages/index", {
						title: "Music API",
						data: data,
					});
				});
		} else {
			return res.render("pages/index", {
				title: "Music API",
				data: null,
			});
		}
	}
});

export default router;
