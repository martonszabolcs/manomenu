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
  TouchableOpacity,
  ListView,
  Modal,
  Button,
  AsyncStorage,
  WebView
} from "react-native";

import api from "../utilities/api";
import { Actions } from "react-native-router-flux";


var { height, width } = Dimensions.get("window");

function renderNode(node, index, siblings, parent, defaultRenderer) {
  var { height, width } = Dimensions.get("window");

  if (node.name == "img") {
    const a = node.attribs;
    return (
      <Image
        key="key"
        style={{ width: width - 20, height: 300 }}
        source={{ uri: a.src }}
      />
    );
  }
}

import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel
} from "react-native-simple-radio-button";
var radio_props = [
  { label: "Reggeli", value: 0 },
  { label: "Tízórai", value: 1 },
  { label: "Ebéd", value: 2 },
  { label: "Uzsi", value: 3 },
  { label: "Vacsi", value: 4 },
  { label: "Desszert", value: 5 }
];

var radio_props2 = [
  { label: "Hétfő", valueIndex: 0 },
  { label: "Kedd", valueIndex: 1 },
  { label: "Szerda", valueIndex: 2 },
  { label: "Csütörtök", valueIndex: 3 },
  { label: "Péntek", valueIndex: 4 },
  { label: "Szombat", valueIndex: 5 },
  { label: "Vasárnap", valueIndex: 6 }
];

const instructions = Platform.select({});

