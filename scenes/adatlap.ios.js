import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions,
  StatusBar,
  Image,
  ScrollView,
  ListView,
  TouchableOpacity,
  TouchableHighlight,
  TextInput,
  Picker,
  AsyncStorage,
  Alert
} from "react-native";

import api from "../utilities/api";
//import Noti from './noti';
import { Actions } from "react-native-router-flux";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const instructions = Platform.select({});

export default class Profil extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      postCover: [],
      news: [],
      dataSource: [],
      mielott: "",
      text: "",
      nev: "",
      suly: "",
      nem: "fiu",
      magassag: "",
      date: "",
      creationDate: "",
      avatar: ""
    };
    this.dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1.guid != r2.guid
    });
    console.log(props);
    if (props.addedData != null) {
      // ez csak az egyszerusites kedveert
      var addedData = props.addedData;
      this.state.magassag = addedData.magassag;
      this.state.suly = addedData.suly;
      this.state.nem = addedData.nem;
      this.state.nev = addedData.nev;
      this.state.date = addedData.date;
      this.state.addedData = addedData;
      this.state.gLength = addedData.gLength;
      this.state.bLength = addedData.bLength;
      this.state.gHeight = addedData.gHeight;
      this.state.bHeight = addedData.bHeight;
    }
    console.log(this.state.nev);
  }
  goBack() {
    // a visszatero objektum:
    if (this.state.date > 2400) {
      Alert.alert(
        "Hiba!",
        "A percentilis görbén maximum 24 hónapig tudod vezetni a baba korát"
      );
    } else {
      if (this.state.addedData != null) {
        var data = {
          magassag: this.state.magassag,
          nem: this.state.nem,
          suly: this.state.suly,
          nev: this.state.nev,
          date: this.state.date,
          creationDate: this.state.creationDate,
          avatar: "",
          gLength: this.state.gLength,
          bLength: this.state.bLength,
          gHeight: this.state.gHeight,
          bHeight: this.state.bHeight
        };
      } else {
        var data = {
          magassag: this.state.magassag,
          nem: this.state.nem,
          suly: this.state.suly,
          nev: this.state.nev,
          date: this.state.date,
          creationDate: this.state.creationDate,
          avatar: "",
          
      }
      }
      

      console.log(data);
      Actions.pop({
        //type: ActionConst.POP_TO,
        // Frissiti a bekért adatokat
      });
      Actions.refresh({ addedData: data });
    }
  }

  /* async _updateList() {
  const response = await AsyncStorage.getItem('@profil:adatok');
  const listofData = await JSON.parse(response) || [];
  this.setState({
    magassag: listofData.magassag,
    nem: listofData.nem,
    suly: listofData.suly,
    nev: listofData.nev,
    date: listofData.date,
  });
  console.log(this.state.nev);
}*/
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  componentWillMount() {
    var timeStampInMs =
      window.performance &&
      window.performance.now &&
      window.performance.timing &&
      window.performance.timing.navigationStart
        ? window.performance.now() + window.performance.timing.navigationStart
        : Date.now();
    console.log(timeStampInMs, Date.now());
    this.setState({ creationDate: Date.now() });
  }

  onChanged(text) {
    let newText = "";
    let numbers = "0123456789";

    for (var i = 0; i < text.length; i++) {
      if (numbers.indexOf(text[i]) > -1) {
        newText = newText + text[i];
      } else {
        // your call back function
        alert("Kérlek számot írj be!");
      }
    }
    this.setState({ date: text });
  }
  onChanged2(text) {
    let newText = "";
    let numbers = "0123456789.";

    for (var i = 0; i < text.length; i++) {
      if (numbers.indexOf(text[i]) > -1) {
        newText = newText + text[i];
      } else {
        // your call back function
        alert(
          "Kérlek számot írj be! Ha tört számot szeretnél beírni a vessző(,) helyett pontot(.) írj be!"
        );
      }
    }
    this.setState({ suly: text });
  }
  onChanged3(text) {
    let newText = "";
    let numbers = "0123456789";

    for (var i = 0; i < text.length; i++) {
      if (numbers.indexOf(text[i]) > -1) {
        newText = newText + text[i];
      } else {
        // your call back function
        alert("Kérlek számot írj be!");
      }
    }
    this.setState({ magassag: text });
  }

  validate() {
    var errors = [];
    if (this.state.nev == "") {
      errors.push("Kérlek add meg a baba nevét!");
    }
    if (this.state.suly == "") {
      errors.push("Kérlek add meg a baba súlyát!");
    }
    if (this.state.date == "") {
      errors.push("Kérlek add meg a baba korát!");
    }
    if (this.state.magassag == "") {
      errors.push("Kérlek add meg a baba magasságát!");
    }
    if (errors.length == 0) {
      this.goBack();
    } else {
      console.log(errors);
      alert(errors);
    }
  }
  render() {
    var { height, width } = Dimensions.get("window");
    return (
      <View style={styles.container}>
        <View
          style={{
            width: width,
            height: height / 15,
            backgroundColor: "#00b8ac",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-end",
            paddingBottom: 10
          }}
        >
          <TouchableOpacity onPress={() => this.validate()}>
            <View>
              <Image
                source={require("../src/nyil_feher.png")}
                style={{
                  width: 31 / 3,
                  height: 58 / 3,
                  zIndex: 2312321312,
                  left: 10
                }}
              />
            </View>
          </TouchableOpacity>
          <View>
            <Text style={styles.HOME}>{"Profil szerkesztése"}</Text>
          </View>
          <View
            style={{ width: 31 / 3, height: 58 / 3, zIndex: 100, left: 10 }}
          />
        </View>
        <KeyboardAwareScrollView
          style={styles.scrollView}
          resetScrollToCoords={{ x: 0, y: 0 }}
          contentContainerStyle={styles.destination}
          scrollEnabled={true}
        >
          <View style={{ paddingLeft: 30, paddingRight: 30, marginTop: 30 }}>
            <View>
              <Text style={{ fontSize: 12, color: "gray" }}>{"BABA NEVE"}</Text>
            </View>
            <View>
              <TextInput
                style={{ height: 50 }}
                placeholder="BABA NEVE"
                value={this.state.nev}
                onChangeText={text => this.setState({ nev: text })}
              />
            </View>
          </View>
          <View style={{ alignItems: "center" }}>
            <View
              style={{
                width: width - 60,
                height: 1,
                margin: "auto",
                backgroundColor: "gray"
              }}
            />
          </View>

          <View style={{ paddingLeft: 30, paddingRight: 30, marginTop: 10 }}>
            <View>
              <Text style={{ fontSize: 12, color: "gray" }}>{"SÚLY (KG)"}</Text>
            </View>
            <View>
              <TextInput
                style={{ height: 50 }}
                //keyboardType='numeric'
                placeholder="KG"
                maxLength={4}
                value={this.state.suly}
                onChangeText={text => this.onChanged2(text)}
              />
            </View>
          </View>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <View
              style={{
                width: width - 60,
                height: 1,
                margin: "auto",
                backgroundColor: "gray"
              }}
            />
          </View>

          <View style={{ paddingLeft: 30, paddingRight: 30, marginTop: 10 }}>
            <View>
              <Text style={{ fontSize: 12, color: "gray" }}>{"NEM"}</Text>
            </View>
            <View>
              <Picker
                style={{ height: 70 }}
                itemStyle={{ height: 70 }}
                selectedValue={this.state.nem}
                value={this.state.nem}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({ nem: itemValue })
                }
              >
                <Picker.Item label="FIÚ" value="fiu" />
                <Picker.Item label="LÁNY" value="lany" />
              </Picker>
            </View>
          </View>

          <View style={{ paddingLeft: 30, paddingRight: 30, marginTop: 10 }}>
            <View>
              <Text style={{ fontSize: 12, color: "gray" }}>
                {"MENNYI IDŐS? (HÓNAP)"}
              </Text>
            </View>
            <View>
              <TextInput
                style={{ height: 50 }}
                placeholder="HÓNAP"
                //keyboardType='numeric'
                maxLength={2}
                value={this.state.date}
                onChangeText={text => this.onChanged(text)}
              />
            </View>
          </View>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <View
              style={{
                width: width - 60,
                height: 1,
                margin: "auto",
                backgroundColor: "gray"
              }}
            />
          </View>

          <View style={{ paddingLeft: 30, paddingRight: 30, marginTop: 10 }}>
            <View>
              <Text style={{ fontSize: 12, color: "gray" }}>
                {"MAGASSÁG (CM)"}
              </Text>
            </View>
            <View>
              <TextInput
                style={{ height: 50 }}
                placeholder="CM"
                //keyboardType='numeric'
                maxLength={3}
                value={this.state.magassag}
                onChangeText={text => this.onChanged3(text)}
              />
            </View>
          </View>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <View
              style={{
                width: width - 60,
                height: 1,
                margin: "auto",
                backgroundColor: "gray"
              }}
            />
          </View>
        </KeyboardAwareScrollView>

        <View style={[styles.menu, { width: width, height: height / 12 }]}>
          <TouchableOpacity onPress={() => Actions.home()}>
            <View style={styles.menu1}>
              <Image
                source={require("../src/menu/menuikon_home.png")}
                style={{ width: height / 20, height: height / 20 }}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => Actions.hozzataplalas()}>
            <View style={styles.menu1}>
              <Image
                source={require("../src/menu/menuikon_hozzatalp.png")}
                style={{ width: height / 20, height: height / 20 }}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => Actions.receptek()}>
            <View style={styles.menu1}>
              <Image
                source={require("../src/menu/menuikon_receptek.png")}
                style={{ width: height / 20, height: height / 20 }}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => Actions.kedvencek()}>
            <View style={styles.menu1}>
              <Image
                source={require("../src/menu/menuikon_kedvenc.png")}
                style={{ width: height / 20, height: height / 20 }}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => Actions.egyeb()}>
            <View style={styles.menu1}>
              <Image
                source={require("../src/menu/menuikonaktiv_egyeb.png")}
                style={{ width: height / 15, height: height / 40 }}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  name: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black"
  },
  statbar: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    height: 10
  },
  title: {
    fontSize: 50,
    textAlign: "center",
    color: "black",
    margin: 10
  },
  content: {
    fontSize: 14,
    textAlign: "left",
    fontFamily: "futura",
    color: "black",
    margin: 10
  },
  menu: {
    position: "absolute",
    bottom: 0,
    backgroundColor: "#f0d886",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  },
  instructions: {
    fontSize: 20,
    textAlign: "center",
    color: "#4aa485",
    padding: 10,
    marginBottom: 5
  },
  nameText: {
    fontSize: 18,
    textAlign: "center",
    color: "white",
    fontFamily: "AmaticSC-Bold"
  },
  HOME: {
    fontSize: 18,
    textAlign: "center",
    color: "white"
  },
  cim: {
    fontSize: 34,
    textAlign: "center",
    color: "white",
    fontFamily: "AmaticSC-Bold"
  },
  list: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around"
  }
});
