const { log } = require("console");
const fileSystem = require("fs");

function getData(fileName) {
  const result = JSON.parse(
    fileSystem.readFileSync("src/database/" + fileName, "utf8")
  );
  return result;
}

function createOrUpdateData(fileName, data) {
  fileSystem.writeFileSync("src/database/" + fileName, JSON.stringify(data));
}

function excelDateToJSDate(excelDate) {
  var date = new Date(Math.round((excelDate - (25567 + 1)) * 86400 * 1000) - 1);
  var converted_date = date.toISOString().split("T")[0];
  return converted_date;
}

function parseData(oldItem, updateItem) {
  return { ...oldItem, ...updateItem };
}

function removeDuplicatedFromArray(array) {
  let newArray = [];
  array.forEach((number) => {
    if (!newArray.includes(number)) {
      newArray.push(number);
      //console.log(newArray);
    }
  });
  return newArray;
}

module.exports = {
  getData,
  createOrUpdateData,
  excelDateToJSDate,
  parseData,
  removeDuplicatedFromArray,
};
