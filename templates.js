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
      "ТОО \"Компания\"",
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
      "\"Компания\" ЖШС",
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
