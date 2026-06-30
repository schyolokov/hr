if (typeof petrovich === "undefined") {
  console.warn("petrovich не подключен");
}

function declineFIO(fio, gramCase = "dative") {
  try {
    const parts = (fio || "").trim().split(/\s+/);
    if (parts.length < 2 || typeof petrovich === "undefined") {
      return fio;
    }

    const last = petrovich({ last: parts[0] || "" }, gramCase).last;
    const first = petrovich({ first: parts[1] || "" }, gramCase).first;
    const middle = parts[2] ? petrovich({ middle: parts[2] }, gramCase).middle : "";

    return [last, first, middle].filter(Boolean).join(" ");
  } catch {
    return fio;
  }
}

const vowelsSoft = ["е", "і", "ө", "ү", "э"];
const vowelsHard = ["а", "о", "ы", "ұ"];

function getLastVowel(word) {
  const letters = word.toLowerCase().split("").reverse();
  for (const letter of letters) {
    if (vowelsSoft.includes(letter) || vowelsHard.includes(letter)) {
      return letter;
    }
  }
  return "а";
}

function isSoft(word) {
  return vowelsSoft.includes(getLastVowel(word));
}

function kzDative(word) {
  const last = word.toLowerCase().slice(-1);
  const soft = isSoft(word);

  if ("бвгджз".includes(last)) {
    return word + (soft ? "ге" : "ға");
  }

  if ("пкстфхцчшщ".includes(last)) {
    return word + (soft ? "ке" : "қа");
  }

  return word + (soft ? "ге" : "ға");
}

function kzAccusative(word) {
  const last = word.toLowerCase().slice(-1);
  const soft = isSoft(word);

  if ("бвгджз".includes(last)) {
    return word + (soft ? "ді" : "ды");
  }

  if ("пкстфхцчшщ".includes(last)) {
    return word + (soft ? "ті" : "ты");
  }

  return word + (soft ? "ді" : "ды");
}

function kzDativeFIO(fio) {
  const parts = (fio || "").trim().split(/\s+/);
  if (!parts.length) return "";

  return parts.map((part, index) => (index === 0 ? kzDative(part) : part)).join(" ");
}

function kzAccusativeFIO(fio) {
  const parts = (fio || "").trim().split(/\s+/);
  if (!parts.length) return "";

  return parts.map((part, index) => (index === 0 ? kzAccusative(part) : part)).join(" ");
}
