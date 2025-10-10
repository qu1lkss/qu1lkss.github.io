/*jslint browser, for, this*/
/*global window, document*/
document.addEventListener("DOMContentLoaded", function () {
    "use strict";
    const qtyInput = document.getElementById("qty");
    const productSelect = document.getElementById("product");
    const calcButton = document.getElementById("calc");
    const errorDiv = document.getElementById("error");
    const resultDiv = document.getElementById("result");

    function onCalcClick(ev) {
        ev.preventDefault();
        errorDiv.textContent = "";
        resultDiv.textContent = "";

        const qtyStr = qtyInput.value.trim();
        const m = qtyStr.match(/^\d+$/);

        if (m === null) {
            errorDiv.textContent = "Введите целое неотрицательное число.";
            return;
        }

        const opt = productSelect.options[productSelect.selectedIndex];
        const priceStr = opt.getAttribute("data-price");

        const qty = parseInt(qtyStr, 10);
        const price = parseInt(priceStr, 10);
        const total = price * qty;

        resultDiv.textContent = "Итого: " + total + " ₽";
    }

    calcButton.addEventListener("click", onCalcClick);
});