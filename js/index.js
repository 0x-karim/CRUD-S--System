var productNameInput = document.getElementById('productName');
var productPriceInput = document.getElementById('productPrice');
var productCategoryInput = document.getElementById('productCategory');
var productDescInput = document.getElementById('productDesc');
var productImageInput = document.getElementById('productImage');

var rowData = document.getElementById('rowData');
var SearchTerm = document.getElementById('SearchTerm');
var addButton = document.getElementById('addButton');
var updateButton = document.getElementById('updateButton');
var validateForm = document.getElementById('validateForm');

var productList ;

if ( localStorage.getItem('productList') != null ) {

    productList = JSON.parse(localStorage.getItem('productList'));
    displayProducts(productList)

} else {
    productList = [];
}

function addProduct() {

    var product = {
        image: `Image/Products/${productImageInput.files[0]?.name}`,
        name: productNameInput.value,
        price: productPriceInput.value,
        category: productCategoryInput.value,
        Desc: productDescInput.value
    }

    if (productNameInput.classList.contains('is-valid') &&
        productPriceInput.classList.contains('is-valid') &&
        productCategoryInput.classList.contains('is-valid') &&
        productDescInput.classList.contains('is-valid')) {
        
            productList.push(product);
            localStorage.setItem('productList' , JSON.stringify(productList));
        
        
            clearForm();
            displayProducts(productList); 
    }else {

        validateForm.classList.remove('d-none');
    }
}

function clearForm() {
    
    productNameInput.value = '';
    productNameInput.classList.remove('is-valid' , 'bg-success-subtle');
    productPriceInput.value = '';
    productPriceInput.classList.remove('is-valid' , 'bg-success-subtle');
    productCategoryInput.value = '';
    productCategoryInput.classList.remove('is-valid' , 'bg-success-subtle');
    productDescInput.value = '';
    productDescInput.classList.remove('is-valid' , 'bg-success-subtle');
    productImageInput.value = '';
}

function displayProducts(list) {
    
    var box = ``;

    if (list.length == 0) {
        box = ` <div class="col-12 my-5 py-5">
                    <p class="fst-italic fw-semibold fs-1 text-secondary text-center">Thier is no Prouducts</p>
                </div> `;
    } else {
        for (var i = 0 ; i < list.length ; i++){
        
            box += `<div class="col-lg-3 col-sm-6">
                        <div class="card">
                            <img src="${list[i].image}" class="card-img-top" alt="Cam">
                            <div class="card-body text-center">
                                <h2 class="h3 text-dark">${list[i].name}</h2>
                                <p class="text-secondary">${list[i].Desc}</p>
                                <h3 class="h5">Category : <span>${list[i].category}</span></h3>
                                <h3 class="h5">Price : <span>${list[i].price}</span></h3>
    
                                <button onclick="deleteProduct(${i})" class="btn btn-danger w-100 second-font fw-semibold fs-5 mt-3">Delete</button>
                                <a href="#home"><button onclick="setUpdateForm(${i})" class="btn btn-warning w-100 second-font fw-semibold fs-5 mt-2">Update</button></a>
                            </div>
                        </div>
                    </div>`
        }    
    }

    rowData.innerHTML = box;
}

function deleteProduct(index) {
    
    if (index !== currentIndex) {
    
        productList.splice(index , 1);
        localStorage.setItem('productList' , JSON.stringify(productList));

        displayProducts(productList);
    }
}

function search() {
    
    var searchResults = []; 

    for (var i = 0; i < productList.length; i++) {

        if (productList[i].name.toLowerCase().includes(SearchTerm.value.toLowerCase()) == true) {
        
            searchResults.push(productList[i]);
        }
    }
    displayProducts(searchResults);
}

var currentIndex ;

function setUpdateForm(proIndex) {

    addButton.classList.add('d-none');
    updateButton.classList.remove('d-none');

    currentIndex = proIndex;
    productNameInput.value = productList[proIndex].name;
    productPriceInput.value = productList[proIndex].price;
    productCategoryInput.value = productList[proIndex].category;
    productDescInput.value = productList[proIndex].Desc;
}

function updateProduct() {
    
    var product = {
        image: `Image/Products/${productImageInput.files[0]?.name}`,
        name: productNameInput.value,
        price: productPriceInput.value,
        category: productCategoryInput.value,
        Desc: productDescInput.value
    }

    productList.splice(currentIndex, 1, product);
    localStorage.setItem('productList' , JSON.stringify(productList));

    displayProducts(productList);
    clearForm();

    updateButton.classList.add('d-none');
    addButton.classList.remove('d-none');
}

function validateInputs(element) {

    var regex = {
        productName: /^[A-Z]\w{3,10}\s?(\w|^\w|\s){0,50}$/,
        productPrice: /^[1-9][0-9][0-9][0-9][0-9]?|(100000)$/,
        productCategory: /^(Mobile|Tv|Tap|Laptop|Camera)$/,
        productDesc: /^(.+\s){5,20}$/
    }

    if (regex[element.id].test(element.value)){

        element.classList.add('is-valid' , 'bg-success-subtle');
        element.classList.remove('is-invalid' , 'bg-danger-subtle');
        element.nextElementSibling.classList.add('d-none');

    }else if (element.value == '') {

        element.nextElementSibling.classList.add('d-none');
    }
    else {
        
        element.classList.remove('is-valid' , 'bg-success-subtle');
        element.classList.add('is-invalid' , 'bg-danger-subtle');
        element.nextElementSibling.classList.remove('d-none');
    }
}
