document.querySelector(".dropdown")?.addEventListener("click", () => {
	const drop = document.querySelector(".select");

	if (drop) {
		drop.classList.toggle("active");
	}
});

document.querySelectorAll(".select > *").forEach((value) => {
	value.addEventListener("click", () => {
		document.querySelectorAll(".select > *").forEach((v) => {
			value.classList.remove("selected");
		});
		value.classList.add("selected");

		const drop = document.querySelector(".dropdown");

		if (drop) {
			drop.children[0].textContent = value.textContent ?? "";
			(drop.children[1] as HTMLInputElement).value =
				value.textContent ?? "";
		}
	});
});
