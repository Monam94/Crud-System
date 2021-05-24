var ProductName = document.getElementById("ProductName");
var ProductCategory = document.getElementById("ProductCategory");
var ProductPrice = document.getElementById("ProductPrice");
var ProductDescription = document.getElementById("ProductDescription");
var tbody = document.getElementById("tbody");
var addBtn = document.getElementById("addBtn");


var productList;

if (localStorage.getItem("allProducts") == null) {
  productList = [];
} else {
  productList = JSON.parse(localStorage.getItem("allProducts")); //convert string to json "array of objects"
  displayProducts();
}

localStorage.setItem("data", "web design and development");

function addProduct() {
  if (
    validateProductName() &&
    ProductCategory.value != "" &&
    ProductPrice.value != "" &&
    ProductDescription.value != ""
  ) {
    var product = {
      name: ProductName.value,
      category: ProductCategory.value,
      price: ProductCategory.value,
      desc: ProductDescription.value,
    };

    console.log(product);
    productList.push(product);

    localStorage.setItem("allProducts", JSON.stringify(productList));

    console.log(productList);
    displayProducts();
    clearForm();
    document.getElementById("lastAlert").classList.add("d-none");
    document.getElementById("lastAlert").classList.remove("d-block");
   
  } else {
    
    document.getElementById("lastAlert").classList.remove("d-none");
    document.getElementById("lastAlert").classList.add("d-block");
  
  }
}

function displayProducts() {
  var fady = "";

  for (var i = 0; i < productList.length; i++) {
    fady +=
      "<tr><td>" +
      i +
      "</td> <td>" +
      productList[i].name +
      "</td> <td>" +
      productList[i].category +
      "</td> <td>" +
      productList[i].price +
      "</td> <td>" +
      productList[i].desc +
      "</td> <td><button onclick='deleteProduct(" +
      i +
      ")' class='btn btn-dark'><i class='fas fa-trash-alt'></i></button></td><td><button  onclick=' updateProduct(" +
      i +
      ")' class='btn btn-info'><i class='fas fa-user-edit'></i></button></td></tr>";
  }

  tbody.innerHTML = fady;
}

function clearForm() {
  ProductName.value = "";
  ProductCategory.value = "";
  ProductPrice.value = "";
  ProductDescription.value = "";
}

function search(word) {
  var fady = "";
  for (var i = 0; i < productList.length; i++) {
    if (productList[i].name.toLowerCase().includes(word.toLowerCase())) {
      fady +=
        "<tr><td>" +
        i +
        "</td> <td>" +
        productList[i].name.replace(
          word,
          `<span style='background-color:red'>` + word + `</span>`
        ) +
        "</td> <td>" +
        productList[i].category +
        "</td> <td>" +
        productList[i].price +
        "</td> <td>" +
        productList[i].desc +
        "</td> <td><button onclick='deleteProduct(" +
        i +
        ")' class='btn btn-dark'><i class='fas fa-trash-alt'></i></button></td><td><button  onclick='updateProduct(" +
        i +
        ")' class='btn btn-info'><i class='fas fa-user-edit'></i></button></td></tr>";
    }
  }

  tbody.innerHTML = fady;
}



function deleteProduct(index) {
  productList.splice(index, 1);

  localStorage.setItem("allProducts", JSON.stringify(productList)); 

  displayProducts(); 
}

var updatedIndex = 0;

var updateBtn = document.getElementById("updateBtn");
updateBtn.style.display = "none";

function retriveData(index) {
  updatedIndex = index;
  ProductName.value = productList[index].name;
  ProductCategory.value = productList[index].category;
  ProductPrice.value = productList[index].price;
  ProductDescription.value = productList[index].desc;
  addBtn.style.display = "none";
  updateBtn.style.display = "block";
}

function updateProduct() {
  productList[updatedIndex].name = ProductName.value;
  productList[updatedIndex].price = ProductPrice.value;
  productList[updatedIndex].category = ProductCategory.value;
  productList[updatedIndex].desc = ProductDescription.value;

  localStorage.setItem("allProducts", JSON.stringify(productList)); 

  displayProducts();
  clearForm();

  addBtn.style.display = "block";
  updateBtn.style.display = "none";
}

function validateProductName() {
  var regexPname = /^[A-Z][a-z A-Z]{3,}/; 

  if (regexPname.test(ProductName.value) == true) {
    ProductName.classList.add("is-valid");
    ProductName.classList.remove("is-invalid");
    document.querySelector(".alert").classList.add("d-none");
    document.querySelector(".alert").classList.remove("d-block");
    addBtn.removeAttribute("disabled");

    return true;
  } else {
    ProductName.classList.add("is-invalid");
    ProductName.classList.remove("is-valid");
    document.querySelector(".alert").classList.remove("d-none");
    document.querySelector(".alert").classList.add("d-block");
    addBtn.disabled = true;
    addBtn.setAttribute("disabled", "true");

    return false;
  }
}




ProductName.addEventListener("keyup", validateProductName);


function updateProduct(index) {
  ProductName.value = productList[index].name;
  ProductCategory.value = productList[index].category;
  ProductPrice.value = productList[index].price;
  ProductDescription.value = productList[index].desc;

  addBtn.innerHTML = "update product";

  addBtn.addEventListener("click", function () {
    productList[index].name = ProductName.value;
    productList[index].price = ProductPrice.value;
    productList[index].category = ProductCategory.value;
    productList[index].desc = ProductDescription.value;

    localStorage.setItem("allProducts", JSON.stringify(productList)); 

    displayProducts();
    clearForm();
    addBtn.innerHTML = "add product";
  });
}

















