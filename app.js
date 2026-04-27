document.addEventListener("DOMContentLoaded", () => {
  const formEl = document.getElementById("form");
  const select = document.getElementById("orderType");

  select.addEventListener("change", () => {
    renderForm(select.value);
  });

  function renderForm(type) {
    formEl.innerHTML = "";

    if (!templates[type]) return;

    templates[type].fields.forEach(f => {
      const input = document.createElement("input");
      input.placeholder = f.label;
      input.id = f.id;
      input.type = f.type || "text";
      formEl.appendChild(input);
    });
  }

  document.getElementById("generateBtn")
    .addEventListener("click", generateDoc);
});

async function generateDoc() {
  const { Document, Packer, Paragraph, TextRun } = docx;

  const type = select.value;
  if (!type) return alert("Выберите тип приказа");

  let data = {};
  templates[type].fields.forEach(f => {
    data[f.id] = document.getElementById(f.id).value;
  });

  const text = templates[type].generate(data);

  const doc = new Document({
    sections: [{
      children: [

        new Paragraph({
          children: [
            new TextRun({ text: text.ru, font: "Times New Roman", size: 24 })
          ]
        }),

        new Paragraph({ text: "" }),

        new Paragraph({
          children: [
            new TextRun({ text: text.kz, font: "Times New Roman", size: 24 })
          ]
        })

      ]
    }]
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, "order.docx");
}
