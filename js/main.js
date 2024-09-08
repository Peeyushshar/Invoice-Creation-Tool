import {
  removeError,
  getFieldName,
  showError,
  checkCustomerNameValidate,
  checkMonthValidate,
  checkProductValidate,
  checkQuantityValidate,
  checkPriceValidate,
  checkUniqueProduct,
  validateDynamicPrice, 
  validateDynamicQuantity, validateProducts
} from "./validation.js";

import { getFromLocalStorage, setInLocalStorage } from "./utility.js";


const addInvoice = document.getElementById("addInvoice");
const invoiceForm = document.getElementById("invoiceForm");
const invoiceFormCancel = document.getElementById("invoiceFormCancel");
const submitInvoiceForm = document.getElementById("submitInvoiceForm");
const updateInvoiceForm = document.getElementById("updateInvoiceForm");
const customerName = document.getElementById("customerName");
const saleDate = document.getElementById("date");
const productName = document.getElementById("productName");
const quantity = document.getElementById("quantity");
const price = document.getElementById("price");
const total = document.getElementById("total");
const invoiceDetails = document.getElementById("invoiceDetails");
const invoiceDetailsCancel = document.getElementById("invoiceDetailsCancel");
const products = document.getElementById("products");
const searched = document.getElementById("search");
const dataList = document.querySelector(".data-list");
const dataList1 = document.querySelector(".data-list1");

let isValid = false;
const div = document.querySelector(".task");
let productDynamicvalues = [];

const today = new Date().toISOString().split('T')[0];
document.getElementById("date").setAttribute("max", today);

addInvoice.addEventListener("click", () => {
  updateInvoiceForm.style.display = "none";
  submitInvoiceForm.style.display = "block";
  invoiceForm.style.display = "block";
});

invoiceFormCancel.addEventListener("click", () => {
  resetAllFields();
  invoiceForm.style.display = "none";
});

const removeField = (event) => {
  event.target.parentElement.parentElement.remove();
};


products.addEventListener("click", addDynamicFields);

function addDynamicFields() {

  let isDynamicFields = true;
  isDynamicFields = validateProducts() && isDynamicFields;
  isDynamicFields =validateDynamicQuantity() && isDynamicFields;
  isDynamicFields = validateDynamicPrice() && isDynamicFields;
  isDynamicFields = checkProductValidate(productName) && isDynamicFields;
  isDynamicFields = checkQuantityValidate(quantity) && isDynamicFields;
  isDynamicFields = checkPriceValidate(price) && isDynamicFields;
 
  if(isDynamicFields){
    createNewDynamicField();
  }
}

/*-------------------Dynamic Field Generate----------------- */

