const addToCartButtons = document.querySelectorAll('.addToCartBtn');

let storage = JSON.parse(localStorage.getItem('cart'));

let storageShop;
if (!storage) {
    storage = [];
}
else if (Array.isArray(storage) && storage.length !== 0) {
    storageShop = storage[0].shop;
}

var urlParams = new URLSearchParams(window.location.search);
var URLshop = urlParams.get('shopName');
if (URLshop == null)
    URLshop = "Мацурі";

const anchors = document.querySelectorAll('.list-group-item');
anchors.forEach(function (a) {
    if (a.innerText === URLshop)
        a.classList.add('active');
    if (storageShop !== undefined) {
        if (storageShop != URLshop)
            window.location.href = "/?shopName=" + storageShop;
        a.classList.add('disabled');
    }
});

addToCartButtons.forEach((button) => {
    const card = button.parentNode.parentNode;
    const productName = card.querySelector('.card-title').innerText;
    const productPrice = card.querySelector('.card-text').innerText.split(" ")[0];
    const productImage = card.querySelector('.card-img-top').getAttribute('src');

    if (storage.find(product => product.name == productName)) {
        card.querySelector('.btn-success').classList.remove("d-none");
        card.querySelector('.btn-primary').classList.add("d-none");
    }
    else {
        button.addEventListener('click', (e) => {
            const selectedProduct = {
                name: productName,
                price: +productPrice,
                image: productImage,
                shop: URLshop
            };

            storage.push(selectedProduct);
            localStorage.setItem('cart', JSON.stringify(storage));

            card.querySelector('.btn-success').classList.remove("d-none");
            card.querySelector('.btn-primary').classList.add("d-none");

            anchors.forEach(function (a) {
                a.classList.add('disabled');
            });
        });
    }
});

