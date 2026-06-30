const MONTHS_RU = [
  "января", "февраля", "марта", "апреля", "мая", "июня",
  "июля", "августа", "сентября", "октября", "ноября", "декабря"
];

const MONTHS_KZ = [
  "қаңтар", "ақпан", "наурыз", "сәуір", "мамыр", "маусым",
  "шілде", "тамыз", "қыркүйек", "қазан", "қараша", "желтоқсан"
];

function parseISODate(value) {
  if (!value) return null;
  const [year, month, day] = value.split("-").map(Number);
  if (!year || !month || !day) return null;
  return { year, month, day };
}

function formatDateRu(value) {
  const date = parseISODate(value);
  if (!date) return "";
  return `${date.day} ${MONTHS_RU[date.month - 1]} ${date.year} года`;
}

function formatDateKz(value) {
  const date = parseISODate(value);
  if (!date) return "";
  return `${date.year} жылғы ${date.day} ${MONTHS_KZ[date.month - 1]}`;
}

function daysWordRu(count) {
  const n = Number(count);
  if (!Number.isFinite(n) || n <= 0) return "";

  const mod10 = n % 10;
  const mod100 = n % 100;

  if (mod10 === 1 && mod100 !== 11) {
    return `${n} календарный день`;
  }
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) {
    return `${n} календарных дня`;
  }
  return `${n} календарных дней`;
}

function daysWordKz(count) {
  const n = Number(count);
  if (!Number.isFinite(n) || n <= 0) return "";
  return `${n} күнтізбелік күн`;
}

function getInitials(fio, gramCase = "nominative") {
  const parts = (fio || "").trim().split(/\s+/);
  if (parts.length < 2) return fio || "";

  const lastName = typeof declineFIO === "function"
    ? declineFIO(fio, gramCase).split(/\s+/)[0]
    : parts[0];

  const firstInitial = parts[1] ? `${parts[1][0]}.` : "";
  const middleInitial = parts[2] ? `${parts[2][0]}.` : "";

  return `${lastName} ${firstInitial}${middleInitial}`.trim();
}

function formatPeriodRu(fromDate, toDate, singleDate) {
  if (singleDate) {
    return formatDateRu(singleDate);
  }
  if (fromDate && toDate) {
    return `с ${formatDateRu(fromDate)} по ${formatDateRu(toDate)}`;
  }
  return "";
}

function formatPeriodKz(fromDate, toDate, singleDate) {
  if (singleDate) {
    return formatDateKz(singleDate);
  }
  if (fromDate && toDate) {
    return `${formatDateKz(fromDate)} - ${formatDateKz(toDate)} аралығына`;
  }
  return "";
}

function buildSignatoryLine(role, name) {
  const paddedRole = (role || "").padEnd(72, " ");
  return `${paddedRole}${name || ""}`;
}

const SIGNATORY_OPTIONS = {
  generalDirector: {
    ru: "Генеральный директор",
    kz: "Бас директор"
  },
  hrDirector: {
    ru: "HR директор",
    kz: "HR директор"
  },
  productionDirector: {
    ru: "Производственный директор",
    kz: "Өндірістік директор"
  }
};

function getSignatoryLabels(key) {
  return SIGNATORY_OPTIONS[key] || SIGNATORY_OPTIONS.generalDirector;
}

function normalizeData(data) {
  const singleDay = data.singleDay === true || data.singleDay === "true";
  const days = Number(data.days || (singleDay ? 1 : 0));

  return {
    ...data,
    singleDay,
    days,
    daysWordRu: daysWordRu(days),
    daysWordKz: daysWordKz(days),
    fioDative: typeof declineFIO === "function" ? declineFIO(data.fio || "", "dative") : (data.fio || ""),
    fioAccusative: typeof declineFIO === "function" ? declineFIO(data.fio || "", "accusative") : (data.fio || ""),
    fioKzDative: typeof kzDativeFIO === "function" ? kzDativeFIO(data.fio || "") : (data.fio || ""),
    fioKzAccusative: typeof kzAccusativeFIO === "function" ? kzAccusativeFIO(data.fio || "") : (data.fio || ""),
    initialsDative: getInitials(data.fio || "", "dative"),
    basisDateRu: formatDateRu(data.basisDate),
    basisDateKz: formatDateKz(data.basisDate),
    recallDateRu: formatDateRu(data.recallDate),
    recallDateKz: formatDateKz(data.recallDate),
    periodRu: formatPeriodRu(data.fromDate, data.toDate, singleDay ? data.singleDate : ""),
    periodKz: formatPeriodKz(data.fromDate, data.toDate, singleDay ? data.singleDate : ""),
    signatoryRu: getSignatoryLabels(data.signatory).ru,
    signatoryKz: getSignatoryLabels(data.signatory).kz
  };
}
