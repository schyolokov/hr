document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("dynamicForm");
  const select = document.getElementById("orderType");
  const orderDateInput = document.getElementById("orderDate");

  document.getElementById("orderNumber").value = getNextOrderNumber();
  orderDateInput.value = new Date().toISOString().slice(0, 10);

  select.addEventListener("change", () => renderForm(select.value));
  document.getElementById("generateBtn").addEventListener("click", generate);
});

function renderForm(type) {
  const form = document.getElementById("dynamicForm");
  form.innerHTML = "";

  if (!type || !templates[type]) {
    return;
  }

  templates[type].fields.forEach((field) => {
    const wrapper = document.createElement("div");
    wrapper.className = "mb-3";

    const label = document.createElement("label");
    label.className = "form-label";
    label.textContent = field.label;
    label.setAttribute("for", field.id);
    wrapper.appendChild(label);

    let input;

    if (field.type === "select") {
      input = document.createElement("select");
      input.className = "form-select";
      (field.options || []).forEach((option) => {
        const optionEl = document.createElement("option");
        optionEl.value = option.value;
        optionEl.textContent = option.label;
        if (field.defaultValue === option.value) {
          optionEl.selected = true;
        }
        input.appendChild(optionEl);
      });
    } else if (field.type === "textarea") {
      input = document.createElement("textarea");
      input.className = "form-control";
      input.rows = 2;
      if (field.placeholder) {
        input.placeholder = field.placeholder;
      }
    } else if (field.type === "checkbox") {
      const checkWrap = document.createElement("div");
      checkWrap.className = "form-check";
      input = document.createElement("input");
      input.type = "checkbox";
      input.className = "form-check-input";
      input.id = field.id;
      const checkLabel = document.createElement("label");
      checkLabel.className = "form-check-label";
      checkLabel.setAttribute("for", field.id);
      checkLabel.textContent = field.label;
      checkWrap.appendChild(input);
      checkWrap.appendChild(checkLabel);
      wrapper.innerHTML = "";
      wrapper.appendChild(checkWrap);
      form.appendChild(wrapper);
      return;
    } else {
      input = document.createElement("input");
      input.className = "form-control";
      input.type = field.type || "text";
    }

    input.id = field.id;
    if (field.defaultValue !== undefined && field.type !== "checkbox") {
      input.value = field.defaultValue;
    }
    if (field.required) {
      input.required = true;
    }

    wrapper.appendChild(input);
    form.appendChild(wrapper);
  });
}

function collectFormData(type) {
  const data = {
    number: document.getElementById("orderNumber").value,
    date: document.getElementById("orderDate").value
  };

  templates[type].fields.forEach((field) => {
    const element = document.getElementById(field.id);
    if (!element) return;

    if (field.type === "checkbox") {
      data[field.id] = element.checked;
    } else {
      data[field.id] = element.value.trim();
    }
  });

  return data;
}

function validateData(type, data) {
  const template = templates[type];

  for (const field of template.fields) {
    if (!field.required) continue;

    if (field.type === "checkbox") continue;

    if (!data[field.id]) {
      alert(`Заполните поле: ${field.label}`);
      return false;
    }
  }

  if (data.singleDay) {
    if (!data.singleDate) {
      alert("Укажите дату для одного календарного дня");
      return false;
    }
  } else if (type !== "vacationRecall" && type !== "paidLeaveRetention") {
    if (!data.fromDate || !data.toDate) {
      if (!data.periodNote) {
        alert("Укажите период отпуска или дополнительное описание периода");
        return false;
      }
    }
  }

  if (type === "paidLeaveRetention" && (!data.fromDate || !data.toDate)) {
    alert("Укажите период отпуска");
    return false;
  }

  return true;
}

function makeParagraphs(lines, Paragraph, TextRun, AlignmentType) {
  return lines.map((line) =>
    new Paragraph({
      children: [
        new TextRun({
          text: line,
          font: "Times New Roman",
          size: 24
        })
      ],
      alignment: line.startsWith("       ") || line.startsWith("          ")
        ? AlignmentType.JUSTIFIED
        : AlignmentType.LEFT,
      spacing: { after: 120, line: 276 }
    })
  );
}

async function generate() {
  const type = document.getElementById("orderType").value;
  if (!type) {
    alert("Выберите тип приказа");
    return;
  }

  const data = collectFormData(type);
  if (!validateData(type, data)) {
    return;
  }

  const content = templates[type].build(data);
  const { Document, Packer, Paragraph, TextRun, PageBreak, AlignmentType } = docx;

  const doc = new Document({
    sections: [{
      properties: {
        page: {
          margin: {
            top: 1134,
            right: 850,
            bottom: 1134,
            left: 1701
          }
        }
      },
      children: [
        ...makeParagraphs(content.ru, Paragraph, TextRun, AlignmentType),
        new Paragraph({ children: [new PageBreak()] }),
        ...makeParagraphs(content.kz, Paragraph, TextRun, AlignmentType)
      ]
    }]
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, `prikaz_${data.number || "draft"}.docx`);
}
