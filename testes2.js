date = 44321;

function excelDateToJSDate(excelDate) {
  var date = new Date(Math.round((excelDate - (25567 + 1)) * 86400 * 1000) - 1);
  var converted_date = date.toISOString().split("T")[0];
  return converted_date;
}

console.log(excelDateToJSDate(date));
