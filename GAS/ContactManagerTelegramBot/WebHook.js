
const id = '1Kfeb5dhalfHD7Zy7tn8QK48BFqBxyOP726hrSQUC4Io';         // id нужной таблицы google, изменить на то, что надо
const sheetUsers = SpreadsheetApp.openById(id).getSheetByName('Users'); // Нужный лист таблицы с пользователями, изменить на то, что надо

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const token = "5906894541:AAEHvDXuFgTBvSCx4M4ZNMxIpDM-Vfrj52g";  // Токен бота, не менять
const tgBotURL = "https://api.telegram.org/bot" + token;  // URL бота, не менять
const hookUrl = "https://script.google.com/macros/s/AKfycbxtPtgAhUxwowIHVDYa546SxBIX2nJ6BbiR62eyUw7XZbBtUcjQ90dQ-_I0RTuEFovZ/exec"; // webhook бота, не менять

function setWebHook() 
{ 
  let response = UrlFetchApp.fetch(tgBotURL + "/setWebhook?url=" + hookUrl);
  Logger.log('telegram response status is ' + response.getResponseCode());
}

function getWebHook() 
{  
  let response = UrlFetchApp.fetch(tgBotURL + "/getWebhookInfo");
  if (response.getResponseCode() == 200) {
    let data = JSON.parse(response.getContentText())
    Logger.log('current webhook url is ' + data.result.url);
  } else {
    Logger.log('telegram response status is ' + response.getResponseCode());
  }
}