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
    build: (data) => ({
      ru: ["Приказ об увольнении"],
      kz: ["Жұмыстан босату туралы бұйрық"]
    })
  },

  vacation: {
    fields: [
      { id: "fio", label: "ФИО", type: "text" },
      { id: "position", label: "Должность", type: "text" },
      { id: "fromDate", label: "Дата начала отпуска", type: "date" },
      { id: "toDate", label: "Дата окончания отпуска", type: "date" }
    ],
    build: (data) => ({
      ru: ["Приказ об отпуске"],
      kz: ["Демалыс туралы бұйрық"]
    })
  }
};
