document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("dynamicForm");
  const select = document.getElementById("orderType");

  document.getElementById("orderNumber").value = getNextOrderNumber();

  select.addEventListener("change", () => renderForm(select.value));

  function renderForm(type) {
    form.innerHTML = "";

    if (!templates[type]) {
  alert("Ошибка шаблона");
  return;
}

    templates[type].fields.forEach(f => {
      const input = document.createElement("input");
      input.className = "form-control mt-2";
      input.placeholder = f.label;
      input.id = f.id;
      input.type = f.type || "text";
      form.appendChild(input);
    });
  }

  document.getElementById("generateBtn").addEventListener("click", generate);

});

async function generate() {

  const { Document, Packer, Paragraph, TextRun, AlignmentType } = docx;

  const type = document.getElementById("orderType").value;
  if (!type) return alert("Выберите тип");

  let data = {
    number: document.getElementById("orderNumber").value,
    date: document.getElementById("orderDate").value
  };

  templates[type].fields.forEach(f => {
    data[f.id] = document.getElementById(f.id).value;
  });

  const content = templates[type].build(data);

  const makeParagraphs = (lines) =>
    lines.map(line =>
      new Paragraph({
        children: [new TextRun({ text: line, font: "Times New Roman", size: 24 })],
        spacing: { after: 200 }
      })
    );

  const doc = new Document({
    sections: [{
      children: [
        ...makeParagraphs(content.ru),
        new Paragraph({ text: "" }),
        ...makeParagraphs(content.kz)
      ]
    }]
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, `order_${data.number}.docx`);
}
