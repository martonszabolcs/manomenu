import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  Picker,
  TextInput,
  Alert,
  ListView,
  AsyncStorage
} from "react-native";
import PureChart from "react-native-pure-chart";
import moment from "moment";
import Tablazat from "./percentilisAdatok.js";
import { SwipeListView, SwipeRow } from "react-native-swipe-list-view";

var { height, width } = Dimensions.get("window");
import { Actions, ActionConst } from "react-native-router-flux";

export default class Perc extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      oldal: "magassag",
      modalVisible: false,
      modalVisible2: false,
      lista: [],
      honapi:1,
      magassagi:"",
      sulyi:"",
      magassag: this.props.gyerek.magassag,
      gender: this.props.gyerek.nem,
      suly: this.props.gyerek.suly,
      nev: this.props.gyerek.nev,
      honap: this.props.gyerek.date,
      addedData: [],
      
      dataSource: []
    };
    this.dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1.guid != r2.guid
    });
    this.loaddata();

  }
  async loaddata(){
        AsyncStorage.getItem('percentilismindenadat', (err, result) => {
           var data = JSON.parse(result);
            console.log(data)

            this.setState({
                gLength: data.gLength,
                gHeight: data.gHeight,
                bLength: data.bLength,
                bHeight: data.bHeight,
            })
     });
  }
  what() {
    if (this.state.gender == "lany") {
      console.log("lany");

      return this.state.gLength;
    } else {
      console.log("fiu");

      return this.state.bLength;
    }
  }
  what2() {
    if (this.state.gender == "lany") {
      console.log("lany");

      return this.state.gHeight;
    } else {
      console.log("fiu");

      return this.state.bHeight;
    }
  }
  percentilisMagassag() {
    if (this.state.gender == "lany") {
      return (

    <View>
        <Text style={{ color: "gray", marginBottom: 5 }}>
          {" "}
          Magassági görbe cm (lány){" "}
        </Text>
        </View>
      );
    } else {
      return (

    <View>
        <Text style={{ color: "gray", marginBottom: 5 }}>
          {" "}
          Magassági görbe cm (fiú){" "}
        </Text>
        </View>
      );
    }
  }
  percentilisKg() {
    if (this.state.gender == "lany") {
      return (
        <Text style={{ color: "white", marginBottom: 5 }}>
          {" "}
          Súly görbe kg (lány){" "}
        </Text>
      );
    } else {
      return (
        <Text style={{ color: "white", marginBottom: 5 }}>
          {" "}
          Súly görbe kg (fiú){" "}
        </Text>
      );
    }
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

  async saveNewItem() {

    if (this.state.magassagi != "" && this.state.honapi && this.state.sulyi != ""){

    if (this.state.gender == "lany") {
        console.log("gLength")
      var data = this.state.gLength;
      var honap = Number(this.state.honapi);
      var magassag = Number(this.state.magassagi);
      if (honap < 24) {
        console.log(this.state.gLength[5].data[honap]);

        data[5].data[honap].y = magassag;
        data[5].data[honap].x = this.state.nev;
        this.setState({ gLength: data });
      }
    } else {
        console.log("bLength")

      var dataBoy = this.state.bLength;
      var honap = Number(this.state.honapi);
      var magassag = Number(this.state.magassagi);
      if (honap < 24) {
        console.log(this.state.bLength[5].data[honap]);
        dataBoy[5].data[honap].y = magassag;
        dataBoy[5].data[honap].x = this.state.nev;
        this.setState({ bLength: dataBoy });
      }
    }

    if (this.state.gender == "lany") {
        console.log("gHeight")

      var data = this.state.gHeight;
      var honap = Number(this.state.honapi);
      var suly = Number(this.state.sulyi);
      if (honap < 24) {
        console.log(this.state.gHeight[5].data[honap]);
        data[5].data[honap].y = suly;
        data[5].data[honap].x = this.state.nev;
        this.setState({ gHeight: data });
      }
    } else {
        console.log("bHeight")

      var dataBoy = this.state.bHeight;
      var honap = Number(this.state.honapi);
      var suly = Number(this.state.sulyi);
      if (honap < 24) {
        console.log(this.state.bHeight[5].data[honap]);
        dataBoy[5].data[honap].y = suly;
        dataBoy[5].data[honap].x = this.state.nev;
        this.setState({ bHeight: dataBoy });
      }
    }

    var lista = this.state.lista;

    
    lista[honap] = {magassag: this.state.magassagi,
      suly: this.state.sulyi,
      honap: this.state.honapi,
      date: this.state.datei}

    
    setTimeout(() => {
    var perc = {
      bHeight: this.state.bHeight,
      gHeight: this.state.gHeight,
      bLength: this.state.bLength,
      gLength: this.state.gLength
    };


    AsyncStorage.setItem('percentilismindenadat', JSON.stringify(perc));
    this.loaddata();

    },1000)
    

    this.setState({ lista: lista });
    console.log(this.state.lista);
    setTimeout(() => {
      this.saveList();
    }, 200);

    this.setState({
      magassag: "",
      suly: "",
      honap: "",
      date: ""
    });

    this.modalVisible2(false);
  } else {
    alert("Kérlek, minden adatot tölts ki!")
  }
  }
  onChanged(text) {
   let newText = "";
    let numbers = "0123456789.";

    for (var i = 0; i < text.length; i++) {
      if (numbers.indexOf(text[i]) > -1) {
        newText = newText + text[i];
      } else {
        textIn = text.slice(0, -1);
        console.log(textIn)
        Alert.alert(
  'Hiba',
  'Kérlek számot írj be! Ha tört számot szeretnél beírni a vessző(,) helyett pontot(.) írj be!',
  [
    {text: 'OK', onPress: () => 
        this.setState({magassagi:textIn})},
  ],
  { cancelable: false }
)
        

      }
    }
    this.setState({ magassagi: text });
  }
 onChanged2(text) {
    let newText = "";
    let numbers = "0123456789.";

    for (var i = 0; i < text.length; i++) {
      if (numbers.indexOf(text[i]) > -1) {
        newText = newText + text[i];
      } else {
        textIn = text.slice(0, -1);
        console.log(textIn)
        Alert.alert(
  'Hiba',
  'Kérlek számot írj be! Ha tört számot szeretnél beírni a vessző(,) helyett pontot(.) írj be!',
  [
    {text: 'OK', onPress: () => 
        this.setState({sulyi:textIn})},
  ],
  { cancelable: false }
)
        

      }
    }
    this.setState({ sulyi: text });
  }

  saveNewItem2() {
    let list = this.state.lista;
    var i = this.state.modSzam;

    list.splice(i, 1);
    ids = {
      magassag: this.state.modmagassag,
      suly: this.state.modsuly,
      honap: this.state.modhonap,
      date: this.state.moddate
    }; //new value
    var lists = this.state.lista.concat(ids);

    this.setState({ lista: lists });
    console.log(this.state.lista);
    setTimeout(() => {
      this.saveList();
    }, 200);

    this.setState({
      magassag: "",
      suly: "",
      honap: "",
      date: ""
    });

    this.modalVisible2(false);
  }
  deleteRow(rowData) {
    var list = this.state.lista;
    console.log(this.state.lista);

    for (var i = 0; i < list.length; i++) {
      if (list[i].honap == rowData.honap) {
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
                  height: 50,
                  marginTop: 30
                }}
              >
                <Text
                  numberOfLines={1}
                  style={[
                    styles.cim,
                    {
                      color: "gray",
                      marginLeft: 0,

                      marginTop: 0,
                      textAlign: "center",
                      fontSize: 20
                    }
                  ]}
                >
                  {"BABA ADATAI"}
                </Text>
              </View>
              <ScrollView>
                <View
                  style={{
                    width: width - 50,
                    padding:20,
                    flexDirection: "column",
                    justifyContent: "center"
                  }}
                >
                  
                  <Text
                    numberOfLines={1}
                    style={[
                      styles.cim,
                      {
                        color: "black",
                        marginTop: 0,
                        textAlign: "center",
                        fontSize: 30
                      }
                    ]}
                  >
                    {this.state.honapi}{" Hónapos"}
                  </Text>
                  
                </View>
                <View
                  style={{
                    alignItems: "center",
                    width: width - 50,
                    marginTop: 30,
                    height: 80,
                    justifyContent: "center"
                  }}
                >
                  <Text
                    numberOfLines={1}
                    style={[
                      styles.cim,
                      {
                        color: "gray",
                        marginTop: 0,
                        textAlign: "center",
                        fontSize: 18
                      }
                    ]}
                  >
                    {"Dátum"}
                  </Text>
                  <TextInput
                    style={{
                      height: 60,
                      width: width - 100,
                      textAlign: "center"
                    }}
                    placeholder="pl: okt.23"
                    onChangeText={datei => this.setState({ datei })}
                    value={this.state.datei}
                    maxLength={10}
                  />
                </View>

                <View
                  style={{
                    alignItems: "center",
                    width: width - 50,
                    marginTop: 30,
                    height: 80,
                    justifyContent: "center"
                  }}
                >
                  <Text
                    numberOfLines={1}
                    style={[
                      styles.cim,
                      {
                        color: "gray",
                        marginLeft: 20,
                        marginTop: 0,
                        textAlign: "center",
                        fontSize: 18
                      }
                    ]}
                  >
                    {"Súly (kg)"}
                  </Text>
                  <TextInput
                    style={{
                      height: 60,
                      width: width - 100,
                      textAlign: "center"
                    }}
                    placeholder="pl: 6.54"
                    onChangeText={text => this.onChanged2(text)}
                    value={this.state.sulyi}
                    maxLength={10}
                  />
                </View>
                <View
                  style={{
                    alignItems: "center",
                    width: width - 50,
                    marginTop: 30,
                    height: 80,
                    justifyContent: "center"
                  }}
                >
                  <Text
                    numberOfLines={1}
                    style={[
                      styles.cim,
                      {
                        color: "gray",
                        marginLeft: 20,
                        marginTop: 0,
                        textAlign: "center",
                        fontSize: 18
                      }
                    ]}
                  >
                    {"Magasság (cm)"}
                  </Text>
                  <TextInput
                    style={{
                      height: 60,
                      width: width - 100,
                      textAlign: "center"
                    }}
                    placeholder="pl: 56.42"
                    onChangeText={text => this.onChanged(text)}
                    value={this.state.magassagi}
                    maxLength={10}
                  />
                </View>
                <View style={{ height: 200 }} />
              </ScrollView>
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
                    this.saveNewItem();
                  }}
                >
                  <View
                    style={[styles.modalButton, { backgroundColor: "white" }]}
                  >
                    <Text style={{ color: "#00B8AC" }}>{"Kész!"}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
  /*modal2() {
    index = 1;
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
                  height: 50,
                  marginTop: 30
                }}
              >
                <Text
                  numberOfLines={1}
                  style={[
                    styles.cim,
                    {
                      color: "gray",
                      marginLeft: 0,

                      marginTop: 0,
                      textAlign: "center",
                      fontSize: 20
                    }
                  ]}
                >
                  {"BABA ADATAI"}
                </Text>
              </View>
              <ScrollView>
                <View
                  style={{
                    width: width - 50,
                    height: height / 3,
                    flexDirection: "column",
                    justifyContent: "center"
                  }}
                >
                  <Text
                    numberOfLines={1}
                    style={[
                      styles.cim,
                      {
                        color: "gray",
                        marginTop: 0,
                        textAlign: "center",
                        fontSize: 18
                      }
                    ]}
                  >
                    {"Baba kora"}
                  </Text>
                  <Picker
                    selectedValue={this.state.modhonap}
                    style={{ height: height / 4, width: width - 50 }}
                    onValueChange={(itemValue, itemIndex) =>
                      this.setState({ modhonap: itemValue })
                    }
                  >
                    <Picker.Item label="1 hónapos" value="1" />
                    <Picker.Item label="2 hónapos" value="2" />
                    <Picker.Item label="3 hónapos" value="3" />
                    <Picker.Item label="4 hónapos" value="4" />
                    <Picker.Item label="5 hónapos" value="5" />
                    <Picker.Item label="6 hónapos" value="6" />
                    <Picker.Item label="7 hónapos" value="7" />
                    <Picker.Item label="8 hónapos" value="8" />
                    <Picker.Item label="9 hónapos" value="9" />
                    <Picker.Item label="10 hónapos" value="10" />
                    <Picker.Item label="11 hónapos" value="11" />
                    <Picker.Item label="12 hónapos" value="12" />
                    <Picker.Item label="13 hónapos" value="13" />
                    <Picker.Item label="14 hónapos" value="14" />
                    <Picker.Item label="15 hónapos" value="15" />
                    <Picker.Item label="16 hónapos" value="16" />
                    <Picker.Item label="17 hónapos" value="17" />
                    <Picker.Item label="18 hónapos" value="18" />
                    <Picker.Item label="19 hónapos" value="19" />
                    <Picker.Item label="20 hónapos" value="20" />
                    <Picker.Item label="21 hónapos" value="21" />
                    <Picker.Item label="22 hónapos" value="22" />
                    <Picker.Item label="23 hónapos" value="23" />
                    <Picker.Item label="24 hónapos" value="24" />
                  </Picker>
                </View>
                <View
                  style={{
                    alignItems: "center",
                    width: width - 50,
                    marginTop: 30,
                    height: 80,
                    justifyContent: "center"
                  }}
                >
                  <Text
                    numberOfLines={1}
                    style={[
                      styles.cim,
                      {
                        color: "gray",
                        marginTop: 0,
                        textAlign: "center",
                        fontSize: 18
                      }
                    ]}
                  >
                    {"Dátum"}
                  </Text>
                  <TextInput
                    style={{
                      height: 60,
                      width: width - 100,
                      textAlign: "center"
                    }}
                    placeholder="pl: okt.23"
                    onChangeText={moddate => this.setState({ moddate })}
                    value={this.state.moddate}
                    maxLength={10}
                  />
                </View>

                <View
                  style={{
                    alignItems: "center",
                    width: width - 50,
                    marginTop: 30,
                    height: 80,
                    justifyContent: "center"
                  }}
                >
                  <Text
                    numberOfLines={1}
                    style={[
                      styles.cim,
                      {
                        color: "gray",
                        marginLeft: 20,
                        marginTop: 0,
                        textAlign: "center",
                        fontSize: 18
                      }
                    ]}
                  >
                    {"Súly (kg)"}
                  </Text>
                  <TextInput
                    style={{
                      height: 60,
                      width: width - 100,
                      textAlign: "center"
                    }}
                    placeholder="pl: 6.54"
                    onChangeText={modsuly => this.setState({ modsuly })}
                    value={this.state.modsuly}
                    maxLength={10}
                  />
                </View>
                <View
                  style={{
                    alignItems: "center",
                    width: width - 50,
                    marginTop: 30,
                    height: 80,
                    justifyContent: "center"
                  }}
                >
                  <Text
                    numberOfLines={1}
                    style={[
                      styles.cim,
                      {
                        color: "gray",
                        marginLeft: 20,
                        marginTop: 0,
                        textAlign: "center",
                        fontSize: 18
                      }
                    ]}
                  >
                    {"Magasság (cm)"}
                  </Text>
                  <TextInput
                    style={{
                      height: 60,
                      width: width - 100,
                      textAlign: "center"
                    }}
                    placeholder="pl: 6.54"
                    onChangeText={modmagassag => this.setState({ modmagassag })}
                    value={this.state.modmagassag}
                    maxLength={10}
                  />
                </View>
              </ScrollView>
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
                  <View
                    style={[styles.modalButton, { backgroundColor: "white" }]}
                  >
                    <Text style={{ color: "#00B8AC" }}>{"Kész!"}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }*/

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

    await AsyncStorage.setItem("@menu:percAdatok", JSON.stringify(lists));
    console.log("saved");
    //this._updateList();
  }

  async _updateList() {
    const response = await AsyncStorage.getItem("@menu:percAdatok");
    const list = (await JSON.parse(response)) || [];
    console.log(list);

    var lista = [...new Set(list.map(o => JSON.stringify(o)))].map(s =>
      JSON.parse(s)
    );

    console.log(list);
    console.log(lista);
    this.setState({ lista: lista, load: 1 });
  }

  _update = (text, rowID) => {
    const newArray = [...this.state.lista];
    newArray[rowID].value = text;
    this.setState({ lista: newArray });
  };

  mod(rowData, rowID) {
    this.setState({
      modhonap: rowData.honap,
      moddate: rowData.date,
      honapi: rowID,
      modsuly: rowData.suly,
      modmagassag: rowData.magassag,
      modalVisible2: true
    });
  }
  closeRow(rowMap, rowId) {
    if (rowMap[rowId]) {
      rowMap[rowId].closeRow();
    }
  }

  componentDidMount() {
    this._updateList();
  }

  mivan() {
    if (this.state.oldal == "magassag") {
      return (
        <View
          style={{
            width: width,
            padding: 10,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          {this.percentilisMagassag()}
          <PureChart
            type={"line"}
            data={this.what()}
            width={"100%"}
            gap={12}
            height={height / 2}
            xAxisColor={"#f2f2f2"}
            yAxisColor={"#f2f2f2"}
            xAxisGridLineColor={"#f2f2f2"}
            yAxisGridLineColor={"#f2f2f2"}
            labelColor={"#EC6F6A"}
            customValueRenderer={(index, point) => {
              if (point.x == "Itt van") {
                return (
                    <View>
                  <Text style={{ textAlign: "center", fontSize: 30 }}>
                    {" "}
                    11" "}
                  </Text>
                  </View>
                );
              }
            }}
            numberOfYAxisGuideLine={10}
          />
        </View>
      );
    } else {
      return (
        <View
          style={{
            width: width,
            padding: 10,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          {this.percentilisKg()}
          <PureChart
            type={"line"}
            data={this.what2()}
            width={"90%"}
            gap={12}
            height={height / 2}
            xAxisColor={"#f2f2f2"}
            yAxisColor={"#f2f2f2"}
            xAxisGridLineColor={"#f2f2f2"}
            yAxisGridLineColor={"#f2f2f2"}
            labelColor={"#EC6F6A"}
            customValueRenderer={(index, point) => {
              if (point.x == "Itt van") {
                return (
                    <View>

                  <Text style={{ textAlign: "center", fontSize: 30 }}>
                    {" "}
                    11" "}
                  </Text>
                  </View>
                );
              }
            }}
            numberOfYAxisGuideLine={10}
          />
        </View>
      );
    }
  }

  magassag() {
    if (this.state.oldal == "magassag") {
      return (
        <View>

        <Text style={[styles.HOME, { color: "white" }]}>{"Magasság"}</Text>
        </View>
      );
    } else {
      return (
        <View>

        <Text style={[styles.HOME, { color: "#008c82" }]}>{"Magasság"}</Text>
        </View>
      );
    }
  }
  suly() {
    if (this.state.oldal == "suly") {
      return (
        <View>
        <Text style={[styles.HOME, { color: "white" }]}>{"Súly"}</Text>
        </View>);
    } else {
      return (
        <View>
        <Text style={[styles.HOME, { color: "#008c82" }]}>{"Súly"}</Text>
        </View>);
    }
  }

  render() {
    var addFlightLeft = (width - 60) / 2;
    var addFlightTop = height - 70;
    var index = 1;
    var facebook = "https://www.facebook.com/";
    var instagram = "https://www.instagram.com/";
    var pinterest = "http://pinterest.com";
    return (
      <View style={styles.container}>
        {/*<TouchableOpacity
          onPress={() => this.modalVisible(true)}
          underlayColor="transparent"
          style={[styles.newFlight, { top: addFlightTop, left: addFlightLeft }]}
        >
          <Image
            style={styles.newFlightImage}
            source={require("../src/add-flight.png")}
          />
        </TouchableOpacity>*/}
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
          <TouchableOpacity onPress={() => Actions.profil()}>
            <View>
              <Image
                source={require("../src/nyil_feher.png")}
                style={{
                  width: 31 / 2.6,
                  height: 58 / 2.6,
                  zIndex: 2312321312,
                  left: 20,
                  top:20
                }}
              />
            </View>
          </TouchableOpacity>
          <View>
            <Text style={styles.HOME}>{"Percentilis görbe"}</Text>
          </View>
          <View
            style={{ width: 31 / 3, height: 58 / 3, zIndex: 100, left: 10 }}
          />
        </View>
        <View
          style={{
            width: width,
            height: 30,
            backgroundColor: "#00b8ac",
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center"
          }}
        >
          <TouchableOpacity
            onPress={() => this.setState({ oldal: "magassag" })}
          >
            <View>{this.magassag()}</View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.setState({ oldal: "suly" })}>
            <View>{this.suly()}</View>
          </TouchableOpacity>
        </View>
        <ScrollView>
          {this.mivan()}
          <View style={styles.container}>
            {this.modal2()}

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
                          {" kg"}
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
                          {" cm"}
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
                    <Text style={styles.backTextWhite}> </Text>
                  </TouchableOpacity>
                </View>
              )}
              rightOpenValue={0}
            />
          </View>
          <View style={{ height: 200 }} />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
    backgroundColor: "white",
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
    height: 60,
    width: 60
  }
});
