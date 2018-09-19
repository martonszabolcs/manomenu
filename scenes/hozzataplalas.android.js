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
  TouchableHighlight
} from "react-native";

import api from "../utilities/api";
//import Noti from './noti';
import { Actions } from "react-native-router-flux";

const instructions = Platform.select({});

export default class Hozzataplalas extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      postCover: [],
      news: [],
      dataSource: []
    };
    Actions.reset("hozzataplalas");

    this.dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1.guid != r2.guid
    });
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  componentWillMount() {
    /*setTimeout(() => {
    api.getPosts().then((posts) => {

      this.setState({
        news: posts.list
        //title: res.info.title,
        //des: res.info.description
      })
    })
    }, (10))*/
  }

  render() {
    var { height, width } = Dimensions.get("window");
    console.log(this.state.news);
    return (
      <View style={styles.container}>
        <Image
          source={require("../src/hozzataplalas/alma.png")}
          style={{
            bottom: 0,
            right: 0,
            height: height / 3.5,
            width: height / 4,
            position: "absolute",
            marginTop: height / 4
          }}
        />
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
          <Text style={styles.HOME}>{"HOZZÁTÁPLÁLÁS"}</Text>
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
        <View
          style={{
            justifyContent: "space-around",
            flexDirection: "row",
            marginTop: 0
          }}
        >
          <TouchableOpacity onPress={() => Actions.mielott()}>
            <View
              style={{
                width: height / 4,
                height: height / 4,
                margin: 5,
                backgroundColor: "#00b8ac",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 10
              }}
            >
              <Image
                source={require("../src/hozzataplalas/hozzatapl_mielott.png")}
                style={{
                  width: height / 4,
                  height: height / 4,
                  borderRadius: 10,
                  zIndex: 500
                }}
              />
              <Text
                style={[
                  styles.cim,
                  {
                    position: "absolute",
                    backgroundColor: "transparent",
                    zIndex: 324235
                  }
                ]}
              >
                {"MIELŐTT\nELKEZDED..."}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Actions.keszenall()}>
            <View
              style={{
                width: height / 4,
                height: height / 4,
                margin: 5,
                backgroundColor: "#f0d886",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 10
              }}
            >
              <Image
                source={require("../src/hozzataplalas/hozzatapl_keszenall.png")}
                style={{
                  width: height / 4,
                  height: height / 4,
                  borderRadius: 10
                }}
              />
              <Text
                style={[
                  styles.cim,
                  { position: "absolute", backgroundColor: "transparent" }
                ]}
              >
                {"KÉSZEN ÁLL\nA BABA?"}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View
          style={{
            justifyContent: "space-around",
            flexDirection: "row",
            marginTop: 0
          }}
        >
          <TouchableOpacity onPress={() => Actions.alapok()}>
            <View
              style={{
                width: height / 4,
                height: height / 4,
                margin: 5,
                backgroundColor: "#8fba55",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 10
              }}
            >
              <Image
                source={require("../src/hozzataplalas/hozzatapl_azalapko.png")}
                style={{
                  width: height / 4,
                  height: height / 4,
                  borderRadius: 10,
                  zIndex: 500
                }}
              />
              <Text
                style={[
                  styles.cim,
                  { position: "absolute", backgroundColor: "transparent" }
                ]}
              >
                {"AZ ALAPOK"}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Actions.szukseg()}>
            <View
              style={{
                width: height / 4,
                height: height / 4,
                margin: 5,
                backgroundColor: "#ff5358",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 10
              }}
            >
              <Image
                source={require("../src/hozzataplalas/hozzatapl_mierelesz.png")}
                style={{
                  width: height / 4,
                  height: height / 4,
                  borderRadius: 10
                }}
              />
              <Text
                style={[
                  styles.cim,
                  { position: "absolute", backgroundColor: "transparent" }
                ]}
              >
                {"MIRE LESZ\nSZÜKSÉGED?"}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View
          style={{
            justifyContent: "space-around",
            flexDirection: "row",
            marginTop: 0
          }}
        >
          <TouchableOpacity onPress={() => Actions.haadolgok()}>
            <View
              style={{
                width: height / 4,
                height: height / 4,
                margin: 5,
                backgroundColor: "#007068",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 10
              }}
            >
              <Image
                source={require("../src/hozzataplalas/hozzatapl_haadolgok.png")}
                style={{
                  width: height / 4,
                  height: height / 4,
                  borderRadius: 10
                }}
              />
              <Text
                style={[
                  styles.cim,
                  { position: "absolute", backgroundColor: "transparent" }
                ]}
              >
                {"HA A DOLGOK\nROSSZUL MENNÉNEK"}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Actions.tudtad()}>
            <View
              style={{
                width: height / 4,
                height: height / 4,
                margin: 5,
                backgroundColor: "#00b8ac",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 10
              }}
            >
              <Image
                source={require("../src/hozzataplalas/hozzatapl_mielott2.png")}
                style={{
                  width: height / 4,
                  height: height / 4,
                  borderRadius: 10,
                  zIndex: 500
                }}
              />
              <Text
                style={[
                  styles.cim,
                  {
                    position: "absolute",
                    backgroundColor: "transparent",
                    zIndex: 324235
                  }
                ]}
              >
                {"TUDTAD?"}
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

          <TouchableOpacity>
            <View style={styles.menu1}>
              <Image
                source={require("../src/menu/menuikonaktiv_hozzatap.png")}
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
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    fontFamily: "AmaticSC-Bold"
  }
});
