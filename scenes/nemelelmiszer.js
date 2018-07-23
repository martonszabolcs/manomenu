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
  AsyncStorage
} from "react-native";

//import Firsttime from './firsttime';

import api from "../utilities/api";
//import Noti from './noti'
import { Actions } from "react-native-router-flux";

//import {CachedImage} from "react-native-img-cache";

import Moment from "moment";
const Unix = require("../utilities/unixHome");

const instructions = Platform.select({});

export default class Kedvencek extends Component<{}> {
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
      favorites: [],
      content: [],
      update: props.update
    };
    this.dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1.guid != r2.guid
    });
    this._updateList();
  }

  async _updateList() {
    const response = await AsyncStorage.getItem("@favorites:lista");
    const listOfLikes = (await JSON.parse(response)) || [];
    this.setState(
      {
        favorites: listOfLikes
      },
      () => {
        console.log(this.state.favorites);
        if (listOfLikes.includes(this.state.tesztak)) {
          this.setState({
            favourite: true
          });
        } else {
          this.setState({
            favourite: false
          });
        }
        console.log(this.state.favourite + "favourite");
      }
    );
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
      this._updateList();
    }
  }

  componentWillMount() {
    setTimeout(() => {
      return fetch(
        "http://46.101.62.53/Apps/rest/content/10/list?category=65",
        {
          headers: {
            accept: "application/json",
            AppId: "3"
          }
        }
      )
        .then(res => res.json())
        .then(res => {
          this.setState({
            content: res.list
          });
        });
    }, 1000);
  }

  render() {
    var { height, width } = Dimensions.get("window");
    var facebook = "https://www.facebook.com/";
    var instagram = "https://www.instagram.com/";
    var pinterest = "http://pinterest.com";

    console.log(this.state.favorites);
    console.log(this.state.content);

    const switchTwoValue = this.state.switchTwoValue;
    return (
      <View style={styles.container}>
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
          <TouchableOpacity
            onPress={() => {
              Actions.pop();
            }}
          >
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
          <TouchableOpacity
            onPress={() => {
              Actions.termek();
            }}
          >
            <View style={{ marginLeft: 10 }}>
              <Text style={[styles.HOME, { color: "white" }]}>ÉLELMISZER</Text>
            </View>
          </TouchableOpacity>

          <View style={{ marginRight: 10 }}>
            <Text style={[styles.HOME, { color: "#fff9c5" }]}>
              NEM ÉLELMISZER
            </Text>
          </View>
        </View>
        <ScrollView
          removeClippedSubviews={true}
          style={{ backgroundColor: "transparent" }}
        >
          <ListView
            dataSource={this.dataSource.cloneWithRows(this.state.content)}
            enableEmptySections={true}
            stickyHeaderIndices={[10]}
            initialListSize={0}
            contentContainerStyle={styles.list}
            scrollEnabled={true}
            pageSize={2}
            renderRow={(rowData, sectionID, rowID, highlightRow) => (
              <View
                numberOfLines={1}
                style={{ backgroundColor: "transparent" }}
              >
                <View style={{ marginTop: 5 }}>
                  <TouchableOpacity
                    onPress={() => {
                      Actions.termekHTML({ tesztak: rowData.id });
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: "#dff7f5",
                        width: width / 2 - 5,
                        height: height / 4,
                        borderRadius: 10
                      }}
                    >
                      <Image
                        resizeMethod="resize"
                        source={{ uri: rowData.imageUrl }}
                        style={{
                          width: width / 2 - 10,
                          height: height / 6,
                          zIndex: 100,
                          borderRadius: 10
                        }}
                      />
                      <Text
                        numberOfLines={2}
                        style={[
                          styles.cim,
                          {
                            color: "#17776f",
                            marginLeft: 5,
                            marginTop: 5,
                            textAlign: "left",
                            fontSize: 17
                          }
                        ]}
                      >
                        {rowData.title}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
          <View style={{ height: 100 }} />
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
  title: {
    fontSize: 17,
    textAlign: "center",
    color: "black",
    marginTop: 10
  },
  list: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around"
  }
});
