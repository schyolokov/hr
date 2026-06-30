const COMPANY_RU = "ТОО «СТ Эсэмбли»";
const COMPANY_KZ = "«СТ Эсэмбли» ЖШС";

const ACK_RU = [
  "С приказом ознакомлен (-а):",
  "___________________________________",
  "                  ФИО, подпись, дата"
];

const ACK_KZ = [
  "Бұйрықпен таныс (-ым):",
  "___________________________________",
  "                  Т.А.Ә., қолы, күні"
];

function buildAnnualVacationLines(data, variant) {
  const d = normalizeData(data);
  const position = d.position || "";
  const unusedPart = variant === "unused"
    ? "неиспользованную часть "
    : "";
  const workedPart = variant === "worked"
    ? " за фактически отработанный период"
    : "";

  const periodSuffix = d.singleDay
    ? ` – ${d.periodRu}.`
    : (d.periodRu ? ` – ${d.periodRu}.` : ".");

  const periodSuffixKz = d.singleDay
    ? ` – ${d.periodKz}.`
    : (d.periodKz ? ` – ${d.periodKz}.` : ".");

  const unusedPartKz = variant === "unused" ? "пайдаланылмаған бөлігін " : "";
  const workedPartKz = variant === "worked" ? " нақты жұмыс істеген кезең үшін" : "";

  const extraPeriodRu = d.periodNote ? ` ${d.periodNote}` : "";
  const extraPeriodKz = d.periodNoteKz ? ` ${d.periodNoteKz}` : "";

  return {
    ru: [
      "По кадрам",
      "       О предоставлении основного оплачиваемого ежегодного трудового отпуска",
      "        ПРИКАЗЫВАЮ:",
      `Предоставить ${position} ${d.fioDative} ${unusedPart}основного оплачиваемого ежегодного трудового отпуска${workedPart}${extraPeriodRu} сроком на ${d.daysWordRu}${periodSuffix}`,
      "Бухгалтерии произвести расчет основного оплачиваемого ежегодного трудового отпуска.",
      `          Основание: заявление ${d.initialsDative} от ${d.basisDateRu}.`,
      buildSignatoryLine(d.signatoryRu, d.signatoryName),
      ...ACK_RU
    ],
    kz: [
      "Кадрлар бойынша",
      "       Негізгі ақы төленетін жыл сайынғы еңбек демалысын беру туралы",
      "        БҰЙЫРЫҚ БЕРЕМІН:",
      `${position} ${d.fioKzDative} ${unusedPartKz}негізгі ақы төленетін жыл сайынғы еңбек демалысының${workedPartKz}${extraPeriodKz} ${d.daysWordKz}${periodSuffixKz}`,
      "Есепшілік бөлімі негізгі ақы төленетін жыл сайынғы еңбек демалысын есептесін.",
      `          Негізі: ${d.initialsDative} ${d.basisDateKz} күнгі өтініші.`,
      buildSignatoryLine(d.signatoryKz, d.signatoryName),
      ...ACK_KZ
    ]
  };
}

