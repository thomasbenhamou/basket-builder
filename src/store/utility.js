export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties
  }
}

let id = 0;
const defaultOptions = {
  color: "rgb(73,168,81)"
};
export const createToast = (options) => {
  return {
    ...defaultOptions,
    ...options,
    id: id++
  }
}