function createNewDynamicField(){
  const row = document.createElement("div");
  row.classList.add("row", "mb-3");

  const svg1 = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg1.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  svg1.setAttribute("width", "12");
  svg1.setAttribute("height", "12");
  svg1.setAttribute("fill", "currentColor");
  svg1.setAttribute(
    "class",
    "bi bi-asterisk text-danger position-absolute top-0"
  );
  svg1.setAttribute("viewBox", "0 0 16 16");

  const path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path1.setAttribute(
    "d",
    "M8 0a1 1 0 0 1 1 1v5.268l4.562-2.634a1 1 0 1 1 1 1.732L10 8l4.562 2.634a1 1 0 1 1-1 1.732L9 9.732V15a1 1 0 1 1-2 0V9.732l-4.562 2.634a1 1 0 1 1-1-1.732L6 8 1.438 5.366a1 1 0 0 1 1-1.732L7 6.268V1a1 1 0 0 1 1-1"
  );

  svg1.appendChild(path1);

  const productInputField = document.createElement("div");
  productInputField.classList.add("col-md-3");

  const label1 = document.createElement("label");
  label1.setAttribute("for", "productDynamic");
  label1.classList.add("form-label", "position-relative");
  label1.innerText = "Name";
  label1.appendChild(svg1);

  const productDynamic = document.createElement("input");
  productDynamic.setAttribute("type", "text");
  productDynamic.setAttribute("value", "");
  productDynamic.classList.add("form-control", "productDynamic");
  productDynamic.setAttribute("id", "productDynamic");
  productDynamic.placeholder = "Enter ProductName";

  productDynamic.addEventListener("blur", function () {
    validateProducts(this);
    removeError(products);
   
  });
  productInputField.appendChild(label1);
  productInputField.appendChild(productDynamic);

  const quantityInputField = document.createElement("div");
  quantityInputField.classList.add("col-md-2");

  const label2 = document.createElement("label");
  label2.setAttribute("for", "quantityDynamic");
  label2.classList.add("form-label", "position-relative");
  label2.innerText = "Quantity";
  label2.appendChild(svg1.cloneNode(true));

  const quantityDynamic = document.createElement("input");
  quantityDynamic.setAttribute("type", "number");
  quantityDynamic.classList.add("form-control", "quantityDynamic");
  quantityDynamic.setAttribute("id", "quantityDynamic");
  quantityDynamic.placeholder = "Enter quantity";

  quantityDynamic.addEventListener("blur", function () {
    validateDynamicQuantity(quantityDynamic);
    updateDynamicTotal();
  });

  quantityInputField.appendChild(label2);

  quantityInputField.appendChild(quantityDynamic);

  const priceInputField = document.createElement("div");
  priceInputField.classList.add("col-md-2");

  const label3 = document.createElement("label");
  label3.setAttribute("for", "priceDynamic");
  label3.classList.add("form-label", "position-relative");
  label3.innerText = "Price";
  label3.appendChild(svg1.cloneNode(true));

  const priceDynamic = document.createElement("input");
  priceDynamic.setAttribute("type", "number");
  priceDynamic.classList.add("form-control", "priceDynamic");
  priceDynamic.setAttribute("id", "priceDynamic");
  priceDynamic.placeholder = "Enter price";

  priceDynamic.addEventListener("blur", function () {
    validateDynamicPrice(priceDynamic);
    updateDynamicTotal();
  });
  priceInputField.appendChild(label3)
  priceInputField.appendChild(priceDynamic);

  const totalInputField = document.createElement("div");
  totalInputField.classList.add("col-md-2");

  const label4 = document.createElement("label");
  label4.setAttribute("for", "totalDynamic");
  label4.classList.add("form-label", "position-relative");
  label4.innerText = "Total";
  label4.appendChild(svg1.cloneNode(true));

  const totalDynamic = document.createElement("input");
  totalDynamic.setAttribute("type", "text");
  totalDynamic.classList.add("form-control", "totalDynamic", "Disabled");
  totalDynamic.setAttribute("id", "totalDynamic");
  totalDynamic.disabled = true;

  totalInputField.appendChild(label4);
  totalInputField.appendChild(totalDynamic);

  const cancelButton = document.createElement("div");
  cancelButton.classList.add(
    "col-md-2",
    "d-flex",
    "align-items-center",
    "justify-content-center"
  );

  const button = document.createElement("button");
  button.setAttribute("type", "button");
  button.classList.add("btn", "btn-close", "delBtn", "bg-primary","mt-4");
  button.setAttribute("aria-label", "Close");

  button.addEventListener("click", removeField);

  cancelButton.appendChild(button);

  row.appendChild(productInputField);
  row.appendChild(quantityInputField);
  row.appendChild(priceInputField);
  row.appendChild(totalInputField);
  row.appendChild(cancelButton);

  div.appendChild(row);

}

/*------------------functionCall for validation------------------ */

customerName.addEventListener("blur", () => {
  checkCustomerNameValidate(customerName);
});
saleDate.addEventListener("blur", () => {
  checkMonthValidate(saleDate);
});
productName.addEventListener("blur", () => {
  checkProductValidate(productName);
  removeError(products);
});
quantity.addEventListener("blur", () => {
  checkQuantityValidate(quantity);
});
price.addEventListener("blur", () => {
  checkPriceValidate(price);
});


