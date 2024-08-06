/**
 * Saves an specific key in the localstorage database
 * @param {*} key the key to store
 * @param {*} value the value associated to the key to be stored
 */
function saveToLocalStorage(key, value) {
  let list = JSON.parse(localStorage.getItem(key))
  if(!list){
    list = [];
  }
  list.push(value);

  localStorage.setItem(key, JSON.stringify(list));
  return true;
}

/**
 *
 * @param {*} key
 */
function getFromLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}