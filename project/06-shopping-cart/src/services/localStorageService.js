const localStorage = window.localStorage

export const localStorageActions = {
  add: (key, value) => {

  },
  set: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value))
  },
  remove: (key) => {
    return localStorage.removeItem(key)
  },
  get: (key) => {
    return JSON.parse(localStorage.getItem(key))
  }
}
