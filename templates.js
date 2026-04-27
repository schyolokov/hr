const templates = {

  hire: {
    fields: [
      { id: "fio", label: "ФИО" },
      { id: "position", label: "Должность" },
      { id: "startDate", label: "Дата приема", type: "date" }
    ],

    build: (data) => {

      const fioDative = declineFIO(data.fio, "dative");
      const fioKz = kzDative(data.fio);

      return {

        ru: [
          "ТОО \"Компания\"",
          `ПРИКАЗ № ${data.number}`,
          "г. Петропавловск",
          "",
          "О приеме на работу",
          "",
          `ПРИНЯТЬ: ${data.fio}`,
          `Назначить ${fioDative} на должность ${data.position}`,
          `с ${data.startDate}`,
          "",
          "Основание: трудовой договор",
          "",
          "Директор __________"
        ],

        kz: [
          "\"Компания\" ЖШС",
          `№ ${data.number} БҰЙРЫҚ`,
          "Петропавл қ.",
          "",
          "Жұмысқа қабылдау туралы",
          "",
          `${data.fio} ${data.position} лауазымына`,
          `${data.startDate} бастап қабылдансын`,
          "",
          `${data.fio}${fioKz.slice(data.fio.length)} қызметке қабылдансын`,
          "",
          "Негізі: еңбек шарты",
          "",
          "Директор __________"
        ]

      };
    }
  }

};
