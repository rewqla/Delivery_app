let storage = JSON.parse(localStorage.getItem('cart'));
let totalPrice = 0;
console.log(storage)

if (storage != null && (Array.isArray(storage) && storage.length !== 0)) {
    document.getElementById("empty-cart").classList.add("d-none");
    document.getElementById("cart").classList.remove("d-none");

    const cartItemsContainer = document.querySelector('.cart-items');
    const orderItems = [];

    for (let i = 0; i < storage.length; i++) {
        totalPrice += storage[i].price;
        const card = `
                        <div class="card" style="margin: 2px 0;">
                            <div class="row align-items-center p-1">
                                <div class="col-md-3">
                                    <img src="${storage[i].image}" alt="${storage[i].name}" class="img-fluid">
                                </div>
                                <div class="col-md-3">
                                    <h5 name="name">${storage[i].name}</h5>
                                    <p>Ціна: <span name="price">${storage[i].price}</span> ₴</p>
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

        const orderItem = {
            Quantity: 1,
            Price: storage[i].price,
            ProductName: storage[i].name,
            ProductImage: storage[i].image
        };
        orderItems.push(orderItem);
    }
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


    function ValidateInput(Id, expression_result, error_message, isValid) {
        const errorSpan = document.querySelector(`span[for=${Id}]`);
        if (expression_result) {
            errorSpan.innerText = error_message;
            return false;
        }

        errorSpan.innerText = "";
        return isValid;
    }

    function CheckEmptyInputs() {
        const inputs = Array.from(document.querySelectorAll("form input"));
        inputs.splice(4, inputs.length - 4);
        let isValid = true;

        inputs.forEach(element => {
            isValid = ValidateInput(element.id, (element.value.trim() === ''), "Поле не може бути порожнім", isValid)
        });

        return isValid;
    }

    function ValidateData() {
        const data = GetUserData();
        let isValid = true;

        const regexUkrainian = /^[А-ЩЬЮЯЄІЇҐа-щьюяєіїґ]+$/;
        isValid = ValidateInput("UserName", !regexUkrainian.test(data.userName.trim()),
            "Дані замовника мають містити лише українські букви", isValid);

        const regexPhone = new RegExp("^([+]?(38))?(0[0-9]{9})$");
        isValid = ValidateInput("Phone", !regexPhone.test(data.phone),
            "Не правильний формат телефону", true);

        const regexEmail = /\S+@\S+\.\S+/;
        isValid = ValidateInput("Email", !regexEmail.test(data.email),
            "Не правильний формат пошти", true);

        return isValid;
    }

    function GetUserData() {
        return {
            userName: document.getElementById("UserName").value,
            phone: document.getElementById("Phone").value,
            email: document.getElementById("Email").value,
            address: document.getElementById("Address").value
        }
    }
    document.querySelector('form').addEventListener('submit', (e) => {
        e.preventDefault();
        const form = e.target;
        const userData = GetUserData();

        if (CheckEmptyInputs() && ValidateData()) {
            const orderViewModel = {
                UserName: userData.userName,
                Phone: userData.phone,
                Email: userData.email,
                Address: userData.address,
                TotalPrice: totalPrice,
                OrderItems: orderItems
            };

            form.querySelectorAll('input[type="number"]').forEach((input, index) => {
                orderViewModel.OrderItems[index].Quantity = input.value;
            });

            fetch('home/CreateOrder', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(orderViewModel)
            }).then(response => {
                window.location.href = "/success";
                localStorage.clear();
            });
        }
    });
}
else {
    document.getElementById("empty-cart").classList.remove("d-none");
    document.getElementById("cart").classList.add("d-none");
}