const templates = {
  annualVacationUnused: {
    label: "Ежегодный отпуск (неиспользованная часть)",
    fields: [
      { id: "fio", label: "ФИО сотрудника", type: "text", required: true },
      { id: "position", label: "Должность", type: "text", required: true, defaultValue: "специалисту по кадрам" },
      { id: "days", label: "Количество календарных дней", type: "number", required: true },
      { id: "singleDay", label: "Один календарный день", type: "checkbox" },
      { id: "singleDate", label: "Дата (если один день)", type: "date" },
      { id: "fromDate", label: "Дата начала отпуска", type: "date" },
      { id: "toDate", label: "Дата окончания отпуска", type: "date" },
      { id: "periodNote", label: "Доп. период (необязательно)", type: "textarea", placeholder: "за период с ... по ... сроком на ... дней" },
      { id: "periodNoteKz", label: "Доп. период на казахском (необязательно)", type: "textarea" },
      { id: "basisDate", label: "Дата заявления", type: "date", required: true },
      { id: "signatory", label: "Подписант", type: "select", options: [
        { value: "generalDirector", label: "Генеральный директор" },
        { value: "hrDirector", label: "HR директор" },
        { value: "productionDirector", label: "Производственный директор" }
      ], defaultValue: "generalDirector" },
      { id: "signatoryName", label: "ФИО подписанта", type: "text", defaultValue: "С. Жолик" }
    ],
    build: (data) => buildAnnualVacationLines(data, "unused")
  },

  annualVacationWorked: {
    label: "Ежегодный отпуск (за отработанный период)",
    fields: [
      { id: "fio", label: "ФИО сотрудника", type: "text", required: true },
      { id: "position", label: "Должность", type: "text", required: true, defaultValue: "специалисту по кадрам" },
      { id: "days", label: "Количество календарных дней", type: "number", required: true },
      { id: "singleDay", label: "Один календарный день", type: "checkbox" },
      { id: "singleDate", label: "Дата (если один день)", type: "date" },
      { id: "fromDate", label: "Дата начала отпуска", type: "date" },
      { id: "toDate", label: "Дата окончания отпуска", type: "date" },
      { id: "basisDate", label: "Дата заявления", type: "date", required: true },
      { id: "signatory", label: "Подписант", type: "select", options: [
        { value: "generalDirector", label: "Генеральный директор" },
        { value: "hrDirector", label: "HR директор" },
        { value: "productionDirector", label: "Производственный директор" }
      ], defaultValue: "generalDirector" },
      { id: "signatoryName", label: "ФИО подписанта", type: "text", defaultValue: "С. Жолик" }
    ],
    build: (data) => buildAnnualVacationLines(data, "worked")
  },

  vacationRecall: {
    label: "Отзыв из ежегодного отпуска",
    fields: [
      { id: "fio", label: "ФИО сотрудника", type: "text", required: true },
      { id: "position", label: "Должность (вин. падеж)", type: "text", required: true, defaultValue: "специалиста по кадрам" },
      { id: "recallDate", label: "Дата отзыва из отпуска", type: "date", required: true },
      { id: "days", label: "Дней компенсации", type: "number", required: true },
      { id: "basisLine1", label: "Основание 1", type: "text", defaultValue: "Служебная записка HR директора, вх. №219 от 15 декабря 2025 года" },
      { id: "basisLine1Kz", label: "Основание 1 (каз.)", type: "text", defaultValue: "HR директорының іскерлік жазбасы, кір. №219, 2025 жылғы 15 желтоқсан" },
      { id: "basisLine2", label: "Основание 2", type: "text", defaultValue: "Согласие Орловой Ю.С. на отзыв из отпуска от 15 декабря 2025 года" },
      { id: "basisLine2Kz", label: "Основание 2 (каз.)", type: "text", defaultValue: "Орлова Ю.С. демалыстан кері шақыруға келісімі, 2025 жылғы 15 желтоқсан" },
      { id: "signatory", label: "Подписант", type: "select", options: [
        { value: "generalDirector", label: "Генеральный директор" }
      ], defaultValue: "generalDirector" },
      { id: "signatoryName", label: "ФИО подписанта", type: "text", defaultValue: "С. Жолик" }
    ],
    build: (data) => {
      const d = normalizeData(data);

      return {
        ru: [
          "По кадрам",
          "Об отзыве из основного оплачиваемого ежегодного трудового отпуска",
          `Отозвать ${d.position} ${d.fioAccusative} из оплачиваемого ежегодного трудового отпуска с ${d.recallDateRu}, с предоставлением компенсации за неиспользованные дни трудового отпуска в количестве ${d.daysWordRu}.`,
          `Бухгалтерии произвести выплату компенсации за ${d.daysWordRu} неиспользованного оплачиваемого ежегодного трудового отпуска.`,
          "Основание:",
          `${d.basisLine1};`,
          `${d.basisLine2}.`,
          buildSignatoryLine(d.signatoryRu, d.signatoryName),
          ...ACK_RU
        ],
        kz: [
          "Кадрлар бойынша",
          "Негізгі ақы төленетін жыл сайынғы еңбек демалысынан кері шақыру туралы",
          `${d.position} ${d.fioKzAccusative} ${d.recallDateKz} бастап ақы төленетін жыл сайынғы еңбек демалысынан кері шақырылсын, пайдаланылмаған демалыс күндері үшін ${d.daysWordKz} мөлшерінде өтемақы төленсін.`,
          `Есепшілік бөлімі пайдаланылмаған ${d.daysWordKz} ақы төленетін жыл сайынғы еңбек демалысы үшін өтемақыны төлеуін жүзеге асырсын.`,
          "Негізі:",
          `${d.basisLine1Kz};`,
          `${d.basisLine2Kz}.`,
          buildSignatoryLine(d.signatoryKz, d.signatoryName),
          ...ACK_KZ
        ]
      };
    }
  },

  paidLeaveRetention: {
    label: "Отпуск с сохранением заработной платы",
    fields: [
      { id: "fio", label: "ФИО сотрудника", type: "text", required: true },
      { id: "position", label: "Должность", type: "text", required: true, defaultValue: "специалисту по кадрам" },
      { id: "days", label: "Количество календарных дней", type: "number", required: true },
      { id: "fromDate", label: "Дата начала", type: "date", required: true },
      { id: "toDate", label: "Дата окончания", type: "date", required: true },
      { id: "basisDate", label: "Дата заявления", type: "date", required: true },
      { id: "collectiveClause", label: "Пункт коллективного договора", type: "text", defaultValue: "п. 16 в) Коллективного договора ТОО «СТ Эсэмбли» на 2025-2028 гг." },
      { id: "collectiveClauseKz", label: "Пункт договора (каз.)", type: "text", defaultValue: "2025-2028 жж. «СТ Эсэмбли» ЖШС коллективтік шартының 16 в) тармағы" },
      { id: "signatory", label: "Подписант", type: "select", options: [
        { value: "generalDirector", label: "Генеральный директор" }
      ], defaultValue: "generalDirector" },
      { id: "signatoryName", label: "ФИО подписанта", type: "text", defaultValue: "С. Жолик" }
    ],
    build: (data) => {
      const d = normalizeData(data);

      return {
        ru: [
          "По кадрам",
          "О предоставлении отпуска с сохранением заработной платы",
          `       В соответствии с ${d.collectiveClause}, на основании заявления ${d.initialsDative} от ${d.basisDateRu},`,
          "        ПРИКАЗЫВАЮ:",
          `Предоставить ${d.position} ${d.fioDative} отпуск с сохранением заработной платы сроком на ${d.daysWordRu} – ${d.periodRu}.`,
          buildSignatoryLine(d.signatoryRu, d.signatoryName),
          ...ACK_RU
        ],
        kz: [
          "Кадрлар бойынша",
          "Еңбекақы сақталатын демалыс беру туралы",
          `       ${d.collectiveClauseKz} сәйкес, ${d.initialsDative} ${d.basisDateKz} күнгі өтініші негізінде,`,
          "        БҰЙЫРЫҚ БЕРЕМІН:",
          `${d.position} ${d.fioKzDative} еңбекақы сақталатын демалыс ${d.daysWordKz} – ${d.periodKz} берілсін.`,
          buildSignatoryLine(d.signatoryKz, d.signatoryName),
          ...ACK_KZ
        ]
      };
    }
  }
};
