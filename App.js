import {
  Text,
  View,
  ScrollView,
  FlatList,
  TextInput,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  Image,
  Linking,
  StatusBar,
} from "react-native";
import React, { useState, useCallback, useEffect } from "react";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer, useRoute } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as SplashScreen from "expo-splash-screen";
import * as FileSystem from "expo-file-system";
import { StorageAccessFramework } from "expo-file-system";
import * as DocumentPicker from "expo-document-picker";
import { styles, stylesAuthorization, stylesHeader, stylesMain } from "./Style";
import {
  addPostData,
  getListOfContacts,
  LogInUser,
  RegistrationUser,
  deleteContactFunction,
  updateLastCall,
  importContacts,
} from "./mainF";
import { searchContacts } from "./search";
import { sortContacts } from "./sort";
import { useFonts } from "expo-font";

const Stack = createStackNavigator();

export default function App() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const loadAsyncStorage = async () => {
    try {
      const valueLogin = await AsyncStorage.getItem("login");
      const valuePassword = await AsyncStorage.getItem("password");
      if (valueLogin !== null || valuePassword !== null) {
        setLogin(valueLogin);
        setPassword(valuePassword);
      }
    } catch (error) {
      console.log("Error loading login/password", error);
    }
  };
  useEffect(() => {
    loadAsyncStorage();
  }, []);
  const [fontsLoaded] = useFonts({
    Alkatra: require("./assets/fonts/Alkatra-VariableFont_wght.ttf"),
  });
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);
  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer
      initialRouteName={userExists(login, password) ? "home" : "authorization"}
    >
      <Stack.Navigator
        initialRouteName={
          userExists(login, password) ? "home" : "authorization"
        }
      >
        <Stack.Screen
          onLayoutRootView={onLayoutRootView}
          name="authorization"
          component={AuthorizationPage}
          options={{ headerShown: false, gestureEnabled: false }}
        ></Stack.Screen>
        <Stack.Screen
          onLayoutRootView={onLayoutRootView}
          name="home"
          component={HomePage}
          options={{ headerShown: false, gestureEnabled: false }}
        ></Stack.Screen>
        <Stack.Screen
          onLayoutRootView={onLayoutRootView}
          name="contactInformation"
          component={ContactInformationPage}
          options={{ headerShown: false, gestureEnabled: false }}
        ></Stack.Screen>
        <Stack.Screen
          onLayoutRootView={onLayoutRootView}
          name="addContact"
          component={AddContactPage}
          options={{ headerShown: false, gestureEnabled: false }}
        ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const AuthorizationPage = ({ navigation }) => {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [shouldShow, setShouldShow] = useState(true);
  const [errorText, setErrorText] = useState("");
  // const handleErrorTextChange = (newText) => {
  //   setErrorText(newText);
  // };
  const clearAsyncStorage = async () => {
    AsyncStorage.clear();
  };
  useEffect(() => {
    const focusAuthorizationPage = navigation.addListener("focus", () => {
      setErrorText("");
      clearAsyncStorage();
      console.log("Do Clearing AsyncStorage");
    });
    return focusAuthorizationPage;
  }, [navigation]);
  return (
    <View style={stylesAuthorization.container}>
      <View
        style={{ flex: 0.6, alignItems: "center", justifyContent: "center" }}
      >
        <View style={stylesAuthorization.circleBlack}>
          <View style={stylesAuthorization.circleRed}></View>
        </View>
      </View>
      <View
        style={{ flex: 0.6, alignItems: "center", justifyContent: "center" }}
      >
        <Text style={{ fontFamily: "Alkatra", fontSize: 30, color: "#1a1717" }}>
          Contact Manager
        </Text>
        <Text style={{ fontFamily: "Alkatra", fontSize: 25, color: "#c75252" }}>
          Account
        </Text>
      </View>
      <View style={{ flex: 0.8, alignItems: "center" }}>
        <View style={{ alignItems: "center", width: "100%" }}>
          <TextInput
            selectionColor={"#1a1717"}
            style={{
              borderWidth: 1,
              borderRadius: 5,
              borderColor: "#1a1717",
              width: "60%",
              fontFamily: "Alkatra",
              fontSize: 17,
              paddingLeft: 5,
            }}
            placeholder="mail"
            value={mail}
            onChangeText={(text) => setMail(text)}
          />
          <TextInput
            selectionColor={"#1a1717"}
            style={{
              borderWidth: 1,
              borderRadius: 5,
              borderColor: "#1a1717",
              width: "60%",
              fontFamily: "Alkatra",
              fontSize: 17,
              paddingLeft: 5,
              marginTop: 10,
            }}
            secureTextEntry
            placeholder="password"
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          {!shouldShow ? (
            <TextInput
              selectionColor={"#1a1717"}
              style={{
                borderWidth: 1,
                borderRadius: 5,
                borderColor: "#1a1717",
                width: "60%",
                fontFamily: "Alkatra",
                fontSize: 17,
                paddingLeft: 5,
                marginTop: 10,
              }}
              secureTextEntry
              placeholder="confirm password"
              value={confirmPassword}
              onChangeText={(text) => setConfirmPassword(text)}
            />
          ) : null}
        </View>
        {shouldShow ? (
          <View
            style={{
              flexDirection: "row",
              marginTop: 30,
              justifyContent: "space-evenly",
              alignContent: "center",
              width: "80%",
            }}
          >
            <TouchableOpacity
              style={stylesAuthorization.button}
              onPress={() => {
                LogInUser(mail, password, navigation, setErrorText);
              }}
            >
              <Text style={stylesAuthorization.buttonText}>Log In</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setShouldShow(!shouldShow);
                setErrorText("");
              }}
              style={stylesAuthorization.button}
            >
              <Text style={stylesAuthorization.buttonText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        ) : null}
        {!shouldShow ? (
          <View
            style={{
              flexDirection: "row",
              marginTop: 30,
              justifyContent: "space-evenly",
              alignContent: "center",
              width: "80%",
            }}
          >
            <TouchableOpacity
              style={stylesAuthorization.button}
              onPress={() => {
                RegistrationUser(mail, password, confirmPassword, setErrorText);
              }}
            >
              <Text style={stylesAuthorization.buttonText}>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setShouldShow(!shouldShow);
                setErrorText("");
              }}
              style={stylesAuthorization.button}
            >
              <Text style={stylesAuthorization.buttonText}>Back</Text>
            </TouchableOpacity>
          </View>
        ) : null}
        <Text
          style={{
            color: "#c75252",
            fontFamily: "Alkatra",
            fontSize: 20,
            marginTop: 30,
          }}
        >
          {errorText}
        </Text>
      </View>
    </View>
  );
};

