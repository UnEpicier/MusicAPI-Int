import { Request, Response, Router } from "express";
import mariadb from "mariadb";
import { uuid } from "uuidv4";
import { randomBytes } from "crypto";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const router = Router();

const pool = mariadb.createPool({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_NAME,
});

router.get("/", (req: Request, res: Response) => {
	const { user } = req.cookies;

	if (user) {
		pool.getConnection().then((conn) => {
			conn.query(
				"SELECT COUNT(*) AS count, token FROM user WHERE uuid = ?",
				[user]
			).then((rows: any) => {
				if (rows[0].count == 1) {
					fetch(
						"http://localhost:3000/api/artists/e4250cc67e9ea027f647d026bfaaa69b60855d54fb2340dca66e36bdf137cba7"
					)
						.then((response) => response.json())
						.then((data) => {
							return res.render("pages/index", {
								title: "Music API",
								logged: true,
								token: rows[0].token,
								data: data,
							});
						});
				} else {
					fetch(
						"http://localhost:3000/api/artists/e4250cc67e9ea027f647d026bfaaa69b60855d54fb2340dca66e36bdf137cba7"
					)
						.then((response) => response.json())
						.then((data) => {
							return res.render("pages/index", {
								title: "Music API",
								data: data,
							});
						});
				}
			});
		});
	} else {
		fetch(
			"http://localhost:3000/api/artists/e4250cc67e9ea027f647d026bfaaa69b60855d54fb2340dca66e36bdf137cba7"
		)
			.then((response) => response.json())
			.then((data) => {
				return res.render("pages/index", {
					title: "Music API",
					data: data,
				});
			});
	}
});

router.post("/", async (req: Request, res: Response) => {
	const { user } = req.cookies;
	const search = req.body.search;
	const by = req.body.by;
	let logged = false;

	if (user) {
		await pool.getConnection().then((conn) => {
			conn.query(
				"SELECT COUNT(*) AS count, token FROM user WHERE uuid = ?",
				[user]
			).then((rows: any) => {
				if (rows[0].count == 1) {
					logged = true;
				}
			});
		});
	}

	if (search == "" || search == null) {
		fetch(
			"http://localhost:3000/api/artists/e4250cc67e9ea027f647d026bfaaa69b60855d54fb2340dca66e36bdf137cba7"
		)
			.then((response) => response.json())
			.then((data) => {
				res.render("pages/index", {
					title: "Music API",
					data: data,
				});
			});
	} else {
		if (by == "By group name") {
			fetch(
				`http://localhost:3000/api/artists/name/${search}/e4250cc67e9ea027f647d026bfaaa69b60855d54fb2340dca66e36bdf137cba7`
			)
				.then((response) => response.json())
				.then((data) => {
					return res.render("pages/index", {
						title: "Music API",
						logged: logged,
						data: data,
					});
				});
		} else if (by == "By member name") {
			fetch(
				`http://localhost:3000/api/artists/member/${search}/start/e4250cc67e9ea027f647d026bfaaa69b60855d54fb2340dca66e36bdf137cba7`
			)
				.then((response) => response.json())
				.then((data) => {
					return res.render("pages/index", {
						title: "Music API",
						logged: logged,
						data: data,
					});
				});
		} else if (by == "By creation date") {
			fetch(
				`http://localhost:3000/api/artists/creation/${search}/e4250cc67e9ea027f647d026bfaaa69b60855d54fb2340dca66e36bdf137cba7`
			)
				.then((response) => response.json())
				.then((data) => {
					return res.render("pages/index", {
						title: "Music API",
						logged: logged,
						data: data,
					});
				});
		} else {
			return res.render("pages/index", {
				title: "Music API",
				logged: logged,
				data: null,
			});
		}
	}
});

router.get("/login", (req: Request, res: Response) => {
	if (req.cookies.token) return res.redirect("/");

	return res.render("pages/login", {
		title: "Login",
	});
});

router.post("/login", (req: Request, res: Response) => {
	if (req.cookies.token) return res.redirect("/");

	const { email, password } = req.body;

	if (!email || !password || email.trim() == "" || password.trim() == "") {
		return res.render("pages/login", {
			title: "Login",
			error: "Please fill in all fields",
		});
	}

	pool.getConnection().then((conn) => {
		conn.query("SELECT uuid, password FROM user WHERE email = ?", [
			email,
		]).then((rows: any) => {
			if (rows.length == 0) {
				return res.render("pages/login", {
					title: "Login",
					error: "Any account with this email",
				});
			}

			bcrypt.compare(password, rows[0].password, (err, result) => {
				if (err) {
					return res.render("pages/login", {
						title: "Login",
						error: "Something went wrong",
					});
				}

				if (result) {
					res.cookie("user", rows[0].uuid, {
						maxAge: 1000 * 60 * 60 * 24 * 7,
						httpOnly: true,
					});
					res.redirect("/");
				} else {
					return res.render("pages/login", {
						title: "Login",
						error: "Wrong password",
					});
				}
			});
		});
	});
});

router.get("/register", (req: Request, res: Response) => {
	if (req.cookies.token) return res.redirect("/");

	return res.render("pages/register", {
		title: "Register",
	});
});

router.post("/register", (req: Request, res: Response) => {
	if (req.cookies.user) return res.redirect("/");

	const { email, password, conf_password } = req.body;

	if (
		!email ||
		!password ||
		!conf_password ||
		email.trim() == "" ||
		password.trim() == "" ||
		conf_password.trim() == ""
	) {
		return res.render("pages/register", {
			title: "Register",
			error: "Please fill in all fields",
		});
	}

	if (password != conf_password) {
		return res.render("pages/register", {
			title: "Register",
			error: "Passwords do not match",
		});
	}

	pool.getConnection()
		.then((conn) => {
			conn.query("SELECT * FROM user WHERE email = ?", [email])
				.then((rows: any) => {
					if (rows.length > 0) {
						return res.render("pages/register", {
							title: "Register",
							error: "Username or email already exists",
						});
					} else {
						const uid = uuid();
						const hashedPassword = bcrypt.hashSync(password, 10);
						let token = randomBytes(32).toString("hex");
						conn.query(
							"INSERT INTO user (uuid, email, password, token) VALUES (?, ?, ?, ?)",
							[uid, email, hashedPassword, token]
						).then(() => {
							res.cookie("user", uid, {
								maxAge: 1000 * 60 * 60 * 24 * 7,
								httpOnly: true,
							});

							return res.redirect("/");
						});
					}
				})
				.catch((err) => {
					console.error(err);

					return res.render("pages/register", {
						title: "Register",
						error: "Something went wrong",
					});
				});
		})
		.catch((err) => {
			console.error(err);

			return res.render("pages/register", {
				title: "Register",
				error: "Something went wrong",
			});
		});
});

router.get("/logout", (_: Request, res: Response) => {
	res.clearCookie("user");
	res.redirect("/");
});

export default router;
