import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Dimensions,
  StatusBar,
  ScrollView,
  Image,
  Modal,
  Switch,
  TouchableOpacity,
  Linking,
  WebView,
  ListView,
  AsyncStorage,
  TextInput,
  Alert,
  Share
} from "react-native";

//import Firsttime from './firsttime';

import RNHTMLtoPDF from "react-native-html-to-pdf";
//import Share, { ShareSheet, Button } from "react-native-share";

import api from "../utilities/api";
//import Noti from './noti'
import { Actions } from "react-native-router-flux";
//import {CachedImage} from "react-native-img-cache";
import { SwipeListView, SwipeRow } from "react-native-swipe-list-view";
var { height, width } = Dimensions.get("window");

import Moment from "moment";
const Unix = require("../utilities/unixHome");

const instructions = Platform.select({});

export default class Bevasarlas extends Component<{}> {
  constructor(props) {
    console.log(props);
    super(props);
    this.state = {
      postCover: [],
      message: [],
      title: [],
      des: [],
      dataSource: [],
      Id: null,
      favourite: [],
      contents: [],
      content: "",
      lista: [],
      load: 0,
      ujcim: "",
      mennyiseg: "",
      update: props.update,
      swipe: -75,
      modalVisible: false,
      modalVisible2: false
    };
    //Actions.reset("kedvencek")

    this.dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1.guid != r2.guid
    });
  }
  modalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  modalVisible2(visible) {
    this.setState({ modalVisible2: visible });
  }
  _update = (text, index) => {
    const newArray = [...this.state.lista];
    newArray[index].value = text;
    this.setState({ lista: newArray });
  };

  saveNewItem() {
    var newArrayForm = {
      title: this.state.ujcim,
      value: this.state.mennyiseg
    };
    console.log(newArrayForm);
    var lists = this.state.lista.concat(newArrayForm);

    this.setState({ lista: lists });
    console.log(this.state.lista);
    setTimeout(() => {
      this.saveList();
    }, 200);

    this.setState({ ujcim: "", mennyiseg: "" });

    this.modalVisible(false);
  }

  mod(rowData, rowID) {
    this.setState({
      hasonlitas: rowData.title,
      modTitle: rowData.title,
      modMenny: rowData.value,
      modSzam: rowID,
      modalVisible2: true
    });
  }

  saveNewItem2() {
    let list = this.state.lista;
    var i = this.state.modSzam;
    for (var i = 0; i < list.length; i++) {
      if (list[i].title == this.state.hasonlitas){
        list[i] = {title: this.state.modTitle, value: this.state.modMenny }
      }
      }
      setTimeout(() => {
      console.log(list)

    },2000)

    //list.splice(i, 1);
    /*ids = { title: this.state.modTitle, value: this.state.modMenny }; //new value
    var lists = this.state.lista.concat(ids);*/

    this.setState({ lista: list });
    console.log(this.state.lista);
    setTimeout(() => {
      this.saveList();
    }, 200);
    this.setState({ modTitle: "", modMenny: "" });

    this.modalVisible2(false);
  }
  deleteRow(rowData) {
    var list = this.state.lista;
    console.log(this.state.lista);

    for (var i = 0; i < list.length; i++) {
      if (list[i].title == rowData.title) {
        // ha egyeznek az ID-k, akkor azt az elemet toroljuk
        list.splice(i, 1);
      }
    }

    this.setState({
      lista: list,
      swipe: 0
    });
    console.log(this.state.lista);
    this.saveList();
  }

  modal() {
    index = 1;
    return (
      <View style={{ marginTop: 0 }}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            console.log("Modal has been closed.");
          }}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <View
                style={{
                  justifyContent: "center",
                  flex: 1,
                  alignItems: "center"
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                    alignItems: "center"
                  }}
                >
                  <TextInput
                    style={{ height: 40, width: width / 2 }}
                    maxLength={50}
                    placeholder="Termék neve"
                    onChangeText={ujcim => this.setState({ ujcim })}
                    value={this.state.ujcim}
                  />
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}
                >
                  <TextInput
                    style={{ height: 40, width: width / 2 }}
                    placeholder="Mennyiség"
                    onChangeText={mennyiseg => this.setState({ mennyiseg })}
                    value={this.state.mennyiseg}
                    maxLength={50}
                  />
                </View>
              </View>
              <View
                style={{ flexDirection: "row", justifyContent: "space-around" }}
              >
                <TouchableOpacity
                  onPress={() => {
                    this.modalVisible(false);
                  }}
                >
                  <View
                    style={[styles.modalButton, { backgroundColor: "white" }]}
                  >
                    <Text style={{ color: "red" }}>{"Mégse"}</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.saveNewItem();
                  }}
                >
                  <View style={styles.modalButton}>
                    <Text style={{ color: "white" }}>{"Kész!"}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
  modal2() {
    return (
      <View style={{ marginTop: 0 }}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.modalVisible2}
          onRequestClose={() => {
            console.log("Modal has been closed.");
          }}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <View
                style={{
                  justifyContent: "center",
                  flex: 1,
                  alignItems: "center"
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                    alignItems: "center"
                  }}
                >
                  <TextInput
                    style={{ height: 40, width: width / 2 }}
                    maxLength={50}
                    placeholder="Termék neve"
                    onChangeText={modTitle => this.setState({ modTitle })}
                    value={this.state.modTitle}
                  />
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}
                >
                  <TextInput
                    style={{ height: 40, width: width / 2 }}
                    placeholder="Mennyiség"
                    onChangeText={modMenny => this.setState({ modMenny })}
                    value={this.state.modMenny}
                    maxLength={50}
                  />
                </View>
              </View>
              <View
                style={{ flexDirection: "row", justifyContent: "space-around" }}
              >
                <TouchableOpacity
                  onPress={() => {
                    this.modalVisible2(false);
                  }}
                >
                  <View
                    style={[styles.modalButton, { backgroundColor: "white" }]}
                  >
                    <Text style={{ color: "red" }}>{"Mégse"}</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.saveNewItem2();
                  }}
                >
                  <View style={styles.modalButton}>
                    <Text style={{ color: "white" }}>{"Kész!"}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
  async createPDF() {
    list = this.state.lista;
    var lista = [];

    console.log(list);
    for (var i = 0; i < list.length; i++) {
      lista.push(
        "<div><h1>" + list[i].title + "  " + list[i].value + "</h1></div>"
      );
    }
    console.log(lista);
    var string = JSON.stringify(lista);
    string = string.replace(/\"/g, "");
    string = string.replace(/\[/g, "");
    string = string.replace(/\]/g, "");
    string = string.replace(/\,/g, "");

    console.log(string);

    const html =
      `
<h1>bevásárlólista</h1>
 ` + string;
    let options = {
      html, // HTML String
      fileName: "ManóMenü Bevásárlólista",
      directory: "docs",
      height: 800,
      width: 1056,
      padding: 24
    };
    let file = await RNHTMLtoPDF.convert(options);
    console.log(file.filePath);
    this.setState({ pdf: file.filePath });
    if (Platform.OS === "android") {
      Alert.alert(
        "Sikeres mentés!",
        "A dokumentumaid közé lett mentve a bevásárlólistád"
      );
    } else {
      Share.share({
        message: "A bevásárlólistád mellékelve lett az üzenetben",
        url: "file://" + this.state.pdf,
        subject: "Bevásárlólista"
      })
        .then(result => console.log(result))
        .catch(errorMsg => console.log(errorMsg));
    }
  }

  delete() {
    this.refs.swipeListView.safeCloseOpenRow();
    Alert.alert(
      "Törlés",
      "Biztosan törölni akarod a bevásárlólistád?",
      [
        {
          text: "Mégse",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "Igen",
          onPress: () => [this.setState({ lista: [] }), this.saveList()]
        }
      ],
      { cancelable: false }
    );
  }
  async saveList() {
    this.setState({
      swipe: -75
    });
    var lists = this.state.lista;
    console.log(this.state.lista);

    await AsyncStorage.setItem("@menu:bevasarlas", JSON.stringify(lists));
    console.log("saved");
    //this._updateList();
  }

  async _updateList() {
    const response = await AsyncStorage.getItem("@menu:bevasarlas");
    const list = (await JSON.parse(response)) || [];
    console.log(list);

    var lista = [...new Set(list.map(o => JSON.stringify(o)))].map(s =>
      JSON.parse(s)
    );

    console.log(list);
    console.log(lista);
    this.setState({ lista: lista, load: 1 });
  }

  componentDidMount() {
    this._updateList();

    console.log("component mounted");
    Linking.getInitialURL()
      .then(url => {
        if (url) {
          console.log("Initial url is: " + url);
        }
      })
      .catch(err => console.error("An error occurred", err));
  }

  componentDidUpdate() {
    console.log(this.state.update);

    if (this.state.update) {
      //this._updateList();
    }
  }

  componentWillMount() {
    setTimeout(() => {
      return fetch(
        "http://46.101.62.53/Apps/rest/content/ARTICLE/" + this.state.favourite,
        {
          headers: {
            accept: "application/json"
          }
        }
      )
        .then(res => res.json())
        .then(res => {
          this.setState({
            content: res
          });
        });
    }, 1000);
  }

  _update = (text, rowID) => {
    const newArray = [...this.state.lista];
    newArray[rowID].value = text;
    this.setState({ lista: newArray });
  };

  
  closeRow(rowMap, rowId) {
    if (rowMap[rowId]) {
      rowMap[rowId].closeRow();
    }
  }

  render() {
    var addFlightLeft = (width - 50) / 2;
              
    var addFlightTop = height / 12 + 5;
    var index = 1;
    var facebook = "https://www.facebook.com/";
    var instagram = "https://www.instagram.com/";
    var pinterest = "http://pinterest.com";

    console.log(this.state.lista);
    var swipeoutBtns = [
      {
        text: "Button"
      }
    ];

    const switchTwoValue = this.state.switchTwoValue;
    if (this.state.lista) {
      return (
        <View style={styles.container}>
          {this.modal()}
          {this.modal2()}
          <TouchableOpacity
            onPress={() => this.modalVisible(true)}
            underlayColor="transparent"
            style={[
              styles.newFlight,
              { bottom: addFlightTop, left: addFlightLeft }
            ]}
          >
            <Image
              style={styles.newFlightImage}
              source={require("../src/add-flight.png")}
            />
          </TouchableOpacity>
          <View
            style={{
              width: width,
              height: height / 15,
              backgroundColor: "#00b8ac",
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "flex-end",
              paddingBottom: 10
            }}
          >
            <TouchableOpacity onPress={() => Actions.kedvencek()}>
              <View>
                <Text style={[styles.HOME, { color: "#008c82" }]}>
                  {"Kedvencek"}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Actions.hetimenu()}>
              <View>
                <Text style={[styles.HOME, { color: "#008c82" }]}>
                  {"Heti menü"}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View>
                <Text style={styles.HOME}>{"Bevásárlás"}</Text>
              </View>
            </TouchableOpacity>
          </View>
          <ScrollView
            removeClippedSubviews={true}
            style={{ backgroundColor: "white", margin: 10, borderRadius: 10 }}
          >
            <View
              style={{
                width: width - 20,
                height: 40,
                paddingLeft: 20,
                paddingRight: 20,
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                borderRadius: 10,
                backgroundColor: "#F0D886"
              }}
            >
              <Text
                numberOfLines={2}
                style={[
                  styles.cim,
                  {
                    color: "#17776f",
                    marginLeft: 0,
                    marginTop: 0,
                    textAlign: "center",
                    fontFamily: "AmaticSC-Bold",

                    fontSize: 30
                  }
                ]}
              >
                Bevásárlólista
              </Text>
            </View>
            <Text style={{ color: "gray", textAlign: "center", fontSize: 12 }}>
              {
                " A Heti menü tervezőben tudod elkészíteni a kiválasztott ételekből a bevásárlólistát. Egyes elemeket balra húzással tudsz eltávolítani."
              }
            </Text>

            <View
              style={{
                width: width - 20,
                height: 40,
                paddingLeft: 20,
                paddingRight: 20,
                justifyContent: "space-between",
                flexDirection: "row",
                alignItems: "center",
                borderRadius: 10
              }}
            >
              <Text
                numberOfLines={2}
                style={[
                  styles.cim,
                  {
                    color: "gray",
                    marginLeft: 0,
                    marginTop: 0,
                    textAlign: "left",
                    fontSize: 30,
                    fontFamily: "AmaticSC-Bold"
                  }
                ]}
              >
                Termék:
              </Text>
              <Text
                numberOfLines={2}
                style={[
                  styles.cim,
                  {
                    color: "gray",
                    marginLeft: 0,
                    marginTop: 0,
                    textAlign: "left",
                    fontSize: 30,
                    fontFamily: "AmaticSC-Bold"
                  }
                ]}
              >
                Mennyiség:
              </Text>
            </View>
            <View
              style={{ width: width, height: 2, backgroundColor: "gray" }}
            />

            <SwipeListView
              ref="swipeListView"
              dataSource={this.dataSource.cloneWithRows(this.state.lista)}
              //renderRow={this.renderRow.bind(this)}
              enableEmptySections={true}
              initialListSize={1}
              renderRow={(rowData, secId, rowId, rowMap) => (
                <View numberOfLines={1} style={{ backgroundColor: "white" }}>
                  <View
                    style={{ alignItems: "center", justifyContent: "center" }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        this.mod(rowData, rowId);
                      }}
                    >
                      <View
                        style={{
                          width: width - 20,
                          height: 30,
                          paddingLeft: 20,
                          paddingRight: 20,
                          justifyContent: "space-between",
                          flexDirection: "row",
                          alignItems: "center",
                          borderRadius: 10
                        }}
                      >
                        <Text
                          numberOfLines={1}
                          style={[
                            styles.cim,
                            {
                              color: "gray",
                              marginLeft: 0,
                              width: width / 2,
                              marginLeft: 0,
                              textAlign: "left",
                              fontSize: 17
                            }
                          ]}
                        >
                          {rowData.title}
                        </Text>
                        <Text
                          numberOfLines={1}
                          style={[
                            styles.cim,
                            {
                              color: "gray",
                              marginLeft: 0,
                              marginTop: 0,
                              textAlign: "left",
                              fontSize: 13
                            }
                          ]}
                        >
                          {rowData.value}
                        </Text>
                      </View>
                      <View
                        style={{
                          width: width - 20,
                          height: 0,
                          borderRadius: 10
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
              disableRightSwipe={false}
              disableLeftSwipe={false}
              renderHiddenRow={(rowData, secId, rowId, rowMap) => (
                <View style={styles.deleteBackground}>
                  <TouchableOpacity
                    style={styles.backRightBtn}
                    onPress={_ => [
                      this.closeRow(rowMap, `${secId}${rowId}`),
                      this.deleteRow(rowData)
                    ]}
                  >
                    <Text style={styles.backTextWhite}>Törlés</Text>
                  </TouchableOpacity>
                </View>
              )}
              rightOpenValue={this.state.swipe}
            />

            <View style={{ height: 100 }} />
          </ScrollView>
          <View
            style={{
              width: width,
              marginBottom: height / 12 + 5,
              height: 40,
              paddingLeft: 20,
              paddingRight: 20,
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row"
            }}
          >
            <TouchableOpacity
              onPress={() => {
                this.createPDF();
              }}
            >
              <View
                style={{
                  width: 80,
                  height: 30,
                  marginTop: 5,
                  paddingLeft: 4,
                  paddingRight: 4,
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                  borderRadius: 10,
                  borderColor: "#00B8AC",
                  borderWidth: 2,
                  backgroundColor: "#00B8AC"
                }}
              >
                <Text
                  numberOfLines={2}
                  style={[
                    styles.cim,
                    {
                      color: "white",
                      marginLeft: 0,
                      marginTop: 0,
                      textAlign: "left",
                      fontSize: 15
                    }
                  ]}
                >
                  Mentés
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                this.delete();
              }}
            >
              <View
                style={{
                  width: 80,
                  height: 30,
                  marginTop: 5,
                  paddingLeft: 4,
                  paddingRight: 4,
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                  borderRadius: 10,
                  borderColor: "#FA5868",
                  borderWidth: 2
                }}
              >
                <Text
                  numberOfLines={2}
                  style={[
                    styles.cim,
                    {
                      color: "#FA5868",
                      marginLeft: 0,
                      marginTop: 0,
                      textAlign: "center",
                      fontSize: 15
                    }
                  ]}
                >
                  TÖRLÉS
                </Text>
              </View>
            </TouchableOpacity>
          </View>

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

            <TouchableOpacity>
              <View style={styles.menu1}>
                <Image
                  source={require("../src/menu/menuikonaktiv_kedvenc.png")}
                  style={{ width: height / 20, height: height / 20 }}
                />
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => Actions.egyeb()}>
              <View style={styles.menu1}>
                <Image
                  source={require("../src/menu/menuikon_egyeb.png")}
                  style={{ width: height / 15, height: height / 40 }}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => alert("király")}
            underlayColor="transparent"
            style={[
              styles.newFlight,
              { bottom: addFlightTop, left: addFlightLeft }
            ]}
          >
            <Image
              style={styles.newFlightImage}
              source={require("../src/add-flight.png")}
            />
          </TouchableOpacity>
          <View
            style={{
              width: width,
              height: height / 15,
              backgroundColor: "#00b8ac",
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "flex-end",
              paddingBottom: 10
            }}
          >
            <TouchableOpacity onPress={() => Actions.kedvencek()}>
              <View>
                <Text style={[styles.HOME, { color: "#008c82" }]}>
                  {"Kedvencek"}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Actions.hetimenu()}>
              <View>
                <Text style={[styles.HOME, { color: "#008c82" }]}>
                  {"Heti menü"}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View>
                <Text style={styles.HOME}>{"Bevásárlás"}</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
          >
            <Text style={{ textAlign: "center" }}>
              {" "}
              A bevásárlólistád üres. A Heti menü tervezőben tudod elkészíteni a
              kiválasztott ételekből{" "}
            </Text>
          </View>

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

            <TouchableOpacity>
              <View style={styles.menu1}>
                <Image
                  source={require("../src/menu/menuikonaktiv_kedvenc.png")}
                  style={{ width: height / 20, height: height / 20 }}
                />
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => Actions.egyeb()}>
              <View style={styles.menu1}>
                <Image
                  source={require("../src/menu/menuikon_egyeb.png")}
                  style={{ width: height / 15, height: height / 40 }}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
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
  menu: {
    position: "absolute",
    bottom: 0,
    backgroundColor: "#f0d886",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  },
  nameText: {
    fontSize: 36,
    textAlign: "left",
    marginLeft: 20,
    color: "black",
    fontFamily: "AmaticSC-Bold"
  },

  cim: {
    fontSize: 16,
    textAlign: "left",
    color: "white",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  },

  HOME: {
    fontSize: 16,
    textAlign: "center",
    color: "white",
    fontWeight: "bold"
  },
  event: {
    fontSize: 18,
    textAlign: "center",
    color: "black"
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
  },

  instructions: {
    fontSize: 20,
    textAlign: "center",
    color: "#4aa485",
    padding: 10,
    marginBottom: 5
  },
  standaloneRowFront: {
    alignItems: "center",
    backgroundColor: "transparent",
    justifyContent: "center",
    height: 50
  },

  standaloneRowBack: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 15
  },

  backTextWhite: {
    zIndex: -10,
    color: "white",
    textAlign: "right"
  },

  rowBack: {
    alignItems: "center",
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "space-around",
    paddingLeft: 15
  },

  deleteBackground: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ED5565",
    width: "100%",
    height: 30,
    position: "absolute",
    top: 0,
    right: 0
  },

  backRightBtn: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ED5565",
    width: 75,
    height: 30,
    position: "absolute",
    top: 0,
    right: 0
  },

  controls: {
    alignItems: "center",
    marginBottom: 30
  },

  switchContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 5
  },

  switch: {
    alignItems: "center",
    paddingVertical: 10,
    width: 100
  },

  title: {
    fontSize: 17,
    textAlign: "center",
    color: "black",
    marginTop: 10
  },
  list: {
    justifyContent: "center",
    alignItems: "center"
  },
  modalBackground: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.8)"
  },

  modalContainer: {
    height: width / 2,
    width: width / 1.5,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "space-between"
  },

  modalButton: {
    height: 40,
    backgroundColor: "#00B8AC",
    width: width / 3,
    justifyContent: "center",
    alignItems: "center"
  },
  newFlight: {
    height: 50,
    width: 50,
    position: "absolute",
    bottom: 0,
    zIndex: 10,
    margin: "auto"
  },

  newFlightStatic: {
    height: 86,
    width: 86
  },
  newFlightImage: {
    height: 50,
    width: 50
  }
});
