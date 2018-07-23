import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  StatusBar,
  Dimensions,
  Image,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  Switch,
  Modal,
  InteractionManager,
  ScrollView,
  Platform,
  BackHandler,
  Alert,
  AsyncStorage
} from "react-native";
//import SplashScreen from 'react-native-splash-screen'

import { Router, Scene, Actions } from "react-native-router-flux";

import SplashScreen from "react-native-smart-splash-screen";

import home from "./scenes/home";
import hozzataplalas from "./scenes/hozzataplalas";
import receptek from "./scenes/receptek";
import kedvencek from "./scenes/kedvencek";
import egyeb from "./scenes/egyeb";
import mielott from "./scenes/mielott";
import alapok from "./scenes/alapok";
import haadolgok from "./scenes/haadolgok";
import keszenall from "./scenes/keszenall";
import szukseg from "./scenes/szukseg";
import hetimenu from "./scenes/hetimenu";
import etelfajtak from "./scenes/etelfajtak";
import etkezes from "./scenes/etkezes";
import elkeszites from "./scenes/elkeszites";
import alapanyag from "./scenes/alapanyag";
import holiday from "./scenes/holiday";
import special from "./scenes/special";
import receptekHTML from "./scenes/receptekHTML";
import kedvencekreszletes from "./scenes/kedvencekreszletes";
import hetrolhetre from "./scenes/hetrolhetre";
import esemenyek from "./scenes/esemenyek";
import esemenyekreszletes from "./scenes/esemenyekreszletes";
import profil from "./scenes/profil";
import adatlap from "./scenes/adatlap";
import kapcsolat from "./scenes/kapcsolat";
import cikkekHTML from "./scenes/cikkekHTML";
import eletkorszerint from "./scenes/eletkorszerint";
import beallitasok from "./scenes/beallitasok";
import szakember from "./scenes/szakember";
import termek from "./scenes/termek";
import nemelelmiszer from "./scenes/nemelelmiszer";
import percentilis from "./scenes/percentilis";
import percentilisLany from "./scenes/percentilisLany";
import termekHTML from "./scenes/termekHTML";
import notes from "./scenes/notes";
import gyik from "./scenes/gyik";
import hetrolHTML from "./scenes/hetrolHTML";
import modalRecept from "./scenes/modalRecept";
import bevasarlas from "./scenes/bevasarlas";
import percentilisGorbe from "./scenes/percentilisGorbe";
import kereso from "./scenes/kereso";
import keresoRecept from "./scenes/keresoRecept";
import keresoReceptEnd from "./scenes/keresoReceptEnd";
import szakember_varos from "./scenes/szakember_varos";
//import * as CacheManager from 'react-native-http-cache';

