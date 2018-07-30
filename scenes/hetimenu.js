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
  Button,
  ActivityIndicator
} from "react-native";

//import Firsttime from './firsttime';
import Swiper from "react-native-swiper";

import api from "../utilities/api";
//import Noti from './noti'
import { Actions } from "react-native-router-flux";

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
      index: 0,
      menus: "",
      hetfoiBev: [],
      keddiBev: [],
      szerdaiBev: [],
      csutortokiBev: [],
      pentekiBev: [],
      szombatiBev: [],
      vasarnapiBev: [],
      hetfo: 1,
      filteredContent: []
    };
    this.dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1.guid != r2.guid
    });
  }

  async saveList() {
    console.log(this.state.hetfoiBev);
    console.log(this.state.keddiBev);
    console.log(this.state.szerdaiBev);
    console.log(this.state.csutortokiBev);

    console.log(this.state.hetfoilista);
    var lists = this.state.hetfoiBev.concat(
      this.state.keddiBev,
      this.state.szerdaiBev,
      this.state.csutortokiBev,
      this.state.pentekiBev,
      this.state.szombatiBev,
      this.state.vasarnapiBev
    );
    console.log(lists);

    await AsyncStorage.setItem("@menu:bevasarlas", JSON.stringify(lists));
    console.log("saved");
    Actions.bevasarlas();
  }

  componentDidMount() {
    console.log("component mounted");
    Linking.getInitialURL()
      .then(url => {
        if (url) {
          console.log("Initial url is: " + url);
        }
      })
      .catch(err => console.error("An error occurred", err));
    this._updateListMenu();
    setTimeout(() => {
      this.setState({ hetfo: 0 });
    }, 1);

    console.log(this.state.menus);
    setTimeout(() => {
      this.hetfoiReggeli();
    }, 1);
    setTimeout(() => {
      this.hetfoiTizi();
    }, 2);
    setTimeout(() => {
      this.hetfoiEbed();
    }, 3);
    setTimeout(() => {
      this.hetfoiUzsi();
    }, 4);
    setTimeout(() => {
      this.hetfoiVacsi();
    }, 5);
    setTimeout(() => {
      this.hetfoiDesszert();
    }, 6);
    setTimeout(() => {
      this.keddiReggeli();
    }, 7);
    setTimeout(() => {
      this.keddiTizi();
    }, 8);
    setTimeout(() => {
      this.keddiEbed();
    }, 1);
    setTimeout(() => {
      this.keddiUzsi();
    }, 2);
    setTimeout(() => {
      this.keddiVacsi();
    }, 3);
    setTimeout(() => {
      this.keddiDesszert();
    }, 4);
    setTimeout(() => {
      this.szerdaiReggeli();
    }, 4);
    setTimeout(() => {
      this.szerdaiTizi();
    }, 4);
    setTimeout(() => {
      this.szerdaiEbed();
    }, 4);
    setTimeout(() => {
      this.szerdaiUzsi();
    }, 2);
    setTimeout(() => {
      this.szerdaiVacsi();
    }, 2);
    setTimeout(() => {
      this.szerdaiDesszert();
    }, 2);
    setTimeout(() => {
      this.csutortokiReggeli();
    }, 2);
    setTimeout(() => {
      this.csutortokiTizi();
    }, 2);
    setTimeout(() => {
      this.csutortokiEbed();
    }, 2);
    setTimeout(() => {
      this.csutortokiUzsi();
    }, 5);
    setTimeout(() => {
      this.csutortokiVacsi();
    }, 5);
    setTimeout(() => {
      this.csutortokiDesszert();
    }, 5);

    setTimeout(() => {
      this.pentekiReggeli();
    }, 7);
    setTimeout(() => {
      this.pentekiTizi();
    }, 7);
    setTimeout(() => {
      this.pentekiEbed();
    }, 7);
    setTimeout(() => {
      this.pentekiUzsi();
    }, 7);
    setTimeout(() => {
      this.pentekiVacsi();
    }, 9);
    setTimeout(() => {
      this.pentekiDesszert();
    }, 9);
    setTimeout(() => {
      this.szombatiReggeli();
    }, 9);
    setTimeout(() => {
      this.szombatiTizi();
    }, 1);
    setTimeout(() => {
      this.szombatiEbed();
    }, 1);
    setTimeout(() => {
      this.szombatiUzsi();
    }, 1);
    setTimeout(() => {
      this.szombatiVacsi();
    }, 1);
    setTimeout(() => {
      this.szombatiDesszert();
    }, 1);
    setTimeout(() => {
      this.vasarnapiReggeli();
    }, 1);
    setTimeout(() => {
      this.vasarnapiTizi();
    }, 1);
    setTimeout(() => {
      this.vasarnapiEbed();
    }, 1);
    setTimeout(() => {
      this.vasarnapiUzsi();
    }, 1);
    setTimeout(() => {
      this.vasarnapiVacsi();
    }, 1);
    setTimeout(() => {
      this.vasarnapiDesszert();
    }, 1);
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

  hetforeggel() {
    var list = this.state.menus;
    for (var i = 0; i < list.length; i++) {
      if (this.state.menus[i].nap == 0 && this.state.menus[i].etkezes == 0) {
        return this.state.menus[i].nev;
      }
    }
  }

  hetfotizi() {
    var list = this.state.menus;
    for (var i = 0; i < list.length; i++) {
      if (this.state.menus[i].nap == 0 && this.state.menus[i].etkezes == 1) {
        return this.state.menus[i].nev;
      }
    }
  }

  hetfoebed() {
    var list = this.state.menus;
    for (var i = 0; i < list.length; i++) {
      if (this.state.menus[i].nap == 0 && this.state.menus[i].etkezes == 2) {
        return this.state.menus[i].nev;
      }
    }
  }

  hetfouzsi() {
    var list = this.state.menus;
    for (var i = 0; i < list.length; i++) {
      if (this.state.menus[i].nap == 0 && this.state.menus[i].etkezes == 3) {
        return this.state.menus[i].nev;
      }
    }
  }

  hetfovacsi() {
    var list = this.state.menus;
    for (var i = 0; i < list.length; i++) {
      if (this.state.menus[i].nap == 0 && this.state.menus[i].etkezes == 4) {
        return this.state.menus[i].nev;
      }
    }
  }

  hetfodesszert() {
    var list = this.state.menus;
    for (var i = 0; i < list.length; i++) {
      if (this.state.menus[i].nap == 0 && this.state.menus[i].etkezes == 5) {
        return this.state.menus[i].nev;
      }
    }
  }

  keddreggel() {
    var list = this.state.menus;
    for (var i = 0; i < list.length; i++) {
      if (this.state.menus[i].nap == 1 && this.state.menus[i].etkezes == 0) {
        return this.state.menus[i].nev;
      }
    }
  }

  keddtizi() {
    var list = this.state.menus;
    for (var i = 0; i < list.length; i++) {
      if (this.state.menus[i].nap == 1 && this.state.menus[i].etkezes == 1) {
        return this.state.menus[i].nev;
      }
    }
  }

  keddebed() {
    var list = this.state.menus;
    for (var i = 0; i < list.length; i++) {
      if (this.state.menus[i].nap == 1 && this.state.menus[i].etkezes == 2) {
        return this.state.menus[i].nev;
      }
    }
  }

  kedduzsi() {
    var list = this.state.menus;
    for (var i = 0; i < list.length; i++) {
      if (this.state.menus[i].nap == 1 && this.state.menus[i].etkezes == 3) {
        return this.state.menus[i].nev;
      }
    }
  }

  keddvacsi() {
    var list = this.state.menus;
    for (var i = 0; i < list.length; i++) {
      if (this.state.menus[i].nap == 1 && this.state.menus[i].etkezes == 4) {
        return this.state.menus[i].nev;
      }
    }
  }

  kedddesszert() {
    var list = this.state.menus;
    for (var i = 0; i < list.length; i++) {
      if (this.state.menus[i].nap == 1 && this.state.menus[i].etkezes == 5) {
        return this.state.menus[i].nev;
      }
    }
  }

  szerdareggel() {
    var list = this.state.menus;
    for (var i = 0; i < list.length; i++) {
      if (this.state.menus[i].nap == 2 && this.state.menus[i].etkezes == 0) {
        return this.state.menus[i].nev;
      }
    }
  }

  szerdatizi() {
    var list = this.state.menus;
    for (var i = 0; i < list.length; i++) {
      if (this.state.menus[i].nap == 2 && this.state.menus[i].etkezes == 1) {
        return this.state.menus[i].nev;
      }
    }
  }

  szerdaebed() {
    var list = this.state.menus;
    for (var i = 0; i < list.length; i++) {
      if (this.state.menus[i].nap == 2 && this.state.menus[i].etkezes == 2) {
        return this.state.menus[i].nev;
      }
    }
  }

  szerdauzsi() {
    var list = this.state.menus;
    for (var i = 0; i < list.length; i++) {
      if (this.state.menus[i].nap == 2 && this.state.menus[i].etkezes == 3) {
        return this.state.menus[i].nev;
      }
    }
  }

  szerdavacsi() {
    var list = this.state.menus;
    for (var i = 0; i < list.length; i++) {
      if (this.state.menus[i].nap == 2 && this.state.menus[i].etkezes == 4) {
        return this.state.menus[i].nev;
      }
    }
  }

  szerdadesszert() {
    var list = this.state.menus;
    for (var i = 0; i < list.length; i++) {
      if (this.state.menus[i].nap == 2 && this.state.menus[i].etkezes == 5) {
        return this.state.menus[i].nev;
      }
    }
  }

  csutortokreggel() {
    var list = this.state.menus;
    for (var i = 0; i < list.length; i++) {
      if (this.state.menus[i].nap == 3 && this.state.menus[i].etkezes == 0) {
        return this.state.menus[i].nev;
      }
    }
  }

  csutortoktizi() {
    var list = this.state.menus;
    for (var i = 0; i < list.length; i++) {
      if (this.state.menus[i].nap == 3 && this.state.menus[i].etkezes == 1) {
        return this.state.menus[i].nev;
      }
    }
  }

  csutortokebed() {
    var list = this.state.menus;
    for (var i = 0; i < list.length; i++) {
      if (this.state.menus[i].nap == 3 && this.state.menus[i].etkezes == 2) {
        return this.state.menus[i].nev;
      }
    }
  }

  csutortokuzsi() {
    var list = this.state.menus;
    for (var i = 0; i < list.length; i++) {
      if (this.state.menus[i].nap == 3 && this.state.menus[i].etkezes == 3) {
        return this.state.menus[i].nev;
      }
    }
  }

  csutortokvacsi() {
    var list = this.state.menus;
    for (var i = 0; i < list.length; i++) {
      if (this.state.menus[i].nap == 3 && this.state.menus[i].etkezes == 4) {
        return this.state.menus[i].nev;
      }
    }
  }

  csutortokdesszert() {
    var list = this.state.menus;
    for (var i = 0; i < list.length; i++) {
      if (this.state.menus[i].nap == 3 && this.state.menus[i].etkezes == 5) {
        return this.state.menus[i].nev;
      }
    }
  }

  pentekreggel() {
    var list = this.state.menus;
    for (var i = 0; i < list.length; i++) {
      if (this.state.menus[i].nap == 4 && this.state.menus[i].etkezes == 0) {
        return this.state.menus[i].nev;
      }
    }
  }

  pentektizi() {
    var list = this.state.menus;
    for (var i = 0; i < list.length; i++) {
      if (this.state.menus[i].nap == 4 && this.state.menus[i].etkezes == 1) {
        return this.state.menus[i].nev;
      }
    }
  }

  pentekebed() {
    var list = this.state.menus;
    for (var i = 0; i < list.length; i++) {
      if (this.state.menus[i].nap == 4 && this.state.menus[i].etkezes == 2) {
        return this.state.menus[i].nev;
      }
    }
  }

  pentekuzsi() {
    var list = this.state.menus;
    for (var i = 0; i < list.length; i++) {
      if (this.state.menus[i].nap == 4 && this.state.menus[i].etkezes == 3) {
        return this.state.menus[i].nev;
      }
    }
  }

  pentekvacsi() {
    var list = this.state.menus;
    for (var i = 0; i < list.length; i++) {
      if (this.state.menus[i].nap == 4 && this.state.menus[i].etkezes == 4) {
        return this.state.menus[i].nev;
      }
    }
  }

  pentekdesszert() {
    var list = this.state.menus;
    for (var i = 0; i < list.length; i++) {
      if (this.state.menus[i].nap == 4 && this.state.menus[i].etkezes == 5) {
        return this.state.menus[i].nev;
      }
    }
  }

  szombatreggel() {
    var list = this.state.menus;
    for (var i = 0; i < list.length; i++) {
      if (this.state.menus[i].nap == 5 && this.state.menus[i].etkezes == 0) {
        return this.state.menus[i].nev;
      }
    }
  }

  szombattizi() {
    var list = this.state.menus;
    for (var i = 0; i < list.length; i++) {
      if (this.state.menus[i].nap == 5 && this.state.menus[i].etkezes == 1) {
        return this.state.menus[i].nev;
      }
    }
  }

  szombatebed() {
    var list = this.state.menus;
    for (var i = 0; i < list.length; i++) {
      if (this.state.menus[i].nap == 5 && this.state.menus[i].etkezes == 2) {
        return this.state.menus[i].nev;
      }
    }
  }

  szombatuzsi() {
    var list = this.state.menus;
    for (var i = 0; i < list.length; i++) {
      if (this.state.menus[i].nap == 5 && this.state.menus[i].etkezes == 3) {
        return this.state.menus[i].nev;
      }
    }
  }

  szombatvacsi() {
    var list = this.state.menus;
    for (var i = 0; i < list.length; i++) {
      if (this.state.menus[i].nap == 5 && this.state.menus[i].etkezes == 4) {
        return this.state.menus[i].nev;
      }
    }
  }

  szombatdesszert() {
    var list = this.state.menus;
    for (var i = 0; i < list.length; i++) {
      if (this.state.menus[i].nap == 5 && this.state.menus[i].etkezes == 5) {
        return this.state.menus[i].nev;
      }
    }
  }

  vasarnapreggel() {
    var list = this.state.menus;
    for (var i = 0; i < list.length; i++) {
      if (this.state.menus[i].nap == 6 && this.state.menus[i].etkezes == 0) {
        return this.state.menus[i].nev;
      }
    }
  }

  vasarnaptizi() {
    var list = this.state.menus;
    for (var i = 0; i < list.length; i++) {
      if (this.state.menus[i].nap == 6 && this.state.menus[i].etkezes == 1) {
        return this.state.menus[i].nev;
      }
    }
  }

  vasarnapebed() {
    var list = this.state.menus;
    for (var i = 0; i < list.length; i++) {
      if (this.state.menus[i].nap == 6 && this.state.menus[i].etkezes == 2) {
        return this.state.menus[i].nev;
      }
    }
  }

  vasarnapuzsi() {
    var list = this.state.menus;
    for (var i = 0; i < list.length; i++) {
      if (this.state.menus[i].nap == 6 && this.state.menus[i].etkezes == 3) {
        return this.state.menus[i].nev;
      }
    }
  }

  vasarnapvacsi() {
    var list = this.state.menus;
    for (var i = 0; i < list.length; i++) {
      if (this.state.menus[i].nap == 6 && this.state.menus[i].etkezes == 4) {
        return this.state.menus[i].nev;
      }
    }
  }

  vasarnapdesszert() {
    var list = this.state.menus;
    for (var i = 0; i < list.length; i++) {
      if (this.state.menus[i].nap == 6 && this.state.menus[i].etkezes == 5) {
        return this.state.menus[i].nev;
      }
    }
  }

  hetfoiReggeli() {
    var list = this.state.menus;
    var list2 = [];
    var newArray = [];

    for (var i = 0; i < list.length; i++) {
      if (this.state.menus[i].nap == 0 && this.state.menus[i].etkezes == 0) {
        for (var z = 0; z < this.state.menus[i].tag.length; z++) {
          console.log(this.state.menus[i].tag[z].name);
          newArrayForm = {
            title: this.state.menus[i].tag[z].name,
            value: ""
          };
          newArray = newArray.concat(newArrayForm);

          console.log(newArray);
        }
      }
    }
    if (newArray != null) {
      if (newArray == ""){
      newArray.splice(0, 1);
 
 }     var eredmeny = newArray.concat(this.state.hetfoiBev);
      this.setState({
        hetfoiBev: eredmeny
      });
    }
  }

  hetfoiTizi() {
    var list = this.state.menus;
    var newArray = [];
    for (var i = 0; i < list.length; i++) {
      if (this.state.menus[i].nap == 0 && this.state.menus[i].etkezes == 1) {
        for (var z = 0; z < this.state.menus[i].tag.length; z++) {
          console.log(this.state.menus[i].tag[z].name);
          newArrayForm = {
            title: this.state.menus[i].tag[z].name,
            value: ""
          };
          newArray = newArray.concat(newArrayForm);

          console.log(newArray);
        }
      }
    }
    if (newArray != null) {
      if (newArray == ""){
      newArray.splice(0, 1);
 
 }     var eredmeny = newArray.concat(this.state.hetfoiBev);
      this.setState({
        hetfoiBev: eredmeny
      });
    }
  }

  hetfoiEbed() {
    var list = this.state.menus;

    var newArray = [];
    for (var i = 0; i < list.length; i++) {
      if (this.state.menus[i].nap == 0 && this.state.menus[i].etkezes == 2) {
        for (var z = 0; z < this.state.menus[i].tag.length; z++) {
          console.log(this.state.menus[i].tag[z].name);
          newArrayForm = {
            title: this.state.menus[i].tag[z].name,
            value: ""
          };
          newArray = newArray.concat(newArrayForm);

          console.log(newArray);
        }
      }
    }
    if (newArray != null) {
      if (newArray == ""){
      newArray.splice(0, 1);
 
 }     var eredmeny = newArray.concat(this.state.hetfoiBev);
      this.setState({
        hetfoiBev: eredmeny
      });
    }
  }

  hetfoiUzsi() {
    var list = this.state.menus;
    var newArray = [];
    for (var i = 0; i < list.length; i++) {
      if (this.state.menus[i].nap == 0 && this.state.menus[i].etkezes == 3) {
        for (var z = 0; z < this.state.menus[i].tag.length; z++) {
          console.log(this.state.menus[i].tag[z].name);
          newArrayForm = {
            title: this.state.menus[i].tag[z].name,
            value: ""
          };
          newArray = newArray.concat(newArrayForm);

          console.log(newArray);
        }
      }
    }
    if (newArray != null) {
      if (newArray == ""){
      newArray.splice(0, 1);
 
 }     var eredmeny = newArray.concat(this.state.hetfoiBev);
      this.setState({
        hetfoiBev: eredmeny
      });
    }
  }

  hetfoiVacsi() {
    var list = this.state.menus;
    var newArray = [];
    for (var i = 0; i < list.length; i++) {
      if (this.state.menus[i].nap == 0 && this.state.menus[i].etkezes == 4) {
        for (var z = 0; z < this.state.menus[i].tag.length; z++) {
          console.log(this.state.menus[i].tag[z].name);
          newArray = {
            title: [...newArray, this.state.menus[i].tag[z].name],
            value: ""
          };
        }
      }
    }
    if (newArray != null) {
      if (newArray == ""){
      newArray.splice(0, 1);
 
 }     var eredmeny = newArray.concat(this.state.hetfoiBev);
      this.setState({
        hetfoiBev: eredmeny
      });
    }
  }

  hetfoiDesszert() {
    var list = this.state.menus;
    var newArray = [];
    for (var i = 0; i < list.length; i++) {
      if (this.state.menus[i].nap == 0 && this.state.menus[i].etkezes == 5) {
        for (var z = 0; z < this.state.menus[i].tag.length; z++) {
          console.log(this.state.menus[i].tag[z].name);
          newArrayForm = {
            title: this.state.menus[i].tag[z].name,
            value: ""
          };
          newArray = newArray.concat(newArrayForm);

          console.log(newArray);
        }
      }
    }
    if (newArray != null) {
      if (newArray == ""){
      newArray.splice(0, 1);
 
 }     var eredmeny = newArray.concat(this.state.hetfoiBev);
      this.setState({
        hetfoiBev: eredmeny
      });
      /*var hetfoiBev = this}.state.hetfoiBev.slice()
  hetfoiBev.push(this.state.hetfoiDesszert)
  this.setState({ hetfoiBev: hetfoiBev })*/
    }
  }

  keddiReggeli() {
    var list = this.state.menus;
    var list2 = [];
    var newArray = [];

    for (var i = 0; i < list.length; i++) {
      if (this.state.menus[i].nap == 1 && this.state.menus[i].etkezes == 0) {
        for (var z = 0; z < this.state.menus[i].tag.length; z++) {
          console.log(this.state.menus[i].tag[z].name);
          newArrayForm = {
            title: this.state.menus[i].tag[z].name,
            value: ""
          };
          newArray = newArray.concat(newArrayForm);

          console.log(newArray);
        }
      }
    }
    if (newArray != null) {
      if (newArray == ""){
      newArray.splice(0, 1);
 
 }     var eredmeny = newArray.concat(this.state.keddiBev);
      this.setState({
        keddiBev: eredmeny
      });
    }
  }

  keddiTizi() {
    var list = this.state.menus;
    var newArray = [];
    for (var i = 0; i < list.length; i++) {
      if (this.state.menus[i].nap == 1 && this.state.menus[i].etkezes == 1) {
        for (var z = 0; z < this.state.menus[i].tag.length; z++) {
          console.log(this.state.menus[i].tag[z].name);
          newArrayForm = {
            title: this.state.menus[i].tag[z].name,
            value: ""
          };
          newArray = newArray.concat(newArrayForm);

          console.log(newArray);
        }
      }
    }
    if (newArray != null) {
      if (newArray == ""){
      newArray.splice(0, 1);
 
 }     var eredmeny = newArray.concat(this.state.keddiBev);
      this.setState({
        keddiBev: eredmeny
      });
    }
  }

  keddiEbed() {
    var list = this.state.menus;

    var newArray = [];
    for (var i = 0; i < list.length; i++) {
      if (this.state.menus[i].nap == 1 && this.state.menus[i].etkezes == 2) {
        for (var z = 0; z < this.state.menus[i].tag.length; z++) {
          console.log(this.state.menus[i].tag[z].name);
          newArrayForm = {
            title: this.state.menus[i].tag[z].name,
            value: ""
          };
          newArray = newArray.concat(newArrayForm);

          console.log(newArray);
        }
      }
    }
    if (newArray != null) {
      if (newArray == ""){
      newArray.splice(0, 1);
 
 }     var eredmeny = newArray.concat(this.state.keddiBev);
      this.setState({
        keddiBev: eredmeny
      });
    }
  }

  keddiUzsi() {
    var list = this.state.menus;
    var newArray = [];
    for (var i = 0; i < list.length; i++) {
      if (this.state.menus[i].nap == 1 && this.state.menus[i].etkezes == 3) {
        for (var z = 0; z < this.state.menus[i].tag.length; z++) {
          console.log(this.state.menus[i].tag[z].name);
          newArrayForm = {
            title: this.state.menus[i].tag[z].name,
            value: ""
          };
          newArray = newArray.concat(newArrayForm);

          console.log(newArray);
        }
      }
    }
    if (newArray != null) {
      if (newArray == ""){
      newArray.splice(0, 1);
 
 }     var eredmeny = newArray.concat(this.state.keddiBev);
      this.setState({
        keddiBev: eredmeny
      });
    }
  }

  keddiVacsi() {
    var list = this.state.menus;
    var newArray = [];
    for (var i = 0; i < list.length; i++) {
      if (this.state.menus[i].nap == 1 && this.state.menus[i].etkezes == 4) {
        for (var z = 0; z < this.state.menus[i].tag.length; z++) {
          console.log(this.state.menus[i].tag[z].name);
          newArrayForm = {
            title: this.state.menus[i].tag[z].name,
            value: ""
          };
          newArray = newArray.concat(newArrayForm);

          console.log(newArray);
        }
      }
    }
    if (newArray != null) {
      if (newArray == ""){
      newArray.splice(0, 1);
 
 }     var eredmeny = newArray.concat(this.state.keddiBev);
      this.setState({
        keddiBev: eredmeny
      });
    }
  }

  keddiDesszert() {
    var list = this.state.menus;
    var newArray = [];
    for (var i = 0; i < list.length; i++) {
      if (this.state.menus[i].nap == 1 && this.state.menus[i].etkezes == 5) {
        for (var z = 0; z < this.state.menus[i].tag.length; z++) {
          console.log(this.state.menus[i].tag[z].name);
          newArrayForm = {
            title: this.state.menus[i].tag[z].name,
            value: ""
          };
          newArray = newArray.concat(newArrayForm);

          console.log(newArray);
        }
      }
    }
    if (newArray != null) {
      if (newArray == ""){
      newArray.splice(0, 1);
 
 }     var eredmeny = newArray.concat(this.state.keddiBev);
      this.setState({
        keddiBev: eredmeny
      });
      /*var hetfoiBev = this}.state.hetfoiBev.slice()
  hetfoiBev.push(this.state.hetfoiDesszert)
  this.setState({ hetfoiBev: hetfoiBev })*/
    }
  }

  szerdaiReggeli() {
    var list = this.state.menus;
    var list2 = [];
    var newArray = [];

    for (var i = 0; i < list.length; i++) {
      if (this.state.menus[i].nap == 2 && this.state.menus[i].etkezes == 0) {
        for (var z = 0; z < this.state.menus[i].tag.length; z++) {
          console.log(this.state.menus[i].tag[z].name);
          newArrayForm = {
            title: this.state.menus[i].tag[z].name,
            value: ""
          };
          newArray = newArray.concat(newArrayForm);

          console.log(newArray);
        }
      }
    }
    if (newArray != null) {
      if (newArray == ""){
      newArray.splice(0, 1);
 
 }     var eredmeny = newArray.concat(this.state.szerdaiBev);
      this.setState({
        szerdaiBev: eredmeny
      });
    }
  }

  szerdaiTizi() {
    var list = this.state.menus;
    var newArray = [];
    for (var i = 0; i < list.length; i++) {
      if (this.state.menus[i].nap == 2 && this.state.menus[i].etkezes == 1) {
        for (var z = 0; z < this.state.menus[i].tag.length; z++) {
          console.log(this.state.menus[i].tag[z].name);
          newArrayForm = {
            title: this.state.menus[i].tag[z].name,
            value: ""
          };
          newArray = newArray.concat(newArrayForm);

          console.log(newArray);
        }
      }
    }
    if (newArray != null) {
      if (newArray == ""){
      newArray.splice(0, 1);
 
 }     var eredmeny = newArray.concat(this.state.szerdaiBev);
      this.setState({
        szerdaiBev: eredmeny
      });
    }
  }

  szerdaiEbed() {
    var list = this.state.menus;

    var newArray = [];
    for (var i = 0; i < list.length; i++) {
      if (this.state.menus[i].nap == 2 && this.state.menus[i].etkezes == 2) {
        for (var z = 0; z < this.state.menus[i].tag.length; z++) {
          console.log(this.state.menus[i].tag[z].name);
          newArrayForm = {
            title: this.state.menus[i].tag[z].name,
            value: ""
          };
          newArray = newArray.concat(newArrayForm);

          console.log(newArray);
        }
      }
    }
    if (newArray != null) {
      if (newArray == ""){
      newArray.splice(0, 1);
 
 }     var eredmeny = newArray.concat(this.state.szerdaiBev);
      this.setState({
        szerdaiBev: eredmeny
      });
    }
  }

  szerdaiUzsi() {
    var list = this.state.menus;
    var newArray = [];
    for (var i = 0; i < list.length; i++) {
      if (this.state.menus[i].nap == 2 && this.state.menus[i].etkezes == 3) {
        for (var z = 0; z < this.state.menus[i].tag.length; z++) {
          console.log(this.state.menus[i].tag[z].name);
          newArrayForm = {
            title: this.state.menus[i].tag[z].name,
            value: ""
          };
          newArray = newArray.concat(newArrayForm);

          console.log(newArray);
        }
      }
    }
    if (newArray != null) {
      if (newArray == ""){
      newArray.splice(0, 1);
 
 }     var eredmeny = newArray.concat(this.state.szerdaiBev);
      this.setState({
        szerdaiBev: eredmeny
      });
    }
  }

  szerdaiVacsi() {
    var list = this.state.menus;
    var newArray = [];
    for (var i = 0; i < list.length; i++) {
      if (this.state.menus[i].nap == 2 && this.state.menus[i].etkezes == 4) {
        for (var z = 0; z < this.state.menus[i].tag.length; z++) {
          console.log(this.state.menus[i].tag[z].name);
          newArrayForm = {
            title: this.state.menus[i].tag[z].name,
            value: ""
          };
          newArray = newArray.concat(newArrayForm);

          console.log(newArray);
        }
      }
    }
    if (newArray != null) {
      if (newArray == ""){
      newArray.splice(0, 1);
 
 }     var eredmeny = newArray.concat(this.state.szerdaiBev);
      this.setState({
        szerdaiBev: eredmeny
      });
    }
  }

  szerdaiDesszert() {
    var list = this.state.menus;
    var newArray = [];
    for (var i = 0; i < list.length; i++) {
      if (this.state.menus[i].nap == 2 && this.state.menus[i].etkezes == 5) {
        for (var z = 0; z < this.state.menus[i].tag.length; z++) {
          console.log(this.state.menus[i].tag[z].name);
          newArrayForm = {
            title: this.state.menus[i].tag[z].name,
            value: ""
          };
          newArray = newArray.concat(newArrayForm);

          console.log(newArray);
        }
      }
    }
    if (newArray != null) {
      if (newArray == ""){
      newArray.splice(0, 1);
 
 }     var eredmeny = newArray.concat(this.state.szerdaiBev);
      this.setState({
        szerdaiBev: eredmeny
      });
      /*var hetfoiBev = this}.state.hetfoiBev.slice()
  hetfoiBev.push(this.state.hetfoiDesszert)
  this.setState({ hetfoiBev: hetfoiBev })*/
    }
  }

  csutortokiReggeli() {
    var list = this.state.menus;
    var list2 = [];
    var newArray = [];

    for (var i = 0; i < list.length; i++) {
      if (this.state.menus[i].nap == 3 && this.state.menus[i].etkezes == 0) {
        for (var z = 0; z < this.state.menus[i].tag.length; z++) {
          console.log(this.state.menus[i].tag[z].name);
          newArrayForm = {
            title: this.state.menus[i].tag[z].name,
            value: ""
          };
          newArray = newArray.concat(newArrayForm);

          console.log(newArray);
        }
      }
    }
    if (newArray != null) {
      if (newArray == ""){
      newArray.splice(0, 1);
 
 }     var eredmeny = newArray.concat(this.state.csutortokiBev);
      this.setState({
        csutortokiBev: eredmeny
      });
    }
  }

  csutortokiTizi() {
    var list = this.state.menus;
    var newArray = [];
    for (var i = 0; i < list.length; i++) {
      if (this.state.menus[i].nap == 3 && this.state.menus[i].etkezes == 1) {
        for (var z = 0; z < this.state.menus[i].tag.length; z++) {
          console.log(this.state.menus[i].tag[z].name);
          newArrayForm = {
            title: this.state.menus[i].tag[z].name,
            value: ""
          };
          newArray = newArray.concat(newArrayForm);

          console.log(newArray);
        }
      }
    }
    if (newArray != null) {
      if (newArray == ""){
      newArray.splice(0, 1);
 
 }     var eredmeny = newArray.concat(this.state.csutortokiBev);
      this.setState({
        csutortokiBev: eredmeny
      });
    }
  }

  csutortokiEbed() {
    var list = this.state.menus;

    var newArray = [];
    for (var i = 0; i < list.length; i++) {
      if (this.state.menus[i].nap == 3 && this.state.menus[i].etkezes == 2) {
        for (var z = 0; z < this.state.menus[i].tag.length; z++) {
          console.log(this.state.menus[i].tag[z].name);
          newArrayForm = {
            title: this.state.menus[i].tag[z].name,
            value: ""
          };
          newArray = newArray.concat(newArrayForm);

          console.log(newArray);
        }
      }
    }
    if (newArray != null) {
      if (newArray == ""){
      newArray.splice(0, 1);
 
 }     var eredmeny = newArray.concat(this.state.csutortokiBev);
      this.setState({
        csutortokiBev: eredmeny
      });
    }
  }

  csutortokiUzsi() {
    var list = this.state.menus;
    var newArray = [];
    for (var i = 0; i < list.length; i++) {
      if (this.state.menus[i].nap == 3 && this.state.menus[i].etkezes == 3) {
        for (var z = 0; z < this.state.menus[i].tag.length; z++) {
          console.log(this.state.menus[i].tag[z].name);
          newArrayForm = {
            title: this.state.menus[i].tag[z].name,
            value: ""
          };
          newArray = newArray.concat(newArrayForm);

          console.log(newArray);
        }
      }
    }
    if (newArray != null) {
      if (newArray == ""){
      newArray.splice(0, 1);
 
 }     var eredmeny = newArray.concat(this.state.csutortokiBev);
      this.setState({
        csutortokiBev: eredmeny
      });
    }
  }

  csutortokiVacsi() {
    var list = this.state.menus;
    var newArray = [];
    for (var i = 0; i < list.length; i++) {
      if (this.state.menus[i].nap == 3 && this.state.menus[i].etkezes == 4) {
        for (var z = 0; z < this.state.menus[i].tag.length; z++) {
          console.log(this.state.menus[i].tag[z].name);
          newArrayForm = {
            title: this.state.menus[i].tag[z].name,
            value: ""
          };
          newArray = newArray.concat(newArrayForm);

          console.log(newArray);
        }
      }
    }
    if (newArray != null) {
      if (newArray == ""){
      newArray.splice(0, 1);
 
 }     var eredmeny = newArray.concat(this.state.csutortokiBev);
      this.setState({
        csutortokiBev: eredmeny
      });
    }
  }

  csutortokiDesszert() {
    var list = this.state.menus;
    var newArray = [];
    for (var i = 0; i < list.length; i++) {
      if (this.state.menus[i].nap == 3 && this.state.menus[i].etkezes == 5) {
        for (var z = 0; z < this.state.menus[i].tag.length; z++) {
          console.log(this.state.menus[i].tag[z].name);
          newArrayForm = {
            title: this.state.menus[i].tag[z].name,
            value: ""
          };
          newArray = newArray.concat(newArrayForm);

          console.log(newArray);
        }
      }
    }
    if (newArray != null) {
      if (newArray == ""){
      newArray.splice(0, 1);
 
 }     var eredmeny = newArray.concat(this.state.csutortokiBev);
      this.setState({
        csutortokiBev: eredmeny
      });
      /*var hetfoiBev = this}.state.hetfoiBev.slice()
  hetfoiBev.push(this.state.hetfoiDesszert)
  this.setState({ hetfoiBev: hetfoiBev })*/
    }
  }

  pentekiReggeli() {
    var list = this.state.menus;
    var list2 = [];
    var newArray = [];

    for (var i = 0; i < list.length; i++) {
      if (this.state.menus[i].nap == 4 && this.state.menus[i].etkezes == 0) {
        for (var z = 0; z < this.state.menus[i].tag.length; z++) {
          console.log(this.state.menus[i].tag[z].name);
          newArrayForm = {
            title: this.state.menus[i].tag[z].name,
            value: ""
          };
          newArray = newArray.concat(newArrayForm);

          console.log(newArray);
        }
      }
    }
    if (newArray != null) {
      if (newArray == ""){
      newArray.splice(0, 1);
 
 }     var eredmeny = newArray.concat(this.state.pentekiBev);
      this.setState({
        pentekiBev: eredmeny
      });
    }
  }

  pentekiTizi() {
    var list = this.state.menus;
    var newArray = [];
    for (var i = 0; i < list.length; i++) {
      if (this.state.menus[i].nap == 4 && this.state.menus[i].etkezes == 1) {
        for (var z = 0; z < this.state.menus[i].tag.length; z++) {
          console.log(this.state.menus[i].tag[z].name);
          newArrayForm = {
            title: this.state.menus[i].tag[z].name,
            value: ""
          };
          newArray = newArray.concat(newArrayForm);

          console.log(newArray);
        }
      }
    }
    if (newArray != null) {
      if (newArray == ""){
      newArray.splice(0, 1);
 
 }     var eredmeny = newArray.concat(this.state.pentekiBev);
      this.setState({
        pentekiBev: eredmeny
      });
    }
  }

  pentekiEbed() {
    var list = this.state.menus;

    var newArray = [];
    for (var i = 0; i < list.length; i++) {
      if (this.state.menus[i].nap == 4 && this.state.menus[i].etkezes == 2) {
        for (var z = 0; z < this.state.menus[i].tag.length; z++) {
          console.log(this.state.menus[i].tag[z].name);
          newArrayForm = {
            title: this.state.menus[i].tag[z].name,
            value: ""
          };
          newArray = newArray.concat(newArrayForm);

          console.log(newArray);
        }
      }
    }
    if (newArray != null) {
      if (newArray == ""){
      newArray.splice(0, 1);
 
 }     var eredmeny = newArray.concat(this.state.pentekiBev);
      this.setState({
        pentekiBev: eredmeny
      });
    }
  }

  pentekiUzsi() {
    var list = this.state.menus;
    var newArray = [];
    for (var i = 0; i < list.length; i++) {
      if (this.state.menus[i].nap == 4 && this.state.menus[i].etkezes == 3) {
        for (var z = 0; z < this.state.menus[i].tag.length; z++) {
          console.log(this.state.menus[i].tag[z].name);
          newArrayForm = {
            title: this.state.menus[i].tag[z].name,
            value: ""
          };
          newArray = newArray.concat(newArrayForm);

          console.log(newArray);
        }
      }
    }
    if (newArray != null) {
      if (newArray == ""){
      newArray.splice(0, 1);
 
 }     var eredmeny = newArray.concat(this.state.pentekiBev);
      this.setState({
        pentekiBev: eredmeny
      });
    }
  }

  pentekiVacsi() {
    var list = this.state.menus;
    var newArray = [];
    for (var i = 0; i < list.length; i++) {
      if (this.state.menus[i].nap == 4 && this.state.menus[i].etkezes == 4) {
        for (var z = 0; z < this.state.menus[i].tag.length; z++) {
          console.log(this.state.menus[i].tag[z].name);
          newArrayForm = {
            title: this.state.menus[i].tag[z].name,
            value: ""
          };
          newArray = newArray.concat(newArrayForm);

          console.log(newArray);
        }
      }
    }
    if (newArray != null) {
      if (newArray == ""){
      newArray.splice(0, 1);
 
 }     var eredmeny = newArray.concat(this.state.pentekiBev);
      this.setState({
        pentekiBev: eredmeny
      });
    }
  }

  pentekiDesszert() {
    var list = this.state.menus;
    var newArray = [];
    for (var i = 0; i < list.length; i++) {
      if (this.state.menus[i].nap == 4 && this.state.menus[i].etkezes == 5) {
        for (var z = 0; z < this.state.menus[i].tag.length; z++) {
          console.log(this.state.menus[i].tag[z].name);
          newArrayForm = {
            title: this.state.menus[i].tag[z].name,
            value: ""
          };
          newArray = newArray.concat(newArrayForm);

          console.log(newArray);
        }
      }
    }
    if (newArray != null) {
      if (newArray == ""){
      newArray.splice(0, 1);
 
 }     var eredmeny = newArray.concat(this.state.pentekiBev);
      this.setState({
        pentekiBev: eredmeny
      });
      /*var hetfoiBev = this}.state.hetfoiBev.slice()
  hetfoiBev.push(this.state.hetfoiDesszert)
  this.setState({ hetfoiBev: hetfoiBev })*/
    }
  }

  szombatiReggeli() {
    var list = this.state.menus;
    var list2 = [];
    var newArray = [];

    for (var i = 0; i < list.length; i++) {
      if (this.state.menus[i].nap == 5 && this.state.menus[i].etkezes == 0) {
        for (var z = 0; z < this.state.menus[i].tag.length; z++) {
          console.log(this.state.menus[i].tag[z].name);
          newArrayForm = {
            title: this.state.menus[i].tag[z].name,
            value: ""
          };
          newArray = newArray.concat(newArrayForm);

          console.log(newArray);
        }
      }
    }
    if (newArray != null) {
      if (newArray == ""){
      newArray.splice(0, 1);
 
 }     var eredmeny = newArray.concat(this.state.szombatiBev);
      this.setState({
        szombatiBev: eredmeny
      });
    }
  }

  szombatiTizi() {
    var list = this.state.menus;
    var newArray = [];
    for (var i = 0; i < list.length; i++) {
      if (this.state.menus[i].nap == 5 && this.state.menus[i].etkezes == 1) {
        for (var z = 0; z < this.state.menus[i].tag.length; z++) {
          console.log(this.state.menus[i].tag[z].name);
          newArrayForm = {
            title: this.state.menus[i].tag[z].name,
            value: ""
          };
          newArray = newArray.concat(newArrayForm);

          console.log(newArray);
        }
      }
    }
    if (newArray != null) {
      if (newArray == ""){
      newArray.splice(0, 1);
 
 }     var eredmeny = newArray.concat(this.state.szombatiBev);
      this.setState({
        szombatiBev: eredmeny
      });
    }
  }

  szombatiEbed() {
    var list = this.state.menus;

    var newArray = [];
    for (var i = 0; i < list.length; i++) {
      if (this.state.menus[i].nap == 5 && this.state.menus[i].etkezes == 2) {
        for (var z = 0; z < this.state.menus[i].tag.length; z++) {
          console.log(this.state.menus[i].tag[z].name);
          newArrayForm = {
            title: this.state.menus[i].tag[z].name,
            value: ""
          };
          newArray = newArray.concat(newArrayForm);

          console.log(newArray);
        }
      }
    }
    if (newArray != null) {
      if (newArray == ""){
      newArray.splice(0, 1);
 
 }     var eredmeny = newArray.concat(this.state.szombatiBev);
      this.setState({
        szombatiBev: eredmeny
      });
    }
  }

  szombatiUzsi() {
    var list = this.state.menus;
    var newArray = [];
    for (var i = 0; i < list.length; i++) {
      if (this.state.menus[i].nap == 5 && this.state.menus[i].etkezes == 3) {
        for (var z = 0; z < this.state.menus[i].tag.length; z++) {
          console.log(this.state.menus[i].tag[z].name);
          newArrayForm = {
            title: this.state.menus[i].tag[z].name,
            value: ""
          };
          newArray = newArray.concat(newArrayForm);

          console.log(newArray);
        }
      }
    }
    if (newArray != null) {
      if (newArray == ""){
      newArray.splice(0, 1);
 
 }     var eredmeny = newArray.concat(this.state.szombatiBev);
      this.setState({
        szombatiBev: eredmeny
      });
    }
  }

  szombatiVacsi() {
    var list = this.state.menus;
    var newArray = [];
    for (var i = 0; i < list.length; i++) {
      if (this.state.menus[i].nap == 5 && this.state.menus[i].etkezes == 4) {
        for (var z = 0; z < this.state.menus[i].tag.length; z++) {
          console.log(this.state.menus[i].tag[z].name);
          newArrayForm = {
            title: this.state.menus[i].tag[z].name,
            value: ""
          };
          newArray = newArray.concat(newArrayForm);

          console.log(newArray);
        }
      }
    }
    if (newArray != null) {
      if (newArray == ""){
      newArray.splice(0, 1);
 
 }     var eredmeny = newArray.concat(this.state.szombatiBev);
      this.setState({
        szombatiBev: eredmeny
      });
    }
  }

  szombatiDesszert() {
    var list = this.state.menus;
    var newArray = [];
    for (var i = 0; i < list.length; i++) {
      if (this.state.menus[i].nap == 5 && this.state.menus[i].etkezes == 5) {
        for (var z = 0; z < this.state.menus[i].tag.length; z++) {
          console.log(this.state.menus[i].tag[z].name);
          newArrayForm = {
            title: this.state.menus[i].tag[z].name,
            value: ""
          };
          newArray = newArray.concat(newArrayForm);

          console.log(newArray);
        }
      }
    }
    if (newArray != null) {
      if (newArray == ""){
      newArray.splice(0, 1);
 
 }     var eredmeny = newArray.concat(this.state.szombatiBev);
      this.setState({
        szombatiBev: eredmeny
      });
      /*var hetfoiBev = this}.state.hetfoiBev.slice()
  hetfoiBev.push(this.state.hetfoiDesszert)
  this.setState({ hetfoiBev: hetfoiBev })*/
    }
  }

  vasarnapiReggeli() {
    var list = this.state.menus;
    var list2 = [];
    var newArray = [];

    for (var i = 0; i < list.length; i++) {
      if (this.state.menus[i].nap == 6 && this.state.menus[i].etkezes == 0) {
        for (var z = 0; z < this.state.menus[i].tag.length; z++) {
          console.log(this.state.menus[i].tag[z].name);
          newArrayForm = {
            title: this.state.menus[i].tag[z].name,
            value: ""
          };
          newArray = newArray.concat(newArrayForm);

          console.log(newArray);
        }
      }
    }
    if (newArray != null) {
      if (newArray == ""){
      newArray.splice(0, 1);
 
 }     var eredmeny = newArray.concat(this.state.vasarnapiBev);
      this.setState({
        vasarnapiBev: eredmeny
      });
    }
  }

  vasarnapiTizi() {
    var list = this.state.menus;
    var newArray = [];
    for (var i = 0; i < list.length; i++) {
      if (this.state.menus[i].nap == 6 && this.state.menus[i].etkezes == 1) {
        for (var z = 0; z < this.state.menus[i].tag.length; z++) {
          console.log(this.state.menus[i].tag[z].name);
          newArrayForm = {
            title: this.state.menus[i].tag[z].name,
            value: ""
          };
          newArray = newArray.concat(newArrayForm);

          console.log(newArray);
        }
      }
    }
    if (newArray != null) {
      if (newArray == ""){
      newArray.splice(0, 1);
 
 }     var eredmeny = newArray.concat(this.state.vasarnapiBev);
      this.setState({
        vasarnapiBev: eredmeny
      });
    }
  }

  vasarnapiEbed() {
    var list = this.state.menus;

    var newArray = [];
    for (var i = 0; i < list.length; i++) {
      if (this.state.menus[i].nap == 6 && this.state.menus[i].etkezes == 2) {
        for (var z = 0; z < this.state.menus[i].tag.length; z++) {
          console.log(this.state.menus[i].tag[z].name);
          newArrayForm = {
            title: this.state.menus[i].tag[z].name,
            value: ""
          };
          newArray = newArray.concat(newArrayForm);

          console.log(newArray);
        }
      }
    }
    if (newArray != null) {
      if (newArray == ""){
      newArray.splice(0, 1);
 
 }     var eredmeny = newArray.concat(this.state.vasarnapiBev);
      this.setState({
        vasarnapiBev: eredmeny
      });
    }
  }

  vasarnapiUzsi() {
    var list = this.state.menus;
    var newArray = [];
    for (var i = 0; i < list.length; i++) {
      if (this.state.menus[i].nap == 6 && this.state.menus[i].etkezes == 3) {
        for (var z = 0; z < this.state.menus[i].tag.length; z++) {
          console.log(this.state.menus[i].tag[z].name);
          newArrayForm = {
            title: this.state.menus[i].tag[z].name,
            value: ""
          };
          newArray = newArray.concat(newArrayForm);

          console.log(newArray);
        }
      }
    }
    if (newArray != null) {
      if (newArray == ""){
      newArray.splice(0, 1);
 
 }     var eredmeny = newArray.concat(this.state.vasarnapiBev);
      this.setState({
        vasarnapiBev: eredmeny
      });
    }
  }

  vasarnapiVacsi() {
    var list = this.state.menus;
    var newArray = [];
    for (var i = 0; i < list.length; i++) {
      if (this.state.menus[i].nap == 6 && this.state.menus[i].etkezes == 4) {
        for (var z = 0; z < this.state.menus[i].tag.length; z++) {
          console.log(this.state.menus[i].tag[z].name);
          newArrayForm = {
            title: this.state.menus[i].tag[z].name,
            value: ""
          };
          newArray = newArray.concat(newArrayForm);

          console.log(newArray);
        }
      }
    }
    if (newArray != null) {
    if (newArray == ""){
      newArray.splice(0, 1);
    }
      var eredmeny = newArray.concat(this.state.vasarnapiBev);
      this.setState({
        vasarnapiBev: eredmeny
      });
    }
  }

  vasarnapiDesszert() {
    var list = this.state.menus;
    var newArray = [];
    for (var i = 0; i < list.length; i++) {
      if (this.state.menus[i].nap == 6 && this.state.menus[i].etkezes == 5) {
        for (var z = 0; z < this.state.menus[i].tag.length; z++) {
          console.log(this.state.menus[i].tag[z].name);
          newArrayForm = {
            title: this.state.menus[i].tag[z].name,
            value: ""
          };
          newArray = newArray.concat(newArrayForm);

          console.log(newArray);
        }
      }
    }
    if (newArray != null) {
    if (newArray == ""){
      newArray.splice(0, 1);
    }
      var eredmeny = newArray.concat(this.state.vasarnapiBev);
      this.setState({
        vasarnapiBev: eredmeny
      });
      /*var hetfoiBev = this}.state.hetfoiBev.slice()
  hetfoiBev.push(this.state.hetfoiDesszert)
  this.setState({ hetfoiBev: hetfoiBev })*/
    }
  }

  componentWillMount() {
    /*  api.getMessage().then((message) => {
      this.setState({
        message: message.list
      })
    })*/
  }

  jumpToSlide(value) {
    this.swiper.scrollBy(value);
  }

  hetfo() {
    var { height, width } = Dimensions.get("window");

    if (this.state.hetfo == 1) {
      return <ActivityIndicator size="large" color="gray" />;
    } else {
      return (
        <ListView
          dataSource={this.dataSource.cloneWithRows(this.state.hetfoiBev)}
          enableEmptySections={true}
          initialListSize={0}
          contentContainerStyle={styles.list}
          scrollEnabled={true}
          pageSize={2}
          column={2}
          renderRow={(rowData, sectionID, rowID, highlightRow) => (
            <View numberOfLines={1} style={{ backgroundColor: "white" }}>
              <View style={{ marginTop: 10 }}>
                <View style={{ width: width / 2 }}>
                  <Text
                    style={[
                      styles.nameText,
                      { color: "black", fontSize: 16, marginLeft: 25, top: 5 }
                    ]}
                  >
                    {rowData.title}
                  </Text>
                  <Image
                    source={require("../src/hetimenu_listahatter-crop.png")}
                    style={{ width: width / 2.5, height: 15 }}
                  />
                </View>
              </View>
            </View>
          )}
        />
      );
    }
  }
  async saveMenu(list) {
    await AsyncStorage.setItem("@menu:lista", JSON.stringify(list));
    console.log(list);
  }

  deleteRow(etkezes) {
    console.log(etkezes);
    var list = this.state.menus;

    for (var i = 0; i < list.length; i++) {
      if (list[i].etkezes == etkezes[0] && list[i].nap == etkezes[1]) {
        // ha egyeznek az ID-k, akkor azt az elemet toroljuk
        list.splice(i, 1);
      }
    }

    this.saveMenu(list); // mentsuk el az uj listat

    this.setState({
      menus: list
    });
  }

  render() {
    var { height, width } = Dimensions.get("window");
    var facebook = "https://www.facebook.com/";
    var instagram = "https://www.instagram.com/";
    var pinterest = "http://pinterest.com";
    console.log("this.state.hetfoiBev");
    console.log(this.state.hetfoiBev);
    console.log(this.state.keddiBev);
    console.log(this.state.szerdaiBev);
    console.log(this.state.csutortokiBev);
    console.log(this.state.pentekiBev);
    console.log(this.state.szombatiBev);
    console.log(this.state.vasarnapiBev);
    console.log(this.state.menus);

    const switchTwoValue = this.state.switchTwoValue;

    return (
      <View style={styles.container}>
        <View
          style={{
            width: width,
            height: height / 15,
            backgroundColor: "#00b8ac",
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "flex-end",
            paddingBottom: 10
          }}
        >
          <TouchableOpacity onPress={() => Actions.kedvencek()}>
            <View>
              <Text style={[styles.HOME, { color: "#008c82" }]}>
                {"Kedvencek"}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View>
              <Text style={styles.HOME}>{"Heti menü"}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Actions.bevasarlas()}>
            <View>
              <Text style={[styles.HOME, { color: "#008c82" }]}>
                {"Bevásárlás"}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: width,
            height: height / 19,
            backgroundColor: "#f0d886",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <View
            style={{
              justifyContent: "center",
              width: width - 20,
              borderRadius: 100
            }}
          >
           {/* <TouchableOpacity onPress={() => this.saveList()}>
              <View style={{ backgroundColor: "white", borderRadius: 10 }}>
                <Text style={[styles.HOME, { color: "#00B8AC" }]}>
                  {"Hozzávalók a bevásárlólistára!"}
                </Text>
              </View>
            </TouchableOpacity>*/}
            <Text
              style={{ color: "#00b8ac", textAlign: "center", fontSize: 10 }}
            >
              {"A menü törléséhez kattints az ételre!"}
            </Text>
          </View>
        </View>

        <Swiper
          ref={component => {
            this.swiper = component;
          }}
          style={(styles.wrapper, { zIndex: 50313 })}
          dot={
            <View
              style={{
                backgroundColor: "rgba(0,0,0,.2)",
                width: 8,
                height: 8,
                borderRadius: 4,
                marginLeft: 3,
                marginRight: 3,
                marginTop: height / 11 * -1,
                marginBottom: 3
              }}
            />
          }
          activeDot={
            <View
              style={{
                backgroundColor: "#00b8ac",
                width: 8,
                height: 8,
                borderRadius: 4,
                marginLeft: 3,
                marginRight: 3,
                marginTop: height / 11 * -1,
                marginBottom: 3
              }}
            />
          }
          autoplay={false}
          index={this.state.index}
          loop={false}
        >
          <View style={styles.slide}>
            <View
              style={{
                width: width,
                height: height / 10,
                backgroundColor: "#f0d886",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <View
                style={{
                  zIndex: 312312312,
                  position: "absolute",
                  left: width / 2 - 50
                }}
              >
                <Image
                  source={require("../src/hetimenu_repa.png")}
                  style={{
                    height: 118 / 3,
                    width: 44 / 3,
                    position: "relative"
                  }}
                />
              </View>
              <View style={{ margin: "auto" }}>
                <Text style={styles.nameText}>{"HÉTFŐ"}</Text>
              </View>
            </View>

            <View
              style={{
                height: height / 3,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              {this.hetfo()}
            </View>

            <View
              style={{
                flexDirection: "row",
                marginTop: 10,
                justifyContent: "space-around"
              }}
            >
              <View
                style={{
                  width: width / 3 - 4,
                  height: height / 15,
                  backgroundColor: "#f5edc1",
                  justifyContent: "center"
                }}
              >
                <Text
                  style={[
                    styles.nameText,
                    { fontSize: 20, textAlign: "center" }
                  ]}
                >
                  {"REGGELI"}
                </Text>
              </View>
              <View
                style={{
                  width: width / 3 - 4,
                  height: height / 15,
                  backgroundColor: "#f5edc1",
                  justifyContent: "center"
                }}
              >
                <Text
                  style={[
                    styles.nameText,
                    { fontSize: 20, textAlign: "center" }
                  ]}
                >
                  {"TÍZÓRAI"}
                </Text>
              </View>
              <View
                style={{
                  width: width / 3 - 4,
                  height: height / 15,
                  backgroundColor: "#f5edc1",
                  justifyContent: "center"
                }}
              >
                <Text
                  style={[
                    styles.nameText,
                    { fontSize: 20, textAlign: "center" }
                  ]}
                >
                  {"EBÉD"}
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                marginTop: 10,
                justifyContent: "space-around"
              }}
            >
              <TouchableOpacity onPress={() => this.deleteRow([0, 0])}>
                <View
                  style={{
                    width: width / 3 - 4,
                    height: height / 15,
                    backgroundColor: "transparent",
                    justifyContent: "center"
                  }}
                >
                  <Text
                    numberOfLines={2}
                    style={[
                      styles.nameText,
                      { fontSize: 18, textAlign: "center", color: "black" }
                    ]}
                  >
                    {this.hetforeggel()}
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.deleteRow([1, 0])}>
                <View
                  style={{
                    width: width / 3 - 4,
                    height: height / 15,
                    backgroundColor: "transparent",
                    justifyContent: "center"
                  }}
                >
                  <Text
                    numberOfLines={2}
                    style={[
                      styles.nameText,
                      { fontSize: 18, textAlign: "center", color: "black" }
                    ]}
                  >
                    {this.hetfotizi()}
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.deleteRow([2, 0])}>
                <View
                  style={{
                    width: width / 3 - 4,
                    height: height / 15,
                    backgroundColor: "transparent",
                    justifyContent: "center"
                  }}
                >
                  <Text
                    numberOfLines={2}
                    style={[
                      styles.nameText,
                      { fontSize: 18, textAlign: "center", color: "black" }
                    ]}
                  >
                    {this.hetfoebed()}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            <View
              style={{
                flexDirection: "row",
                marginTop: 10,
                justifyContent: "space-around"
              }}
            >
              <View
                style={{
                  width: width / 3 - 4,
                  height: height / 15,
                  backgroundColor: "#f5edc1",
                  justifyContent: "center"
                }}
              >
                <Text
                  style={[
                    styles.nameText,
                    { fontSize: 20, textAlign: "center" }
                  ]}
                >
                  {"UZSI"}
                </Text>
              </View>
              <View
                style={{
                  width: width / 3 - 4,
                  height: height / 15,
                  backgroundColor: "#f5edc1",
                  justifyContent: "center"
                }}
              >
                <Text
                  style={[
                    styles.nameText,
                    { fontSize: 20, textAlign: "center" }
                  ]}
                >
                  {"VACSI"}
                </Text>
              </View>
              <View
                style={{
                  width: width / 3 - 4,
                  height: height / 15,
                  backgroundColor: "#f5edc1",
                  justifyContent: "center"
                }}
              >
                <Text
                  style={[
                    styles.nameText,
                    { fontSize: 20, textAlign: "center" }
                  ]}
                >
                  {"DESSZERT"}
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                marginTop: 10,
                justifyContent: "space-around"
              }}
            >
              <TouchableOpacity onPress={() => this.deleteRow([3, 0])}>
                <View
                  style={{
                    width: width / 3 - 4,
                    height: height / 15,
                    backgroundColor: "transparent",
                    justifyContent: "center"
                  }}
                >
                  <Text
                    numberOfLines={2}
                    style={[
                      styles.nameText,
                      { fontSize: 18, textAlign: "center", color: "black" }
                    ]}
                  >
                    {this.hetfouzsi()}
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.deleteRow([4, 0])}>
                <View
                  style={{
                    width: width / 3 - 4,
                    height: height / 15,
                    backgroundColor: "transparent",
                    justifyContent: "center"
                  }}
                >
                  <Text
                    numberOfLines={2}
                    style={[
                      styles.nameText,
                      { fontSize: 18, textAlign: "center", color: "black" }
                    ]}
                  >
                    {this.hetfovacsi()}
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.deleteRow([5, 0])}>
                <View
                  style={{
                    width: width / 3 - 4,
                    height: height / 15,
                    backgroundColor: "transparent",
                    justifyContent: "center"
                  }}
                >
                  <Text
                    numberOfLines={2}
                    style={[
                      styles.nameText,
                      { fontSize: 18, textAlign: "center", color: "black" }
                    ]}
                  >
                    {this.hetfodesszert()}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={{ height: 150 }} />
          </View>

          <View style={styles.slide}>
            <View
              style={{
                width: width,
                height: height / 10,
                backgroundColor: "#f0d886",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <View
                style={{
                  zIndex: 312312312,
                  position: "absolute",
                  left: width / 2 - 50
                }}
              >
                <Image
                  source={require("../src/hetimenu_repa.png")}
                  style={{ height: 118 / 3, width: 44 / 3 }}
                />
              </View>
              <View style={{ margin: "auto" }}>
                <Text style={styles.nameText}>{"KEDD"}</Text>
              </View>
            </View>

            <View style={{ height: height / 3 }}>
              <ListView
                dataSource={this.dataSource.cloneWithRows(this.state.keddiBev)}
                enableEmptySections={true}
                stickyHeaderIndices={[10]}
                initialListSize={0}
                contentContainerStyle={styles.list}
                scrollEnabled={true}
                pageSize={2}
                column={2}
                renderRow={(rowData, sectionID, rowID, highlightRow) => (
                  <View numberOfLines={1} style={{ backgroundColor: "white" }}>
                    <View style={{ marginTop: 10 }}>
                      <View style={{ width: width / 2 }}>
                        <Text
                          style={[
                            styles.nameText,
                            {
                              color: "black",
                              fontSize: 16,
                              marginLeft: 25,
                              top: 5
                            }
                          ]}
                        >
                          {rowData.title}
                        </Text>
                        <Image
                          source={require("../src/hetimenu_listahatter-crop.png")}
                          style={{ width: width / 2.5, height: 15 }}
                        />
                      </View>
                    </View>
                  </View>
                )}
              />
            </View>

            <View
              style={{
                flexDirection: "row",
                marginTop: 10,
                justifyContent: "space-around"
              }}
            >
              <View
                style={{
                  width: width / 3 - 4,
                  height: height / 15,
                  backgroundColor: "#f5edc1",
                  justifyContent: "center"
                }}
              >
                <Text
                  style={[
                    styles.nameText,
                    { fontSize: 20, textAlign: "center" }
                  ]}
                >
                  {"REGGELI"}
                </Text>
              </View>
              <View
                style={{
                  width: width / 3 - 4,
                  height: height / 15,
                  backgroundColor: "#f5edc1",
                  justifyContent: "center"
                }}
              >
                <Text
                  style={[
                    styles.nameText,
                    { fontSize: 20, textAlign: "center" }
                  ]}
                >
                  {"TÍZÓRAI"}
                </Text>
              </View>
              <View
                style={{
                  width: width / 3 - 4,
                  height: height / 15,
                  backgroundColor: "#f5edc1",
                  justifyContent: "center"
                }}
              >
                <Text
                  style={[
                    styles.nameText,
                    { fontSize: 20, textAlign: "center" }
                  ]}
                >
                  {"EBÉD"}
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                marginTop: 10,
                justifyContent: "space-around"
              }}
            >
              <TouchableOpacity onPress={() => this.deleteRow([0, 1])}>
                <View
                  style={{
                    width: width / 3 - 4,
                    height: height / 15,
                    backgroundColor: "transparent",
                    justifyContent: "center"
                  }}
                >
                  <Text
                    numberOfLines={2}
                    style={[
                      styles.nameText,
                      { fontSize: 18, textAlign: "center", color: "black" }
                    ]}
                  >
                    {this.keddreggel()}
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.deleteRow([1, 1])}>
                <View
                  style={{
                    width: width / 3 - 4,
                    height: height / 15,
                    backgroundColor: "transparent",
                    justifyContent: "center"
                  }}
                >
                  <Text
                    numberOfLines={2}
                    style={[
                      styles.nameText,
                      { fontSize: 18, textAlign: "center", color: "black" }
                    ]}
                  >
                    {this.keddtizi()}
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.deleteRow([2, 1])}>
                <View
                  style={{
                    width: width / 3 - 4,
                    height: height / 15,
                    backgroundColor: "transparent",
                    justifyContent: "center"
                  }}
                >
                  <Text
                    numberOfLines={2}
                    style={[
                      styles.nameText,
                      { fontSize: 18, textAlign: "center", color: "black" }
                    ]}
                  >
                    {this.keddebed()}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            <View
              style={{
                flexDirection: "row",
                marginTop: 10,
                justifyContent: "space-around"
              }}
            >
              <View
                style={{
                  width: width / 3 - 4,
                  height: height / 15,
                  backgroundColor: "#f5edc1",
                  justifyContent: "center"
                }}
              >
                <Text
                  style={[
                    styles.nameText,
                    { fontSize: 20, textAlign: "center" }
                  ]}
                >
                  {"UZSI"}
                </Text>
              </View>
              <View
                style={{
                  width: width / 3 - 4,
                  height: height / 15,
                  backgroundColor: "#f5edc1",
                  justifyContent: "center"
                }}
              >
                <Text
                  style={[
                    styles.nameText,
                    { fontSize: 20, textAlign: "center" }
                  ]}
                >
                  {"VACSI"}
                </Text>
              </View>
              <View
                style={{
                  width: width / 3 - 4,
                  height: height / 15,
                  backgroundColor: "#f5edc1",
                  justifyContent: "center"
                }}
              >
                <Text
                  style={[
                    styles.nameText,
                    { fontSize: 20, textAlign: "center" }
                  ]}
                >
                  {"DESSZERT"}
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                marginTop: 10,
                justifyContent: "space-around"
              }}
            >
              <TouchableOpacity onPress={() => this.deleteRow([3, 1])}>
                <View
                  style={{
                    width: width / 3 - 4,
                    height: height / 15,
                    backgroundColor: "transparent",
                    justifyContent: "center"
                  }}
                >
                  <Text
                    numberOfLines={2}
                    style={[
                      styles.nameText,
                      { fontSize: 18, textAlign: "center", color: "black" }
                    ]}
                  >
                    {this.kedduzsi()}
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.deleteRow([4, 1])}>
                <View
                  style={{
                    width: width / 3 - 4,
                    height: height / 15,
                    backgroundColor: "transparent",
                    justifyContent: "center"
                  }}
                >
                  <Text
                    numberOfLines={2}
                    style={[
                      styles.nameText,
                      { fontSize: 18, textAlign: "center", color: "black" }
                    ]}
                  >
                    {this.keddvacsi()}
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.deleteRow([5, 1])}>
                <View
                  style={{
                    width: width / 3 - 4,
                    height: height / 15,
                    backgroundColor: "transparent",
                    justifyContent: "center"
                  }}
                >
                  <Text
                    numberOfLines={2}
                    style={[
                      styles.nameText,
                      { fontSize: 18, textAlign: "center", color: "black" }
                    ]}
                  >
                    {this.kedddesszert()}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={{ height: 150 }} />
          </View>

          <View style={styles.slide}>
            <View
              style={{
                width: width,
                height: height / 10,
                backgroundColor: "#f0d886",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <View
                style={{
                  zIndex: 312312312,
                  position: "absolute",
                  left: width / 2 - 50
                }}
              >
                <Image
                  source={require("../src/hetimenu_repa.png")}
                  style={{ height: 118 / 3, width: 44 / 3 }}
                />
              </View>
              <View style={{ margin: "auto" }}>
                <Text style={styles.nameText}>{"SZERDA"}</Text>
              </View>
            </View>

            <View style={{ height: height / 3 }}>
              <ListView
                dataSource={this.dataSource.cloneWithRows(
                  this.state.szerdaiBev
                )}
                enableEmptySections={true}
                stickyHeaderIndices={[10]}
                initialListSize={0}
                contentContainerStyle={styles.list}
                scrollEnabled={true}
                pageSize={2}
                column={2}
                renderRow={(rowData, sectionID, rowID, highlightRow) => (
                  <View numberOfLines={1} style={{ backgroundColor: "white" }}>
                    <View style={{ marginTop: 10 }}>
                      <View style={{ width: width / 2 }}>
                        <Text
                          style={[
                            styles.nameText,
                            {
                              color: "black",
                              fontSize: 16,
                              marginLeft: 25,
                              top: 5
                            }
                          ]}
                        >
                          {rowData.title}
                        </Text>
                        <Image
                          source={require("../src/hetimenu_listahatter-crop.png")}
                          style={{ width: width / 2.5, height: 15 }}
                        />
                      </View>
                    </View>
                  </View>
                )}
              />
            </View>

            <View
              style={{
                flexDirection: "row",
                marginTop: 10,
                justifyContent: "space-around"
              }}
            >
              <View
                style={{
                  width: width / 3 - 4,
                  height: height / 15,
                  backgroundColor: "#f5edc1",
                  justifyContent: "center"
                }}
              >
                <Text
                  style={[
                    styles.nameText,
                    { fontSize: 20, textAlign: "center" }
                  ]}
                >
                  {"REGGELI"}
                </Text>
              </View>
              <View
                style={{
                  width: width / 3 - 4,
                  height: height / 15,
                  backgroundColor: "#f5edc1",
                  justifyContent: "center"
                }}
              >
                <Text
                  style={[
                    styles.nameText,
                    { fontSize: 20, textAlign: "center" }
                  ]}
                >
                  {"TÍZÓRAI"}
                </Text>
              </View>
              <View
                style={{
                  width: width / 3 - 4,
                  height: height / 15,
                  backgroundColor: "#f5edc1",
                  justifyContent: "center"
                }}
              >
                <Text
                  style={[
                    styles.nameText,
                    { fontSize: 20, textAlign: "center" }
                  ]}
                >
                  {"EBÉD"}
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                marginTop: 10,
                justifyContent: "space-around"
              }}
            >
              <TouchableOpacity onPress={() => this.deleteRow([0, 2])}>
                <View
                  style={{
                    width: width / 3 - 4,
                    height: height / 15,
                    backgroundColor: "transparent",
                    justifyContent: "center"
                  }}
                >
                  <Text
                    numberOfLines={2}
                    style={[
                      styles.nameText,
                      { fontSize: 18, textAlign: "center", color: "black" }
                    ]}
                  >
                    {this.szerdareggel()}
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.deleteRow([1, 2])}>
                <View
                  style={{
                    width: width / 3 - 4,
                    height: height / 15,
                    backgroundColor: "transparent",
                    justifyContent: "center"
                  }}
                >
                  <Text
                    numberOfLines={2}
                    style={[
                      styles.nameText,
                      { fontSize: 18, textAlign: "center", color: "black" }
                    ]}
                  >
                    {this.szerdatizi()}
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.deleteRow([2, 2])}>
                <View
                  style={{
                    width: width / 3 - 4,
                    height: height / 15,
                    backgroundColor: "transparent",
                    justifyContent: "center"
                  }}
                >
                  <Text
                    numberOfLines={2}
                    style={[
                      styles.nameText,
                      { fontSize: 18, textAlign: "center", color: "black" }
                    ]}
                  >
                    {this.szerdaebed()}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            <View
              style={{
                flexDirection: "row",
                marginTop: 10,
                justifyContent: "space-around"
              }}
            >
              <View
                style={{
                  width: width / 3 - 4,
                  height: height / 15,
                  backgroundColor: "#f5edc1",
                  justifyContent: "center"
                }}
              >
                <Text
                  style={[
                    styles.nameText,
                    { fontSize: 20, textAlign: "center" }
                  ]}
                >
                  {"UZSI"}
                </Text>
              </View>
              <View
                style={{
                  width: width / 3 - 4,
                  height: height / 15,
                  backgroundColor: "#f5edc1",
                  justifyContent: "center"
                }}
              >
                <Text
                  style={[
                    styles.nameText,
                    { fontSize: 20, textAlign: "center" }
                  ]}
                >
                  {"VACSI"}
                </Text>
              </View>
              <View
                style={{
                  width: width / 3 - 4,
                  height: height / 15,
                  backgroundColor: "#f5edc1",
                  justifyContent: "center"
                }}
              >
                <Text
                  style={[
                    styles.nameText,
                    { fontSize: 20, textAlign: "center" }
                  ]}
                >
                  {"DESSZERT"}
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                marginTop: 10,
                justifyContent: "space-around"
              }}
            >
              <TouchableOpacity onPress={() => this.deleteRow([3, 2])}>
                <View
                  style={{
                    width: width / 3 - 4,
                    height: height / 15,
                    backgroundColor: "transparent",
                    justifyContent: "center"
                  }}
                >
                  <Text
                    numberOfLines={2}
                    style={[
                      styles.nameText,
                      { fontSize: 18, textAlign: "center", color: "black" }
                    ]}
                  >
                    {this.szerdauzsi()}
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.deleteRow([4, 2])}>
                <View
                  style={{
                    width: width / 3 - 4,
                    height: height / 15,
                    backgroundColor: "transparent",
                    justifyContent: "center"
                  }}
                >
                  <Text
                    numberOfLines={2}
                    style={[
                      styles.nameText,
                      { fontSize: 18, textAlign: "center", color: "black" }
                    ]}
                  >
                    {this.szerdavacsi()}
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.deleteRow([5, 2])}>
                <View
                  style={{
                    width: width / 3 - 4,
                    height: height / 15,
                    backgroundColor: "transparent",
                    justifyContent: "center"
                  }}
                >
                  <Text
                    numberOfLines={2}
                    style={[
                      styles.nameText,
                      { fontSize: 18, textAlign: "center", color: "black" }
                    ]}
                  >
                    {this.szerdadesszert()}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={{ height: 150 }} />
          </View>

          <View style={styles.slide}>
            <View
              style={{
                width: width,
                height: height / 10,
                backgroundColor: "#f0d886",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <View
                style={{
                  zIndex: 312312312,
                  position: "absolute",
                  left: width / 2 - 70
                }}
              >
                <Image
                  source={require("../src/hetimenu_repa.png")}
                  style={{ height: 118 / 3, width: 44 / 3 }}
                />
              </View>
              <View style={{ margin: "auto" }}>
                <Text style={styles.nameText}>{"CSÜTÖRTÖK"}</Text>
              </View>
            </View>

            <View style={{ height: height / 3 }}>
              <ListView
                dataSource={this.dataSource.cloneWithRows(
                  this.state.csutortokiBev
                )}
                enableEmptySections={true}
                stickyHeaderIndices={[10]}
                initialListSize={0}
                contentContainerStyle={styles.list}
                scrollEnabled={true}
                pageSize={2}
                column={2}
                renderRow={(rowData, sectionID, rowID, highlightRow) => (
                  <View numberOfLines={1} style={{ backgroundColor: "white" }}>
                    <View style={{ marginTop: 10 }}>
                      <View style={{ width: width / 2 }}>
                        <Text
                          style={[
                            styles.nameText,
                            {
                              color: "black",
                              fontSize: 16,
                              marginLeft: 25,
                              top: 5
                            }
                          ]}
                        >
                          {rowData.title}
                        </Text>
                        <Image
                          source={require("../src/hetimenu_listahatter-crop.png")}
                          style={{ width: width / 2.5, height: 15 }}
                        />
                      </View>
                    </View>
                  </View>
                )}
              />
            </View>

            <View
              style={{
                flexDirection: "row",
                marginTop: 10,
                justifyContent: "space-around"
              }}
            >
              <View
                style={{
                  width: width / 3 - 4,
                  height: height / 15,
                  backgroundColor: "#f5edc1",
                  justifyContent: "center"
                }}
              >
                <Text
                  style={[
                    styles.nameText,
                    { fontSize: 20, textAlign: "center" }
                  ]}
                >
                  {"REGGELI"}
                </Text>
              </View>
              <View
                style={{
                  width: width / 3 - 4,
                  height: height / 15,
                  backgroundColor: "#f5edc1",
                  justifyContent: "center"
                }}
              >
                <Text
                  style={[
                    styles.nameText,
                    { fontSize: 20, textAlign: "center" }
                  ]}
                >
                  {"TÍZÓRAI"}
                </Text>
              </View>
              <View
                style={{
                  width: width / 3 - 4,
                  height: height / 15,
                  backgroundColor: "#f5edc1",
                  justifyContent: "center"
                }}
              >
                <Text
                  style={[
                    styles.nameText,
                    { fontSize: 20, textAlign: "center" }
                  ]}
                >
                  {"EBÉD"}
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                marginTop: 10,
                justifyContent: "space-around"
              }}
            >
              <TouchableOpacity onPress={() => this.deleteRow([0, 3])}>
                <View
                  style={{
                    width: width / 3 - 4,
                    height: height / 15,
                    backgroundColor: "transparent",
                    justifyContent: "center"
                  }}
                >
                  <Text
                    numberOfLines={2}
                    style={[
                      styles.nameText,
                      { fontSize: 18, textAlign: "center", color: "black" }
                    ]}
                  >
                    {this.csutortokreggel()}
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.deleteRow([1, 3])}>
                <View
                  style={{
                    width: width / 3 - 4,
                    height: height / 15,
                    backgroundColor: "transparent",
                    justifyContent: "center"
                  }}
                >
                  <Text
                    numberOfLines={2}
                    style={[
                      styles.nameText,
                      { fontSize: 18, textAlign: "center", color: "black" }
                    ]}
                  >
                    {this.csutortoktizi()}
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.deleteRow([2, 3])}>
                <View
                  style={{
                    width: width / 3 - 4,
                    height: height / 15,
                    backgroundColor: "transparent",
                    justifyContent: "center"
                  }}
                >
                  <Text
                    numberOfLines={2}
                    style={[
                      styles.nameText,
                      { fontSize: 18, textAlign: "center", color: "black" }
                    ]}
                  >
                    {this.csutortokebed()}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            <View
              style={{
                flexDirection: "row",
                marginTop: 10,
                justifyContent: "space-around"
              }}
            >
              <View
                style={{
                  width: width / 3 - 4,
                  height: height / 15,
                  backgroundColor: "#f5edc1",
                  justifyContent: "center"
                }}
              >
                <Text
                  style={[
                    styles.nameText,
                    { fontSize: 20, textAlign: "center" }
                  ]}
                >
                  {"UZSI"}
                </Text>
              </View>
              <View
                style={{
                  width: width / 3 - 4,
                  height: height / 15,
                  backgroundColor: "#f5edc1",
                  justifyContent: "center"
                }}
              >
                <Text
                  style={[
                    styles.nameText,
                    { fontSize: 20, textAlign: "center" }
                  ]}
                >
                  {"VACSI"}
                </Text>
              </View>
              <View
                style={{
                  width: width / 3 - 4,
                  height: height / 15,
                  backgroundColor: "#f5edc1",
                  justifyContent: "center"
                }}
              >
                <Text
                  style={[
                    styles.nameText,
                    { fontSize: 20, textAlign: "center" }
                  ]}
                >
                  {"DESSZERT"}
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                marginTop: 10,
                justifyContent: "space-around"
              }}
            >
              <TouchableOpacity onPress={() => this.deleteRow([3, 3])}>
                <View
                  style={{
                    width: width / 3 - 4,
                    height: height / 15,
                    backgroundColor: "transparent",
                    justifyContent: "center"
                  }}
                >
                  <Text
                    numberOfLines={2}
                    style={[
                      styles.nameText,
                      { fontSize: 18, textAlign: "center", color: "black" }
                    ]}
                  >
                    {this.csutortokuzsi()}
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.deleteRow([4, 3])}>
                <View
                  style={{
                    width: width / 3 - 4,
                    height: height / 15,
                    backgroundColor: "transparent",
                    justifyContent: "center"
                  }}
                >
                  <Text
                    numberOfLines={2}
                    style={[
                      styles.nameText,
                      { fontSize: 18, textAlign: "center", color: "black" }
                    ]}
                  >
                    {this.csutortokvacsi()}
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.deleteRow([5, 3])}>
                <View
                  style={{
                    width: width / 3 - 4,
                    height: height / 15,
                    backgroundColor: "transparent",
                    justifyContent: "center"
                  }}
                >
                  <Text
                    numberOfLines={2}
                    style={[
                      styles.nameText,
                      { fontSize: 18, textAlign: "center", color: "black" }
                    ]}
                  >
                    {this.csutortokdesszert()}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={{ height: 150 }} />
          </View>

          <View style={styles.slide}>
            <View
              style={{
                width: width,
                height: height / 10,
                backgroundColor: "#f0d886",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <View
                style={{
                  zIndex: 312312312,
                  position: "absolute",
                  left: width / 2 - 50
                }}
              >
                <Image
                  source={require("../src/hetimenu_repa.png")}
                  style={{ height: 118 / 3, width: 44 / 3 }}
                />
              </View>
              <View style={{ margin: "auto" }}>
                <Text style={styles.nameText}>{"PÉNTEK"}</Text>
              </View>
            </View>

            <View style={{ height: height / 3 }}>
              <ListView
                dataSource={this.dataSource.cloneWithRows(
                  this.state.pentekiBev
                )}
                enableEmptySections={true}
                stickyHeaderIndices={[10]}
                initialListSize={0}
                contentContainerStyle={styles.list}
                scrollEnabled={true}
                pageSize={2}
                column={2}
                renderRow={(rowData, sectionID, rowID, highlightRow) => (
                  <View numberOfLines={1} style={{ backgroundColor: "white" }}>
                    <View style={{ marginTop: 10 }}>
                      <View style={{ width: width / 2 }}>
                        <Text
                          style={[
                            styles.nameText,
                            {
                              color: "black",
                              fontSize: 16,
                              marginLeft: 25,
                              top: 5
                            }
                          ]}
                        >
                          {rowData.title}
                        </Text>
                        <Image
                          source={require("../src/hetimenu_listahatter-crop.png")}
                          style={{ width: width / 2.5, height: 15 }}
                        />
                      </View>
                    </View>
                  </View>
                )}
              />
            </View>

            <View
              style={{
                flexDirection: "row",
                marginTop: 10,
                justifyContent: "space-around"
              }}
            >
              <View
                style={{
                  width: width / 3 - 4,
                  height: height / 15,
                  backgroundColor: "#f5edc1",
                  justifyContent: "center"
                }}
              >
                <Text
                  style={[
                    styles.nameText,
                    { fontSize: 20, textAlign: "center" }
                  ]}
                >
                  {"REGGELI"}
                </Text>
              </View>
              <View
                style={{
                  width: width / 3 - 4,
                  height: height / 15,
                  backgroundColor: "#f5edc1",
                  justifyContent: "center"
                }}
              >
                <Text
                  style={[
                    styles.nameText,
                    { fontSize: 20, textAlign: "center" }
                  ]}
                >
                  {"TÍZÓRAI"}
                </Text>
              </View>
              <View
                style={{
                  width: width / 3 - 4,
                  height: height / 15,
                  backgroundColor: "#f5edc1",
                  justifyContent: "center"
                }}
              >
                <Text
                  style={[
                    styles.nameText,
                    { fontSize: 20, textAlign: "center" }
                  ]}
                >
                  {"EBÉD"}
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                marginTop: 10,
                justifyContent: "space-around"
              }}
            >
              <TouchableOpacity onPress={() => this.deleteRow([0, 4])}>
                <View
                  style={{
                    width: width / 3 - 4,
                    height: height / 15,
                    backgroundColor: "transparent",
                    justifyContent: "center"
                  }}
                >
                  <Text
                    numberOfLines={2}
                    style={[
                      styles.nameText,
                      { fontSize: 18, textAlign: "center", color: "black" }
                    ]}
                  >
                    {this.pentekreggel()}
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.deleteRow([1, 4])}>
                <View
                  style={{
                    width: width / 3 - 4,
                    height: height / 15,
                    backgroundColor: "transparent",
                    justifyContent: "center"
                  }}
                >
                  <Text
                    numberOfLines={2}
                    style={[
                      styles.nameText,
                      { fontSize: 18, textAlign: "center", color: "black" }
                    ]}
                  >
                    {this.pentektizi()}
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.deleteRow([2, 4])}>
                <View
                  style={{
                    width: width / 3 - 4,
                    height: height / 15,
                    backgroundColor: "transparent",
                    justifyContent: "center"
                  }}
                >
                  <Text
                    numberOfLines={2}
                    style={[
                      styles.nameText,
                      { fontSize: 18, textAlign: "center", color: "black" }
                    ]}
                  >
                    {this.pentekebed()}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            <View
              style={{
                flexDirection: "row",
                marginTop: 10,
                justifyContent: "space-around"
              }}
            >
              <View
                style={{
                  width: width / 3 - 4,
                  height: height / 15,
                  backgroundColor: "#f5edc1",
                  justifyContent: "center"
                }}
              >
                <Text
                  style={[
                    styles.nameText,
                    { fontSize: 20, textAlign: "center" }
                  ]}
                >
                  {"UZSI"}
                </Text>
              </View>
              <View
                style={{
                  width: width / 3 - 4,
                  height: height / 15,
                  backgroundColor: "#f5edc1",
                  justifyContent: "center"
                }}
              >
                <Text
                  style={[
                    styles.nameText,
                    { fontSize: 20, textAlign: "center" }
                  ]}
                >
                  {"VACSI"}
                </Text>
              </View>
              <View
                style={{
                  width: width / 3 - 4,
                  height: height / 15,
                  backgroundColor: "#f5edc1",
                  justifyContent: "center"
                }}
              >
                <Text
                  style={[
                    styles.nameText,
                    { fontSize: 20, textAlign: "center" }
                  ]}
                >
                  {"DESSZERT"}
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                marginTop: 10,
                justifyContent: "space-around"
              }}
            >
              <TouchableOpacity onPress={() => this.deleteRow([3, 4])}>
                <View
                  style={{
                    width: width / 3 - 4,
                    height: height / 15,
                    backgroundColor: "transparent",
                    justifyContent: "center"
                  }}
                >
                  <Text
                    numberOfLines={2}
                    style={[
                      styles.nameText,
                      { fontSize: 18, textAlign: "center", color: "black" }
                    ]}
                  >
                    {this.pentekuzsi()}
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.deleteRow([4, 4])}>
                <View
                  style={{
                    width: width / 3 - 4,
                    height: height / 15,
                    backgroundColor: "transparent",
                    justifyContent: "center"
                  }}
                >
                  <Text
                    numberOfLines={2}
                    style={[
                      styles.nameText,
                      { fontSize: 18, textAlign: "center", color: "black" }
                    ]}
                  >
                    {this.pentekvacsi()}
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.deleteRow([5, 4])}>
                <View
                  style={{
                    width: width / 3 - 4,
                    height: height / 15,
                    backgroundColor: "transparent",
                    justifyContent: "center"
                  }}
                >
                  <Text
                    numberOfLines={2}
                    style={[
                      styles.nameText,
                      { fontSize: 18, textAlign: "center", color: "black" }
                    ]}
                  >
                    {this.pentekdesszert()}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={{ height: 150 }} />
          </View>

          <View style={styles.slide}>
            <View
              style={{
                width: width,
                height: height / 10,
                backgroundColor: "#f0d886",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <View
                style={{
                  zIndex: 312312312,
                  position: "absolute",
                  left: width / 2 - 60
                }}
              >
                <Image
                  source={require("../src/hetimenu_repa.png")}
                  style={{ height: 118 / 3, width: 44 / 3 }}
                />
              </View>
              <View style={{ margin: "auto" }}>
                <Text style={styles.nameText}>{"SZOMBAT"}</Text>
              </View>
            </View>

            <View style={{ height: height / 3 }}>
              <ListView
                dataSource={this.dataSource.cloneWithRows(
                  this.state.szombatiBev
                )}
                enableEmptySections={true}
                stickyHeaderIndices={[10]}
                initialListSize={0}
                contentContainerStyle={styles.list}
                scrollEnabled={true}
                pageSize={2}
                column={2}
                renderRow={(rowData, sectionID, rowID, highlightRow) => (
                  <View numberOfLines={1} style={{ backgroundColor: "white" }}>
                    <View style={{ marginTop: 10 }}>
                      <View style={{ width: width / 2 }}>
                        <Text
                          style={[
                            styles.nameText,
                            {
                              color: "black",
                              fontSize: 16,
                              marginLeft: 25,
                              top: 5
                            }
                          ]}
                        >
                          {rowData.title}
                        </Text>
                        <Image
                          source={require("../src/hetimenu_listahatter-crop.png")}
                          style={{ width: width / 2.5, height: 15 }}
                        />
                      </View>
                    </View>
                  </View>
                )}
              />
            </View>

            <View
              style={{
                flexDirection: "row",
                marginTop: 10,
                justifyContent: "space-around"
              }}
            >
              <View
                style={{
                  width: width / 3 - 4,
                  height: height / 15,
                  backgroundColor: "#f5edc1",
                  justifyContent: "center"
                }}
              >
                <Text
                  style={[
                    styles.nameText,
                    { fontSize: 20, textAlign: "center" }
                  ]}
                >
                  {"REGGELI"}
                </Text>
              </View>
              <View
                style={{
                  width: width / 3 - 4,
                  height: height / 15,
                  backgroundColor: "#f5edc1",
                  justifyContent: "center"
                }}
              >
                <Text
                  style={[
                    styles.nameText,
                    { fontSize: 20, textAlign: "center" }
                  ]}
                >
                  {"TÍZÓRAI"}
                </Text>
              </View>
              <View
                style={{
                  width: width / 3 - 4,
                  height: height / 15,
                  backgroundColor: "#f5edc1",
                  justifyContent: "center"
                }}
              >
                <Text
                  style={[
                    styles.nameText,
                    { fontSize: 20, textAlign: "center" }
                  ]}
                >
                  {"EBÉD"}
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                marginTop: 10,
                justifyContent: "space-around"
              }}
            >
              <TouchableOpacity onPress={() => this.deleteRow([0, 5])}>
                <View
                  style={{
                    width: width / 3 - 4,
                    height: height / 15,
                    backgroundColor: "transparent",
                    justifyContent: "center"
                  }}
                >
                  <Text
                    numberOfLines={2}
                    style={[
                      styles.nameText,
                      { fontSize: 18, textAlign: "center", color: "black" }
                    ]}
                  >
                    {this.szombatreggel()}
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.deleteRow([1, 5])}>
                <View
                  style={{
                    width: width / 3 - 4,
                    height: height / 15,
                    backgroundColor: "transparent",
                    justifyContent: "center"
                  }}
                >
                  <Text
                    numberOfLines={2}
                    style={[
                      styles.nameText,
                      { fontSize: 18, textAlign: "center", color: "black" }
                    ]}
                  >
                    {this.szombattizi()}
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.deleteRow([2, 5])}>
                <View
                  style={{
                    width: width / 3 - 4,
                    height: height / 15,
                    backgroundColor: "transparent",
                    justifyContent: "center"
                  }}
                >
                  <Text
                    numberOfLines={2}
                    style={[
                      styles.nameText,
                      { fontSize: 18, textAlign: "center", color: "black" }
                    ]}
                  >
                    {this.szombatebed()}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            <View
              style={{
                flexDirection: "row",
                marginTop: 10,
                justifyContent: "space-around"
              }}
            >
              <View
                style={{
                  width: width / 3 - 4,
                  height: height / 15,
                  backgroundColor: "#f5edc1",
                  justifyContent: "center"
                }}
              >
                <Text
                  style={[
                    styles.nameText,
                    { fontSize: 20, textAlign: "center" }
                  ]}
                >
                  {"UZSI"}
                </Text>
              </View>
              <View
                style={{
                  width: width / 3 - 4,
                  height: height / 15,
                  backgroundColor: "#f5edc1",
                  justifyContent: "center"
                }}
              >
                <Text
                  style={[
                    styles.nameText,
                    { fontSize: 20, textAlign: "center" }
                  ]}
                >
                  {"VACSI"}
                </Text>
              </View>
              <View
                style={{
                  width: width / 3 - 4,
                  height: height / 15,
                  backgroundColor: "#f5edc1",
                  justifyContent: "center"
                }}
              >
                <Text
                  style={[
                    styles.nameText,
                    { fontSize: 20, textAlign: "center" }
                  ]}
                >
                  {"DESSZERT"}
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                marginTop: 10,
                justifyContent: "space-around"
              }}
            >
              <TouchableOpacity onPress={() => this.deleteRow([3, 5])}>
                <View
                  style={{
                    width: width / 3 - 4,
                    height: height / 15,
                    backgroundColor: "transparent",
                    justifyContent: "center"
                  }}
                >
                  <Text
                    numberOfLines={2}
                    style={[
                      styles.nameText,
                      { fontSize: 18, textAlign: "center", color: "black" }
                    ]}
                  >
                    {this.szombatuzsi()}
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.deleteRow([4, 5])}>
                <View
                  style={{
                    width: width / 3 - 4,
                    height: height / 15,
                    backgroundColor: "transparent",
                    justifyContent: "center"
                  }}
                >
                  <Text
                    numberOfLines={2}
                    style={[
                      styles.nameText,
                      { fontSize: 18, textAlign: "center", color: "black" }
                    ]}
                  >
                    {this.szombatvacsi()}
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.deleteRow([5, 5])}>
                <View
                  style={{
                    width: width / 3 - 4,
                    height: height / 15,
                    backgroundColor: "transparent",
                    justifyContent: "center"
                  }}
                >
                  <Text
                    numberOfLines={2}
                    style={[
                      styles.nameText,
                      { fontSize: 18, textAlign: "center", color: "black" }
                    ]}
                  >
                    {this.szombatdesszert()}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={{ height: 150 }} />
          </View>

          <View style={styles.slide}>
            <View
              style={{
                width: width,
                height: height / 10,
                backgroundColor: "#f0d886",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <View
                style={{
                  zIndex: 312312312,
                  position: "absolute",
                  left: width / 2 - 70
                }}
              >
                <Image
                  source={require("../src/hetimenu_repa.png")}
                  style={{ height: 118 / 3, width: 44 / 3 }}
                />
              </View>
              <View style={{ margin: "auto" }}>
                <Text style={styles.nameText}>{"VASÁRNAP"}</Text>
              </View>
            </View>

            <View style={{ height: height / 3 }}>
              <ListView
                dataSource={this.dataSource.cloneWithRows(
                  this.state.vasarnapiBev
                )}
                enableEmptySections={true}
                stickyHeaderIndices={[10]}
                initialListSize={0}
                contentContainerStyle={styles.list}
                scrollEnabled={true}
                pageSize={2}
                column={2}
                renderRow={(rowData, sectionID, rowID, highlightRow) => (
                  <View numberOfLines={1} style={{ backgroundColor: "white" }}>
                    <View style={{ marginTop: 10 }}>
                      <View style={{ width: width / 2 }}>
                        <Text
                          style={[
                            styles.nameText,
                            {
                              color: "black",
                              fontSize: 16,
                              marginLeft: 25,
                              top: 5
                            }
                          ]}
                        >
                          {rowData.title}
                        </Text>
                        <Image
                          source={require("../src/hetimenu_listahatter-crop.png")}
                          style={{ width: width / 2.5, height: 15 }}
                        />
                      </View>
                    </View>
                  </View>
                )}
              />
            </View>

            <View
              style={{
                flexDirection: "row",
                marginTop: 10,
                justifyContent: "space-around"
              }}
            >
              <View
                style={{
                  width: width / 3 - 4,
                  height: height / 15,
                  backgroundColor: "#f5edc1",
                  justifyContent: "center"
                }}
              >
                <Text
                  style={[
                    styles.nameText,
                    { fontSize: 20, textAlign: "center" }
                  ]}
                >
                  {"REGGELI"}
                </Text>
              </View>
              <View
                style={{
                  width: width / 3 - 4,
                  height: height / 15,
                  backgroundColor: "#f5edc1",
                  justifyContent: "center"
                }}
              >
                <Text
                  style={[
                    styles.nameText,
                    { fontSize: 20, textAlign: "center" }
                  ]}
                >
                  {"TÍZÓRAI"}
                </Text>
              </View>
              <View
                style={{
                  width: width / 3 - 4,
                  height: height / 15,
                  backgroundColor: "#f5edc1",
                  justifyContent: "center"
                }}
              >
                <Text
                  style={[
                    styles.nameText,
                    { fontSize: 20, textAlign: "center" }
                  ]}
                >
                  {"EBÉD"}
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                marginTop: 10,
                justifyContent: "space-around"
              }}
            >
              <TouchableOpacity onPress={() => this.deleteRow([0, 6])}>
                <View
                  style={{
                    width: width / 3 - 4,
                    height: height / 15,
                    backgroundColor: "transparent",
                    justifyContent: "center"
                  }}
                >
                  <Text
                    numberOfLines={2}
                    style={[
                      styles.nameText,
                      { fontSize: 18, textAlign: "center", color: "black" }
                    ]}
                  >
                    {this.vasarnapreggel()}
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.deleteRow([1, 6])}>
                <View
                  style={{
                    width: width / 3 - 4,
                    height: height / 15,
                    backgroundColor: "transparent",
                    justifyContent: "center"
                  }}
                >
                  <Text
                    numberOfLines={2}
                    style={[
                      styles.nameText,
                      { fontSize: 18, textAlign: "center", color: "black" }
                    ]}
                  >
                    {this.vasarnaptizi()}
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.deleteRow([2, 6])}>
                <View
                  style={{
                    width: width / 3 - 4,
                    height: height / 15,
                    backgroundColor: "transparent",
                    justifyContent: "center"
                  }}
                >
                  <Text
                    numberOfLines={2}
                    style={[
                      styles.nameText,
                      { fontSize: 18, textAlign: "center", color: "black" }
                    ]}
                  >
                    {this.vasarnapebed()}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            <View
              style={{
                flexDirection: "row",
                marginTop: 10,
                justifyContent: "space-around"
              }}
            >
              <View
                style={{
                  width: width / 3 - 4,
                  height: height / 15,
                  backgroundColor: "#f5edc1",
                  justifyContent: "center"
                }}
              >
                <Text
                  style={[
                    styles.nameText,
                    { fontSize: 20, textAlign: "center" }
                  ]}
                >
                  {"UZSI"}
                </Text>
              </View>
              <View
                style={{
                  width: width / 3 - 4,
                  height: height / 15,
                  backgroundColor: "#f5edc1",
                  justifyContent: "center"
                }}
              >
                <Text
                  style={[
                    styles.nameText,
                    { fontSize: 20, textAlign: "center" }
                  ]}
                >
                  {"VACSI"}
                </Text>
              </View>
              <View
                style={{
                  width: width / 3 - 4,
                  height: height / 15,
                  backgroundColor: "#f5edc1",
                  justifyContent: "center"
                }}
              >
                <Text
                  style={[
                    styles.nameText,
                    { fontSize: 20, textAlign: "center" }
                  ]}
                >
                  {"DESSZERT"}
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                marginTop: 10,
                justifyContent: "space-around"
              }}
            >
              <TouchableOpacity onPress={() => this.deleteRow([3, 6])}>
                <View
                  style={{
                    width: width / 3 - 4,
                    height: height / 15,
                    backgroundColor: "transparent",
                    justifyContent: "center"
                  }}
                >
                  <Text
                    numberOfLines={2}
                    style={[
                      styles.nameText,
                      { fontSize: 18, textAlign: "center", color: "black" }
                    ]}
                  >
                    {this.vasarnapuzsi()}
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.deleteRow([4, 6])}>
                <View
                  style={{
                    width: width / 3 - 4,
                    height: height / 15,
                    backgroundColor: "transparent",
                    justifyContent: "center"
                  }}
                >
                  <Text
                    numberOfLines={2}
                    style={[
                      styles.nameText,
                      { fontSize: 18, textAlign: "center", color: "black" }
                    ]}
                  >
                    {this.vasarnapvacsi()}
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.deleteRow([5, 6])}>
                <View
                  style={{
                    width: width / 3 - 4,
                    height: height / 15,
                    backgroundColor: "transparent",
                    justifyContent: "center"
                  }}
                >
                  <Text
                    numberOfLines={2}
                    style={[
                      styles.nameText,
                      { fontSize: 18, textAlign: "center", color: "black" }
                    ]}
                  >
                    {this.vasarnapdesszert()}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={{ height: 150 }} />
          </View>
        </Swiper>

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
                source={require("../src/menu/menuikonaktiv_kedvenc.png")}
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

  slide: {
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
    marginLeft: 0,
    color: "#00b8ac",
    fontFamily: "AmaticSC-Bold"
  },

  cim: {
    fontSize: 16,
    textAlign: "left",
    color: "white",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    fontFamily: "AmaticSC-Bold"
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
