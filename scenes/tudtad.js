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
      haadolgok: [],
      dataSource: []
    };
    this.dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1.guid != r2.guid
    });
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  componentWillMount() {
    api.gettudtad().then(tudtad => {
      this.setState({
        haadolgok: tudtad.list
        //title: res.info.title,
        //des: res.info.description
      });
    });
  }

  render() {
    var { height, width } = Dimensions.get("window");
    console.log(this.state.haadolgok);
    return (
      <View style={styles.container}>
        <View
          style={{
            width: width,
            height: height / 15,
            marginTop: 20,
            backgroundColor: "transparent",
            position: "absolute",
            zIndex: 21312312,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-end",
            paddingBottom: 10
          }}
        >
          <TouchableOpacity onPress={() => Actions.pop()}>
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
              Actions.kereso();
            }}
          >
            <Image
              source={require("../src/search.png")}
              style={{
                width: width / 12,
                height: width / 12,
                zIndex: 100,
                marginRight: 20,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10
              }}
            />
          </TouchableOpacity>
        </View>
        <View>
          <Image
            source={require("../src/hozzataplalas/hozzatapl_n_mielott_.png")}
            style={{ width: width, height: height / 3, position: "absolute" }}
          />
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: height / 8
          }}
        >
          <Text
            style={[
              styles.cim,
              { position: "relative", backgroundColor: "transparent" }
            ]}
          >
            {"TUDTAD?"}
          </Text>
        </View>
        <ScrollView
          removeClippedSubviews={true}
          style={{ backgroundColor: "transparent", marginTop: height / 10 }}
        >
          <ListView
            dataSource={this.dataSource.cloneWithRows(this.state.haadolgok)}
            enableEmptySections={true}
            stickyHeaderIndices={[10]}
            initialListSize={0}
            contentContainerStyle={styles.list}
            scrollEnabled={true}
            pageSize={2}
            column={2}
            renderRow={(rowData, sectionID, rowID, highlightRow) => (
              <View
                numberOfLines={1}
                style={{ backgroundColor: "transparent" }}
              >
                <View style={{ marginTop: 10 }}>
                  <TouchableOpacity
                    onPress={() => {
                      Actions.cikkekHTML({ tesztak: rowData.id });
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: "#dff7f5",
                        width: width / 2 - 10,
                        height: height / 4,
                        borderRadius: 10
                      }}
                    >
                      <Image
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
                            textAlign: "center",
                            fontSize: 16
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
    fontFamily: "AmaticSC-Bold"
  },
  list: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around"
  }
});