export function validateDynamicFields(selector, validationRegex, errorMessage) {
  const dynamicFields = document.querySelectorAll(selector);
  let isValid = true;

  dynamicFields.forEach(input => {
    const value = input.value.trim();
    if (value === "") {
      showError(input, `${getFieldName(input)} is required`);
      isValid = false;
    } else if (!validationRegex.test(value)) {
      showError(input, errorMessage);
      isValid = false;
    } else {
      removeError(input);
    }
  });
  return isValid;
}


/*---------------------------Reset All fields----------------------- */

function resetAllFields() {
  removeError(customerName);
  customerName.classList.remove("is-valid", "is-invalid");
  customerName.value = "Select the customerName";
  removeError(saleDate);
  saleDate.classList.remove("is-valid", "is-invalid");
  saleDate.value = "";
  removeError(productName);
  productName.classList.remove("is-valid", "is-invalid");
  productName.value = "";
  removeError(quantity);
  quantity.classList.remove("is-valid", "is-invalid");
  quantity.value = "";
  removeError(price);
  price.classList.remove("is-valid", "is-invalid");
  price.value = "";
  removeError(total);
  total.classList.remove("is-valid", "is-invalid");
  total.value = "";
  total.disabled = true;

  const productDynamic = document.querySelectorAll(".productDynamic");
  const quantityDynamic = document.querySelectorAll(".quantityDynamic");
  const priceDynamic = document.querySelectorAll(".priceDynamic");

  productDynamic.forEach((input) => {
    removeError(input);
    input.classList.remove("is-valid", "is-invalid");
    input.value = "";
  });
  quantityDynamic.forEach((input) => {
    removeError(input);
    input.classList.remove("is-valid", "is-invalid");
    input.value = "";
  });
  priceDynamic.forEach((input) => {
    removeError(input);
    input.classList.remove("is-valid", "is-invalid");
    input.value = "";
  });

  const dltBtn = document.querySelectorAll(".delBtn");
  dltBtn.forEach((del) => {
    del.click();
  });
}


/*-------------------OnSubmit----------------*/

const invoiceData = getFromLocalStorage("invoiceData") ?? [];

submitInvoiceForm.addEventListener("click", (e) => {
  e.preventDefault();
  removeError(products);
  updateInvoiceForm.style.display = "none";

  isValid = false;

  isValid = checkCustomerNameValidate(customerName);
  isValid = checkMonthValidate(saleDate) && isValid;
  isValid = checkProductValidate(productName) && isValid;
  isValid = checkQuantityValidate(quantity) && isValid;
  isValid = checkPriceValidate(price) && isValid;
 
  const productDynamic = document.querySelectorAll(".productDynamic");
  const quantityDynamic = document.querySelectorAll(".quantityDynamic");
  const priceDynamic = document.querySelectorAll(".priceDynamic");

  productDynamic.forEach((input) => {
    isValid = validateProducts(input) && isValid;
  });

  quantityDynamic.forEach((input,index) => {
    isValid = validateDynamicQuantity(input) && isValid;
    updateDynamicTotal();
  });

  priceDynamic.forEach((input, index) => {
    isValid = validateDynamicPrice(input) && isValid;
    updateDynamicTotal();
  });

  if (isValid) {
    let dynamicTotal = 0;

    productDynamic.forEach((product, i) => {
      if (i < quantityDynamic.length && i < priceDynamic.length) {
        let pair = {
          productDynamicValue: product.value,
          quantityDynamicValue: quantityDynamic[i].value,
          priceDynamicValue: priceDynamic[i].value,
        };
    
        dynamicTotal += Number(quantityDynamic[i].value) * Number(priceDynamic[i].value);
        productDynamicvalues.push(pair);
      }
    });
  
    const netTotal = Number(quantity.value) * Number(price.value) + Number(dynamicTotal);
    
    let uniqueProduct = productDynamicvalues.find(data => data.productDynamicValue === productName.value);
    
    const uniqueId = Math.random().toString(36).substr(2, 9);

    if(uniqueProduct === undefined && checkUniqueProduct(productDynamicvalues)){

    const newData = {
      id: uniqueId,
      customerName: customerName.value,
      saleDate: saleDate.value,
      productName: productName.value,
      quantity: quantity.value,
      price: price.value,
      productDynamicAllValues: productDynamicvalues,
      netTotal: netTotal,
    };

    invoiceData.push(newData);
    setInLocalStorage("invoiceData", invoiceData);
    getInvoiceData();
    productDynamicvalues.splice(0);
    resetAllFields();
    invoiceForm.style.display = "none";
    location.reload();
   }
   else{
    removeError(products);
    showError(products, `Products Name should be unique`);
    productDynamicvalues.splice(0);
   }
}
});


