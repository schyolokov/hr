async function generate() {

  const { Document, Packer, Paragraph, TextRun } = window.docx;

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

  const doc = new Document({
    sections: [{
      children: [
        new Paragraph({ text: template.ru }),
        new Paragraph(" "),
        new Paragraph({ text: template.kz })
      ]
    }]
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, "prikaz.docx");
}
