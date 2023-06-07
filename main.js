const scriptUrl =
  "https://script.google.com/macros/s/AKfycbzloWTXdF-228RRjsfjZZGlxkKc7RhkeMxBj-hnBRm2v-oFwtpM7PON6uUuxE6JZpqGow/exec"; // Ссылка на развернутое веб-приложение gas
let dataOnSite; // Данные которые сейчас на экране

function include(url) {
  // Подключение другого файла js.
  var script = document.createElement("script");
  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
}
include("user.js");

window.onload = () => {
  // При загрузке.
  let user = new User(); // Создание класса пользователя.
  user.setButton(); // Установка нужных кнопок - авторизации, выхода из аккаунта.
  dataOnSite = JSON.parse(localStorage.getItem("dataOnSite")); //Присвоение переменной из локального хранилища контаков.
};

// Функция для вывода формы добавления контакта
function AdderSettings() {
  if (contactForm.style.display == "none") {
    contactForm.style.display = "block";
  } else {
    contactForm.style.display = "none";
  }
}

// Функция для обработки нажатия на кнопку добавления контакта
function SubmitBtn() {
  const nameInput = document.getElementById("name");
  const phoneInput = document.getElementById("phone");
  const emailInput = document.getElementById("email");
  phoneInput.value = phoneInput.value.replaceAll("-", "");
  phoneInput.value = phoneInput.value.replaceAll(/[a-zA-Z]+/g, "");
  let regex = new RegExp("^[a-zA-Z\\d._-]+@[a-zA-Z\\d.-]+\\.");
  if (nameInput.value == "") {
    emptyName.style.display = "block";
    emptyPhone.style.display = "none";
    emptyEmail.style.display = "none";
    window.location.href = "index.html#name";
    return;
  }
  if (IsNameInDataOnSite(nameInput.value)) {
    existsName.style.display = "block";
    emptyPhone.style.display = "none";
    emptyEmail.style.display = "none";
    window.location.href = "index.html#name";
    return;
  }
  if (phoneInput.value != "") {
    if (phoneInput.value[0] != "3") {
      phoneInput.value = "38" + phoneInput.value;
    }
    if (phoneInput.value[0] == "+") {
      phoneInput.value = phoneInput.value.substring(1, phoneInput.value.length);
    }
    if (phoneInput.value == "" || phoneInput.value.length != 12) {
      emptyPhone.style.display = "block";
      emptyName.style.display = "none";
      emptyEmail.style.display = "none";
      window.location.href = "index.html#phone";
      return;
    }
  }
  if (emailInput.value != "") {
    if (!regex.test(emailInput.value)) {
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
  // Вызов функции добавления/изменения
  addPostData(
    nameInput,
    companyInput,
    groupInput,
    phoneInput,
    emailInput,
    addressInput,
    birthdayInput,
    lastCall,
    additionInput,
    descriptionInput
  );
}

// Функция для обработки нажатия на кнопку изменения контакта
function SubmitBtn1() {
  const nameInput = document.getElementById("name1");
  const phoneInput = document.getElementById("phone1");
  const emailInput = document.getElementById("email1");
  phoneInput.value = phoneInput.value.replaceAll("-", "");
  phoneInput.value = phoneInput.value.replaceAll(/[a-zA-Z]+/g, "");
  let regex = new RegExp("^[a-zA-Z\\d._-]+@[a-zA-Z\\d.-]+\\.");
  if (nameInput.value == "") {
    emptyName1.style.display = "block";
    emptyPhone1.style.display = "none";
    emptyEmail1.style.display = "none";
    window.location.href = "index.html#name1";
    return;
  }
  if (phoneInput.value != "") {
    if (phoneInput.value[0] != "3") {
      phoneInput.value = "38" + phoneInput.value;
    }
    if (phoneInput.value[0] == "+") {
      phoneInput.value = phoneInput.value.substring(1, phoneInput.value.length);
    }
    if (phoneInput.value == "" || phoneInput.value.length != 12) {
      emptyPhone1.style.display = "block";
      emptyName1.style.display = "none";
      emptyEmail1.style.display = "none";
      window.location.href = "index.html#phone1";
      return;
    }
  }
  if (emailInput.value != "") {
    if (!regex.test(emailInput.value)) {
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
  // Вызов функции добавления/изменения
  addPostData(
    nameInput,
    companyInput,
    groupInput,
    phoneInput,
    emailInput,
    addressInput,
    birthdayInput,
    lastCall,
    additionInput,
    descriptionInput
  );
}

function CancelBtn() {
  //Кнопка отмены.
  window.location.href = "index.html";
}

// Проверяет есть ли имя  в базе данных
function IsNameInDataOnSite(name) {
  for (var i = 0; i < dataOnSite.length; i++) {
    if (name == dataOnSite[i].name) return true;
  }
  return false;
}

// Функция добавления/изменения контакта
function addPostData(
  nameInput,
  companyInput,
  groupInput,
  phoneInput,
  emailInput,
  addressInput,
  birthdayInput,
  lastCall,
  additionInput,
  descriptionInput
) {
  const formData = new FormData();
  dataOnSite = JSON.parse(localStorage.getItem("dataOnSite"));
  var oldName = "";
  if ("index" in localStorage) {
    oldName = dataOnSite[localStorage.getItem("index")].name;
    dataOnSite[localStorage.getItem("index")] = {
      name: nameInput.value,
      company: companyInput.value,
      group: groupInput.value,
      birthday: birthdayInput.value,
      phone: parseInt(phoneInput.value),
      email: emailInput.value,
      address: addressInput.value,
      lastCall: lastCall.value,
      addition: additionInput.value,
      description: descriptionInput.value,
    };
    localStorage.removeItem("index");
    localStorage.setItem("dataOnSite", JSON.stringify(dataOnSite));
    console.log("Изменение");
  } else {
    dataOnSite.unshift({
      name: nameInput.value,
      company: companyInput.value,
      group: groupInput.value,
      birthday: birthdayInput.value,
      phone: parseInt(phoneInput.value),
      email: emailInput.value,
      address: addressInput.value,
      lastCall: null,
      addition: additionInput.value,
      description: descriptionInput.value,
    });
    localStorage.setItem("dataOnSite", JSON.stringify(dataOnSite));
    console.log("Добавление");
  }

  // Указание типа операции
  formData.append("operation", "addPostData");
  // Добавление данных
  formData.append("emailUser", localStorage.getItem("login"));
  formData.append("password", localStorage.getItem("password"));
  formData.append("oldName", oldName);
  formData.append("name", nameInput.value);
  formData.append("company", companyInput.value);
  formData.append("group", groupInput.value);
  formData.append("phone", phoneInput.value);
  formData.append("email", emailInput.value);
  formData.append("address", addressInput.value);
  formData.append("birthday", birthdayInput.value);
  formData.append("lastCall", lastCall.value);
  formData.append("addition", additionInput.value);
  formData.append("description", descriptionInput.value);
  localStorage.setItem("size", dataOnSite.length);
  addGotData(dataOnSite);
  console.log(dataOnSite);
  console.log(formData);
  // Передача данных
  fetch(scriptUrl, {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then((data) => {
      window.location.href = "index.html";
    });
}

// Функция вывода всех контактов
function showAllContacts() {
  let dataLocal = JSON.parse(localStorage.getItem("dataOnSite"));
  if (
    "dataOnSite" in localStorage &&
    dataLocal.length === JSON.parse(localStorage.getItem("size"))
  ) {
    sort();
  } else {
    const formData = new FormData();
    formData.append("operation", "getListOfContacts");
    formData.append("emailUser", localStorage.getItem("login"));
    formData.append("password", localStorage.getItem("password"));
    fetch(scriptUrl, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        data = data.reverse();
        localStorage.setItem("size", data.length);
        localStorage.setItem("dataOnSite", JSON.stringify(data));
        // Получаем данные
        dataOnSite = data;
        sort();
      });
  }
}

// Функция отображения всех контактов
function addGotData(data) {
  listOfContact.innerHTML = "";
  if (data.length == 0) {
    listOfContact.innerHTML +=
      " <li class='list-group-item-footer'><p>Немає контактів!</p></li>";
  } else {
    //За каждую строку в таблице получаем по ряду
    data.forEach((row, index) => {
      if (row.name !== "Name" && row.name !== "") {
        // Проверка важных ячеек, чтоб не выводилась пустота
        listOfContact.innerHTML +=
          '<li class="list-group-item">\n' +
          '            <div class="contact-short-info">\n' +
          '                <a class="contact-name id' +
          index +
          '">\n' +
          row.name +
          "                </a>\n" +
          "                <div class = 'contact-buttons'>\n" +
          //Кнопка звонка
          "               <a href='tel:" +
          row.phone +
          '\'><button type="button" class="btn-icon-update" onclick="updateLastCall(this)" data-name=\'' +
          row.name +
          "'><span class='phoneMe'></span>Call</button></a>\n" +
          //Кнопка изменения контакта
          '                <button type="button" class="btn-icon-edit" onclick="editContactFunction(this)" data-name=\'' +
          row.name +
          "' data-company='" +
          row.company +
          "' data-group='" +
          row.group +
          "' data-birthday='" +
          row.birthday +
          "' data-phone='" +
          row.phone +
          "' data-email='" +
          row.email +
          "' data-address='" +
          row.address +
          "' data-lastCall='" +
          row.lastCall +
          "' data-addition='" +
          row.addition +
          "' data-description='" +
          row.description +
          "' data-id='" +
          index +
          "' ><span class='penMe'></span>Edit</button>\n" +
          //Кнопка удаления контакта
          '                <button type="button" class="btn-icon-delete" onclick="deleteContactFunction(this)" data-name=\'' +
          row.name +
          "'><span class='trashMe'></span>Delete</button>\n" +
          "            </div>\n" +
          "            </div>\n" +
          '            <div style=\'display : none;\' class="contact-full-info" id="id' +
          index +
          '">\n' +
          '                <div class="contact-card">\n' +
          "                    <p><b>Company:</b> " +
          row.company +
          "                    </p><div class='line_under_contact-card'></div><p><b>Group:</b> " +
          row.group +
          "                    </p><div class='line_under_contact-card'></div><p><b>Birthday:</b> " +
          new Date(row.birthday).toLocaleDateString() +
          "                    </p><div class='line_under_contact-card'></div><p><b>Phone:</b> " +
          row.phone +
          "                    </p><div class='line_under_contact-card'></div><p><b>Email:</b> " +
          row.email +
          "                    </p><div class='line_under_contact-card'></div><p><b>Address:</b> " +
          row.address +
          "                    </p><div class='line_under_contact-card'></div><p><b>Last Call:</b> " +
          new Date(row.lastCall).toLocaleString() +
          "                    </p><div class='line_under_contact-card'></div><p><b>Addition Info:</b> " +
          row.addition +
          "                    </p><div class='line_under_contact-card'></div><p><b>Description:</b> " +
          row.description +
          "                </div>\n" +
          "            </div>\n" +
          "        </li>";
      }
    });
  }
}

// Функция изменения контакта
function editContactFunction(object) {
  // Выводим форму для заполнения
  listOfContact.style.display = "none";
  contactForm1.style.display = "block";
  // Заполняем поля уже имеющимися данными
  document
    .getElementById("name1")
    .setAttribute("value", object.getAttribute("data-name"));
  document
    .getElementById("company1")
    .setAttribute("value", object.getAttribute("data-company"));
  document
    .getElementById("group1")
    .setAttribute("value", object.getAttribute("data-group"));
  document
    .getElementById("birthday1")
    .setAttribute("value", object.getAttribute("data-birthday"));
  document
    .getElementById("phone1")
    .setAttribute("value", object.getAttribute("data-phone"));
  document
    .getElementById("email1")
    .setAttribute("value", object.getAttribute("data-email"));
  document
    .getElementById("address1")
    .setAttribute("value", object.getAttribute("data-address"));
  document
    .getElementById("lastCall1")
    .setAttribute("value", object.getAttribute("data-lastCall"));
  document
    .getElementById("additionalInfo1")
    .setAttribute("value", object.getAttribute("data-addition"));
  document
    .getElementById("description1")
    .setAttribute("value", object.getAttribute("data-description"));
  localStorage.setItem("index", object.getAttribute("data-id"));
}

// Функция удаления контакта
function deleteContactFunction(object) {
  let data = JSON.parse(localStorage.getItem("dataOnSite"));
  let Index = data.findIndex((o) => o.name == object.getAttribute("data-name"));
  data.splice(Index, 1);
  localStorage.setItem("dataOnSite", JSON.stringify(data));
  const formData = new FormData();
  // Указание типа операции
  formData.append("operation", "deleteContact");
  // Передача номера в качестве параметра
  formData.append("name", object.getAttribute("data-name"));
  formData.append("emailUser", localStorage.getItem("login"));
  formData.append("password", localStorage.getItem("password"));
  addGotData(data);
  localStorage.setItem("size", data.length);
  // Запрос
  fetch(scriptUrl, {
    method: "POST",
    body: formData,
  }).then((res) => res.json());
}

include("search.js");
// Функция поиска данных
function searchContact() {
  /*
     const searchSelect = document.getElementById("searchSelect");
     const searchInput = document.getElementById("searchInput");
     const formData = new FormData();
     // Указываем операцию
     formData.append('operation', 'searchContact');
     formData.append('emailUser', localStorage.getItem("login"));
     formData.append('password', localStorage.getItem("password"));
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
             addGotData(dataOnSite);
         })
         */
  const searchSelect = document.getElementById("searchSelect");
  const searchInput = document.getElementById("searchInput");
  dataOnSite = searchContacts(searchSelect.value, searchInput.value);
  addGotData(dataOnSite);
}

// Функция экспорта контактов
function exportContacts() {
  //Создаём файл со значением наших данных
  let a = document.createElement("a");
  let file = new Blob([JSON.stringify(dataOnSite.reverse())], {
    type: "application/json",
  });
  a.href = URL.createObjectURL(file);
  a.download = "export.json";
  //Инициируем скачивание
  a.click();
}

function exportContactsGG() {
  console.log("11");
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
  getImportFile();
  //Когда нашли:
  fileInput.onchange = () => {
    //Валидируем получение файла
    if (!fileInput) {
      alert("Um, couldn't find the file input element.");
    } else if (!fileInput.files) {
      alert(
        "This browser doesn't seem to support the `files` property of file inputs."
      );
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
      lines.lastCall = new Date(lines.lastCall).toLocaleString();
      localStorage.setItem("dataOnSite", JSON.stringify(lines));
      // показать все данные в таблице
      localStorage.setItem("size", lines.length);
      lines = e.target.result;
      sort();
      //Добавляем данные в форму
      const formData = new FormData();
      formData.append("operation", "importContacts"); // тип операции
      formData.append("data", lines);
      formData.append("emailUser", localStorage.getItem("login"));
      formData.append("password", localStorage.getItem("password"));
      //Отправляем запрос с формой в параметре
      fetch(scriptUrl, {
        method: "POST",
        body: formData,
      }).then(() => {});
    }
  };
}

function importContactsVCF() {
  //Ищем файл
  let fileInput = document.getElementById("file");
  getImportFile();
  //Когда нашли:
  fileInput.onchange = () => {
    //Валидируем получение файла
    if (!fileInput) {
      alert("Um, couldn't find the file input element.");
    } else if (!fileInput.files) {
      alert(
        "This browser doesn't seem to support the `files` property of file inputs."
      );
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
      let lines = parse(e.target.result);
      localStorage.setItem("dataOnSite", JSON.stringify(lines));
      // показать все данные в таблице
      localStorage.setItem("size", lines.length);
      sort();
      //Добавляем данные в форму
      const formData = new FormData();
      formData.append("operation", "importContacts"); // тип операции
      formData.append("data", JSON.stringify(lines));
      formData.append("emailUser", localStorage.getItem("login"));
      formData.append("password", localStorage.getItem("password"));
      //Отправляем запрос с формой в параметре
      fetch(scriptUrl, {
        method: "POST",
        body: formData,
      }).then(() => {});
    }
  };
}

//Функция, которая обновляет дату последнего звонка
function updateLastCall(object) {
  let data = JSON.parse(localStorage.getItem("dataOnSite"));
  let date = new Date();
  let dateNow = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds()
  );
  let Index = data.findIndex((o) => o.name == object.getAttribute("data-name"));
  data[Index].lastCall = dateNow;
  localStorage.setItem("dataOnSite", JSON.stringify(data));
  const formData = new FormData();
  // Указываем операцию
  formData.append("operation", "updateLastCall");
  // Указываем номер телефона
  formData.append("name", object.getAttribute("data-name"));
  formData.append("emailUser", localStorage.getItem("login"));
  formData.append("password", localStorage.getItem("password"));
  // Отображаем данные в тегах
  sort();
  // Отправляем запрос
  fetch(scriptUrl, {
    method: "POST",
    body: formData,
  }).then((res) => res.json());
}

function sort() {
  let sortType = document.getElementById("sortParam");
  let data = JSON.parse(localStorage.getItem("dataOnSite"));
  if (sortType.value == "nameAZ") {
    data.sort(function (a, b) {
      if (a.name.toString().toLowerCase() < b.name.toString().toLowerCase()) {
        return -1;
      }
      if (a.name.toString().toLowerCase() > b.name.toString().toLowerCase()) {
        return 1;
      }
      return 0;
    });
  } else if (sortType.value == "nameZA") {
    data.sort(function (a, b) {
      if (a.name.toString().toLowerCase() > b.name.toString().toLowerCase()) {
        return -1;
      }
      if (a.name.toString().toLowerCase() < b.name.toString().toLowerCase()) {
        return 1;
      }
      return 0;
    });
  } else if (sortType.value == "lastCall") {
    data.sort(function (a, b) {
      let date1 = new Date(a.lastCall);
      let date2 = new Date(b.lastCall);
      if (date1 < date2) {
        return 1;
      }
      if (date1 > date2) {
        return -1;
      }
      return 0;
    });
  } else if (sortType.value == "birthday") {
    data.sort(function (a, b) {
      let date1 = new Date(a.birthday);
      let date2 = new Date(b.birthday);
      if (date1 > date2) {
        return 1;
      }
      if (date1 < date2) {
        return -1;
      }
      return 0;
    });
  }
  localStorage.setItem("dataOnSite", JSON.stringify(data));
  addGotData(data);
}

function sync() {
  localStorage.removeItem("dataOnSite");
  localStorage.removeItem("size");
  window.location.href = "index.html";
}

var PREFIX = "BEGIN:VCARD",
  POSTFIX = "END:VCARD";
/**
 * Return json representation of vCard
 * @param {string} string raw vCard
 * @returns {*}
 */
function parse(string) {
  var jsonArr = [];
  let name = "";
  let company = "";
  let group = "";
  let birthday = "";
  let phone = "";
  let email = "";
  let address = "";
  let lastCall = "";
  let addition = "";
  let description = "";

  var lines = string.split(/\r\n|\r|\n/),
    count = lines.length,
    pieces,
    key,
    value,
    meta,
    namespace;

  for (var i = 0; i < count; i++) {
    if (lines[i] === "") {
      continue;
    }
    if (
      lines[i].toUpperCase() === PREFIX ||
      lines[i].toUpperCase() === POSTFIX
    ) {
      continue;
    }
    var data = lines[i];

    /**
     * Check that next line continues current
     * @param {number} i
     * @returns {boolean}
     */
    var isValueContinued = function (i) {
      return (
        i + 1 < count && (lines[i + 1][0] === " " || lines[i + 1][0] === "\t")
      );
    };
    // handle multiline properties (i.e. photo).
    // next line should start with space or tab character
    if (isValueContinued(i)) {
      while (isValueContinued(i)) {
        data += lines[i + 1].trim();
        i++;
      }
    }

    pieces = data.split(":");
    key = pieces.shift();
    value = pieces.join(":");
    namespace = false;
    meta = {};

    // meta fields in property
    if (key.match(/;/)) {
      key = key.replace(/\\;/g, "ΩΩΩ").replace(/\\,/, ",");
      var metaArr = key.split(";").map(function (item) {
        return item.replace(/ΩΩΩ/g, ";");
      });
      key = metaArr.shift();
      metaArr.forEach(function (item) {
        var arr = item.split("=");
        arr[0] = arr[0].toLowerCase();
        if (arr[0].length === 0) {
          return;
        }
        if (meta[arr[0]]) {
          meta[arr[0]].push(arr[1]);
        } else {
          meta[arr[0]] = [arr[1]];
        }
      });
    }

    // values with \n
    value = value.replace(/\\n/g, "\n");

    value = tryToSplit(value);

    // Grouped properties
    if (key.match(/\./)) {
      var arr = key.split(".");
      key = arr[1];
      namespace = arr[0];
    }

    var newValue = {
      value: value,
    };
    if (Object.keys(meta).length) {
      newValue.meta = meta;
    }
    if (namespace) {
      newValue.namespace = namespace;
    }

    if (key.indexOf("X-") !== 0) {
      key = key.toLowerCase();
    }

    // if (typeof result[key] === "undefined") {
    //   result[key] = [newValue];
    // } else {
    //   result[key].push(newValue);
    // }
    //console.log(newValue.value + " ==== " + key);
    if (key == "version") {
      const temp = {
        name: name,
        company: company,
        group: group,
        birthday: birthday,
        phone: phone,
        email: email,
        address: address,
        lastCall: lastCall,
        addition: addition,
        description: description,
      };
      jsonArr.push(temp);
    }
    if (key == "fn") {
      name = newValue.value;
    }
    if (key == "org") {
      company = newValue.value;
    }
    if (key == "group") {
      group = "";
    }
    if (key == "bday") {
      birthday = newValue.value;
    }
    if (key == "tel") {
      phone = newValue.value;
    }
    if (key == "email") {
      email = newValue.value;
    }
    if (key == "adr") {
      address = newValue.value;
    }
    if (key == "lastCall") {
      lastCall = "";
    }
    if (key == "addition") {
      addition = "";
    }
    if (key == "description") {
      description = "";
    }
    if (i == count - 1 || i == count - 2 || i == count - 3 || i == count - 4) {
      const temp = {
        name: name,
        company: company,
        group: group,
        birthday: birthday,
        phone: phone,
        email: email,
        address: address,
        lastCall: lastCall,
        addition: addition,
        description: description,
      };
      jsonArr.push(temp);
    }
  }
  return jsonArr;
}

var HAS_SEMICOLON_SEPARATOR = /[^\\];|^;/,
  HAS_COMMA_SEPARATOR = /[^\\],|^,/;
/**
 * Split value by "," or ";" and remove escape sequences for this separators
 * @param {string} value
 * @returns {string|string[]
 */
function tryToSplit(value) {
  if (value.match(HAS_SEMICOLON_SEPARATOR)) {
    value = value.replace(/\\,/g, ",");
    return splitValue(value, ";");
  } else if (value.match(HAS_COMMA_SEPARATOR)) {
    value = value.replace(/\\;/g, ";");
    return splitValue(value, ",");
  } else {
    return value.replace(/\\,/g, ",").replace(/\\;/g, ";");
  }
}
/**
 * Split vcard field value by separator
 * @param {string|string[]} value
 * @param {string} separator
 * @returns {string|string[]}
 */
function splitValue(value, separator) {
  var separatorRegexp = new RegExp(separator);
  var escapedSeparatorRegexp = new RegExp("\\\\" + separator, "g");
  // easiest way, replace it with really rare character sequence
  value = value.replace(escapedSeparatorRegexp, "ΩΩΩ");
  if (value.match(separatorRegexp)) {
    value = value.split(separator);

    value = value.map(function (item) {
      return item.replace(/ΩΩΩ/g, separator);
    });
  } else {
    value = value.replace(/ΩΩΩ/g, separator);
  }
  return value;
}

var guid = (function () {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return function () {
    return (
      s4() +
      s4() +
      "-" +
      s4() +
      "-" +
      s4() +
      "-" +
      s4() +
      "-" +
      s4() +
      s4() +
      s4()
    );
  };
})();

var COMMA_SEPARATED_FIELDS = ["nickname", "related", "categories", "pid"];
var REQUIRED_FIELDS = ["fn"];
