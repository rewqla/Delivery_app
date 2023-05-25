console.log(232332)
document.addEventListener('DOMContentLoaded', () => {
    let storage = JSON.parse(localStorage.getItem('cart'));
    let totalPrice = 0;
    console.log(storage)

    if (storage != null && (Array.isArray(storage) && storage.length !== 0)) {
        document.getElementById("empty-cart").classList.add("d-none");
        document.getElementById("cart").classList.remove("d-none");

        const cartItemsContainer = document.querySelector('.cart-items');
        storage.forEach((product, index) => {
            totalPrice += product.price;
            const card = `
                    <div class="card" style="margin: 2px 0;">
                        <div class="row align-items-center p-1">
                            <div class="col-md-3">
                                <img src="${product.image}" alt="${product.name}" class="img-fluid">
                            </div>
                            <div class="col-md-3">
                                <h5 name="name">${product.name}</h5>
                                <p>Ціна: <span name="price">${product.price}</span> ₴</p>
                            </div>
                            <div class="col-md-3">
                                <div class="input-group">
                                    <input type="number" class="form-control form-control-sm" value="1" min="1" max="10">
                                </div>
                            </div>
                            <div class="col-md-3">
                                <button class="btn btn-danger btn-sm delete-btn">Видалити</button>
                            </div>
                        </div>
                    </div>
                 `;
            cartItemsContainer.innerHTML += card;
        });
        document.getElementById("total-price").innerText = totalPrice;

        const deleteButtons = document.querySelectorAll('.delete-btn');
        deleteButtons.forEach(function (button) {
            button.addEventListener('click', () => {
                const cards = document.querySelectorAll('.card')
                const card = button.closest('.card');
                const index = Array.from(cards).indexOf(card);
                storage.splice(index, 1);
                localStorage.setItem('cart', JSON.stringify(storage));
                card.remove();
                console.log(storage)
                if (storage == null || (Array.isArray(storage) && storage.length === 0)) {
                    document.getElementById("empty-cart").classList.remove("d-none");
                    document.getElementById("cart").classList.add("d-none");
                }
            });
        })

        document.getElementById("clear-all").addEventListener("click", () => {
            localStorage.clear();
            document.getElementById("empty-cart").classList.remove("d-none");
            document.getElementById("cart").classList.add("d-none");
        });

        const CalculateTotalPrice = () => {
            const cards = document.querySelectorAll('.card');
            totalPrice = 0;

            cards.forEach((card) => {
                const price = card.querySelector("span[name='price']").innerText;
                const count = card.querySelector("input[type='number']").value;
                totalPrice += price * count;
            });

            document.getElementById("total-price").innerText = totalPrice;
        };

        const numberInputs = document.querySelectorAll('input[type="number"]');
        numberInputs.forEach((input) => {
            input.addEventListener('input', CalculateTotalPrice);
        });

    }
    else {
        document.getElementById("empty-cart").classList.remove("d-none");
        document.getElementById("cart").classList.add("d-none");
    }
});