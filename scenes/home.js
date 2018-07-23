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
  BackHandler,
  Button
} from "react-native";

//import Firsttime from './firsttime';

import OneSignal from "react-native-onesignal"; // Import package from node modules

import api from "../utilities/api";
import { Actions } from "react-native-router-flux";

import Moment from "moment";
const Unix = require("../utilities/unix");

const instructions = Platform.select({});

export default class Home extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      receptek: [],
      des: [],
      dataSource: [],
      Id: null,
      tesztak: "",
      cacheSize: "",
      unit: "",
      token: ""
    };
    this.onIds = this.onIds.bind(this);

    Actions.reset("home");

    this.dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1.guid != r2.guid
    });
  }

  async tokenupdate() {
    var data = {
      email: this.state.emailAddress,
      password: this.state.passWord
    };
    try {
      let response = await fetch("http://yourdomain.com", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
      if (response.status >= 200 && response.status < 300) {
        alert("authenticated successfully!!!");
      }
    } catch (errors) {
      alert(errors);
    }
  }

  componentDidMount() {
    this.lekeres();
    OneSignal.configure({});
    Linking.getInitialURL()
      .then(url => {
        if (url) {
        }
      })
      .catch(err => console.error("An error occurred", err));
  }

  async lekeres() {
    api.receptek_custom().then(receptek => {
      console.log(receptek);
      this.setState({
        receptek: receptek.list.reverse(),
        receptekPic1: receptek.list[0].imageUrl,
        receptekPic2: receptek.list[1].imageUrl,
        receptekPic3: receptek.list[2].imageUrl,
        receptekTitle1: receptek.list[0].title,
        receptekTitle2: receptek.list[1].title,
        receptekTitle3: receptek.list[2].title,
        receptekid1: receptek.list[0].id,
        receptekid2: receptek.list[1].id,
        receptekid3: receptek.list[2].id
      });
    });
    api.hirek_custom().then(hirek => {
      console.log(hirek);
      this.setState({
        hirek: hirek.list.reverse(),
        hirekPic1: hirek.list[0].imageUrl,
        hirekPic2: hirek.list[1].imageUrl,
        hirekPic3: hirek.list[2].imageUrl,
        hirekTitle1: hirek.list[0].title,
        hirekTitle2: hirek.list[1].title,
        hirekTitle3: hirek.list[2].title,
        hirekid1: hirek.list[0].id,
        hirekid2: hirek.list[1].id,
        hirekid3: hirek.list[2].id
      });
    });
    return fetch("http://46.101.62.53/Apps/rest/content/10/list?category=64", {
      headers: {
        accept: "application/json",
        AppId: "3"
      }
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);

        this.setState({
          eventPic1: res.list[0].imageUrl,
          eventTitle1: res.list[0].title,
          eventcreationDate1: res.list[0].date,
          eventplace1: res.list[0].address,
          eventid1: res.list[0].id
        });
      });
  }

  componentWillMount() {
    api.token();
    OneSignal.addEventListener("received", this.onReceived);
    OneSignal.addEventListener("opened", this.onOpened);
    OneSignal.addEventListener("ids", this.onIds);
    BackHandler.addEventListener("hardwareBackPress", this.backPressed);
  }
  componentWillUnmount() {
    OneSignal.removeEventListener("received", this.onReceived);
    OneSignal.removeEventListener("opened", this.onOpened);
    OneSignal.removeEventListener("ids", this.onIds);
  }

  onReceived(notification) {
    console.log("Notification received: ", notification);
  }

  onOpened(openResult) {
    console.log("Message: ", openResult.notification.payload.body);
    console.log("Data: ", openResult.notification.payload.additionalData);
    console.log("isActive: ", openResult.notification.isAppInFocus);
    console.log("openResult: ", openResult);
  }

  onIds(device) {
    console.log("Device info: ", device);

    var path = "http://46.101.62.53/Apps/rest/device/push/" + device.userId;
    console.log(path);
    fetch(path, {
      headers: {
        "Cache-Control": "no-cache",
        Accept: "application/json",
        Appid: "3"
      },
      method: "POST"
    })
      .then(response => response.json())
      .then(responseData => {
        this.tokenSave(responseData);
      })
      .catch(error => {
        console.log(error);
      });
  }

  async tokenSave(responseData) {
    try {
      await AsyncStorage.setItem("@token:data", responseData.message);
      console.log(responseData.message);
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    var { height, width } = Dimensions.get("window");

    var facebook = "https://www.facebook.com/manomenu2016/";
    var facebookGroup = "https://www.facebook.com/groups/752237094919260/";
    var youtube = "https://www.youtube.com/channel/UC8EkPnfTiH8HNzEUaiUjNqw";
    var insta = "https://www.instagram.com/manomenu_/";

    const switchTwoValue = this.state.switchTwoValue;
    return (
      <View style={styles.container}>
        <View
          style={{
            width: width,
            height: height / 15,
            backgroundColor: "#00b8ac",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "row",
            paddingRight: 10,
            paddingLeft: 10
          }}
        >
          <View
            style={{
              width: width / 12,
              height: width / 12,
              zIndex: 100,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10
            }}
          />
          <Text style={styles.HOME}>{"MANÓ MENÜ"}</Text>
          <TouchableOpacity
            onPress={() => {
              Actions.kereso();
            }}
          >
            <Image
              source={require("../src/search.png")}
              style={{
                width: width / 12,
                height: width / 12,
                zIndex: 100,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10
              }}
            />
          </TouchableOpacity>
        </View>
        <ScrollView removeClippedSubviews={true}>
          <View
            style={{
              backgroundColor: "white",
              marginBottom: 30,
              marginTop: 30
            }}
          >
            <Text style={styles.nameText}>{"HÍREK"}</Text>
            <View
              style={{ flexDirection: "row", justifyContent: "space-around" }}
            >
              <TouchableOpacity
                onPress={() => {
                  Actions.cikkekHTML({ tesztak: this.state.hirekid1 });
                }}
              >
                <View
                  style={{
                    backgroundColor: "#dff7f5",
                    width: width / 2.1,
                    height: height / 4,
                    borderRadius: 10
                  }}
                >
                  <Image
                    source={{ uri: this.state.hirekPic1 }}
                    style={{
                      width: width / 2.1,
                      height: height / 6,
                      zIndex: 100,
                      borderTopLeftRadius: 10,
                      borderTopRightRadius: 10
                    }}
                  />
                  <Text
                    numberOfLines={2}
                    style={[styles.cim, { color: "#17776f" }]}
                  >
                    {this.state.hirekTitle1}
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  Actions.cikkekHTML({ tesztak: this.state.hirekid2 });
                }}
              >
                <View
                  style={{
                    backgroundColor: "#dff7f5",
                    width: width / 2.1,
                    height: height / 4,
                    borderRadius: 10
                  }}
                >
                  <Image
                    source={{ uri: this.state.hirekPic2 }}
                    style={{
                      width: width / 2.1,
                      height: height / 6,
                      zIndex: 100,
                      borderTopLeftRadius: 10,
                      borderTopRightRadius: 10
                    }}
                  />
                  <Text
                    numberOfLines={2}
                    style={[styles.cim, { color: "#17776f" }]}
                  >
                    {this.state.hirekTitle2}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                marginTop: 10
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  Actions.cikkekHTML({ tesztak: this.state.hirekid3 });
                }}
              >
                <View
                  style={{
                    backgroundColor: "#dff7f5",
                    width: width / 2.1,
                    height: height / 4,
                    borderRadius: 10
                  }}
                >
                  <Image
                    source={{ uri: this.state.hirekPic3 }}
                    style={{
                      width: width / 2.1,
                      height: height / 6,
                      zIndex: 100,
                      borderTopLeftRadius: 10,
                      borderTopRightRadius: 10
                    }}
                  />
                  <Text
                    numberOfLines={2}
                    style={[styles.cim, { color: "#17776f" }]}
                  >
                    {this.state.hirekTitle3}
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => Actions.hozzataplalas()}>
                <View
                  style={{
                    backgroundColor: "#00b8ac",
                    width: width / 2.1,
                    height: height / 4,
                    borderRadius: 10,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Text
                    style={{
                      fontSize: 36,
                      textAlign: "center",
                      color: "white",
                      fontFamily: "AmaticSC-Bold"
                    }}
                  >
                    {"TÖBB HÍR"}
                  </Text>
                  <View style={{ flexDirection: "row", marginTop: 10 }}>
                    <Image
                      source={require("../src/nyil_feher2.png")}
                      style={{
                        width: 31 / 2,
                        height: 58 / 2,
                        zIndex: 100,
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10
                      }}
                    />
                    <Image
                      source={require("../src/nyil_feher2.png")}
                      style={{
                        width: 31 / 2,
                        height: 58 / 2,
                        zIndex: 100,
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10
                      }}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ backgroundColor: "white", margin: 0 }}>
            <Text style={styles.nameText}>{"RECEPTEK"}</Text>
            <View
              style={{ flexDirection: "row", justifyContent: "space-around" }}
            >
              <TouchableOpacity
                onPress={() => {
                  Actions.receptekHTML({ tesztak: this.state.receptekid1 });
                }}
              >
                <View
                  style={{
                    backgroundColor: "#f6eec2",
                    width: width / 2.1,
                    height: height / 4,
                    borderRadius: 10
                  }}
                >
                  <Image
                    source={{ uri: this.state.receptekPic1 }}
                    style={{
                      width: width / 2.1,
                      height: height / 6,
                      zIndex: 100,
                      borderTopLeftRadius: 10,
                      borderTopRightRadius: 10
                    }}
                  />
                  <Text
                    numberOfLines={2}
                    style={[styles.cim, { color: "black" }]}
                  >
                    {this.state.receptekTitle1}
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  Actions.receptekHTML({ tesztak: this.state.receptekid2 });
                }}
              >
                <View
                  style={{
                    backgroundColor: "#f6eec2",
                    width: width / 2.1,
                    height: height / 4,
                    borderRadius: 10
                  }}
                >
                  <Image
                    source={{ uri: this.state.receptekPic2 }}
                    style={{
                      width: width / 2.1,
                      height: height / 6,
                      zIndex: 100,
                      borderTopLeftRadius: 10,
                      borderTopRightRadius: 10
                    }}
                  />
                  <Text
                    numberOfLines={2}
                    style={[styles.cim, { color: "black" }]}
                  >
                    {this.state.receptekTitle2}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                marginTop: 10
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  Actions.receptekHTML({ tesztak: this.state.receptekid3 });
                }}
              >
                <View
                  style={{
                    backgroundColor: "#f6eec2",
                    width: width / 2.1,
                    height: height / 4,
                    borderRadius: 10
                  }}
                >
                  <Image
                    source={{ uri: this.state.receptekPic3 }}
                    style={{
                      width: width / 2.1,
                      height: height / 6,
                      zIndex: 100,
                      borderTopLeftRadius: 10,
                      borderTopRightRadius: 10
                    }}
                  />
                  <Text
                    numberOfLines={2}
                    style={[styles.cim, { color: "black" }]}
                  >
                    {this.state.receptekTitle3}
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => Actions.receptek()}>
                <View
                  style={{
                    backgroundColor: "#cdb669",
                    width: width / 2.1,
                    height: height / 4,
                    borderRadius: 10,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Text
                    style={{
                      fontSize: 36,
                      textAlign: "center",
                      color: "white",
                      fontFamily: "AmaticSC-Bold"
                    }}
                  >
                    {"TÖBB RECEPT"}
                  </Text>
                  <View style={{ flexDirection: "row", marginTop: 10 }}>
                    <Image
                      source={require("../src/nyil_feher2.png")}
                      style={{
                        width: 31 / 2,
                        height: 58 / 2,
                        zIndex: 100,
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10
                      }}
                    />
                    <Image
                      source={require("../src/nyil_feher2.png")}
                      style={{
                        width: 31 / 2,
                        height: 58 / 2,
                        zIndex: 100,
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10
                      }}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              backgroundColor: "white",
              marginTop: 30,
              marginBottom: 30
            }}
          >
            <Text style={styles.nameText}>{"TERMÉKAJÁNLÓ"}</Text>
            <TouchableOpacity
              onPress={() => Actions.termek({ id: this.state.eventid1 })}
            >
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <View style={{ width: width - 20, height: height / 4 }}>
                  <Image
                    source={{ uri: this.state.eventPic1 }}
                    style={{
                      width: width - 20,
                      height: height / 4,
                      zIndex: 100
                    }}
                  />
                </View>
              </View>
            </TouchableOpacity>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                width: width - 40
              }}
            >
              <View style={{ justifyContent: "flex-start", marginLeft: 10 }}>
                <View>
                  <Text
                    numberOfLines={2}
                    style={[
                      styles.event,
                      { fontSize: 20, marginRight: width / 4 }
                    ]}
                  >
                    {this.state.eventTitle1}
                  </Text>
                </View>
              </View>
            </View>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <View
                style={{
                  margin: 10,
                  width: width - 50,
                  height: 0.3,
                  backgroundColor: "gray",
                  borderRadius: 20
                }}
              />
            </View>
          </View>

          <View>
            <Text style={styles.nameText}>{"RECEPT ÉLETKOR SZERINT"}</Text>
            <View style={{ justifyContent: "space-around" }}>
              <View
                style={{ flexDirection: "row", justifyContent: "space-around" }}
              >
                <TouchableOpacity
                  onPress={() => {
                    Actions.eletkorszerint({ index: 0 });
                  }}
                >
                  <View>
                    <Image
                      source={require("../src/receptek/2.png")}
                      style={{
                        width: 400 / 2.5,
                        height: 350 / 2.5,
                        zIndex: 100
                      }}
                    />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    Actions.eletkorszerint({ index: 1 });
                  }}
                >
                  <View>
                    <Image
                      source={require("../src/receptek/3.png")}
                      style={{
                        width: 400 / 2.5,
                        height: 350 / 2.5,
                        zIndex: 100
                      }}
                    />
                  </View>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  marginTop: 30
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    Actions.eletkorszerint({ index: 2 });
                  }}
                >
                  <View>
                    <Image
                      source={require("../src/receptek/1.png")}
                      style={{
                        width: 400 / 2.5,
                        height: 350 / 2.5,
                        zIndex: 100
                      }}
                    />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    Actions.eletkorszerint({ index: 3 });
                  }}
                >
                  <View>
                    <Image
                      source={require("../src/receptek/4.png")}
                      style={{
                        width: 400 / 2.5,
                        height: 350 / 2.5,
                        zIndex: 100
                      }}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <View
                style={{
                  backgroundColor: "gray",
                  height: 0.5,
                  width: width - 80,
                  marginTop: 20,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              />
            </View>

            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL(facebook).catch(err =>
                    console.error("An error occurred", err)
                  )
                }
              >
                <View
                  style={{
                    backgroundColor: "white",
                    borderWidth: 1.5,
                    height: height / 4 + 6,
                    borderRightWidth: 0,
                    borderRadius: 5,
                    borderColor: "white",
                    width: width / 4,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Image
                    source={require("../src/facebook.png")}
                    style={{ height: height / 11, width: height / 11 }}
                  />
                  <Text style={styles.title}>{"Facebook"}</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  Linking.openURL(facebookGroup).catch(err =>
                    console.error("An error occurred", err)
                  )
                }
              >
                <View
                  style={{
                    backgroundColor: "white",
                    borderWidth: 1.5,
                    height: height / 4 + 6,
                    borderRightWidth: 0,
                    borderRadius: 5,
                    borderColor: "white",
                    width: width / 4,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Image
                    source={require("../src/group.png")}
                    style={{
                      height: height / 11,
                      width: height / 11,
                      borderRadius: 40
                    }}
                  />
                  <Text style={styles.title}>{"Facebook csoport"}</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  Linking.openURL(youtube).catch(err =>
                    console.error("An error occurred", err)
                  )
                }
              >
                <View
                  style={{
                    backgroundColor: "white",
                    borderWidth: 1.5,
                    height: height / 4 + 6,
                    borderRightWidth: 0,
                    borderRadius: 5,
                    borderColor: "white",
                    width: width / 4,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Image
                    source={require("../src/youtube.png")}
                    style={{ height: height / 11, width: height / 11 }}
                  />
                  <Text style={styles.title}>{"Youtube"}</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  Linking.openURL(insta).catch(err =>
                    console.error("An error occurred", err)
                  )
                }
              >
                <View
                  style={{
                    backgroundColor: "white",
                    borderWidth: 1.5,
                    height: height / 4 + 6,
                    borderRightWidth: 0,
                    borderRadius: 5,
                    borderColor: "white",
                    width: width / 4,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Image
                    source={require("../src/instagram.png")}
                    style={{ height: height / 11, width: height / 11 }}
                  />
                  <Text style={styles.title}>{"Instagram"}</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View
              style={{
                width: width,
                height: height / 8,
                backgroundColor: "#00b8ac",
                alignItems: "center",
                justifyContent: "center"
              }}
            />
          </View>
        </ScrollView>

        <View style={[styles.menu, { width: width, height: height / 12 }]}>
          <TouchableOpacity>
            <View style={styles.menu1}>
              <Image
                source={require("../src/menu/menuikonaktiv_home.png")}
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
                source={require("../src/menu/menuikon_kedvenc1.png")}
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
    marginLeft: 3,
    fontSize: 18,
    textAlign: "left",
    color: "white",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    fontFamily: "AmaticSC-Bold"
  },

  HOME: {
    fontSize: 18,
    textAlign: "center",
    color: "white"
  },
  event: {
    fontSize: 15,
    textAlign: "left",
    color: "black"
    //fontFamily:'AmaticSC-Bold'
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
  title: {
    fontSize: 17,
    textAlign: "center",
    color: "black",
    marginTop: 10
  }
});
