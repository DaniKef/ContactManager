function doGet(e) { 
    return HtmlService.createHtmlOutput('hello');
  }
  
  function doPost(e) { 
    var isExistAlready = false;
    let content = JSON.parse(e.postData.contents); 
    let regex = new RegExp("^[a-zA-Z\\d._-]+@[a-zA-Z\\d.-]+\\.");
    var lastRow = sheetUsers.getLastRow();
    var currentIndex;
    for(var index = 1; index <= lastRow; index = index + 1) 
    {
      var currentChat_id = sheetUsers.getRange(index,3).getValue(); 
      if(currentChat_id == content.message.chat.id) 
      { 
        isExistAlready = true;
        currentIndex = index;
      }
    }
    if(!isExistAlready)
    {
      let payload = { 
      chat_id: content.message.chat.id,
      text: "Здравствуйте, введите свою почту для привязки вашего списка контактов к оповещениям телеграм. Изменить почту можно в любой момент, просто написав новую в этот телеграм бот."
      }
    sendMessage(payload); 
    sheetUsers.appendRow([content.message.chat.first_name,content.message.chat.last_name,content.message.chat.id]);
    }
    else 
    {
      if(regex.test(content.message.text))
      {
        sheetUsers.getRange(currentIndex,4).setValue(content.message.text);
        let payload = { 
      chat_id: content.message.chat.id,
      text: "Вы привязали почту " + content.message.text + "."
      }
    sendMessage(payload); 
      }
    }
    return HtmlService.createHtmlOutput();
   }
  
  function sendMessage(payload){ // отправить
    let options = {
      'method' : 'post',
      'contentType': 'application/json',
      'payload': JSON.stringify(payload)
    }
    return UrlFetchApp.fetch(tgBotURL + "/sendMessage", options);
  }
  
  
  
  
  
  