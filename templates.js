const templates = {
  hire: {
    fields: [
      { id: "fio", label: "ФИО" },
      { id: "position", label: "Должность" },
      { id: "date", label: "Дата приема", type: "date" }
    ],
    generate: (data) => ({
      ru: `
ТОО "Компания"
ПРИКАЗ

О приеме на работу

ПРИНЯТЬ:
${data.fio} на должность ${data.position}
с ${data.date}

Основание: трудовой договор
      `,
      kz: `
"Компания" ЖШС
БҰЙРЫҚ

Жұмысқа қабылдау туралы

ҚАБЫЛДАНСЫН:
${data.fio} ${data.position} лауазымына
${data.date} бастап

Негізі: еңбек шарты
      `
    })
  },

  fire: {
    fields: [
      { id: "fio", label: "ФИО" },
      { id: "reason", label: "Причина" }
    ],
    generate: (data) => ({
      ru: `
ПРИКАЗ

УВОЛИТЬ:
${data.fio}

Причина: ${data.reason}
      `,
      kz: `
БҰЙРЫҚ

БОСАТЫЛСЫН:
${data.fio}

Себебі: ${data.reason}
      `
    })
  },

  vacation: {
    fields: [
      { id: "fio", label: "ФИО" },
      { id: "start", label: "Начало", type: "date" },
      { id: "end", label: "Конец", type: "date" }
    ],
    generate: (data) => ({
      ru: `
ПРИКАЗ

ПРЕДОСТАВИТЬ ОТПУСК:
${data.fio}

С ${data.start} по ${data.end}
      `,
      kz: `
БҰЙРЫҚ

ДЕМАЛЫС БЕРІЛСІН:
${data.fio}

${data.start} - ${data.end}
      `
    })
  }
};