/*------------------------updateTotal PRice ---------------------- */

quantity.addEventListener("blur", updateTotal);
price.addEventListener("blur", updateTotal);

function updateTotal() {
  const totalPrice = Number(quantity.value) * Number(price.value);
  total.value = totalPrice;
}

function updateDynamicTotal() {
  const totalDynamic = document.querySelectorAll(".totalDynamic");
  const quantityDynamic = document.querySelectorAll(".quantityDynamic");
  const priceDynamic = document.querySelectorAll(".priceDynamic");
  totalDynamic.forEach((input, index) => {
    let totalDynamicPrice = quantityDynamic[index].value * priceDynamic[index].value;
    input.value = totalDynamicPrice;
  });
}

/*--------------------ShowInvoiceDetails------------------------- */

function showInvoiceDetails(data, index) {
  dataList1.innerHTML = "";
  const total =  Number(invoiceData[index].quantity) * Number(invoiceData[index].price);
  dataList1.innerHTML += `
            <tr>
                <td class="border py-1">${invoiceData[index].productName}</td>
                <td class="border py-1">${invoiceData[index].quantity}</td>
                <td class="border py-1">${invoiceData[index].price}</td>
                <td class="border py-1">${total}</td>
            </tr>
            `;
        
  invoiceData[index].productDynamicAllValues.forEach((data, index) => {
    const dataStr = JSON.stringify(data);
    const finalData = dataStr.replace(/"/g, "'");
    const dynamicTotal = Number(data.quantityDynamicValue) * Number(data.priceDynamicValue);
    dataList1.innerHTML += `
            <tr>
                <td class="border py-1">${data.productDynamicValue}</td>
                <td class="border py-1">${data.quantityDynamicValue}</td>
                <td class="border py-1">${data.priceDynamicValue}</td>
                <td class="border py-1">${dynamicTotal}</td>
            </tr>
            `;
  });
  action();
}

/*-----------invoiceDetailsModal close------------------- */

invoiceDetailsCancel.addEventListener("click", () => {
   invoiceDetails.style.display = "none";
});

/*----------------------showtable Data------------------- */

function getInvoiceData() {
  dataList.innerHTML = "";
  invoiceData.forEach((data, index) => {
    const dataStr = JSON.stringify(data);
    const finalData = dataStr.replace(/"/g, "'");

    dataList.innerHTML += `
          <tr>
              <td class="border py-1">${data.customerName}</td>
              <td class="border py-1"><a href="#" data="${finalData}" index="${index}" class="showModal">${data.productName}</a></td>
              <td class="border py-1">${data.saleDate}</td>
              <td class="border py-1">${data.netTotal}</td>
              <td >
                  <button id="${data.id}" data="${finalData}" index="${index}" class="edit-btn btn p-1 px-2"><i class="fa fa-edit"></i></button>
                  <button id="${data.id}" index="${index}" class="del-btn btn p-1 px-2"><i class="fa fa-trash"></i></button>
              </td>
          </tr>
          `;
  });
  action();
}

const remove = document.getElementById("delete");
const deleteButton = document.getElementById("deleteInvoiceUpdate");
const message = document.getElementById("message");
const modalClose = document.getElementById("popUpdelete");
const deleteInvoice = document.getElementById("deleteInvoice");

remove.onclick = () => {
  message.innerText = "Are you sure to delete Invoice?";
  deleteInvoice.style.display = "none";
};

modalClose.onclick = () => {
  message.innerText = "Are you sure to delete Invoice?";
  deleteInvoice.style.display = "none";
};


/*--------------------------Action functionality---------------------- */

function action() {

  const showModal = document.querySelectorAll(".showModal");
  showModal.forEach((show) => {
    show.onclick = () => {
      const dataStr = show.getAttribute("data");
      const finalData = dataStr.replace(/'/g, '"');
      const data = JSON.parse(finalData);
      const index = show.getAttribute("index");
      invoiceDetails.style.display = "block";
      showInvoiceDetails(data, index);
    };
  });
/*---------------deleteInvoice---------------------- */

  const delButton = document.querySelectorAll(".del-btn");
  delButton.forEach((del) => {
    del.onclick = () => {
        const id = del.getAttribute('id');
        deleteInvoice.style.display = "block";

        deleteButton.onclick = () => {
            const currentDate = new Date();
            const index = invoiceData.findIndex(data => data.id === id);
  
            if (index !== -1) { 
                const saleDate = invoiceData[index].saleDate;
                const saleDatetime = new Date(saleDate);
                const timestampTenDays = saleDatetime.getTime() + (10 * 24 * 60 * 60 * 1000);
  
                if (timestampTenDays > currentDate.getTime()) {

                    invoiceData.splice(index, 1);
                    setInLocalStorage("invoiceData", invoiceData);
                    getInvoiceData();
                    
                    resetAllFields();
                    deleteInvoice.style.display = "none";
                } else {
                    message.innerHTML = 'Product sale is more than 10 days';
                }
            } else {
                message.innerHTML = "Element with id " + id + " not found in the array.";
            }
  
        };
    };
  });

/*------------------Edit table Data------------------- */

  const editBbutton = document.querySelectorAll(".edit-btn");

  editBbutton.forEach((edit) => {
    edit.onclick = () => {
      const index = edit.getAttribute("index");
      const dataStr = edit.getAttribute("data");
      const finalData = dataStr.replace(/'/g, '"');
      const data = JSON.parse(finalData);

      addInvoice.click();
      submitInvoiceForm.style.display = "none";
      updateInvoiceForm.style.display = "block";

      const totalPrice=  Number(data.quantity) * Number(data.price);

      customerName.value = data.customerName;
      saleDate.value = data.saleDate;
      productName.value = data.productName;
      quantity.value = data.quantity;
      price.value = data.price;
      total.value = totalPrice;

      data.productDynamicAllValues.forEach((element, index) => {
        addDynamicFields();
        const productDynamic = document.querySelectorAll(".productDynamic");
        const quantityDynamic = document.querySelectorAll(".quantityDynamic");
        const priceDynamic = document.querySelectorAll(".priceDynamic");
        const totalDynamic = document.querySelectorAll('.totalDynamic');

        const totalPrice = Number(element.quantityDynamicValue) * Number(element.priceDynamicValue);
        totalDynamic.disabled = false;
        productDynamic[index].value = element.productDynamicValue;
        quantityDynamic[index].value = element.quantityDynamicValue;
        priceDynamic[index].value = element.priceDynamicValue;
        totalDynamic[index].value = totalPrice;
        
      });
  
      productName.classList.remove('is-valid');
      quantity.classList.remove('is-valid');
      price.classList.remove('is-valid');

      const productDynamic = document.querySelectorAll(".productDynamic");
      const quantityDynamic = document.querySelectorAll(".quantityDynamic");
      const priceDynamic = document.querySelectorAll(".priceDynamic");

      productDynamic.forEach((input) => {
        input.classList.remove("is-valid", "is-invalid");
      });

      quantityDynamic.forEach((input) => {
        input.classList.remove("is-valid", "is-invalid");
      });
      priceDynamic.forEach((input) => {
        input.classList.remove("is-valid", "is-invalid");
      });

/*--------------------updateData------------------- */

      updateInvoiceForm.onclick = () => {
        isValid = false;

        isValid = checkCustomerNameValidate(customerName);
        isValid = checkMonthValidate(saleDate) && isValid;
        isValid = checkProductValidate(productName) && isValid;
        isValid = checkQuantityValidate(quantity) && isValid;
        isValid = checkPriceValidate(price) && isValid;

        const productDynamic = document.querySelectorAll(".productDynamic");
        const quantityDynamic = document.querySelectorAll(".quantityDynamic");
        const priceDynamic = document.querySelectorAll(".priceDynamic");

        productDynamic.forEach((input) => {
          isValid = validateProducts(input) && isValid;
          updateDynamicTotal();
        });

        quantityDynamic.forEach((input) => {
          isValid = validateDynamicQuantity(input) && isValid;
          updateDynamicTotal();
        });
        priceDynamic.forEach((input) => {
          isValid = validateDynamicPrice(input) && isValid;
          updateDynamicTotal()
        });

        if (isValid) {
          let dynamicTotal=0;

          productDynamic.forEach((product, i) => {
            if (i < quantityDynamic.length && i < priceDynamic.length) {
              let pair = {
                productDynamicValue: product.value,
                quantityDynamicValue: quantityDynamic[i].value,
                priceDynamicValue: priceDynamic[i].value,
              };
              dynamicTotal += Number(quantityDynamic[i].value) * Number(priceDynamic[i].value);
              productDynamicvalues.push(pair);
            }
          });

          const netTotal = Number(quantity.value) * Number(price.value) + Number(dynamicTotal);
          const uniqueId = invoiceData[index].id;
          let uniqueProduct = productDynamicvalues.find(data => data.productDynamicValue === productName.value);
         
          const id = edit.getAttribute('id');
          const index1 = invoiceData.findIndex(data => data.id === id);

          if(uniqueProduct === undefined && checkUniqueProduct(productDynamicvalues)){

              invoiceData[index1] = {
                id:id,
                customerName: customerName.value,
                saleDate: saleDate.value,
                productName: productName.value,
                quantity: quantity.value,
                price: price.value,
                productDynamicAllValues: productDynamicvalues,
                netTotal: netTotal,
              };
    
              setInLocalStorage("invoiceData", invoiceData);
              getInvoiceData();
              productDynamicvalues.splice(0);
              submitInvoiceForm.style.display = "block";
              invoiceForm.style.display = "none";
              resetAllFields();
              location.reload();
             }
             else{
               removeError(products);
               showError(products, `Products should be unique`);
               productDynamicvalues.splice(0);
              }
         };
       }
    };
  });
}

getInvoiceData();

/*---------------for Searching---------------*/

searched.oninput = () => {
 search();
};

const search = () => {
  const months = {
    "01": "january",
    "02": "february",
    "03": "march",
    "04": "april",
    "05": "may",
    "06": "june",
    "07": "july",
    "08": "august",
    "09": "september",
    "10": "october",
    "11": "november",
    "12": "december",
  };

  const value = searched.value.toLowerCase();
  dataList.innerHTML = '';

  const filteredData = invoiceData.filter(data =>
    
      data.customerName.toLowerCase().includes(value) ||
      data.productName.toLowerCase().includes(value) ||
      data.saleDate.toLowerCase().includes(value) ||
      (String(data.netTotal)).toLowerCase().includes(value)||
      (months[data.saleDate.slice(5,7)]).toLowerCase().includes(value)
  );
  filteredData.forEach((element, index) => {  
      dataList.innerHTML += `
          <tr>
              <td class="border py-1">${element.customerName}</td>
              <td class="border py-1"><a href="#" index="${index}" data='${JSON.stringify(element)}' class="showModal">${element.productName}</a></td>
              <td class="border py-1">${element.saleDate}</td>
              <td class="border py-1">${element.netTotal}</td>
              <td>
                  <button id="${element.id}" data='${JSON.stringify(element)}' index="${index}" class="edit-btn btn p-1 px-2"><i class="fa fa-edit"></i></button>
                  <button id="${element.id}" index="${index}" class="del-btn btn p-1 px-2"><i class="fa fa-trash"></i></button>
              </td>
          </tr>`;
  });
  action()
};