export default class Flux extends Component {
  constructor(props) {
    super(props);
    console.log("component created");
    this.state = {};
  }
  async reklam() {
    console.log("reklam");
    return fetch("http://46.101.62.53/Apps/rest/content/ARTICLE/365", {
      headers: {
        accept: "application/json",
        AppId: "3"
      }
    })
      .then(response => response.json())
      .then(responseJson => {
        let arr = responseJson.content;
        const regex = /(<([^>]+)>)/gi;
        const result = arr.replace(regex, ",");
        var reklam = result.split(",," && ",");

        for (let i = 0; i < reklam.length; i++) {
          if (reklam[i] == "") {
            reklam.splice(i, 1);
          }
        }
        console.log(reklam);

        AsyncStorage.setItem("reklam", JSON.stringify(reklam));
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentDidMount() {
    this.reklam();
    Actions.reset("home");
    console.log("myView loaded");
    if (Platform.OS === "android") {
      //CacheManager.clear();

      SplashScreen.close({
        animationType: SplashScreen.animationType.scale,
        duration: 850,
        delay: 500
      });
    }
    BackHandler.addEventListener("hardwareBackPress", this.backPressed);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.backPressed);
  }

  backPressed = () => {
    if (Actions.state.index != 0) {
      Actions.pop();
      return true;
    } else {
      Alert.alert(
        "Alkalmazás bezárása",
        "Biztosan bezárod az alkalmazást?",
        [
          {
            text: "Mégse",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "Igen", onPress: () => BackHandler.exitApp() }
        ],
        { cancelable: false }
      );
      return true;
    }
  };

  //SplashScreen.hide();

  handleLogout() {
    console.log("User logged out");
  }

  render() {
    var { height, width } = Dimensions.get("window");
    var cornerLeft = width - 10;
    var cornerTop = height - 10;

    return (
      <View
        style={{
          backgroundColor: "#5ecac5",
          paddingBottom: 0,
          flex: 1,
          height: height,
          width: width,
          flexDirection: "column"
        }}
      >
        <StatusBar hidden={true} transparent={true} />

        <Router>
          <Scene key="root" hideNavBar={true} duration={0}>
            <Scene
              key="home"
              component={home}
              title="home"
              initial={true}
              onRight={() => {
                Actions.hozzataplalas();
              }}
              rightTitle="hozzataplalas"
            />
            <Scene
              key="hozzataplalas"
              component={hozzataplalas}
              title="hozzataplalas"
              onRight={() => {
                Actions.pop();
              }}
              rightTitle="Back"
            />
            <Scene
              key="receptek"
              component={receptek}
              title="receptek"
              onRight={() => {
                Actions.pop();
              }}
              rightTitle="Back"
            />
            <Scene
              key="kedvencek"
              component={kedvencek}
              title="kedvencek"
              onRight={() => {
                Actions.pop();
              }}
              rightTitle="Back"
            />
            <Scene
              key="egyeb"
              component={egyeb}
              title="egyeb"
              onRight={() => {
                Actions.pop();
              }}
              rightTitle="Back"
            />
            <Scene
              key="mielott"
              component={mielott}
              title="mielott"
              onRight={() => {
                Actions.pop();
              }}
              rightTitle="Back"
            />
            <Scene
              key="alapok"
              component={alapok}
              title="alapok"
              onRight={() => {
                Actions.pop();
              }}
              rightTitle="Back"
            />
            <Scene
              key="haadolgok"
              component={haadolgok}
              title="haadolgok"
              onRight={() => {
                Actions.pop();
              }}
              rightTitle="Back"
            />
            <Scene
              key="keszenall"
              component={keszenall}
              title="keszenall"
              onRight={() => {
                Actions.pop();
              }}
              rightTitle="Back"
            />
            <Scene
              key="szukseg"
              component={szukseg}
              title="szukseg"
              onRight={() => {
                Actions.pop();
              }}
              rightTitle="Back"
            />
            <Scene
              key="percentilisGorbe"
              component={percentilisGorbe}
              title="percentilisGorbe"
              onRight={() => {
                Actions.pop();
              }}
              rightTitle="Back"
            />
            <Scene
              key="hetimenu"
              component={hetimenu}
              title="hetimenu"
              onRight={() => {
                Actions.pop();
              }}
              rightTitle="Back"
            />
            <Scene
              key="etelfajtak"
              component={etelfajtak}
              title="etelfajtak"
              onRight={() => {
                Actions.pop();
              }}
              rightTitle="Back"
            />
            <Scene
              key="etkezes"
              component={etkezes}
              title="etkezes"
              onRight={() => {
                Actions.pop();
              }}
              rightTitle="Back"
            />
            <Scene
              key="elkeszites"
              component={elkeszites}
              title="elkeszites"
              onRight={() => {
                Actions.pop();
              }}
              rightTitle="Back"
            />
            <Scene
              key="alapanyag"
              component={alapanyag}
              title="alapanyag"
              onRight={() => {
                Actions.pop();
              }}
              rightTitle="Back"
            />
            <Scene
              key="holiday"
              component={holiday}
              title="holiday"
              onRight={() => {
                Actions.pop();
              }}
              rightTitle="Back"
            />
            <Scene
              key="special"
              component={special}
              title="special"
              onRight={() => {
                Actions.pop();
              }}
              rightTitle="Back"
            />
            <Scene
              key="receptekHTML"
              component={receptekHTML}
              title="receptekHTML"
              onRight={() => {
                Actions.pop();
              }}
              rightTitle="Back"
            />
            <Scene
              key="kedvencekreszletes"
              component={kedvencekreszletes}
              title="kedvencekreszletes"
              onRight={() => {
                Actions.pop();
              }}
              rightTitle="Back"
            />
            <Scene
              key="hetrolhetre"
              component={hetrolhetre}
              title="hetrolhetre"
              onRight={() => {
                Actions.pop();
              }}
              rightTitle="Back"
            />
            <Scene
              key="esemenyek"
              component={esemenyek}
              title="esemenyek"
              onRight={() => {
                Actions.pop();
              }}
              rightTitle="Back"
            />
            <Scene
              key="esemenyekreszletes"
              component={esemenyekreszletes}
              title="esemenyekreszletes"
              onRight={() => {
                Actions.pop();
              }}
              rightTitle="Back"
            />
            <Scene
              key="profil"
              component={profil}
              title="profil"
              onRight={() => {
                Actions.pop();
              }}
              rightTitle="Back"
            />
            <Scene
              key="adatlap"
              component={adatlap}
              title="adatlap"
              onRight={() => {
                Actions.pop();
              }}
              rightTitle="Back"
            />
            <Scene
              key="kapcsolat"
              component={kapcsolat}
              title="kapcsolat"
              onRight={() => {
                Actions.pop();
              }}
              rightTitle="Back"
            />
            <Scene
              key="cikkekHTML"
              component={cikkekHTML}
              title="cikkekHTML"
              onRight={() => {
                Actions.pop();
              }}
              rightTitle="Back"
            />
            <Scene
              key="eletkorszerint"
              component={eletkorszerint}
              title="eletkorszerint"
              onRight={() => {
                Actions.pop();
              }}
              rightTitle="Back"
            />
            <Scene
              key="beallitasok"
              component={beallitasok}
              title="beallitasok"
              onRight={() => {
                Actions.pop();
              }}
              rightTitle="Back"
            />
            <Scene
              key="szakember"
              component={szakember}
              title="szakember"
              onRight={() => {
                Actions.pop();
              }}
              rightTitle="Back"
            />
            <Scene
              key="keresoReceptEnd"
              component={keresoReceptEnd}
              title="keresoReceptEnd"
              onRight={() => {
                Actions.pop();
              }}
              rightTitle="Back"
            />
            <Scene
              key="termek"
              component={termek}
              title="termek"
              onRight={() => {
                Actions.pop();
              }}
              rightTitle="Back"
            />
            <Scene
              key="nemelelmiszer"
              component={nemelelmiszer}
              title="nemelelmiszer"
              onRight={() => {
                Actions.pop();
              }}
              rightTitle="Back"
            />
            <Scene
              key="percentilis"
              component={percentilis}
              title="percentilis"
              onRight={() => {
                Actions.pop();
              }}
              rightTitle="Back"
            />
            <Scene
              key="percentilisLany"
              component={percentilisLany}
              title="percentilisLany"
              onRight={() => {
                Actions.pop();
              }}
              rightTitle="Back"
            />
            <Scene
              key="termekHTML"
              component={termekHTML}
              title="termekHTML"
              onRight={() => {
                Actions.pop();
              }}
              rightTitle="Back"
            />
            <Scene
              key="notes"
              component={notes}
              title="notes"
              onRight={() => {
                Actions.pop();
              }}
              rightTitle="Back"
            />
            <Scene
              key="gyik"
              component={gyik}
              title="gyik"
              onRight={() => {
                Actions.pop();
              }}
              rightTitle="Back"
            />
            <Scene
              key="hetrolHTML"
              component={hetrolHTML}
              title="hetrolHTML"
              onRight={() => {
                Actions.pop();
              }}
              rightTitle="Back"
            />
            <Scene
              key="modalRecept"
              component={modalRecept}
              title="modalRecept"
              onRight={() => {
                Actions.pop();
              }}
              rightTitle="Back"
            />
            <Scene
              key="bevasarlas"
              component={bevasarlas}
              title="bevasarlas"
              onRight={() => {
                Actions.pop();
              }}
              rightTitle="Back"
            />
            <Scene
              key="kereso"
              component={kereso}
              title="kereso"
              onRight={() => {
                Actions.pop();
              }}
              rightTitle="Back"
            />
            <Scene
              key="szakember_varos"
              component={szakember_varos}
              title="szakember_varos"
              onRight={() => {
                Actions.pop();
              }}
              rightTitle="Back"
            />
            <Scene
              key="keresoRecept"
              component={keresoRecept}
              title="keresoRecept"
              onRight={() => {
                Actions.pop();
              }}
              rightTitle="Back"
            />
          </Scene>
        </Router>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  nameText: {
    fontSize: 20,
    textAlign: "center",
    color: "white",
    margin: 10,
    fontFamily: "Segoe Print",
    fontWeight: "bold"
  },

  menuText: {
    fontSize: 10,
    textAlign: "center",
    color: "black",
    margin: 10
  },

  menu: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#5ecac5"
  },

  roundedCornerImage: {
    width: 10,
    height: 10
  },
  ftreExitButtonText2: {
    color: "black",
    backgroundColor: "transparent",
    fontSize: 20,
    fontFamily: "futura-bold",
    textAlign: "center"
  },
  ftreContainer: {
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "white",
    height: 150,
    marginTop: 30,
    marginBottom: 0,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 20,
    padding: 10
  },

  ftreExitButtonText: {
    color: "black",
    backgroundColor: "transparent",
    fontSize: 20,
    fontFamily: "futura-bold",
    textAlign: "center"
  }
});
