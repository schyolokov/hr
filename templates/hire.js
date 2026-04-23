function hireTemplate(data) {
  return {
    ru: `
ПРИКАЗ

О приеме на работу

Принять ${data.fio} на должность ${data.position} с ${data.date}.
Основание: трудовой договор.

Директор __________
    `,
    kz: `
БҰЙРЫҚ

Жұмысқа қабылдау туралы

${data.fio} ${data.date} бастап ${data.position} лауазымына қабылдансын.

Директор __________
    `
  };
}
