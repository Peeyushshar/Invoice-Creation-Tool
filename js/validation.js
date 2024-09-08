import {validateDynamicFields} from './main.js'


function showError(input, message) {
    if (!input.classList.contains("is-invalid")) {
      input.classList.add("is-invalid");
      const errorText = document.createElement("small");
      errorText.innerText = message;
      errorText.classList.add("text-danger");
      input.parentElement.appendChild(errorText);
      return false;
    }
  }
  
  function removeError(input) {
    input.classList.remove("is-invalid");
    input.classList.add("is-valid");
    const errorText = input.nextElementSibling;
  
    if (errorText) {
      errorText.remove();
    }
  }
  
  function getFieldName(input) {
    const label = input.previousElementSibling;
    return label ? label.innerText.trim() : "Field";
  }
  
  /*----------------------Check customerName Validation------------------- */
  
  function checkCustomerNameValidate(input) {
    if (input.value == "Select the customerName" || input.value.trim() === "") {
      removeError(input);
      showError(input, `${getFieldName(input)} is required`);
      return false;
    } else {
      removeError(input);
      return true;
    }
  }
  
  /*----------------------checkMonth Validation-------------*/
  
  function checkMonthValidate(input) {
    const currentDate = new Date();
    const saleDate = input.value;
    const saleDatetime = new Date(saleDate);
    const timestampTenDays = saleDatetime.getTime() + (24 * 60 * 60 * 1000);
    if (input.value.trim() === "") {
      removeError(input);
      showError(input, `${getFieldName(input)} is required`);
      return false;
    } else if(timestampTenDays > currentDate.getTime() ){
      removeError(input);
      showError(input, `${getFieldName(input)} is not valid`);
      return false;
    }
    else {
      removeError(input);
      return true;
    }
  }
  
  /*------------------------CheckProductName validation------------------------*/
  
  function checkProductValidate(input) {
    if (input.value.trim() === "") {
      removeError(input);
      showError(input, `${getFieldName(input)} is required`);
      return false;
    } else if ( input.value.length >= 3 && input.value.length <= 30 ) {
      removeError(input);
      return true;
    } else {
      removeError(input);
      showError(
        input,
        `${getFieldName(
          input
        )} should be min 3 and max 30 character length`
      );
      return false;
    }
  }
  
  /*------------------checkQuantity validation--------------------*/
  
  function checkQuantityValidate(input) {
   if (input.value.trim() === "") {
     removeError(input);
     showError(input, `${getFieldName(input)} is required`);
     return false;
   } else if ( /^[0-9]+$/.test(input.value) && input.value >= 1 ) {
     removeError(input);
     return true;
   } else {
     removeError(input);
     showError(
       input,
       `${getFieldName(
         input
       )} should be min 1 `
     );
     return false;
   }
  }


  
  /*------------------checkQuantity validation--------------------*/
  
  function checkPriceValidate(input) {
    if (input.value.trim() === "") {
      removeError(input);
      showError(input, `${getFieldName(input)} is required`);
      return false;
    } else if ( /^[0-9]+$/.test(input.value) && input.value >= 1 ) {
      removeError(input);
      return true;
    } else {
      removeError(input);
      showError(
        input,
        `${getFieldName(
          input
        )} should be min 1 `
      );
      return false;
    }
   }
  
   /*-------------------CheckUnique product-------------- */

function checkUniqueProduct(array) {
  const productMap = new Map();

  for (const item of array) {
      const product = item.productDynamicValue;
      if (productMap.has(product)) {
          return false; 
      } else {
          productMap.set(product, true);
      }
  }

  return true; 
}

/*---------------------DynamicValidations-------------------- */



const productDynamic = document.querySelectorAll('.productDynamic');
const quantityDynamic = document.querySelectorAll('.quantityDynamic');
const priceDynamic = document.querySelectorAll('.priceDynamic');

function validateProducts() {
  return validateDynamicFields(".productDynamic",/^.{3,30}$/,`${getFieldName(productDynamic)} should be between 3 and 30 characters`);
}

function validateDynamicQuantity() {
  return validateDynamicFields(".quantityDynamic", /^[1-9][0-9]*$/,`${getFieldName(quantityDynamic)} should be a positive integer and grater than zero` );
}

function validateDynamicPrice() {
  return validateDynamicFields( ".priceDynamic",/^[1-9][0-9]*$/,`${getFieldName(priceDynamic)} should be a positive integer and grater than zero`);
}

  
  
  export {
    getFieldName, 
    showError,
    removeError, 
    checkCustomerNameValidate, 
    checkMonthValidate, 
    checkProductValidate,
    checkQuantityValidate, 
    checkPriceValidate, 
    checkUniqueProduct,
    validateProducts, 
    validateDynamicQuantity,
    validateDynamicPrice 
  };
  