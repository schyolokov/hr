async function generate() {
  try {

    if (!window.docx) {
      alert("docx библиотека не загружена");
      return;
    }

    const { Document, Packer, Paragraph, TextRun } = docx;

    const type = document.getElementById("type").value;

    const data = {
      fio: document.getElementById("fio").value,
      position: document.getElementById("position").value,
      date: formatDate(document.getElementById("date").value)
    };

    let template;

    if (type === "hire") template = hireTemplate(data);
    if (type === "fire") template = fireTemplate(data);
    if (type === "vacation") template = vacationTemplate(data);

    // 🔥 ВАЖНО: разбиваем текст на строки
    function textToParagraphs(text) {
      return text.split("\n").map(line =>
        new Paragraph({
          children: [new TextRun(line)]
        })
      );
    }

    const doc = new Document({
      sections: [{
        children: [
          ...textToParagraphs(template.ru),
          new Paragraph(""),
          ...textToParagraphs(template.kz)
        ]
      }]
    });

  Packer.toBlob(doc).then(blob => {
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "prikaz.docx";
  a.click();

  URL.revokeObjectURL(url);
});

  } catch (err) {
    console.error(err);
    alert("Ошибка генерации DOCX: " + err.message);
  }
}