const HomePage = ({ navigation }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenSearch, setIsOpenSearch] = useState(false);
  const [isOpenSort, setIsOpenSort] = useState(false);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [listOfContacts, setListOfContacts] = useState("");
  const [shouldShowGif, setShouldShowGif] = useState(true);
  const [searchedText, setSearchedText] = useState("");
  const [sortType, setSortType] = useState("Name (A-Z)");
  const loadAsyncStorage = async () => {
    try {
      setShouldShowGif(true);
      const valueLogin = await AsyncStorage.getItem("login");
      const valuePassword = await AsyncStorage.getItem("password");
      var valueListOfContacts = await AsyncStorage.getItem("listOfContacts");
      if (valueListOfContacts == null || valueListOfContacts.length == 0) {
        valueListOfContacts = await getListOfContactsResponse(
          valueLogin,
          valuePassword
        );
      } else {
        valueListOfContacts = JSON.parse(valueListOfContacts);
      }
      if (
        valueLogin !== null ||
        valuePassword !== null ||
        valueListOfContacts !== null
      ) {
        setLogin(valueLogin);
        setPassword(valuePassword);
        setListOfContacts(valueListOfContacts);
        setShouldShowGif(false);
      }
    } catch (error) {
      console.log(
        "Error loading login/password/listOfContacts or JSON PARSE ERROR",
        error
      );
    }
  };

  const exportFile = async (listOfContacts) => {
    const jsonData = JSON.stringify(listOfContacts);
    const permissions =
      await StorageAccessFramework.requestDirectoryPermissionsAsync();
    if (!permissions.granted) {
      return;
    }
    try {
      await StorageAccessFramework.createFileAsync(
        permissions.directoryUri,
        "export",
        "application/json"
      )
        .then(async (uri) => {
          await FileSystem.writeAsStringAsync(uri, jsonData, {
            encoding: FileSystem.EncodingType.UTF8,
          });
        })
        .catch((e) => {
          console.log(e);
        });
    } catch (e) {
      console.error("Ошибка:", e);
    }
  };

  const importFile = async () => {
    try {
      const file = await DocumentPicker.getDocumentAsync();
      if (file.type === "success" && file.mimeType === "application/json") {
        // Чтение содержимого файла
        const fileContent = await FileSystem.readAsStringAsync(file.uri);
        importContacts(login, password, fileContent);
      }
    } catch (error) {
      console.error("Ошибка:", error);
    }
  };

  const handleOpenLink = () => {
    const url = "https://t.me/contactManagerTelegram_bot";
    Linking.openURL(url)
      .then(() => {
        console.log("Ссылка открыта успешно");
      })
      .catch((error) => {
        console.error("Ошибка:", error);
      });
  };

  useEffect(() => {
    const focusHomePage = navigation.addListener("focus", () => {
      loadAsyncStorage();
    });
    return focusHomePage;
  }, [navigation]);

  useEffect(() => {}, [listOfContacts]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const toggleSearchMenu = () => {
    setIsOpenSearch(!isOpenSearch);
  };
  const toggleSortMenu = () => {
    setIsOpenSort(!isOpenSort);
  };

  const renderItemContact = ({ item }) => {
    if (item.name == "") {
      return null;
    } else
      return (
        <View
          style={{
            marginBottom: 20,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity
            style={{ width: "90%" }}
            onPress={() =>
              navigation.navigate("contactInformation", {
                data: item,
                sendLogin: login,
                sendPassword: password,
                sendListOfContacts: listOfContacts,
              })
            }
          >
            <Text
              style={{
                fontFamily: "Alkatra",
                fontSize: 20,
                color: "#1a1717",
                marginLeft: 10,
              }}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
          <Image
            source={require("./assets/row_right.png")}
            style={{ width: 20, height: 20, marginRight: 5 }}
          ></Image>
        </View>
      );
  };

  return (
    <View style={styles.container}>
      <View style={stylesHeader.containerHeader}>
        <View style={stylesHeader.headerNavbarBrand}>
          <Text style={stylesHeader.navbarLogo}>Contact manager</Text>
        </View>
        <View style={stylesHeader.headerNavbarRight}>
          <TouchableOpacity style={{ width: 50 }} onPress={toggleSearchMenu}>
            <Image
              source={require("./assets/magnifying_icon.png")}
              style={{ width: 20, height: 20 }}
            ></Image>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ width: 50, marginRight: 10 }}
            onPress={toggleSortMenu}
          >
            <View
              style={{ backgroundColor: "#c75252", width: 10, height: 2 }}
            ></View>
            <View
              style={{
                backgroundColor: "#c75252",
                width: 20,
                height: 2,
                marginTop: 5,
              }}
            ></View>
            <View
              style={{
                backgroundColor: "#c75252",
                width: 30,
                height: 2,
                marginTop: 5,
              }}
            ></View>
          </TouchableOpacity>
          <TouchableOpacity style={{ width: 30 }} onPress={toggleMenu}>
            <View style={stylesHeader.threeDots}></View>
            <View style={stylesHeader.threeDots}></View>
            <View style={stylesHeader.threeDots}></View>
          </TouchableOpacity>
          <Modal
            animationType="fade"
            transparent={true}
            visible={isOpenSearch}
            onRequestClose={() => setIsOpenSearch(false)}
          >
            <TouchableWithoutFeedback onPress={() => setIsOpenSearch(false)}>
              <View
                style={{
                  flex: 1,
                  width: "100%",
                  left: 0,
                }}
              >
                <View
                  style={{
                    backgroundColor: "white",
                    padding: 10,
                    width: "40%",
                    marginLeft: "auto",
                    marginTop: 10,
                    marginRight: 10,
                    borderColor: "black",
                    borderWidth: 1,
                  }}
                >
                  <TextInput
                    selectionColor={"#1a1717"}
                    style={{
                      borderWidth: 1,
                      borderRadius: 5,
                      borderColor: "#1a1717",
                      width: "100%",
                      fontFamily: "Alkatra",
                      fontSize: 17,
                      paddingLeft: 5,
                    }}
                    placeholder="search"
                    value={searchedText}
                    onChangeText={(text) => setSearchedText(text)}
                  />
                </View>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
          <Modal
            animationType="fade"
            transparent={true}
            visible={isOpenSort}
            onRequestClose={() => setIsOpenSort(false)}
          >
            <TouchableWithoutFeedback onPress={() => setIsOpenSort(false)}>
              <View
                style={{
                  flex: 1,
                  width: "100%",
                  left: 0,
                }}
              >
                <View
                  style={{
                    backgroundColor: "white",
                    padding: 10,
                    width: "40%",
                    marginLeft: "auto",
                    marginTop: 10,
                    marginRight: 10,
                    borderColor: "black",
                    borderWidth: 1,
                  }}
                >
                  <Text style={{ fontSize: 20, fontFamily: "Alkatra" }}>
                    Sort by:
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      setSortType("Name (A-Z)");
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 15,
                        fontFamily: "Alkatra",
                        color: "#1a1717",
                      }}
                    >
                      Name (A-Z)
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setSortType("Name (Z-A)");
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 15,
                        fontFamily: "Alkatra",
                        color: "#1a1717",
                      }}
                    >
                      Name (Z-A)
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setSortType("Recent Last Call");
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 15,
                        fontFamily: "Alkatra",
                        color: "#1a1717",
                      }}
                    >
                      Recent Last Call
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setSortType("Birthday");
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 15,
                        fontFamily: "Alkatra",
                        color: "#1a1717",
                      }}
                    >
                      Birthday
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
          <Modal
            animationType="fade"
            transparent={true}
            visible={isOpen}
            onRequestClose={() => setIsOpen(false)}
          >
            <TouchableWithoutFeedback onPress={() => setIsOpen(false)}>
              <View
                style={{
                  flex: 1,
                  width: "100%",
                  left: 0,
                }}
              >
                <View
                  style={{
                    backgroundColor: "white",
                    padding: 10,
                    width: "40%",
                    marginLeft: "auto",
                    marginTop: 10,
                    marginRight: 10,
                    borderColor: "black",
                    borderWidth: 1,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      handleOpenLink();
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 15,
                        fontFamily: "Alkatra",
                        color: "#1a1717",
                      }}
                    >
                      Telegram
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      exportFile(
                        sortContacts(
                          searchContacts(listOfContacts, searchedText),
                          sortType
                        )
                      );
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 15,
                        fontFamily: "Alkatra",
                        color: "#1a1717",
                      }}
                    >
                      Export(JSON)
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      importFile();
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 15,
                        fontFamily: "Alkatra",
                        color: "#1a1717",
                      }}
                    >
                      Import(JSON)
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setListOfContacts([]);
                      removeItemValueFromAsyncStorage("listOfContacts");
                      loadAsyncStorage();
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 15,
                        fontFamily: "Alkatra",
                        color: "#1a1717",
                      }}
                    >
                      Synchronize
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("authorization")}
                  >
                    <Text
                      style={{
                        fontSize: 15,
                        fontFamily: "Alkatra",
                        color: "#1a1717",
                      }}
                    >
                      Exit Account
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        </View>
      </View>
      <View style={stylesMain.containerMain}>
        <View style={{ marginTop: 20 }}>
          <FlatList
            data={sortContacts(
              searchContacts(listOfContacts, searchedText),
              sortType
            )}
            renderItem={renderItemContact}
          />
        </View>
        {shouldShowGif ? (
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Image
              source={require("./assets/monophy.gif")}
              style={{ width: "60%", height: "60%" }}
            ></Image>
          </View>
        ) : null}
        <View style={{ position: "absolute", right: 10, bottom: 10 }}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("addContact", {
                sendLogin: login,
                sendPassword: password,
                sendListOfContacts: listOfContacts,
                isEdit: false,
              })
            }
          >
            <Image
              source={require("./assets/addContactButton.png")}
              style={{ width: 60, height: 60 }}
            ></Image>
          </TouchableOpacity>
        </View>
      </View>
      <StatusBar></StatusBar>
    </View>
  );
};

