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
  AsyncStorage
} from "react-native";

import api from "../utilities/api";
//import Noti from './noti';
import { Actions, ActionConst } from "react-native-router-flux";
var options = {
  title: "Válassz egy képet!",
  customButtons: [{ name: "fb", title: "Choose Photo from Facebook" }],
  storageOptions: {
    skipBackup: true,
    path: "images"
  }
};

const instructions = Platform.select({});

export default class Profil extends Component<{}> {
  constructor(props) {
    super(props);
    console.log(props.addedData);
    this.state = {
      postCover: [],
      news: [],
      dataSource: [],
      mielott: "",
      avatarSource: "",
      addedData: props.addedData
    };
    this.dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1.guid != r2.guid
    });
    this._updateList();
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  componentWillReceiveProps(props) {
    console.log("componentWillUpdate fut");
    console.log(props);
    this.setState({
      addedData: props.addedData
    });
    setTimeout(() => {
      this.saveData();
     
    }, 100);
  }

  async _updateList() {
    try {
      var value = await AsyncStorage.getItem("@profil:baba");

      var list = JSON.parse(value);

      //this.updateStatistics(list);
      this.setState({
        addedData: list
      });
      

      // New list with no data
    } catch (error) {
      // Can't access data
    }

    /*  const response = await AsyncStorage.getItem('@profil:adatok');
  const listofData = await JSON.parse(response) || [];
  this.setState({
    addedData: listofData
  });*/
    console.log(this.state.addedData);
  }

  async saveData(props) {
    var lists = this.state.addedData;
    //var avatar = this.state.avatarSource;
    //avatar.push(list);
    //var lists = avatar.concat(list);

    await AsyncStorage.setItem("@profil:baba", JSON.stringify(lists));
    console.log("saved");
  }

  lengthBaba() {
    if (this.state.addedData.nem == "lany") {
      var data = this.state.addedData;
      var honap = Number(this.state.addedData.date);
      var magassag = Number(this.state.addedData.magassag);
      if (honap < 24) {
        console.log(this.state.addedData.gLength[5].data[honap]);
        data.gLength[5].data[honap].y = magassag;
        data.gLength[5].data[honap].x = this.state.addedData.nev;
        this.setState({ addedData: data });
      }
    } else {
      var dataBoy = this.state.addedData;
      var honap = Number(this.state.addedData.date);
      var magassag = Number(this.state.addedData.magassag);
      if (honap < 24) {
        console.log(this.state.addedData.gLength[5].data[honap]);
        dataBoy.bLength[5].data[honap].y = magassag;
        dataBoy.bLength[5].data[honap].x = this.state.addedData.nev;
        this.setState({ addedData: dataBoy });
      }
    }
  }
  heightBaba() {
    console.log(this.state.addedData.gHeight);
    if (this.state.addedData.nem == "lany") {
      var data = this.state.addedData;
      var honap = Number(this.state.addedData.date);
      var suly = Number(this.state.addedData.suly);
      if (honap < 24) {
        console.log(this.state.addedData.gHeight[5].data[honap]);
        data.gHeight[5].data[honap].y = suly;
        data.gHeight[5].data[honap].x = this.state.addedData.nev;
        this.setState({ addedData: data });
      }
    } else {
      var dataBoy = this.state.addedData;
      var honap = Number(this.state.addedData.date);
      var suly = Number(this.state.addedData.suly);
      if (honap < 24) {
        console.log(this.state.addedData.bHeight[5].data[honap]);
        dataBoy.bHeight[5].data[honap].y = suly;
        dataBoy.bHeight[5].data[honap].x = this.state.addedData.nev;
        this.setState({ addedData: dataBoy });
      }
    }
  }

  componentWillMount() {
    api.getMielott().then(mielott => {
      this.setState({
        mielott: mielott.list
        //title: res.info.title,
        //des: res.info.description
      });
    });
  }
  componentDidMount() {}

  nem() {
    if (this.state.addedData.nem == "fiu") {
      return require("../src/profil/ikon_fiu.png");
    } else {
      return require("../src/profil/ikon_lany.png");
    }
  }

  imagePick() {
    if (this.state.avatarSource !== "") {
      return;
    } else {
      <Image
        source={require("../src/happy-baby.jpg")}
        style={styles.uploadAvatar}
      />;
    }
  }

  pick() {
    /*  ImagePicker.showImagePicker(options, (response) => {
  console.log('Response = ', response);

  if (response.didCancel) {
    console.log('User cancelled image picker');
  }
  else if (response.error) {
    console.log('ImagePicker Error: ', response.error);
  }
  else if (response.customButton) {
    console.log('User tapped custom button: ', response.customButton);
  }
  else {
    let source = { uri: response.uri };

    // You can also display the image using data:
    // let source = { uri: 'data:image/jpeg;base64,' + response.data };

    this.setState({
      avatarSource: source
    });
    this.saveData();
  console.log(this.state.avatarSource);

  }
});*/
  }

  render() {
    var { height, width } = Dimensions.get("window");
    console.log(this.state.addedData);

    if (this.state.addedData == null) {
      return (
        <View
          style={{
            backgroundColor: "#00b8ac",
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
            padding: 20
          }}
        >
          <Text style={[styles.cim, { backgroundColor: "transparent" }]}>
            A CERUZÁRA KATTINTVA MEG TUDOD ADNI A BABA ADATAIT!
          </Text>
          <TouchableOpacity onPress={() => Actions.adatlap()}>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginRight: 10,
                marginTop: 30,
                backgroundColor: "white",
                borderRadius: 100,
                height: 50,
                width: 50
              }}
            >
              <Image
                source={require("../src/profil/ikon_szerk.png")}
                style={{ width: 62 / 2, height: 62 / 2, zIndex: 1021320 }}
              />
            </View>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <View>
            <Image
              source={require("../src/hatter_profil.png")}
              style={{
                width: width,
                height: height / 3,
                position: "absolute",
                zIndex: -1
              }}
            />
          </View>

          <View
            style={{
              width: width,
              height: height / 15,
              backgroundColor: "#00b8ac",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <TouchableOpacity onPress={() => Actions.valaszto()}>
              <View
                style={{
                  width: height / 15,
                  height: height / 15,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Image
                  source={require("../src/nyil_feher.png")}
                  style={{
                    width: 31 / 3,
                    height: 58 / 3,
                    zIndex: 2312132321312,
                    marginLeft: 10
                  }}
                />
              </View>
            </TouchableOpacity>
            <View>
              <Text style={styles.HOME}>{"Profil"}</Text>
            </View>
            <View
              style={{ width: 31 / 3, height: 58 / 3, zIndex: 100, left: 10 }}
            />
          </View>
          <ScrollView>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: 10,
                  borderRadius: 100,
                  height: 50,
                  width: 50
                }}
              />
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Text style={[styles.cim, { backgroundColor: "transparent" }]}>
                  {this.state.addedData.nev}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() =>
                  Actions.adatlap({ addedData: this.state.addedData })
                }
              >
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: 10,
                    backgroundColor: "white",
                    borderRadius: 100,
                    height: 50,
                    width: 50
                  }}
                >
                  <Image
                    source={require("../src/profil/ikon_szerk.png")}
                    style={{ width: 62 / 2, height: 62 / 2, zIndex: 1010 }}
                  />
                </View>
              </TouchableOpacity>
            </View>

            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 10,
                  backgroundColor: "white",
                  borderWidth: 2,
                  borderColor: "#00b8ac",
                  borderRadius: 100,
                  height: 150,
                  width: 150
                }}
              >
                <Image
                  source={require("../src/happy-baby.jpg")}
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    borderWidth: 2,
                    borderColor: "#00b8ac",
                    borderRadius: 70,
                    height: 150,
                    width: 150
                  }}
                />
              </View>
            </View>

            <View style={{ backgroundColor: "white" }}>
              <View style={{ marginTop: 5 }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around"
                  }}
                >
                  <View
                    style={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <Text
                      style={{
                        color: "#00b8ac",
                        textAlign: "center",
                        fontSize: 10
                      }}
                    >
                      NEM
                    </Text>
                    <View
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: 10,
                        backgroundColor: "#00b8ac",
                        borderRadius: 100,
                        height: 80,
                        width: 80
                      }}
                    >
                      <Image
                        source={this.nem()}
                        style={{ width: 40, height: 40, zIndex: 100 }}
                      />
                    </View>
                  </View>
                  <View
                    style={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <Text
                      style={{
                        color: "#00b8ac",
                        textAlign: "center",
                        fontSize: 10
                      }}
                    >
                      KOR
                    </Text>
                    <View
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: 10,
                        borderRadius: 100,
                        height: 80,
                        width: 80
                      }}
                    >
                      <Image
                        source={require("../src/profil/ikon_kor.png")}
                        style={{ width: 80, height: 80, zIndex: 100 }}
                      />
                      <Text
                        style={[
                          styles.cim,
                          {
                            backgroundColor: "transparent",
                            position: "absolute",
                            top: 18,
                            left: 13,
                            zIndex: 131231232
                          }
                        ]}
                      >
                        {this.state.addedData.date}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

              <View style={{ marginTop: 20 }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around"
                  }}
                >
                  <View
                    style={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <Text
                      style={{
                        color: "#00b8ac",
                        textAlign: "center",
                        fontSize: 10
                      }}
                    >
                      SÚLY
                    </Text>
                    <View
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: 10,
                        borderRadius: 100,
                        height: 80,
                        width: 80
                      }}
                    >
                      <Image
                        source={require("../src/profil/ikon_suly.png")}
                        style={{ width: 80, height: 80, zIndex: 100 }}
                      />
                      <Text
                        style={[
                          styles.cim,
                          {
                            fontSize: 26,
                            backgroundColor: "transparent",
                            position: "absolute",
                            top: 34,
                            left: 10,
                            zIndex: 131231232
                          }
                        ]}
                      >
                        {this.state.addedData.suly}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <Text
                      style={{
                        color: "#00b8ac",
                        textAlign: "center",
                        fontSize: 10
                      }}
                    >
                      MAGASSÁG
                    </Text>
                    <View
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: 10,
                        borderRadius: 100,
                        height: 80,
                        width: 80
                      }}
                    >
                      <Image
                        source={require("../src/profil/ikon_magassag.png")}
                        style={{ width: 80, height: 80, zIndex: 100 }}
                      />
                      <Text
                        style={[
                          styles.cim,
                          {
                            backgroundColor: "transparent",
                            position: "absolute",
                            top: 5,
                            zIndex: 131231232
                          }
                        ]}
                      >
                        {this.state.addedData.magassag}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              <View
                style={{ flexDirection: "column", justifyContent: "center" }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    marginTop: 20,
                    marginLeft: 50,
                    marginRight: 50
                  }}
                >
                  {
                    "Frissítsd minden hónapban a baba adatait, hogy aktuális legyen a percentilis görbe."
                  }
                </Text>

                <TouchableOpacity
                  onPress={() =>
                    Actions.percentilisGorbe({ gyerek: this.state.addedData })
                  }
                >
                  <View
                    style={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <View
                      style={{
                        marginTop: 30,
                        marginBottom: 20,
                        height: 50,
                        width: width / 1.2,
                        justifyContent: "center",
                        backgroundColor: "#00b8ac",
                        borderRadius: 10,
                        alignItems: "center"
                      }}
                    >
                      <Text
                        style={{
                          color: "white",
                          textAlign: "center",
                          fontSize: 20
                        }}
                      >
                        Percentilis görbe
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => Actions.notes()}>
                  <View
                    style={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <View
                      style={{
                        marginTop: 10,
                        marginBottom: 20,
                        height: 50,
                        width: width / 1.2,
                        justifyContent: "center",
                        backgroundColor: "#00b8ac",
                        borderRadius: 10,
                        alignItems: "center"
                      }}
                    >
                      <Text
                        style={{
                          color: "white",
                          textAlign: "center",
                          fontSize: 20
                        }}
                      >
                        Jegyzet
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ height: 80 }} />
          </ScrollView>

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
