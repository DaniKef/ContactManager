import AsyncStorage from "@react-native-async-storage/async-storage";
const scriptUrl =
  "https://script.google.com/macros/s/AKfycbzloWTXdF-228RRjsfjZZGlxkKc7RhkeMxBj-hnBRm2v-oFwtpM7PON6uUuxE6JZpqGow/exec"; // Ссылка на развернутое веб-приложение gas

// Проверяет есть ли имя  в базе данных
function IsNameInDataOnSite(name, listOfContacts) {
  for (var i = 0; i < listOfContacts.length; i++) {
    if (name == listOfContacts[i].name) return true;
  }
  return false;
}

function addPostData(
  login,
  password,
  listOfContacts,
  name,
  company,
  group,
  phone,
  email,
  address,
  birthday,
  addition,
  description,
  navigation,
  oldName,
  setErrorTextName,
  setErrorTextPhone,
  setErrorTextEmail,
  setErrorTextGroup,
  isEdit
) {
  let regex = new RegExp("^[a-zA-Z\\d._-]+@[a-zA-Z\\d.-]+\\.");
  setErrorTextName("");
  setErrorTextPhone("");
  setErrorTextEmail("");
  setErrorTextGroup("");
  if (name == "" || name == undefined) {
    setErrorTextName("This field is incorrect");
    return;
  }
  if (!isEdit) {
    if (IsNameInDataOnSite(name, listOfContacts)) {
      setErrorTextName("This name already exists");
      return;
    }
  }
  if (group == "" || group == undefined) {
    setErrorTextGroup("This field cant be empty");
    return;
  }
  if (phone != "" && phone != undefined) {
    if (phone[0] == "+") {
      phone = phone.substring(1, phone.length);
    }
    if (phone[0] != "3") {
      phone = "38" + phone;
    }
    if (phone == "" || phone == undefined || phone.length != 12) {
      setErrorTextPhone("Incorrect phone number");
      return;
    }
  }
  if (email != "" && email != undefined) {
    if (!regex.test(email)) {
      setErrorTextEmail("Incorrect email");
      return;
    }
  }
  const formData = new FormData();
  var lastCall = "";
  const index = listOfContacts.findIndex((person) => person.name === oldName);
  if (listOfContacts[index] != null || listOfContacts[index] != undefined) {
    lastCall = listOfContacts[index].lastCall;
    listOfContacts[index] = {
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
    console.log("Contact changed");
    console.log(listOfContacts[index]);
  } else {
    listOfContacts.unshift({
      name: name ? name : "",
      company: company ? company : "",
      group: group ? group : "",
      birthday: birthday ? birthday : "",
      phone: parseInt(phone) ? parseInt(phone) : "",
      email: email ? email : "",
      address: address ? address : "",
      lastCall: lastCall ? lastCall : "",
      addition: addition ? addition : "",
      description: description ? description : "",
    });
    console.log("Adding contact.....");
  }
  _storeListOfContacts(JSON.stringify(listOfContacts));
  // Указание типа операции
  formData.append("operation", "addPostData");
  // Добавление данных
  formData.append("emailUser", login);
  formData.append("password", password);
  formData.append("oldName", oldName);
  formData.append("name", name);
  formData.append("company", company ? company : "");
  formData.append("group", group ? group : "");
  formData.append("phone", phone ? phone : "");
  formData.append("email", email ? email : "");
  formData.append("address", address ? address : "");
  formData.append("birthday", birthday ? birthday : "");
  formData.append("lastCall", lastCall);
  formData.append("addition", addition ? addition : "");
  formData.append("description", description ? description : "");
  // Передача данных
  fetch(scriptUrl, {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      navigation.navigate("home");
    })
    .catch();
}

async function getListOfContacts(login, password) {
  const formData = new FormData();
  formData.append("operation", "getListOfContacts");
  formData.append("emailUser", login);
  formData.append("password", password);
  return fetch(scriptUrl, {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("use fetch getListOfContacts");
      _storeListOfContacts(JSON.stringify(data));
      return data;
    });
}
const _storeListOfContacts = async (data) => {
  try {
    await AsyncStorage.setItem("listOfContacts", data);
  } catch (error) {
    console.log("Error storing");
  }
};

const LogInUser = (mail, password, navigation, setErrorText) => {
  const formData = new FormData();
  formData.append("operation", "logIn");
  formData.append("emailUser", mail);
  formData.append("password", password);
  fetch(scriptUrl, {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then((data) => {
      if (data[0].result == "NotExists") {
        console.log("Login error. Check the data");
        setErrorText("Login error. Check the data");
        return "Error";
      } else {
        setErrorText("Login successful");
        _storeUserInformation(data[0].result, data[0].password);
        navigation.navigate("home");
      }
    });
};

const _storeUserInformation = async (mail, password) => {
  try {
    await AsyncStorage.setItem("login", mail);
    await AsyncStorage.setItem("password", password);
  } catch (error) {
    console.log("Error storing");
  }
};

function RegistrationUser(mail, password, confirmPassword, setErrorText) {
  let regex = new RegExp("^[a-zA-Z\\d._-]+@[a-zA-Z\\d.-]+\\.");
  if (password.length < 4) {
    setErrorText("Too short password");
  } else if (password != confirmPassword) {
    setErrorText("Password mismatch");
  } else if (!regex.test(mail)) {
    setErrorText("Invalid mail entered");
  } else {
    const formData = new FormData();
    formData.append("operation", "registration");
    formData.append("emailUser", mail);
    formData.append("password", password);
    return fetch(scriptUrl, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data[0].result == "Exists") {
          setErrorText("Error. User with this email already exists");
          return "Error. User with this email already exists";
        } else {
          setErrorText("Registration completed successfully");
          return "Registration completed successfully";
        }
      })
      .catch();
  }
}

function deleteContactFunction(
  login,
  password,
  contact,
  listOfContacts,
  navigation
) {
  const index = listOfContacts.findIndex((item) => item.name == contact.name);
  listOfContacts.splice(index, 1);
  _storeListOfContacts(JSON.stringify(listOfContacts));
  const formData = new FormData();
  // Указание типа операции
  formData.append("operation", "deleteContact");
  // Передача номера в качестве параметра
  formData.append("name", contact.name);
  formData.append("emailUser", login);
  formData.append("password", password);
  // Запрос
  fetch(scriptUrl, {
    method: "POST",
    body: formData,
  }).then((res) => res.json());
  navigation.navigate("home");
}

function updateLastCall(login, password, contact, listOfContacts, navigation) {
  //let data = JSON.parse(localStorage.getItem("dataOnSite"));
  let date = new Date();
  let dateNow = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds()
  );
  let index = listOfContacts.findIndex((o) => o.name == contact.name);
  listOfContacts[index].lastCall = dateNow;
  _storeListOfContacts(JSON.stringify(listOfContacts));
  const formData = new FormData();
  // Указываем операцию
  formData.append("operation", "updateLastCall");
  // Указываем номер телефона
  formData.append("name", contact.name);
  formData.append("emailUser", login);
  formData.append("password", password);
  // Отправляем запрос
  fetch(scriptUrl, {
    method: "POST",
    body: formData,
  }).then((res) => res.json());
}

export {
  addPostData,
  getListOfContacts,
  LogInUser,
  RegistrationUser,
  deleteContactFunction,
  updateLastCall,
};
