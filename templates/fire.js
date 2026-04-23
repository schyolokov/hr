function fireTemplate(data) {
  return {
    ru: `Уволить ${data.fio} с должности ${data.position} ${data.date}`,
    kz: `${data.fio} ${data.date} күні ${data.position} қызметінен босатылсын`
  };
}
