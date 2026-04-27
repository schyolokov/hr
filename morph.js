// --- РУССКОЕ СКЛОНЕНИЕ ФИО ---

function declineFIO(fio, gramCase = "dative") {
  try {
    const parts = fio.split(" ");
    return petrovich(
      {
        first: parts[1] || "",
        last: parts[0] || "",
        middle: parts[2] || ""
      },
      gramCase
    ).last + " " +
    petrovich({ first: parts[1] }, gramCase).first + " " +
    (parts[2] ? petrovich({ middle: parts[2] }, gramCase).middle : "");
  } catch {
    return fio;
  }
}


// --- КАЗАХСКАЯ МОРФОЛОГИЯ (упрощённая, но рабочая) ---

const vowelsSoft = ["е","і","ө","ү","э"];
const vowelsHard = ["а","о","ы","ұ"];

function getLastVowel(word) {
  const letters = word.toLowerCase().split("").reverse();
  for (let l of letters) {
    if (vowelsSoft.includes(l) || vowelsHard.includes(l)) {
      return l;
    }
  }
  return "а";
}

function isSoft(word) {
  return vowelsSoft.includes(getLastVowel(word));
}

// Дательный падеж (кому? чему?)
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
