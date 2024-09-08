
function getFromLocalStorage(key, defaultValue = null) {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : defaultValue;
  }
  
  function setInLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }
  
  export { getFromLocalStorage, setInLocalStorage };