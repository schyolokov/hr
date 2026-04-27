document.addEventListener("DOMContentLoaded", function () {

  const formEl = document.getElementById("form");
  const select = document.getElementById("orderType");

  if (!formEl || !select) {
    console.error("Не найден form или select");
    return;
  }

  console.log("JS загружен");

  select.addEventListener("change", function () {
    const type = this.value;
    console.log("Выбран тип:", type);

    formEl.innerHTML = "";

    if (!type || !templates[type]) {
      console.warn("Нет шаблона для:", type);
      return;
    }

    templates[type].fields.forEach(f => {
      const input = document.createElement("input");
      input.placeholder = f.label;
      input.id = f.id;
      input.type = f.type || "text";
      formEl.appendChild(input);
    });
  });

  document.getElementById("generateBtn")
    .addEventListener("click", generateDoc);

});
