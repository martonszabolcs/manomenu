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
  Share,
  Picker
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
      lista: [{suly: "2kg", honap:"12"}],
      load: 0,
      ujcim: "",
      mennyiseg: "",
      update: props.update,
      swipe: -75,
      gyerek: this.props.gyerek,
      modalVisible: false,
      modalVisible2: false
    };
    //Actions.reset("kedvencek")

    this.dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1.guid != r2.guid
    });
  }
 

  render() {
    var addFlightLeft = (width - 50) / 2;
    var addFlightTop = height - 106;
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
                    fontSize: 20,
                    fontFamily: "AmaticSC-Bold"
                  }
                ]}
              >
                Hónap:
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
                    fontSize: 20,
                    fontFamily: "AmaticSC-Bold"
                  }
                ]}
              >
                Dátum:
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
                    fontSize: 20,
                    fontFamily: "AmaticSC-Bold"
                  }
                ]}
              >
                Súly:
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
                    fontSize: 20,
                    fontFamily: "AmaticSC-Bold"
                  }
                ]}
              >
                Magasság:
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
                          numberOfLines={1}
                          style={[
                            styles.cim,
                            {
                              color: "gray",
                              marginLeft: 0,
                              width: width / 5,
                              marginLeft: 0,
                              textAlign: "center",
                              fontSize: 13
                            }
                          ]}
                        >
                          {rowData.honap}
                          {"."}
                        </Text>
                        <Text
                          numberOfLines={1}
                          style={[
                            styles.cim,
                            {
                              color: "gray",
                              marginLeft: 0,
                              width: width / 5,

                              marginTop: 0,
                              textAlign: "center",
                              fontSize: 13
                            }
                          ]}
                        >
                          {rowData.date}
                        </Text>
                        <Text
                          numberOfLines={1}
                          style={[
                            styles.cim,
                            {
                              color: "gray",
                              marginLeft: 0,
                              width: width / 5,
                              marginTop: 0,
                              textAlign: "center",
                              fontSize: 13
                            }
                          ]}
                        >
                          {rowData.suly}
                          {"kg"}
                        </Text>
                        <Text
                          numberOfLines={1}
                          style={[
                            styles.cim,
                            {
                              color: "gray",
                              marginLeft: 0,
                              width: width / 5,
                              marginTop: 0,
                              textAlign: "center",
                              fontSize: 13
                            }
                          ]}
                        >
                          {rowData.magassag}
                          {"cm"}
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
    height: height - 50,
    width: width - 50,
    backgroundColor: "white",
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