const ContactInformationPage = ({ navigation }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const route = useRoute();
  const contact = route.params?.data;
  const login = route.params?.sendLogin;
  const password = route.params?.sendPassword;
  const listOfContact = route.params?.sendListOfContacts;
  const renderContactInfo = ({ item }) => {
    return (
      <View>
        <Text style={styles.contactInfo}>{item.key}</Text>
        <View style={styles.contactUnderLine}></View>
      </View>
    );
  };
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View
        style={{
          flex: 0.8,
          flexDirection: "row",
          backgroundColor: "#1a1717",
          borderBottomColor: "#c75252",
          borderBottomWidth: 2,
        }}
      >
        <TouchableOpacity
          style={{ width: 30, justifyContent: "center", alignItems: "center" }}
          onPress={() => navigation.navigate("home")}
        >
          <Image
            source={require("./assets/row_left.png")}
            style={{ width: "30%", height: "30%" }}
          ></Image>
        </TouchableOpacity>
        <View style={stylesHeader.headerNavbarBrand}>
          <Text style={stylesHeader.navbarLogo}>Contact manager</Text>
        </View>
        <View style={stylesHeader.headerNavbarRight}>
          <TouchableOpacity
            style={{
              width: "30%",
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => {
              deleteContactFunction(
                login,
                password,
                contact,
                listOfContact,
                navigation
              );
            }}
          >
            <Image
              source={require("./assets/delete_icon.png")}
              style={{ width: "20%", height: "30%" }}
            ></Image>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: "30%",
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => {
              navigation.navigate("addContact", {
                sendLogin: login,
                sendPassword: password,
                sendListOfContacts: listOfContact,
                data: contact,
                isEdit: true,
              });
            }}
          >
            <Image
              source={require("./assets/white_pen_change.png")}
              style={{ width: "30%", height: "30%" }}
            ></Image>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: "30%",
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={toggleMenu}
          >
            <View style={stylesHeader.threeDots}></View>
            <View style={stylesHeader.threeDots}></View>
            <View style={stylesHeader.threeDots}></View>
          </TouchableOpacity>
          <Modal
            animationType="fade"
            transparent={true}
            visible={isOpen}
            onRequestClose={() => setIsOpen(false)}
          >
            <TouchableWithoutFeedback onPress={() => setIsOpen(false)}>
              <View
                style={{
                  flex: 1,
                  width: "100%",
                  left: 0,
                }}
              >
                <View
                  style={{
                    backgroundColor: "white",
                    padding: 10,
                    width: "30%",
                    marginLeft: "auto",
                    marginTop: 10,
                    marginRight: 10,
                    borderColor: "black",
                    borderWidth: 1,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => navigation.navigate("authorization")}
                  >
                    <Text
                      style={{
                        fontSize: 15,
                        fontFamily: "Alkatra",
                        color: "#1a1717",
                      }}
                    >
                      Exit Account
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        </View>
      </View>
      <View style={stylesMain.containerMain}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Image
            source={require("./assets/contactIcon.png")}
            style={{ width: 100, height: 100, marginTop: 10, marginLeft: 10 }}
          ></Image>
          <TouchableOpacity
            style={{
              width: "30%",
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => {
              updateLastCall(
                login,
                password,
                contact,
                listOfContact,
                navigation
              );
              Linking.openURL("tel:" + contact.phone);
            }}
          >
            <Image
              source={require("./assets/phone.png")}
              style={{
                width: 50,
                height: 50,
              }}
            ></Image>
          </TouchableOpacity>
        </View>
        <View style={{ marginLeft: 10, marginTop: 10, flex: 1 }}>
          <FlatList
            data={[
              { key: "Name: " + contact.name },
              { key: "Company: " + contact.company },
              { key: "Group: " + contact.group },
              {
                key: "Birthday: " + contact.birthday,
              },
              { key: "Phone: " + contact.phone },
              { key: "Email: " + contact.email },
              { key: "Address: " + contact.address },
              {
                key:
                  "Last Call: " + new Date(contact.lastCall).toLocaleString(),
              },
              { key: "Addition Info: " + contact.addition },
              { key: "Description: " + contact.description },
            ]}
            renderItem={renderContactInfo}
          />
        </View>
      </View>
    </View>
  );
};

const AddContactPage = ({ navigation }) => {
  const [name, setName] = useState("");
  const [oldName, setOldName] = useState("");
  const [company, setCompany] = useState("");
  const [group, setGroup] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [birthday, setBirthday] = useState("");
  const [addition, setAddition] = useState("");
  const [description, setDescription] = useState("");
  const [errorTextName, setErrorTextName] = useState("");
  const [errorTextPhone, setErrorTextPhone] = useState("");
  const [errorTextEmail, setErrorTextEmail] = useState("");
  const [errorTextGroup, setErrorTextGroup] = useState("");
  const route = useRoute();
  const contact = route.params?.data;
  const login = route.params?.sendLogin;
  const password = route.params?.sendPassword;
  const listOfContacts = route.params?.sendListOfContacts;
  const isEdit = route.params?.isEdit;
  useEffect(() => {
    setErrorTextName("");
    setErrorTextPhone("");
    setErrorTextEmail("");
    setErrorTextGroup("");
    setName(contact?.name);
    setOldName(contact?.name);
    setCompany(contact?.company);
    setGroup(contact?.group);
    setPhone(String(contact?.phone ? contact?.phone : ""));
    setEmail(contact?.email);
    setAddress(contact?.address);
    setBirthday(contact?.birthday);
    setAddition(contact?.addition);
    setDescription(contact?.description);
  }, []);
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View
        style={{
          flex: 0.8,
          flexDirection: "row",
          backgroundColor: "#1a1717",
          borderBottomColor: "#c75252",
          borderBottomWidth: 2,
        }}
      >
        <TouchableOpacity
          style={{ width: 30, justifyContent: "center", alignItems: "center" }}
          onPress={() => navigation.navigate("home")}
        >
          <Image
            source={require("./assets/row_left.png")}
            style={{ width: "30%", height: "30%" }}
          ></Image>
        </TouchableOpacity>
        <View style={stylesHeader.headerNavbarBrand}>
          <Text style={stylesHeader.navbarLogo}>Contact manager</Text>
        </View>
        <View style={stylesHeader.headerNavbarRight}>
          <TouchableOpacity
            style={{
              width: 30,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => {
              addPostData(
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
              );
            }}
          >
            <Image
              source={require("./assets/yes_line.png")}
              style={{ width: 35, height: 35, marginRight: 20 }}
            ></Image>
          </TouchableOpacity>
        </View>
      </View>
      <View style={stylesMain.containerMain}>
        <ScrollView>
          <View
            style={{
              marginLeft: 10,
              marginTop: 10,
            }}
          >
            <Image
              source={require("./assets/contactIcon.png")}
              style={{ width: 70, height: 70, marginLeft: 10 }}
            ></Image>
            <View
              style={{
                flexDirection: "row",
                marginTop: 10,
                marginBottom: 5,
              }}
            >
              <Image
                source={require("./assets/name.png")}
                style={{ width: 30, height: 30 }}
              ></Image>
              <TextInput
                selectionColor={"#1a1717"}
                style={{
                  borderBottomWidth: 1,
                  borderColor: "#1a1717",
                  width: "90%",
                  fontFamily: "Alkatra",
                  fontSize: 17,
                  paddingLeft: 5,
                }}
                placeholder="name*"
                value={name}
                onChangeText={(text) => setName(text)}
              />
            </View>
            <Text style={styles.errorTextInput}>{errorTextName}</Text>
            <View
              style={{ flexDirection: "row", marginTop: 10, marginBottom: 5 }}
            >
              <Image
                source={require("./assets/company.png")}
                style={{ width: 30, height: 30 }}
              ></Image>
              <TextInput
                selectionColor={"#1a1717"}
                style={{
                  borderBottomWidth: 1,
                  borderColor: "#1a1717",
                  width: "90%",
                  fontFamily: "Alkatra",
                  fontSize: 17,
                  paddingLeft: 5,
                }}
                placeholder="company"
                value={company}
                onChangeText={(text) => setCompany(text)}
              />
            </View>
            <View
              style={{ flexDirection: "row", marginTop: 10, marginBottom: 5 }}
            >
              <Image
                source={require("./assets/group.png")}
                style={{ width: 30, height: 30 }}
              ></Image>
              <View
                style={{
                  width: "90%",
                  borderBottomWidth: 1,
                  borderColor: "#1a1717",
                }}
              >
                <Picker
                  prompt="group"
                  style={{
                    width: "60%",
                  }}
                  selectedValue={group}
                  onValueChange={(itemValue, itemIndex) => setGroup(itemValue)}
                >
                  <Picker.Item label="" value="" />
                  <Picker.Item label="friend" value="friend" />
                  <Picker.Item label="relative" value="relative" />
                  <Picker.Item label="colleague" value="colleague" />
                </Picker>
              </View>
            </View>
            <Text style={styles.errorTextInput}>{errorTextGroup}</Text>
            <View
              style={{ flexDirection: "row", marginTop: 10, marginBottom: 5 }}
            >
              <Image
                source={require("./assets/phone.png")}
                style={{ width: 30, height: 30 }}
              ></Image>
              <TextInput
                selectionColor={"#1a1717"}
                style={{
                  borderBottomWidth: 1,
                  borderColor: "#1a1717",
                  width: "90%",
                  fontFamily: "Alkatra",
                  fontSize: 17,
                  paddingLeft: 5,
                }}
                placeholder="phone"
                value={phone}
                onChangeText={(text) => setPhone(text)}
              />
            </View>
            <Text style={styles.errorTextInput}>{errorTextPhone}</Text>
            <View
              style={{ flexDirection: "row", marginTop: 10, marginBottom: 5 }}
            >
              <Image
                source={require("./assets/email.png")}
                style={{ width: 30, height: 30 }}
              ></Image>
              <TextInput
                selectionColor={"#1a1717"}
                style={{
                  borderBottomWidth: 1,
                  borderColor: "#1a1717",
                  width: "90%",
                  fontFamily: "Alkatra",
                  fontSize: 17,
                  paddingLeft: 5,
                }}
                placeholder="email"
                value={email}
                onChangeText={(text) => setEmail(text)}
              />
            </View>
            <Text style={styles.errorTextInput}>{errorTextEmail}</Text>
            <View
              style={{ flexDirection: "row", marginTop: 10, marginBottom: 5 }}
            >
              <Image
                source={require("./assets/address.png")}
                style={{ width: 30, height: 30 }}
              ></Image>
              <TextInput
                selectionColor={"#1a1717"}
                style={{
                  borderBottomWidth: 1,
                  borderColor: "#1a1717",
                  width: "90%",
                  fontFamily: "Alkatra",
                  fontSize: 17,
                  paddingLeft: 5,
                }}
                placeholder="address"
                value={address}
                onChangeText={(text) => setAddress(text)}
              />
            </View>
            <View
              style={{ flexDirection: "row", marginTop: 10, marginBottom: 5 }}
            >
              <Image
                source={require("./assets/birthday.png")}
                style={{ width: 30, height: 30 }}
              ></Image>
              <TextInput
                selectionColor={"#1a1717"}
                style={{
                  borderBottomWidth: 1,
                  borderColor: "#1a1717",
                  width: "90%",
                  fontFamily: "Alkatra",
                  fontSize: 17,
                  paddingLeft: 5,
                }}
                placeholder="birthday"
                value={birthday}
                onChangeText={(text) => setBirthday(text)}
              />
            </View>
            <View
              style={{ flexDirection: "row", marginTop: 10, marginBottom: 5 }}
            >
              <Image
                source={require("./assets/addition.png")}
                style={{ width: 30, height: 30 }}
              ></Image>
              <TextInput
                selectionColor={"#1a1717"}
                multiline
                style={{
                  borderBottomWidth: 1,
                  borderColor: "#1a1717",
                  width: "90%",
                  fontFamily: "Alkatra",
                  fontSize: 17,
                  paddingLeft: 5,
                }}
                placeholder="addition"
                value={addition}
                onChangeText={(text) => setAddition(text)}
              />
            </View>
            <View
              style={{ flexDirection: "row", marginTop: 10, marginBottom: 5 }}
            >
              <Image
                source={require("./assets/description.png")}
                style={{ width: 30, height: 30 }}
              ></Image>
              <TextInput
                selectionColor={"#1a1717"}
                multiline
                style={{
                  borderBottomWidth: 1,
                  borderColor: "#1a1717",
                  width: "90%",
                  fontFamily: "Alkatra",
                  fontSize: 17,
                  paddingLeft: 5,
                }}
                placeholder="description"
                value={description}
                onChangeText={(text) => setDescription(text)}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

async function getListOfContactsResponse(login, password) {
  const data = await getListOfContacts(login, password);
  return data;
}

const userExists = (login, password) => {
  if (
    (login == null || login == "none" || login == "") &&
    (password == null || password == "none" || login == "")
  ) {
    return false;
  } else {
    return true;
  }
};

async function removeItemValueFromAsyncStorage(key) {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (exception) {
    console.log("Error deleting key!");
    return false;
  }
}
