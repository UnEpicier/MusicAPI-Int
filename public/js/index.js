"use strict";
var _a;
(_a = document.querySelector(".dropdown")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
    const drop = document.querySelector(".select");
    if (drop) {
        drop.classList.toggle("active");
    }
});
document.querySelectorAll(".select > *").forEach((value) => {
    value.addEventListener("click", () => {
        var _a, _b;
        document.querySelectorAll(".select > *").forEach((v) => {
            value.classList.remove("selected");
        });
        value.classList.add("selected");
        const drop = document.querySelector(".dropdown");
        if (drop) {
            drop.children[0].textContent = (_a = value.textContent) !== null && _a !== void 0 ? _a : "";
            drop.children[1].value =
                (_b = value.textContent) !== null && _b !== void 0 ? _b : "";
        }
    });
});
function copyToken(element, token) {
    navigator.clipboard.writeText(token);
    element.innerHTML = `<ion-icon name="checkmark-outline"></ion-icon> Copied!`;
    setTimeout(() => {
        element.innerHTML = `<ion-icon name="clipboard-outline"></ion-icon> Copy token`;
    }, 3000);
}
//# sourceMappingURL=index.js.map