 const scriptUrl = 'https://script.google.com/macros/s/AKfycbzsHqtRSGLkIb-MsjLPdP_i1z4Yz94CAqJyqqIgubUpuCPmwRtQRry-sh9VNOdlpIVJgg/exec'; // Ссылка на развернутое веб-приложение gas
 let dataOnSite; // Данные которые сейчас на экране
 
 window.onload = () => {
     showAllContacts(); // Показать все контакты\
     dataOnSite = JSON.parse(localStorage.getItem("dataOnSite"));
 }
 
 // Функция для вывода формы добавления контакта
 function AdderSettings() 
 {
     if(contactForm.style.display == "none")
     {
        contactForm.style.display = "block";
     }
     else 
     {
        contactForm.style.display = "none";
     }
 }
 
 // Функция для обработки нажатия на кнопку добавления контакта
 function SubmitBtn() 
 {
     const nameInput = document.getElementById("name");
     const phoneInput = document.getElementById("phone");
     const emailInput = document.getElementById("email");
     phoneInput.value = phoneInput.value.replaceAll("-","");
     phoneInput.value = phoneInput.value.replaceAll(/[a-zA-Z]+/g,"");
     let regex = new RegExp("^[a-zA-Z\\d._-]+@[a-zA-Z\\d.-]+\\.[a-zA-Z]{2,4}$");
     if (nameInput.value =="" || IsNameInDataOnSite(nameInput.value)) 
     {
         emptyName.style.display = "block";
         emptyPhone.style.display = "none";
         emptyEmail.style.display = "none";
         window.location.href = "index.html#name";
         return;
     }
     if(phoneInput.value != "")
     {
        if(phoneInput.value[0] != "3") {
            phoneInput.value = "38"+phoneInput.value;
        }
        if(phoneInput.value[0] == "+") {
            phoneInput.value = phoneInput.value.substring(1,phoneInput.value.length);
        }
        if (phoneInput.value == "" || phoneInput.value.length != 12) {
            emptyPhone.style.display = "block";
            emptyName.style.display = "none";
            emptyEmail.style.display = "none";
            window.location.href = "index.html#phone";
            return;
        }
     }
     if(emailInput.value != "")
     {
        if (!(regex.test(emailInput.value))) {
            emptyEmail.style.display = "block";
            emptyName.style.display = "none";
            emptyPhone.style.display = "none";
            window.location.href = "index.html#email";
            return;
        }
     } 
     // Установка полей
     const companyInput = document.getElementById("company");
     const groupInput = document.getElementById("group");
     const addressInput = document.getElementById("address");
     const birthdayInput = document.getElementById("birthday");
     const lastCall = document.getElementById("lastCall");
     const additionInput = document.getElementById("additionalInfo");
     const descriptionInput = document.getElementById("description");
     emptyName.style.display = "none";
     emptyPhone.style.display = "none";
     emptyEmail.style.display = "none";
     console.log(nameInput.value + " " + companyInput.value + " " + groupInput.value + " " + phoneInput.value + " " + emailInput.value + " " + addressInput.value + " " + birthdayInput.value + " " + lastCall.value+ " " + additionInput.value + " " + descriptionInput.value);
     // Вызов функции добавления/изменения
     addPostData(nameInput, companyInput, groupInput, phoneInput, emailInput, addressInput, birthdayInput, lastCall, additionInput, descriptionInput);
 }

  // Функция для обработки нажатия на кнопку изменения контакта
  function SubmitBtn1() 
  {
      const nameInput = document.getElementById("name1");
      const phoneInput = document.getElementById("phone1");
      const emailInput = document.getElementById("email1");
      phoneInput.value = phoneInput.value.replaceAll("-","");
      phoneInput.value = phoneInput.value.replaceAll(/[a-zA-Z]+/g,"");
      let regex = new RegExp("^[a-zA-Z\\d._-]+@[a-zA-Z\\d.-]+\\.[a-zA-Z]{2,4}$");
      if (nameInput.value =="") 
      {
          emptyName1.style.display = "block";
          emptyPhone1.style.display = "none";
          emptyEmail1.style.display = "none";
          window.location.href = "index.html#name1";
          return;
      }
      if(phoneInput.value != "")
      {
         if(phoneInput.value[0] != "3") {
             phoneInput.value = "38"+phoneInput.value;
         }
         if(phoneInput.value[0] == "+") {
             phoneInput.value = phoneInput.value.substring(1,phoneInput.value.length);
         }
         if (phoneInput.value == "" || phoneInput.value.length != 12) {
             emptyPhone1.style.display = "block";
             emptyName1.style.display = "none";
             emptyEmail1.style.display = "none";
             window.location.href = "index.html#phone1";
             return;
         }
      }
      if(emailInput.value != "")
      {
         if (!(regex.test(emailInput.value))) {
             emptyEmail1.style.display = "block";
             emptyName1.style.display = "none";
             emptyPhone1.style.display = "none";
             window.location.href = "index.html#email1";
             return;
         }
      } 
      // Установка полей
      const companyInput = document.getElementById("company1");
      const groupInput = document.getElementById("group1");
      const addressInput = document.getElementById("address1");
      const birthdayInput = document.getElementById("birthday1");
      const lastCall = document.getElementById("lastCall1");
      const additionInput = document.getElementById("additionalInfo1");
      const descriptionInput = document.getElementById("description1");
      emptyName1.style.display = "none";
      emptyPhone1.style.display = "none";
      emptyEmail1.style.display = "none";
      console.log(nameInput.value + " " + companyInput.value + " " + groupInput.value + " " + phoneInput.value + " " + emailInput.value + " " + addressInput.value + " " + birthdayInput.value + " " + lastCall.value+ " " + additionInput.value + " " + descriptionInput.value);
      // Вызов функции добавления/изменения
      addPostData(nameInput, companyInput, groupInput, phoneInput, emailInput, addressInput, birthdayInput, lastCall, additionInput, descriptionInput);
  }

 function CancelBtn() 
 {
     window.location.href = "index.html";
 }

 // Проверяет есть ли имя  в базе данных
 function IsNameInDataOnSite(name)
{
    for(var i = 0; i < dataOnSite.length; i++)
    {
        if(name == dataOnSite[i].name) return true;
    }
    return false;
}

 
 // Функция добавления/изменения контакта
 function addPostData(nameInput, companyInput, groupInput, phoneInput, emailInput, addressInput, birthdayInput, lastCall, additionInput, descriptionInput) {
     const formData = new FormData();
     dataOnSite = JSON.parse(localStorage.getItem("dataOnSite"));
     if ("index" in localStorage) 
     {
        dataOnSite[localStorage.getItem("index")] = {
            "name": nameInput.value,
            "company": companyInput.value,
            "group": groupInput.value,
            "birthday": birthdayInput.value,
            "phone": parseInt(phoneInput.value),
            "email": emailInput.value,
            "address": addressInput.value,
            "lastCall": lastCall.value,
            "addition": additionInput.value,
            "description": descriptionInput.value
        };
        localStorage.removeItem("index")
        localStorage.setItem("dataOnSite", JSON.stringify(dataOnSite));
     } 
     else 
     {
         dataOnSite.unshift({
             "name": nameInput.value,
             "company": companyInput.value,
             "group": groupInput.value,
             "birthday": birthdayInput.value,
             "phone": parseInt(phoneInput.value),
             "email": emailInput.value,
             "address": addressInput.value,
             "lastCall": null,
             "addition": additionInput.value,
             "description": descriptionInput.value
         });
         localStorage.setItem("dataOnSite", JSON.stringify(dataOnSite));
     }
 
 // Указание типа операции
     formData.append('operation', 'addPostData');
 // Добавление данных
     formData.append('name', nameInput.value);
     formData.append('company', companyInput.value);
     formData.append('group', groupInput.value);
     formData.append('phone', phoneInput.value);
     formData.append('email', emailInput.value);
     formData.append('address', addressInput.value);
     formData.append('birthday', birthdayInput.value);
     formData.append('lastCall', lastCall.value);
     formData.append('addition', additionInput.value);
     formData.append('description', descriptionInput.value);
     localStorage.setItem("size", dataOnSite.length);
     addGotData(dataOnSite);
     //window.location.href = "index.html";
     console.log(dataOnSite);
     console.log(formData);
 // Передача данных
     fetch(scriptUrl, {
         method: 'POST', body: formData
     })
         .then(res => res.json())
         .then(data => {window.location.href = "index.html";});
 }
 
 // Функция вывода всех контактов
 function showAllContacts() {
    let dataLocal = JSON.parse(localStorage.getItem("dataOnSite"));
    if (("dataOnSite" in localStorage) && (dataLocal.length === JSON.parse(localStorage.getItem("size")))) {
        sort()
    } else {
        // Отправляется запрос
        fetch(scriptUrl)//
            .then(res => res.json())
            .then(data => {
                data = data.reverse();
                localStorage.setItem("size", data.length);
                localStorage.setItem("dataOnSite", JSON.stringify(data));
                // Получаем данные
                dataOnSite = data;
                sort()
            })
    }
}
 
 // Функция отображения всех контактов
 function addGotData(data) {
     listOfContact.innerHTML = "";
     //За каждую строку в таблице получаем по ряду
     data.forEach((row, index) => {
         if (row.name !== 'Name' && row.name !== '') // Проверка важных ячеек, чтоб не выводилась пустота
         {
             listOfContact.innerHTML += "<li class=\"list-group-item\">\n" +
                 "            <div class=\"contact-short-info\">\n" +
                 "                <a class=\"contact-name id" + index + "\">\n" +
                 row.name +
                 "                </a>\n" +
                 "                <div class = 'contact-buttons'>\n"  +
                 //Кнопка звонка
                 "               <button type=\"button\" class=\"btn-icon-update\" onclick=\"updateLastCall(this)\" data-name='" + row.name + "'><span class='phoneMe'></span>Call</button>\n" +
                 //Кнопка изменения контакта
                 "                <button type=\"button\" class=\"btn-icon-edit\" onclick=\"editContactFunction(this)\" data-name='" + row.name + "' data-company='" + row.company + "' data-group='" + row.group + "' data-birthday='" + row.birthday + "' data-phone='" + row.phone + "' data-email='" + row.email + "' data-address='" + row.address + "' data-lastCall='" + row.lastCall + "' data-addition='" + row.addition + "' data-description='" + row.description + "' data-id='" + index + "' ><span class='penMe'></span>Edit</button>\n" +
                 //Кнопка удаления контакта
                 "                <button type=\"button\" class=\"btn-icon-delete\" onclick=\"deleteContactFunction(this)\" data-name='" + row.name + "'><span class='trashMe'></span>Delete</button>\n" +
                 "            </div>\n" +
                 "            </div>\n" +
                 "            <div style='display : none;' class=\"contact-full-info\" id=\"id" + index + "\">\n" +
                 "                <div class=\"contact-card\">\n" +
                 "                    <p><b>Company:</b> " + row.company +
                 "                    </p><p><b>Group:</b> " + row.group +
                 "                    </p><p><b>Birthday:</b> " + new Date(row.birthday).toLocaleDateString() +
                 "                    </p><p><b>Phone:</b> " + row.phone +
                 "                    </p><p><b>Email:</b> " + row.email +
                 "                    </p><p><b>Address:</b> " + row.address +
                 "                    </p><p><b>Last Call:</b> " + new Date(row.lastCall).toLocaleString() +
                 "                    </p><p><b>Addition Info:</b> " + row.addition +
                 "                    </p><p><b>Description:</b> " + row.description +
                 "                </div>\n" +
                 "            </div>\n" +
                 "        </li>"
         }
     })
 }
 
 // Функция изменения контакта
 function editContactFunction(object) {
     // Выводим форму для заполнения
     //listOfContact.classList.add("collapse");
     //sortForm.classList.add("collapse");
     //contactForm.classList.remove("collapse");
     listOfContact.style.display = "none";
     contactForm1.style.display = "block";
     // Заполняем поля уже имеющимися данными
     document.getElementById("name1").setAttribute('value', object.getAttribute("data-name"));
     document.getElementById("company1").setAttribute('value', object.getAttribute("data-company"));
     document.getElementById("group1").setAttribute('value', object.getAttribute("data-group"));
     document.getElementById("birthday1").setAttribute('value', object.getAttribute("data-birthday"));
     document.getElementById("phone1").setAttribute('value', object.getAttribute("data-phone"));
     document.getElementById("email1").setAttribute('value', object.getAttribute("data-email"));
     document.getElementById("address1").setAttribute('value', object.getAttribute("data-address"));
     document.getElementById("lastCall1").setAttribute('value', object.getAttribute("data-lastCall"));
     document.getElementById("additionalInfo1").setAttribute('value', object.getAttribute("data-addition"));
     document.getElementById("description1").setAttribute('value', object.getAttribute("data-description"));
     //let tmp = ('{"name":"' + object.getAttribute("data-name") + '","company":"' + object.getAttribute("data-company") + '","group":"' + object.getAttribute("data-group") + '","birthday":"' + object.getAttribute("data-birthday") + '","phone":' + object.getAttribute("data-phone") + ',"email":"' + object.getAttribute("data-email") + '","address":"' + object.getAttribute("data-address") + '","lastCall":' + JSON.stringify(object.getAttribute("data-lastCall")) + ',"addition":"' + object.getAttribute("data-addition") + '","description":"' + object.getAttribute("data-description") + '"}')
     localStorage.setItem("index", object.getAttribute("data-id"));
 }
 
 // Функция удаления контакта
 function deleteContactFunction(object) {
     let data = JSON.parse(localStorage.getItem("dataOnSite"));
     let Index = data.findIndex(o => o.name == object.getAttribute("data-name"))
     data.splice(Index, 1);
     localStorage.setItem("dataOnSite", JSON.stringify(data));
     const formData = new FormData();
     // Указание типа операции
     formData.append('operation', 'deleteContact');
     // Передача номера в качестве параметра
     formData.append('name', object.getAttribute("data-name"));
     addGotData(data);
     localStorage.setItem("size", data.length);
     // Запрос
     fetch(scriptUrl, {
         method: 'POST', body: formData
     })
 
         .then(res => res.json())
 }
 
 // Функция поиска данных
 function searchContact() {
     const searchSelect = document.getElementById("searchSelect");
     const searchInput = document.getElementById("searchInput");
     const formData = new FormData();
     // Указываем операцию
     formData.append('operation', 'searchContact');
     // Указываем колонку по которой идёт поиск
     formData.append('column', searchSelect.value);
     // Указываем значение по которому идёт поиск
     formData.append('value', searchInput.value);
     // Посылаем запрос
     fetch(scriptUrl, {
         method: 'POST', body: formData
     })
         .then(res => res.json())
         .then(data => {
             //Получаем данные
             dataOnSite = data;
             //Выводим данные
             console.log(dataOnSite);
             //localStorage.setItem("dataShowed", JSON.stringify(data));
             addGotData(dataOnSite);
             //sort();
         })
     //listOfContact.classList.remove("collapse");
     //contactForm.classList.add("collapse");
     //sortForm.classList.remove("collapse");
     //addGotData(dataOnSite);
 }
 
 // Функция экспорта контактов
 function exportContacts() {
     //Создаём файл со значением наших данных
     let a = document.createElement("a");
     //let dataOnSite = JSON.parse(localStorage.getItem("dataOnSite"));  // Без этого экспортит то, что на сайте ОТОБРАЖАЕТСЯ
     let file = new Blob([JSON.stringify(dataOnSite.reverse())], {type: "application/json"});
     a.href = URL.createObjectURL(file);
     a.download = "export.json";
     //Инициируем скачивание
     a.click();
 }
 
 //Функция поиска файла для импорта
 function getImportFile() {
     //Инициируем нажатие на fileInput
     let fileInput = document.getElementById("file");
     fileInput.click();
 }
 
 //Функция импорта
 function importContacts() {
     //Ищем файл
     let fileInput = document.getElementById("file");
     getImportFile()
     //Когда нашли:
     fileInput.onchange = () => {
         //Валидируем получение файла
         if (!fileInput) {
             alert("Um, couldn't find the file input element.");
         } else if (!fileInput.files) {
             alert("This browser doesn't seem to support the `files` property of file inputs.");
         } else if (!fileInput.files[0]) {
             alert("Please select a file before clicking 'Load'");
         } else {
             //Файл корректен, читаем данные, отправляем данные в таблицу
             let file = fileInput.files[0];
             let fr = new FileReader();
             fr.onload = receivedText;
             fr.readAsText(file);
         }
 
         //Функция отправки данных импорта
         function receivedText(e) {
             //Парсим данные
             let lines = JSON.parse(e.target.result);
             lines.lastCall = new Date(lines.lastCall).toLocaleString()
             localStorage.setItem("dataOnSite", JSON.stringify(lines));
             // показать все данные в таблице
             localStorage.setItem("size", lines.length);
             lines = e.target.result
             sort()
             //Добавляем данные в форму
             const formData = new FormData();
             formData.append('operation', 'importContacts'); // тип операции
             formData.append('data', lines); // номер телефона
             //Отправляем запрос с формой в параметре
             fetch(scriptUrl, {
                 method: 'POST', body: formData
             })
                 .then(() => {
                 })
         }
     };
 }
 
 //Функция, реализующая напоминание
 function reminder() {
     const formData = new FormData();
     // Указываем операцию
     formData.append('operation', 'reminder');
     // Делаем запрос напоминания
     fetch(scriptUrl, {
         method: 'POST', body: formData
     })
         .then(res => res.json())
 }
 
 // Устанавливаем интервал напоминания
 setInterval(reminder, 86400000);
 
 //Функция, которая обновляет дату последнего звонка
 function updateLastCall(object) {
     let data = JSON.parse(localStorage.getItem("dataOnSite"));
     let date = new Date();
     let dateNow = new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds());
     let Index = data.findIndex(o => o.name == object.getAttribute("data-name"));
     data[Index].lastCall = dateNow;
     localStorage.setItem("dataOnSite", JSON.stringify(data));
     const formData = new FormData();
     // Указываем операцию
     formData.append('operation', 'updateLastCall');
     // Указываем номер телефона
     formData.append('name', object.getAttribute("data-name"));
     // Отображаем данные в тегах
     sort();
     // Отправляем запрос
     fetch(scriptUrl, {
         method: 'POST', body: formData
     })
         .then(res => res.json())
 }
 
 function sort() {
     let sortType = document.getElementById("sortParam");
     //sortType.value;
     let data = JSON.parse(localStorage.getItem("dataOnSite"));
     if (sortType.value == "name") {
         data.sort(function (a, b) {
             if (a.name.toString().toLowerCase() < b.name.toString().toLowerCase()) {
                 return -1;
             }
             if (a.name.toString().toLowerCase() > b.name.toString().toLowerCase()) {
                 return 1;
             }
             return 0;
         })
     } else if (sortType.value == "lastCall") {
         data.sort(function (a, b) {
             let date1 = new Date(a.lastCall)
             let date2 = new Date(b.lastCall)
             if (date1 < date2) {
                 return 1;
             }
             if (date1 > date2) {
                 return -1;
             }
             return 0;
         })
     }
     localStorage.setItem("dataOnSite", JSON.stringify(data));
     addGotData(data);
 }

 function sync() {
     localStorage.clear();
     window.location.href = "index.html";
 }