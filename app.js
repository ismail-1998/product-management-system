// global variabls
const name = document.getElementById("name");
const price = document.getElementById("price");
const taxes = document.getElementById("taxes");
const ads = document.getElementById("ads");
const discount = document.getElementById("discount");
const total = document.getElementById("total");
const count = document.getElementById("count");
const category = document.getElementById("category");
const create = document.getElementById("create");
const deleteAllBtn = document.getElementById("delete-all-btn");
const search = document.getElementById("search");
const tbody = document.getElementById("tbody");

let productsList;
let appMood = "create";
let productIndex;
let searchMood = "name";

if (localStorage.products) {
  productsList = JSON.parse(localStorage.products);
} else {
  productsList = [];
}

// calculate product's total price
function calcTotal() {
  if (price.value) {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.backgroundColor = "green";
  } else {
    total.innerHTML = "";
    total.style.backgroundColor = "red";
  }
}

// create new Product
create.onclick = function () {
  let newProduct = {
    name: name.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };

  if (name.value && price.value && newProduct.count <= 100) {
    if (appMood === "create") {
      if (newProduct.count > 1) {
        for (let i = 0; i < newProduct.count; i++) {
          productsList.push(newProduct);
        }
      } else {
        productsList.push(newProduct);
      }
    } else {
      productsList[productIndex] = newProduct;
      count.style.display = "block";
      create.innerHTML = "إنشاء";
    }
    clearInputs();
  }

  localStorage.setItem("products", JSON.stringify(productsList));

  showData();
  calcTotal();
};

// clear inputs
function clearInputs() {
  name.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}

// showData
function showData() {
  let table = "";
  for (let i = 0; i < productsList.length; i++) {
    table += `
            <tr>
                <td>${i + 1}</td>
                <td>${productsList[i].name}</td>
                <td>${productsList[i].price}</td>
                <td>${productsList[i].taxes}</td>
                <td>${productsList[i].ads}</td>
                <td>${productsList[i].discount}</td>
                <td>${productsList[i].total}</td>
                <td>${productsList[i].count}</td>
                <td>${productsList[i].category}</td>
                <td><button onclick="updateProduct(${i})" id="update">تعديل</button></td>
                <td><button onclick="deleteProduct(${i})" id="delete">حذف</button></td>
            </tr>
        `;
  }

  tbody.innerHTML = table;

  if (productsList.length > 0) {
    deleteAllBtn.innerHTML = `
        <button onclick="deleteAllProducts()" >حذف جميع المنتجات (${productsList.length})</button>
    `;
  } else {
    deleteAllBtn.innerHTML = "";
  }
}

// delete one Product
function deleteProduct(id) {
  productsList.splice(id, 1);

  // update localStorage
  localStorage.products = JSON.stringify(productsList);

  showData();
}

// delete all Products
function deleteAllProducts() {
  localStorage.clear();
  productsList.splice(0);
  showData();
}

// update product details
function updateProduct(i) {
  name.value = productsList[i].name;
  price.value = productsList[i].price;
  taxes.value = productsList[i].taxes;
  ads.value = productsList[i].ads;
  discount.value = productsList[i].discount;
  calcTotal();
  category.value = productsList[i].category;

  count.style.display = "none";
  create.innerHTML = "تحديث";
  appMood = "update";
  productIndex = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

// search
function getSearchMood(id) {
  if (id === "searchName") {
    searchMood = "name";
    search.placeholder = "بحث بالاسم";
  } else {
    searchMood = "category";
    search.placeholder = "بحث بالتصنيف";
  }
  search.focus();
  search.value = "";
  showData();
}

function searchProducts(value) {
  let table = "";

  for (let i = 0; i < productsList.length; i++) {
    if (searchMood == "name") {
      if (productsList[i].name.includes(value.toLowerCase())) {
        table += `
            <tr>
                <td>${i + 1}</td>
                <td>${productsList[i].name}</td>
                <td>${productsList[i].price}</td>
                <td>${productsList[i].taxes}</td>
                <td>${productsList[i].ads}</td>
                <td>${productsList[i].discount}</td>
                <td>${productsList[i].total}</td>
                <td>${productsList[i].count}</td>
                <td>${productsList[i].category}</td>
                <td><button onclick="updateProduct(${i})" id="update">تعديل</button></td>
                <td><button onclick="deleteProduct(${i})" id="delete">حذف</button></td>
            </tr>
        `;
      }
    } else {
      if (productsList[i].category.includes(value.toLowerCase())) {
        table += `
            <tr>
                <td>${i + 1}</td>
                <td>${productsList[i].name}</td>
                <td>${productsList[i].price}</td>
                <td>${productsList[i].taxes}</td>
                <td>${productsList[i].ads}</td>
                <td>${productsList[i].discount}</td>
                <td>${productsList[i].total}</td>
                <td>${productsList[i].count}</td>
                <td>${productsList[i].category}</td>
                <td><button onclick="updateProduct(${i})" id="update">تعديل</button></td>
                <td><button onclick="deleteProduct(${i})" id="delete">حذف</button></td>
            </tr>
        `;
      }
    }
  }

  tbody.innerHTML = table;
}

showData();
