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
import { Marker } from "react-native-maps";
import MapView from "react-native-maps";

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
            "Budapesti szakemberek"
        },
        {
          title: "Tatabánya",
          lat: 47.569246,
          lng: 18.404818,
          description:
          ""
        },
        {
          title: "Székesfehérvár",
          lat: 47.186026,
          lng: 18.422136,
          description:
          ""
        },
        {
          title: "Győr",
          lat: 47.687457,
          lng: 17.650397,
          description:
          ""
        },

        {
          title: "Sopron",
          lat: 47.681662,
          lng: 16.584480,
          description:
          ""
        },
        {
          title: "Veszprém",
          lat: 47.102809,
          lng: 17.909302,
          description:
          ""
        },
        {
          title: "Szombathely",
          lat: 47.230685,
          lng: 16.621844,
          description:
          ""
        },
        {
          title: "Zalaegerszeg",
          lat: 46.841694,
          lng: 16.841632,
          description:
          ""
        },
        {
          title: "Kaposvár",
          lat: 46.359361,
          lng: 17.796764,
          description:
          ""
        },
        {
          title: "Pécs",
          lat: 46.072735,
          lng: 18.232266,
          description:
          ""
        },
        {
          title: "Szekszárd",
          lat: 46.347433,
          lng: 18.706229,
          description:
          ""
        },
        {
          title: "Kecskemét",
          lat: 46.896371,
          lng: 19.689686,
          description:
          ""
        },
        {
          title: "Eger",
          lat: 47.902535,
          lng: 20.377228,
          description:
          ""
        },
        {
          title: "Miskolc",
          lat: 48.103477,
          lng: 20.778438,
          description:
          ""
        },
        {
          title: "Nyíregyháza",
          lat: 47.949532,
          lng: 21.724405,
          description:
          ""
        },
        {
          title: "Debrecen",
          lat: 47.531605,
          lng: 21.627312,
          description:
          ""
        },
        {
          title: "Szolnok",
          lat: 47.162136,
          lng: 20.182471,
          description:
          ""
        },
        {
          title: "Szeged",
          lat: 46.253010,
          lng: 20.141425,
          description:
          ""
        },
        {
          title: "Békéscsaba",
          lat: 46.673594,
          lng: 21.087731,
          description:
          ""
        }, 
        {
          title: "Salgótarján",
          lat: 48.093524,
          lng: 19.799981,
          description:
          ""
        },
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
            style={{ width: height / 15,
                height: height / 15,
                zIndex: 100}}
          />
        </View>
        <MapView
          region={this.state.region}
          onRegionChange={this.onRegionChange}
          style={styles.map}
        >
          {this.state.json.map((json, key) => {
            console.log(json);
            console.log(json.title)
            console.log(key);
            const metadata = `Status: ${json.statusValue}`;
            return (
              <Marker
                onPress={e => Actions.szakember_varos({ varos: json.title })}
                key={key}
                coordinate={{ latitude: json.lat, longitude: json.lng }}
                title={json.title}
                description={json.description}
              >
                <MapView.Callout>
                  <View>
                    <Text>{json.description}</Text>
                  </View>
                </MapView.Callout>
              </Marker>
            );
          })}
        </MapView>

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
       ...StyleSheet.absoluteFillObject,

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
    ...StyleSheet.absoluteFillObject,
    position: "absolute",
    marginTop:height/15,
    top: 0,
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
