import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  contactInfo: {
    color: "#1a1717",
    fontFamily: "Alkatra",
    fontSize: 18,
  },
  contactUnderLine: {
    backgroundColor: "#c75252",
    width: "25%",
    height: 1,
    borderRadius: 5,
  },
  errorTextInput: {
    color: "#c75252",
    fontFamily: "Alkatra",
    fontSize: 13,
    height: 17,
  },
});

const stylesAuthorization = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  circleRed: {
    width: 70,
    height: 70,
    borderRadius: 100 / 2,
    backgroundColor: "#c75252",
    zIndex: 2,
  },
  circleBlack: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    backgroundColor: "#1a1717",
    zIndex: 1,
  },
  button: {
    backgroundColor: "#1a1717",
    borderRadius: 5,
    width: "30%",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#c75252",
    fontFamily: "Alkatra",
    fontSize: 20,
  },
});

const stylesHeader = StyleSheet.create({
  containerHeader: {
    flex: 0.8,
    flexDirection: "row",
    backgroundColor: "#1a1717",
    borderBottomColor: "#c75252",
    borderBottomWidth: 2,
  },
  headerNavbarBrand: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerNavbarRight: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    flexDirection: "row",
  },
  navbarLogo: {
    color: "white",
    fontSize: 22,
    fontFamily: "Alkatra",
  },
  threeDots: {
    width: 4,
    height: 4,
    borderRadius: 100 / 2,
    backgroundColor: "white",
    zIndex: 1,
    margin: 2,
  },
});

const stylesMain = StyleSheet.create({
  containerMain: {
    flex: 9,
    backgroundColor: "white",
  },
});

export { styles, stylesAuthorization, stylesHeader, stylesMain };