export default class ReceptekHTML extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      postCover: [],
      recipes: [],
      title: [],
      des: [],
      dataSource: [],
      content: [],
      modalVisible: false,
      favourite: false,
      tesztak: props.tesztak,
      favorites: "",
      isliked: "",
      value: 0,
      valueIndex: 0,
      types1: [
        { label: "Reggeli", value: 0 },
        { label: "Tízórai", value: 1 },
        { label: "Ebéd", value: 2 },
        { label: "Uzsi", value: 3 },
        { label: "Vacsi", value: 4 },
        { label: "Desszert", value: 5 }
      ],
      value1: 0,
      value1Index: 0,
      value1_1: 0,
      value1_1Index: 0,
      types2: [
        { label: "Hétfő", value: 0 },
        { label: "Kedd", value: 1 },
        { label: "Szerda", value: 2 },
        { label: "Csütörtök", value: 3 },
        { label: "Péntek", value: 4 },
        { label: "Szombat", value: 5 },
        { label: "Vasárnap", value: 6 }
      ],
      value2: 0,
      value2Index: 0,
      menu: false,
      menus: ""
    };
    this._updateListBev();
    this.dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1.guid != r2.guid
    });
  }
  async _updateListBev() {
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

  bev() {
    var tomb = this.state.content.tags;
    var lista = this.state.lista;
    var newArrayForm = [];
    console.log("tomb");
    console.log(tomb);
    for (var i = 0; i < tomb.length; i++) {
      newArrayForm = {
        title: tomb[i].name,
        value: ""
      };
      console.log("newArrayForm");
      console.log(newArrayForm);
      var lists = this.state.lista.push(newArrayForm);
      console.log("lists");
      console.log(lists);
      this.setState({ lista: lists });
      console.log("this.state.lista");
      console.log(this.state.lista);
    }

    this.saveListBev();

    /*for (var i = 0; i < tomb.length; i++) {
     
      console.log(this.state.bevlista)
      this.setState(previousState => ({
      tomb: [this.state.tomb, {title: "tomb[i].name", value:""}]
    }));
    }*/
  }
  async saveListBev() {
    var lists = this.state.lista;
    console.log(this.state.lista);

    await AsyncStorage.setItem("@menu:bevasarlas", JSON.stringify(lists));
    console.log("saved");
    //this._updateList();
  }

  async reklam() {
    AsyncStorage.getItem("reklam").then(
      keyValue => {
        var value = JSON.parse(keyValue);
        var content = this.state.HTML;
        for (let i = 0; i < value.length; i++) {
          if (content.includes(value[i])) {
            console.log("egyezik ");
            console.log(value[i]);
            this.setState({ reklam: true });
            this.openReklam();
          }
          setTimeout(() => {
            this.setState({ reklam: false });
          }, 10000);
        }
      },
      error => {
        var value = error;
        console.log(error); //Display error
      }
    );
  }
  reklamContent() {
    if (this.state.reklam) {
      return (
        <View style={[styles.footer_menu, {}]}>
          <View
            style={{
              position: "relative",
              top: 0,
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
              width: width,
              height: 80,
              zIndex: 10000,
              backgroundColor: "#1DB7AB",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <TouchableOpacity
              onPress={() => {
                console.log("katt");
                Actions.termek();
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 16,
                  textAlign: "center"
                }}
              >
                {" "}
                Engedd meg, hogy az alábbi recepthez ajánljunk neked jó minőségű
                terméket. Kattints ide!{" "}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  }
  getInitialState() {
    return {
      value: 0,
      valueIndex: 0
    };
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  setFavourite(value) {
    this.setState({ favourite: value });
  }

  setMenu(value) {
    this.setState({ menu: value });
  }

  favPics() {
    if (this.state.favourite) {
      return require("../src/menu/cikk_kedvencikon_aktiv.png");
    } else {
      return require("../src/menu/cikk_kedvencikon_inaktiv.png");
    }
  }

  favourites() {
    if (this.state.favourite) {
      // remove from favorites
      var list = this.state.favorites;

      for (var i = 0; i < list.length; i++) {
        if (list[i].id == this.state.tesztak) {
          // ha egyeznek az ID-k, akkor azt az elemet toroljuk
          list.splice(i, 1);
        }
      }

      this.setState({
        favorites: list
      });
      this._update();
    } else {
      // add to favorites
      this._addToFavorites();
      //this.save();
    }
  }

  hetikaja() {
    var data = {
      nev: this.state.content.title,
      etkezes: this.state.value1,
      nap: this.state.value2,
      id: this.state.content.id,
      tag: this.state.content.tags,
      creationDate: this.state.creationDate
    };

    // remove from favorites
    if (this.state.menus != null) {
      var list = this.state.menus;

      for (var i = 0; i < list.length; i++) {
        /* if (list[i].id == this.state.tesztak) {  // ha egyeznek az ID-k, akkor azt az elemet toroljuk
                    list.splice(i, 1);}*/
        /*if (list[i].id == data.id) {  // ha egyeznek az ID-k, akkor azt az elemet toroljuk
                    list[i] = data;}*/
        if (list[i].nap == data.nap && list[i].etkezes == data.etkezes) {
          list.splice(i, 1);
        }
        // ha egyeznek az ID-k, akkor azt az elemet toroljuk
      }

      this.setState({
        menus: list
      });
      //this._updateMenu();
    }

    // add to favorites
    this._addToMenu();
    //this.save();
  }
  /*var list = this.state.content.id;
     var favoriteTopicsData = this.state.content;
    if (favoriteTopicsData.id == null || favoriteTopicsData.id == '') {  // ha uj repules (nincs azonositoja)
                    favoriteTopicsData.id = this.guid();  // minden repules kapjon egy egyedi azonositot
                    list.push(favoriteTopicsData);
                } else {  // kulonben irjuk felul azt, amelyik szerkesztve lett
                    for (var i = 0; i < list.length; i++) {
                        if (list[i].id == favoriteTopicsData.id) {  // ha egyeznek az ID-k, akkor azt az elemet modositottuk
                            list[i] = favoriteTopicsData;
                        }
                    }
                }*/

  /*async save(){
    try {
      await AsyncStorage.setItem('@Manomenu:setFavourite', JSON.stringify(this.state.content));
          console.log('saved');

    } catch (error) {
          console.log('error');
  // Error saving data
  }
}*/

  componentWillMount() {
    /*Actions.refresh({
      Id: this.state.Id});*/
    var timeStampInMs =
      window.performance &&
      window.performance.now &&
      window.performance.timing &&
      window.performance.timing.navigationStart
        ? window.performance.now() + window.performance.timing.navigationStart
        : Date.now();
    console.log(timeStampInMs, Date.now());
    this.setState({ creationDate: Date.now() });

    setTimeout(() => {
      var list = this.state.favorites;

      for (var i = 0; i < list.length; i++) {
        if (list[i].id == this.props.tesztak) {
          // ha egyeznek az ID-k, akkor azt az elemet modositottuk
          this.setState({
            favourite: true
          });
        }
      }
      //console.log(list[1].id);
      console.log(this.props.tesztak);
    }, 100);

    return fetch(
      "http://46.101.62.53/Apps/rest/content/ARTICLE/" + this.state.tesztak,
      {
        headers: {
          accept: "application/json"
        }
      }
    )
      .then(res => res.json())
      .then(res => {
        this.setState({
          content: res,
          HTML:
            '<style> img{width:100%;} </style> <div style="-webkit-user-select: none;">' +
            res.content +
            "</div>"
        });
      });
  }

  async _addToFavorites() {
    console.log(this.state.favorites);
    console.log(this.state.content);

    const listofFav = [...this.state.favorites, this.state.content];

    await AsyncStorage.setItem("@favorites:lista", JSON.stringify(listofFav));
    console.log(listofFav);
  }

  async _addToMenu() {
    console.log(this.state.menus);
    console.log(this.state.data);
    var data = {
      nev: this.state.content.title,
      etkezes: this.state.value1,
      nap: this.state.value2,
      id: this.state.content.id,
      tag: this.state.content.tags,
      creationDate: this.state.creationDate
    };
    const listofFav = [...this.state.menus, data];

    await AsyncStorage.setItem("@menu:lista", JSON.stringify(listofFav));
    console.log(listofFav);
  }

  async _update() {
    const listofFav = this.state.favorites;

    await AsyncStorage.setItem("@favorites:lista", JSON.stringify(listofFav));
    console.log("listofFav");
    console.log(listofFav);
  }

  /*async _updateMenu() {


    const listofFav = this.state.menus;

    await AsyncStorage.setItem('@menu:lista',
    JSON.stringify(listofFav));
    console.log('listofFav');
    console.log(listofFav);
  }*/

  componentDidMount() {
    this._updateList();
    this._updateListMenu();
    //if  (this.props.tesztak === this.state.favorites.id)
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

  async _updateListMenu() {
    const menuItem = await AsyncStorage.getItem("@menu:lista");
    const listMenu = (await JSON.parse(menuItem)) || [];
    this.setState(
      {
        menus: listMenu
      },
      () => {
        console.log(this.state.menus);
        if (listMenu.includes(this.state.tesztak)) {
          this.setState({
            menu: true
          });
        } else {
          this.setState({
            menu: false
          });
        }
        console.log(this.state.menu + "menu");
      }
    );
  }
  pictureHide() {
    var { height, width } = Dimensions.get("window");

    if (
      this.state.content.imageUrl != "http://46.101.62.53/Apps/rest/image/null"
    ) {
      return (
        <Image
          key={Math.random()}
          resizeMode="cover"
          source={{ uri: this.state.content.imageUrl }}
          style={{ width: width, height: height / 3.5, zIndex: 100 }}
        />
      );
    } else {
      return <View />;
    }
  }

  render() {
    var { height, width } = Dimensions.get("window");
    //this.favGombInitial();

    console.log(this.state.favorites);
    console.log(this.state.value2);
    console.log(this.state.value1);
    console.log(this.state.content);
    const HTML2 = `
  <div class="comment">
    <span class="c00">
      <b><i>&gt; Dwayne’s only companion at night was a Labrador retriever named Sparky.</i></b>
    <p>
    <i>Sparky could not wag his tail-because of an automobile accident many years ago, so he had no way of telling other dogs how friendly he was.
    He opened the door of the cage, something Bill couldn’t have done in a thousand years. Bill flew over to a windowsill.
    <b>The undippable flag was a beauty, and the anthem and the vacant motto might not have mattered much, if it weren’t for this: a lot of citizens were so ignored and cheated and insulted that they thought they might be in the wrong country, or even on the wrong planet, that some terrible mistake had been made.
    </p>
    <p>
      [1] <a href="https://code.facebook.com/posts/1505962329687926/flow-a-new-static-type-checker-for-javascript/" rel="nofollow">https://code.facebook.com/posts/1505962329687926/flow-a-new-...</a>
    </p>
    <img src="https://i.redd.it/1l01wjsv22my.jpg" width="400" height="400" />

    <h1>Dwayne’s only companion at night</h1>
    <h2>Dwayne’s only companion at night</h2>
    <h3>Dwayne’s only companion at night</h3>
    <h4>Dwayne’s only companion at night</h4>
    <h5>Dwayne’s only companion at night</h5>
    <h6>Dwayne’s only companion at night</h6>
    ayyy

    <iframe src="google.com" />
  </span>
</div>
`;

    return (
      <View style={styles.container}>
        <Modal
          animationType={"slide"}
          transparent={true}
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setModalVisible(!this.state.modalVisible);
          }}
        >
          <View
            style={{
              width: width * 2 / 3,
              height: height / 2 + 40,
              justifyContent: "space-between",
              position: "absolute",
              right: 0,
              bottom: width / 6 + 2,
              backgroundColor: "#f6eec2",
              borderRadius: 10
            }}
          >
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "transparent"
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  [this.setModalVisible(!this.state.modalVisible)];
                }}
              >
                <View
                  style={{
                    backgroundColor: "#00b8ac",
                    width: width / 4,
                    margin: "auto",
                    borderRadius: 10
                  }}
                >
                  <Text
                    style={[
                      styles.nameText,
                      {
                        fontSize: 20,
                        textAlign: "center",
                        borderRadius: 20,
                        color: "white"
                      }
                    ]}
                  >
                    Mégse{" "}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-around" }}
            >
              <View style={{ justifyContent: "space-around" }}>
                <Text style={styles.nameText}>{"ÉTKEZÉS:"}</Text>
                <View style={styles.component}>
                  <RadioForm formHorizontal={false} animation={true}>
                    {this.state.types1.map((obj, i) => {
                      var onPress = (value, index) => {
                        this.setState({
                          value1: value,
                          value1Index: index
                        });
                      };
                      return (
                        <RadioButton labelHorizontal={true} key={i}>
                          {/*  You can set RadioButtonLabel before RadioButtonInput */}
                          <RadioButtonInput
                            obj={obj}
                            index={i}
                            isSelected={this.state.value1Index === i}
                            onPress={onPress}
                            buttonInnerColor={"#00b8ac"}
                            buttonOuterColor={
                              this.state.value1Index === i
                                ? "#f6eec2"
                                : "transparent"
                            }
                            buttonSize={7}
                            buttonStyle={{}}
                            buttonWrapStyle={{ marginRight: 2 }}
                          />
                          <RadioButtonLabel
                            obj={obj}
                            index={i}
                            onPress={onPress}
                            labelStyle={{ textAlign: "right", color: "black" }}
                            labelWrapStyle={{}}
                          />
                        </RadioButton>
                      );
                    })}
                  </RadioForm>
                </View>
              </View>
              <View style={{ justifyContent: "space-around" }}>
                <Text style={styles.nameText}>{"Nap:"}</Text>

                <View style={styles.component}>
                  <RadioForm
                    formHorizontal={false}
                    animation={true}
                    initial={-1}
                  >
                    {this.state.types2.map((obj, i) => {
                      var onPress = (value, index) => {
                        this.setState({
                          value2: value,
                          value2Index: index
                        });
                      };
                      return (
                        <RadioButton labelHorizontal={true} key={i}>
                          {/*  You can set RadioButtonLabel before RadioButtonInput */}
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-around"
                            }}
                          >
                            <View>
                              <RadioButtonInput
                                obj={obj}
                                index={i}
                                isSelected={this.state.value2Index === i}
                                onPress={onPress}
                                buttonInnerColor={"#00b8ac"}
                                buttonOuterColor={
                                  this.state.value2Index === i
                                    ? "#f6eec2"
                                    : "transparent"
                                }
                                buttonSize={7}
                                buttonStyle={{}}
                                buttonWrapStyle={{ marginRight: 2 }}
                              />
                            </View>
                            <View>
                              <RadioButtonLabel
                                obj={obj}
                                index={i}
                                onPress={onPress}
                                labelStyle={{
                                  textAlign: "right",
                                  color: "black"
                                }}
                                labelWrapStyle={{}}
                              />
                            </View>
                          </View>
                        </RadioButton>
                      );
                    })}
                  </RadioForm>
                </View>
              </View>
            </View>
            {/*<View style={{flexDirection:'row'}}>
            <View style={{width:width*2/3/2.5, height:height/2, margin:5}}>
                <Text style={styles.nameText}>
                  {'ÉTKEZÉS:'}
                </Text>
                <View style={{height:height/2, justifyContent:'space-between'}}>

                  
                  <RadioForm
                style={{justifyContent:'space-between', alignItems:'center'}}
                radio_props={radio_props}
                isSelected={true}
                initial={0}
                buttonSize={5}
                buttonColor={'#00b8ac'}
                animation={true}
                onPress={(value) => {this.setState({value:value})}}
                />
                  
                </View>
                </View>
  

            <View style={{width:width*2/3/2.5, height:height/2, margin:5}}>
                <Text style={styles.nameText}>
                  {'Nap:'}
                </Text>
                <View>
              <RadioForm
                style={{justifyContent:'space-between', alignItems:'center'}}
                radio_props={radio_props2}
                isSelected={true}
                initial={0}
                buttonSize={5}
                buttonColor={'#00b8ac'}
                animation={true}
                onPress={(value) => {this.setState({valueIndex:value})}}
                />

                  </View>
                </View>
                 <TouchableOpacity onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
          <View>
          <Text style={{fontSize: 50,
          position:'relative',
          textAlign:'center',
          zIndex:123213,
          fontFamily:'AmaticSC-Bold',
          color:'red',}}>
          {'X'}
          </Text>
          </View>
          </TouchableOpacity>
            </View>*/}
            <View
              style={{
                justifyContent: "flex-start",
                alignItems: "center",
                backgroundColor: "transparent",
                top: -height / 15
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  [
                    this.setModalVisible(!this.state.modalVisible),
                    this.setMenu(!this.state.menu),
                    this.hetikaja(),
                    this.bev()
                  ];
                }}
              >
                <View
                  style={{
                    backgroundColor: "white",
                    width: width / 2 + 30,
                    borderRadius: 10
                  }}
                >
                  <Text
                    style={[
                      styles.nameText,
                      { fontSize: 20, textAlign: "center", borderRadius: 20 }
                    ]}
                  >
                    Legyen ez a{" "}
                    {this.state.types2[this.state.value2Index].label}
                    {"i"} {this.state.types1[this.state.value1Index].label}
                    {"!"}{" "}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
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
          <View style={{ marginLeft: 10 }}>
            <Text
              numberOfLines={2}
              style={[styles.HOME, { color: "white", width: width - 100 }]}
            >
              {this.state.content.title}
            </Text>
          </View>
        </View>

        <View>{this.pictureHide()}</View>
        <View style={{ flex: 1, alignItems: "center" }}>
          {this.reklamContent()}

          <WebView
            javaScriptEnabledAndroid={true}
            ref={"webview"}
            source={{ html: this.state.HTML, baseUrl: "" }}
            scalesPageToFit={true}
            style={{ width: width }}
          />
        </View>
        <View style={{ height: width / 6 }} />

        <View style={[styles.menu, { width: width, height: width / 6 }]}>
          <View
            style={{
              width: width * 4 / 6,
              height: width / 6,
              justifyContent: "center"
            }}
          >
            <TouchableOpacity
              onPress={() => {
                Actions.hetimenu();
              }}
            >
              <View
                style={{
                  width: width / 3,
                  height: width / 8,
                  marginLeft: 10,
                  justifyContent: "center",
                  backgroundColor: "#00b8ac",
                  borderRadius: 10
                }}
              >
                <Text
                  numberOfLines={1}
                  style={{ textAlign: "center", color: "white" }}
                >
                  Heti menü
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={event => {
              [this.setFavourite(!this.state.favourite), this.favourites()];
            }}
          >
            <View
              style={{
                width: width / 6,
                height: width / 6,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Image
                source={this.favPics()}
                style={{
                  width: width / 6 / 1.8,
                  height: width / 6 / 2,
                  zIndex: 21312
                }}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ width: width / 6, height: width / 6, right: 0 }}
            onPress={() => {
              this.setModalVisible(!this.state.modalVisible);
            }}
          >
            <View
              style={{
                backgroundColor: "#f6eec2",
                width: width / 6,
                height: width / 6,
                right: 0,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Image
                source={require("../src/menu/cikk_pluszikon.png")}
                style={{
                  width: width / 6 / 2,
                  height: width / 6 / 2,
                  zIndex: 21312
                }}
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
    flexDirection: "row",
    backgroundColor: "#f0d886",
    borderColor: "black"
  },
  nameText: {
    fontSize: 36,
    textAlign: "left",
    marginLeft: 0,
    color: "#00b8ac",
    fontFamily: "AmaticSC-Bold"
  },

  instructions: {
    fontSize: 20,
    textAlign: "center",
    color: "#4aa485",
    padding: 10,
    marginBottom: 5
  },
  ftreExitButtonText2: {
    color: "white",
    backgroundColor: "transparent",
    fontSize: 20,
    fontFamily: "futura-bold",
    textAlign: "center"
  },
  menu: {
    position: "absolute",
    bottom: 0,
    backgroundColor: "#f0d886",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  },
  component: {
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 50
  },
  radioStyle: {
    borderRightWidth: 1,
    borderColor: "#2196f3",
    paddingRight: 10
  },
  radioButtonWrap: {
    marginRight: 5
  }
});
