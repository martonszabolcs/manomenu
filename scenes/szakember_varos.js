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
import markerImage from "../src/add-flight.png";
import { Actions } from "react-native-router-flux";
var { height, width } = Dimensions.get("window");

var json = [];

const instructions = Platform.select({});

export default class Szakember extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      postCover: [],
      news: [],
      dataSource: [],
      json: [
        {
          title: "Budapest",
          lat: 47.497913,
          lng: 19.040236,
          description:
            "Stockholm is the capital and the largest city of Sweden and constitutes the most populated urban area in Scandinavia with a population of 2.1 million in the metropolitan area (2010)"
        },
        {
          title: "Oslo",
          lat: 59.9,
          lng: 10.8,
          description:
            "Oslo is a municipality, and the capital and most populous city of Norway with a metropolitan population of 1,442,318 (as of 2010)."
        },
        {
          title: "Copenhagen",
          lat: 55.7,
          lng: 12.6,
          description:
            "Copenhagen is the capital of Denmark and its most populous city, with a metropolitan population of 1,931,467 (as of 1 January 2012)."
        }
      ]
    };
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
          <View>
            <Text style={styles.HOME}>{"SZAKEMBER KERESŐ"}</Text>
          </View>
          <View
            style={{ width: 31 / 3, height: 58 / 3, zIndex: 100, left: 10 }}
          />
        </View>
        <View
          style={{
            justifyContent: "space-around",
            flexDirection: "row",
            marginTop: 0
          }}
        >
          <TouchableOpacity
            onPress={() => {
              Actions.hetrolHTML({ tesztak: 167 });
            }}
          >
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
              <Text
                style={[
                  styles.cim,
                  { position: "absolute", backgroundColor: "transparent" }
                ]}
              >
                {"Dietetikus"}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Actions.hetrolHTML({ tesztak: 169 });
            }}
          >
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
              <Text
                style={[
                  styles.cim,
                  { position: "absolute", backgroundColor: "transparent" }
                ]}
              >
                {"Gasztro-\nenterológus"}
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
          <TouchableOpacity
            onPress={() => {
              Actions.hetrolHTML({ tesztak: 170 });
            }}
          >
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
              <Text
                style={[
                  styles.cim,
                  { position: "absolute", backgroundColor: "transparent" }
                ]}
              >
                {"Allergológus"}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Actions.hetrolHTML({ tesztak: 168 });
            }}
          >
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
              <Text
                style={[
                  styles.cim,
                  { position: "absolute", backgroundColor: "transparent" }
                ]}
              >
                {"Pszichológus"}
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
          <TouchableOpacity
            onPress={() => {
              Actions.hetrolHTML({ tesztak: 171 });
            }}
          >
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
              <Text
                style={[
                  styles.cim,
                  { position: "absolute", backgroundColor: "transparent" }
                ]}
              >
                {"Fogorvos (gyermek)"}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Actions.hetrolHTML({ tesztak: 172 });
            }}
          >
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
              <Text
                style={[
                  styles.cim,
                  { position: "absolute", backgroundColor: "transparent" }
                ]}
              >
                {"Egyéb"}
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
  map: {
    position: "absolute",
    top: height / 15,
    left: 0,
    right: 0,
    bottom: 0
  },
  cim: {
    fontSize: 31,
    textAlign: "center",
    color: "white",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    fontFamily: "AmaticSC-Bold"
  }
});

/*{this.state.markers.map(marker => (
    <Marker
      coordinate={marker.latlng}
      title={marker.title}
      description={marker.description}
    />
  ))}
 <View style={{justifyContent:'space-around', flexDirection:'row', marginTop:0}}>
          <TouchableOpacity onPress={()=> {Actions.hetrolHTML({ tesztak: 167})}}>
          <View style={{width:height/4, height:height/4, margin:5, backgroundColor:'#00b8ac', justifyContent:'center',alignItems:'center', borderRadius:10}}>
            
              <Text style={[styles.cim, {position:'absolute', backgroundColor:'transparent'}]}>
                  {'Dietetikus'}
              </Text>

          </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> {Actions.hetrolHTML({ tesztak: 169})}}>
          <View style={{width:height/4, height:height/4, margin:5, backgroundColor:'#f0d886', justifyContent:'center',alignItems:'center', borderRadius:10}}>
            <Text style={[styles.cim, {position:'absolute', backgroundColor:'transparent'}]}>
                  {'Gasztro-\nenterológus'}
            </Text>
          </View>
          </TouchableOpacity>
        </View>

        <View style={{justifyContent:'space-around', flexDirection:'row', marginTop:0}}>
          <TouchableOpacity onPress={()=> {Actions.hetrolHTML({ tesztak: 170})}}>
          <View style={{width:height/4, height:height/4, margin:5, backgroundColor:'#8fba55', justifyContent:'center',alignItems:'center', borderRadius:10}}>
            <Text style={[styles.cim, {position:'absolute', backgroundColor:'transparent'}]}>
                  {'Allergológus'}
            </Text>

          </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> {Actions.hetrolHTML({ tesztak: 168})}}>
          <View style={{width:height/4, height:height/4, margin:5, backgroundColor:'#ff5358', justifyContent:'center',alignItems:'center', borderRadius:10}}>
            <Text style={[styles.cim, {position:'absolute', backgroundColor:'transparent'}]}>
                  {'Pszichológus'}
            </Text>
          </View>
          </TouchableOpacity>
        </View> 

       <View style={{justifyContent:'space-around', flexDirection:'row', marginTop:0}}>
          <TouchableOpacity onPress={()=> {Actions.hetrolHTML({ tesztak: 171})}}>
          <View style={{width:height/4, height:height/4, margin:5, backgroundColor:'#00b8ac', justifyContent:'center',alignItems:'center', borderRadius:10}}>
              <Text style={[styles.cim, {position:'absolute', backgroundColor:'transparent'}]}>
                  {'Fogorvos (gyermek)'}
              </Text>

          </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> {Actions.hetrolHTML({ tesztak: 172})}}>
          <View style={{width:height/4, height:height/4, margin:5, backgroundColor:'#f0d886', justifyContent:'center',alignItems:'center', borderRadius:10}}>
            <Text style={[styles.cim, {position:'absolute', backgroundColor:'transparent'}]}>
                  {'Egyéb'}
            </Text>
          </View>
          </TouchableOpacity>
        </View>



  */
