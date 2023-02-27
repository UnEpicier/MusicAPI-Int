document.querySelectorAll(".list > .button").forEach((button) => {
	button.addEventListener("click", () => {
		const list = button.nextElementSibling;
		if (
			button.classList.contains("active") &&
			list?.classList.contains("active")
		) {
			button.classList.remove("active");
			list?.classList.remove("active");
		} else {
			button.classList.add("active");
			list?.classList.add("active");
		}
	});
});

function toggleSubmenu(element: HTMLButtonElement) {
	const list = element.parentElement?.parentElement?.nextElementSibling;

	if (element.classList.contains("active")) {
		element.classList.remove("active");
		list?.classList.remove("active");
	} else {
		element.classList.add("active");
		list?.classList.add("active");
	}
}
