document.getElementById("orderForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const { Document, Packer, Paragraph, TextRun } = window.docx;

  const type = document.getElementById("orderType").value;
  const fio = document.getElementById("fio").value;
  const position = document.getElementById("position").value;
  const date = document.getElementById("date").value;

  let textRU = "";
  let textKZ = "";

  if (type === "hire") {
    textRU = `Принять ${fio} на должность ${position} с ${date}`;
    textKZ = `${fio} ${date} бастап ${position} лауазымына қабылдансын`;
  }

  if (type === "fire") {
    textRU = `Уволить ${fio} с должности ${position} ${date}`;
    textKZ = `${fio} ${date} күні ${position} қызметінен босатылсын`;
  }

  if (type === "vacation") {
    textRU = `Предоставить отпуск ${fio} с ${date}`;
    textKZ = `${fio} үшін ${date} бастап демалыс берілсін`;
  }

  const doc = new Document({
    sections: [{
      children: [
        new Paragraph({
          children: [new TextRun({ text: "ПРИКАЗ", bold: true })]
        }),
        new Paragraph(textRU),
        new Paragraph(""),
        new Paragraph({
          children: [new TextRun({ text: "БҰЙРЫҚ", bold: true })]
        }),
        new Paragraph(textKZ)
      ]
    }]
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, "order.docx");
});
