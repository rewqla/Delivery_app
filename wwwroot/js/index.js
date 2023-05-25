const addToCartButtons = document.querySelectorAll('.addToCartBtn');
console.log(2)
let storage = JSON.parse(localStorage.getItem('cart'));
if (!storage) {
    storage = [];
}

addToCartButtons.forEach((button) => {
    console.log(1)

    const card = button.parentNode.parentNode;
    const productName = card.querySelector('.card-title').innerText;
    const productPrice = card.querySelector('.card-text').innerText.split(" ")[0];
    const productImage = card.querySelector('.card-img-top').getAttribute('src');

    if (storage.find(product => product.name == productName)) {
        card.querySelector('.btn-success').classList.remove("d-none");
        card.querySelector('.btn-primary').classList.add("d-none");
        console.log(productName)
    }
    else {
        button.addEventListener('click', (e) => {
            const selectedProduct = {
                name: productName,
                price: +productPrice,
                image: productImage
            };

            storage.push(selectedProduct);
            localStorage.setItem('cart', JSON.stringify(storage));

            card.querySelector('.btn-success').classList.remove("d-none");
            card.querySelector('.btn-primary').classList.add("d-none");
        });
    }
});