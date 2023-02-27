import { Request, Response, Router } from "express";
import mariadb from "mariadb";
const router = Router();

const pool = mariadb.createPool({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_NAME,
	charset: "utf8mb4",
});

router.get("/docs", async (req: Request, res: Response) => {
	let token: string | null = null;

	if (req.cookies.user) {
		await pool.getConnection().then(async (conn) => {
			await conn
				.query("SELECT token FROM user WHERE uuid = ?", [
					req.cookies.user,
				])
				.then((rows: [{ token: string }]) => {
					if (rows.length > 0 && rows[0].token) {
						token = rows[0].token;
					}
				});
		});
	}

	return res.render("docs/index", {
		title: "Music API",
		token: token,
	});
});

export default router;
