//判断字符串是否为空的方法
export function isEmptyString(obj) {
  if (typeof obj == "undefined" || obj == null || obj === "") {
    return true;
  } else {
    return false;
  }
}

//判断对象是否为空的方法
export function checkNullObj(obj) {
  return Object.keys(obj).length == 0;
}
