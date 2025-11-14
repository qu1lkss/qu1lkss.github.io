const modal = document.getElementById("modal");
const openBtn = document.getElementById("openForm");
const closeBtn = document.getElementById("closeForm");
const form = document.getElementById("contactForm");

const ENDPOINT = "https://formcarry.com/s/tHO8EjUKU6g";

openBtn.onclick = () => {
    modal.classList.add("active");
};

closeBtn.onclick = () => {
    modal.classList.remove("active");
};

modal.onclick = (e) => {
    if (e.target === modal) modal.classList.remove("active");
};

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!form.checkValidity()) {
        alert("Заполните все обязательные поля.");
        return;
    }

    const payload = {
        fullName: document.getElementById("fullName").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        org: document.getElementById("org").value,
        message: document.getElementById("message").value,
        consent: document.getElementById("consent").checked ? "yes" : "no"
    };

    try {
        const res = await fetch(ENDPOINT, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(payload)
        });

        const data = await res.json().catch(() => null);

        if (res.ok && data && data.code === 200) {
            alert("Сообщение успешно отправлено!");
            form.reset();
            modal.classList.remove("active");
        } else {
            alert("Ошибка при отправке формы.");
        }
    } catch (err) {
        alert("Ошибка сети.");
    }
});