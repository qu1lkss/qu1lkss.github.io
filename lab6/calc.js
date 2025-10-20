(function () {
    'use strict';
    
    const dataObject = {
        // Базовые цены за единицу для 3 типов услуги
        prodTypes: [1200, 2200, 1800],
        // Опции (только для типа 2). Коэффициенты умножаются на базовую цену.
        prodOptions: [
            { value: 'opt_basic', title: 'Стандарт', k: 1.00 },
            { value: 'opt_priority', title: 'Приоритет', k: 1.10 },
            { value: 'opt_premium', title: 'Премиум', k: 1.25 }
        ],
        // Свойства (только для типа 3)
        prodProperties: { fast: 1.20 }
    };
    
    const dataJSON = JSON.stringify(dataObject);
    /** @type {{prodTypes:number[], prodOptions:Array<{value:string,title:string,k:number}>, prodProperties:{fast:number}}} */
    const prices = JSON.parse(dataJSON);
    
    const qtyInput = document.getElementById('qty');
    const typeRadios = /** @type {NodeListOf<HTMLInputElement>} */ (document.querySelectorAll('input[name="serviceType"]'));
    const optionWrap = document.getElementById('option-wrap');
    const optionSelect = document.getElementById('option-select');
    const propWrap = document.getElementById('prop-wrap');
    const propFast = document.getElementById('prop-fast');
    const totalEl = document.getElementById('total');
    
    function renderOptions() {
        optionSelect.innerHTML = prices.prodOptions
            .map(function (opt) {
                return '<option value="' + opt.value + '">' + opt.title + '</option>';
            })
            .join('');
    }

    // Текущий выбранный тип
    function getSelectedType() {
        let t = 1;
        Array.prototype.forEach.call(typeRadios, function (r) {
            if (r.checked) { t = Number(r.value); }
        });
        return t;
    }

    // Показ/скрытие селекта и чекбокса
    function updateVisibility() {
        const t = getSelectedType();
        if (t === 1) {
            optionWrap.style.display = 'none';
            propWrap.style.display = 'none';
        } else if (t === 2) {
            optionWrap.style.display = 'block';
            propWrap.style.display = 'none';
        } else {
            optionWrap.style.display = 'none';
            propWrap.style.display = 'block';
        }
    }

    // Пересчёт стоимости
    function recalc() {
        const t = getSelectedType();
        let qty = parseInt(qtyInput.value, 10);
        if (isNaN(qty) || qty < 1) { qty = 1; }

        let pricePerUnit = prices.prodTypes[t - 1];

        if (t === 2 && optionSelect.value) {
            prices.prodOptions.forEach(function (opt) {
                if (opt.value === optionSelect.value) {
                    pricePerUnit *= opt.k;
                }
            });
        }

        if (t === 3 && propFast.checked) {
            pricePerUnit *= prices.prodProperties.fast;
        }

        const total = Math.round(pricePerUnit * qty);
        totalEl.textContent = total.toLocaleString('ru-RU') + ' ₽';
    }
    
    function bindEvents() {
        qtyInput.addEventListener('input', recalc);
        Array.prototype.forEach.call(typeRadios, function (r) {
            r.addEventListener('change', function () {
                updateVisibility();
                recalc();
            });
        });
        optionSelect.addEventListener('change', recalc);
        propFast.addEventListener('change', recalc);
    }

    // Инициализация
    window.addEventListener('DOMContentLoaded', function () {
        renderOptions();
        bindEvents();
        updateVisibility();
        recalc();
    });
}());