"use strict";
document.querySelectorAll(".list > .button").forEach((button) => {
    button.addEventListener("click", () => {
        const list = button.nextElementSibling;
        if (button.classList.contains("active") &&
            (list === null || list === void 0 ? void 0 : list.classList.contains("active"))) {
            button.classList.remove("active");
            list === null || list === void 0 ? void 0 : list.classList.remove("active");
        }
        else {
            button.classList.add("active");
            list === null || list === void 0 ? void 0 : list.classList.add("active");
        }
    });
});
function toggleSubmenu(element) {
    var _a, _b;
    const list = (_b = (_a = element.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.nextElementSibling;
    if (element.classList.contains("active")) {
        element.classList.remove("active");
        list === null || list === void 0 ? void 0 : list.classList.remove("active");
    }
    else {
        element.classList.add("active");
        list === null || list === void 0 ? void 0 : list.classList.add("active");
    }
}
//# sourceMappingURL=docs.js.map