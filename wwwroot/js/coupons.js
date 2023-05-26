function generateCouponCode() {
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';

    for (let i = 0; i < 15; i++) {
        let randomIndex = Math.floor(Math.random() * characters.length);
        code += characters.charAt(randomIndex);
    }

    return code;
}

let coupons = [
    { name: 'Шалені знижки', discount: 10, code: generateCouponCode() },
    { name: 'Не будь голодним', discount: 5, code: generateCouponCode() },
    { name: 'FASTER', discount: 7, code: "FASTER" },
    { name: 'Ексклюзивна пропозиція', discount: 15, code: generateCouponCode() },
    { name: 'Це чи це?', discount: 5, code: generateCouponCode() },
];
localStorage.setItem('coupons', JSON.stringify(coupons));

const couponsContainer = document.getElementById("coupons-container");
const availableLength = coupons.length;
let couponsCards = "";

for (let i = 0; i < 3 - (5 - availableLength); i++) {
    let randomIndex = Math.floor(Math.random() * coupons.length);
    couponsCards += `<div class="col-md-4">
            <div class="card mb-4">
                <img src="https://images.prom.ua/1628752028_w640_h640_kak-ispolzovat-promokod.jpg" class="card-img-top" alt="Coupon 1">
                <div class="card-body text-center">
                    <h5 class="card-title">${coupons[randomIndex].name}</h5>
                    <p class="card-text">Знижка на ${coupons[randomIndex].discount}%</p>
                    <div class="text-right">
                        <button class="btn btn-primary mr-auto" data-code="${coupons[randomIndex].code}">Отримати</button>
                    </div>
                </div>
            </div>
        </div>`;
    coupons.splice(randomIndex, 1);
}

couponsContainer.innerHTML =
    `<div class="row">
        ${couponsCards}
    </div>`;

const copyButtons = couponsContainer.querySelectorAll("button");
copyButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
        navigator.clipboard.writeText(e.target.dataset.code)
        button.innerText = "Скопійовано";
        button.classList.remove("btn-primary");
        button.classList.add("btn-success");
    });
});