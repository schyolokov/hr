function getNextOrderNumber() {
  let num = localStorage.getItem("orderNumber");

  if (!num) num = 1;
  else num = parseInt(num) + 1;

  localStorage.setItem("orderNumber", num);
  return num;
}
