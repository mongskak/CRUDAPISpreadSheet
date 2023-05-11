  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getActiveSheet();
 function doGet() {
  let data = [];
  const rlen = sheet.getLastRow();
  const clen = sheet.getLastColumn();
  const rows = sheet. getRange(1, 1, rlen, clen).getValues();
  for (let i = 0; i < rows.length; i++){
    const dataRow = rows[i];
    let record={};
  for (let j = 0; j < clen; j++) {
    const columnName = rows[0][j].replace(/ /g, '_'); // ganti spasi dengan underscore
    record[columnName] = dataRow[j];
  }

    if (i > 0) {
      data.push(record);
    }
  }

  const response = {
    "data": data
  }
  console.log(response);
   return ContentService.createTextOutput(JSON.stringify(response)).setMimeType(ContentService.MimeType.JSON);

 }
function getColumnNames() {
  const row = 1;
  const column = 1;
  const numRows = 1;
  const numColumns = sheet.getLastColumn();
  const values = sheet.getRange(row, column, numRows, numColumns).getValues();
  const columnNames = values[0];
  console.log(columnNames)
  return columnNames;
}

function doPost(request) {
  const action = request.parameter.action;
  const data = JSON.parse(request.postData.contents);
  const uuid = Utilities.getUuid();

  const row = 1;
  const column = 1;
  const numRows = 1;
  const numColumns = sheet.getLastColumn();
  const values = sheet.getRange(row, column, numRows, numColumns).getValues();
  const columnNames = values[0];

    const idIndex = columnNames.indexOf("id"); // mencari index kolom id
    const rowToUpdate = findRowIndexById(sheet, data.id, idIndex);

  function findRowIndexById(sheet, id, idIndex) {
  const numRows = sheet.getLastRow();
  const values = sheet.getRange(1, 1, numRows, idIndex + 1).getValues();
  for (let i = 1; i < values.length; i++) {
    if (values[i][idIndex] === id) {
      return i + 1; // tambahkan 1 karena index baris dimulai dari 1, sedangkan index array dimulai dari 0
    }
  }
  }

  if (action == 'insert') {
    const rowValues = columnNames.map(column => {
      if (column === "id") {
        return uuid; // set uuid as value for "id" column
      } else {
        return data[column]; // get value from data object for other columns
      }
    });
    sheet.appendRow(rowValues);

    const lastRow = sheet.getLastRow();
    const addedRowValues = sheet.getRange(lastRow, 1, 1, numColumns).getValues()[0];
  
    let responseData = {};
    for (let i = 0; i < columnNames.length; i++) {
    responseData[columnNames[i]] = addedRowValues[i];
    }
    let response = {
      "success": true,
      "message": "Sukses Menambahkan Data",
      "data": responseData
    };
    
    return ContentService.createTextOutput(JSON.stringify(response)).setMimeType(ContentService.MimeType.JSON);
  }

if (action == 'update') {
    if (rowToUpdate !== -1) { // jika baris ditemukan, lakukan update
      for (let i = 1; i < columnNames.length; i++) { // mulai dari index kolom 1 (kolom setelah kolom id)
        if (data[columnNames[i]]) { // jika data untuk kolom ini diberikan, maka update nilai pada kolom tersebut
          sheet.getRange(rowToUpdate, i + 1).setValue(data[columnNames[i]]);
        }
      }
      let response = {
        "success": true,
        "message": "Sukses melakukan perubahan data",
        "data": data
      };
      return ContentService.createTextOutput(JSON.stringify(response)).setMimeType(ContentService.MimeType.JSON);
    } else {
      let response = {
        "success": false,
        "message": "Data tidak ditemukan",
        "data": data
      };
      return ContentService.createTextOutput(JSON.stringify(response)).setMimeType(ContentService.MimeType.JSON);
    }
  }


if (action == 'delete') {
  const uuid = data.id;
  const values = sheet.getDataRange().getValues(); // mengambil data dari seluruh sheet
  let rowToDelete = -1;
  
  // mencari baris yang memiliki nilai id yang sama dengan uuid
  for (let i = 0; i < values.length; i++) {
    if (values[i][0] === uuid) {
      rowToDelete = i + 1; // baris dihitung dari 1, sedangkan array dihitung dari 0
      break;
    }
  }
  
  if (rowToDelete !== -1) { // jika baris ditemukan, lakukan delete
    sheet.deleteRow(rowToDelete);
    
    let response = {
      "success": true,
      "message": "Sukses Menghapus Data",
      "data": request
    };
    
    return ContentService.createTextOutput(JSON.stringify(response)).setMimeType(ContentService.MimeType.JSON);
  } else { // jika baris tidak ditemukan, kirimkan respon dengan pesan error
    let response = {
      "success": false,
      "message": "Data tidak ditemukan",
      "data": request
    };
    
    return ContentService.createTextOutput(JSON.stringify(response)).setMimeType(ContentService.MimeType.JSON);
  }
}

if (action == 'getbyid') {
  const uuid = data.id;
  const values = sheet.getDataRange().getValues(); // mengambil data dari seluruh sheet
  let rowData = null;
  
  // mencari baris yang memiliki nilai id yang sama dengan uuid
  for (let i = 0; i < values.length; i++) {
    if (values[i][0] === uuid) {
      rowData = values[i];
      break;
    }
  }

  if (rowData !== null) { // jika data ditemukan, kirimkan respon dengan data yang ditemukan
    let dataObj = {};
    for (let j = 0; j < columnNames.length; j++) {
      dataObj[columnNames[j]] = rowData[j];
    }

    let response = {
      "success": true,
      "message": "Data ditemukan",
      "data": dataObj
    };

    return ContentService.createTextOutput(JSON.stringify(response)).setMimeType(ContentService.MimeType.JSON);
  } else { // jika data tidak ditemukan, kirimkan respon dengan pesan error
    let response = {
      "success": false,
      "message": "Data tidak ditemukan",
      "data": request
    };

    
    return ContentService.createTextOutput(JSON.stringify(response)).setMimeType(ContentService.MimeType.JSON);
  }
}


}

