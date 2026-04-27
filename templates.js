const templates = {
  hire: {
    fields: [
      { id: "fio", label: "ФИО", type: "text" },
      { id: "position", label: "Должность", type: "text" },
      { id: "startDate", label: "Дата начала работы", type: "date" }
    ],
    build: (data) => {
      const fio = data.fio || "";
      const position = data.position || "";
      const startDate = data.startDate || "";
      const number = data.number || "-";

      const fioDative = (typeof declineFIO === "function" && fio)
        ? declineFIO(fio, "dative")
        : fio;

      const fioKz = (typeof kzDative === "function" && fio)
        ? kzDative(fio)
        : fio;

      return {
        ru: [
          'ТОО "Компания"',
          `ПРИКАЗ № ${number}`,
          "г. Петропавловск",
          "",
          "О приеме на работу",
          "",
          `ПРИНЯТЬ: ${fio}`,
          `Назначить ${fioDative} на должность ${position}`,
          startDate ? `с ${startDate}` : "",
          "",
          "Основание: трудовой договор",
          "",
          "Директор __________"
        ],
        kz: [
          '"Компания" ЖШС',
          `№ ${number} БҰЙРЫҚ`,
          "Петропавл қ.",
          "",
          "Жұмысқа қабылдау туралы",
          "",
          `${fio} ${position} лауазымына`,
          startDate ? `${startDate} бастап қабылдансын` : "",
          "",
          `${fioKz} қызметке қабылдансын`,
          "",
          "Негізі: еңбек шарты",
          "",
          "Директор __________"
        ]
      };
    }
  },

  fire: {
    fields: [
      { id: "fio", label: "ФИО", type: "text" },
      { id: "position", label: "Должность", type: "text" },
      { id: "endDate", label: "Дата увольнения", type: "date" }
    ],
    build: (data) => {
      const fio = data.fio || "";
      const position = data.position || "";
      const endDate = data.endDate || "";
      const number = data.number || "-";

      return {
        ru: [
          'ТОО "Компания"',
          `ПРИКАЗ № ${number}`,
          "г. Петропавловск",
          "",
          "Об увольнении",
          "",
          `УВОЛИТЬ: ${fio}`,
          `Освободить от должности ${position}`,
          endDate ? `с ${endDate}` : "",
          "",
          "Основание: заявление работника",
          "",
          "Директор __________"
        ],
        kz: [
          '"Компания" ЖШС',
          `№ ${number} БҰЙРЫҚ`,
          "Петропавл қ.",
          "",
          "Жұмыстан босату туралы",
          "",
          `${fio} қызметінен босатылсын`,
          endDate ? `${endDate} бастап` : "",
          "",
          "Негізі: қызметкердің өтініші",
          "",
          "Директор __________"
        ]
      };
    }
  },

  vacation: {
    fields: [
      { id: "fio", label: "ФИО", type: "text" },
      { id: "position", label: "Должность", type: "text" },
      { id: "fromDate", label: "Дата начала отпуска", type: "date" },
      { id: "toDate", label: "Дата окончания отпуска", type: "date" }
    ],
    build: (data) => {
      const fio = data.fio || "";
      const position = data.position || "";
      const fromDate = data.fromDate || "";
      const toDate = data.toDate || "";
      const number = data.number || "-";

      return {
        ru: [
          'ТОО "Компания"',
          `ПРИКАЗ № ${number}`,
          "г. Петропавловск",
          "",
          "О предоставлении отпуска",
          "",
          `ПРЕДОСТАВИТЬ отпуск: ${fio}`,
          `Должность: ${position}`,
          fromDate && toDate ? `на период с ${fromDate} по ${toDate}` : "",
          "",
          "Основание: график отпусков",
          "",
          "Директор __________"
        ],
        kz: [
          '"Компания" ЖШС',
          `№ ${number} БҰЙРЫҚ`,
          "Петропавл қ.",
          "",
          "Демалыс беру туралы",
          "",
          `${fio} демалыс берілсін`,
          `${position}`,
          fromDate && toDate ? `${fromDate} - ${toDate} аралығында` : "",
          "",
          "Негізі: демалыс кестесі",
          "",
          "Директор __________"
        ]
      };
    }
  }
};
