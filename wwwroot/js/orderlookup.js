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
    let isValid = true;

    inputs.forEach(element => {
        isValid = ValidateInput(element.id, (element.value.trim() === ''), "Поле не може бути порожнім", isValid)
    });
    console.log(isValid)
    return isValid;
}

function ValidateData(phone, email) {
    let isValid = true;

    const regexPhone = new RegExp("^([+]?(38))?(0[0-9]{9})$");
    isValid = ValidateInput("phone", !regexPhone.test(phone),
        "Не правильний формат телефону", isValid);
    const regexEmail = /\S+@\S+\.\S+/;
    isValid = ValidateInput("email", !regexEmail.test(email),
        "Не правильний формат пошти", isValid);
    console.log(isValid)

    return isValid;
}

document.getElementById("orderLookupForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;

    const ordersResult = document.getElementById("orders-result");
    const noOrders = document.getElementById("no-orders");
    ordersResult.classList.add("d-none");
    ordersResult.innerHTML=""
    noOrders.classList.add("d-none");

    if (CheckEmptyInputs() && ValidateData(phone, email)) {
        fetch('home/OrderLookUp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'Phone': phone,
                'Email': email
            })
        }).then(response => {
            return response.json();
        }).then(data => {
            console.log(data);
            if (data != null) {
                document.getElementById("orders-result").classList.remove("d-none");

                data.forEach(order => {
                    console.log(order);

                    let orders = "";

                    order.orderItems.forEach(item => {
                        orders +=
                            ` <div class="col-md-4">
                                  <div class="order-card">
                                      <div class="row">
                                          <div class="col-md-4">
                                              <img src="${item.productImage}"class="product-image">
                                          </div>
                                          <div class="col-md-8">
                                              <div style="margin-left:5px">
                                                  <h4>${item.productName}</h4>
                                                  <p>Ціна: <span>${item.quantity * item.price}</span>₴</p>
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              </div>`;
                    });

                    let colClass;
                    if (order.orderItems.length === 1) {
                        colClass = "col-md-8";
                    } else if (order.orderItems.length === 2) {
                        colClass = "col-md-4";
                    } else {
                        colClass = "col-md-12";
                    }
                    orders += `     
                        <div class="${colClass} d-flex align-items-center justify-content-end">
                            <div>
                                <h4>Адресса: <span id="address">${order.address}</span ></h4 >
                                <h4>Загальна ціна: <span id="total-price">${order.totalPrice}</span>₴</h4>
                            </div>
                        </div>`;
                    console.log(orders);

                    ordersResult.innerHTML += `
                         <div id="order-list">
                            <div class="row" style="border:1px solid #ddd; padding-top:10px">
                                ${orders}
                            </div>
                         </div>`;
                });
            }
            else {
                noOrders.classList.remove("d-none");
            }
        })
    }
});
