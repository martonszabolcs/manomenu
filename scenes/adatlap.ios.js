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
  TextInput,
  Picker,
  AsyncStorage,
  Alert
} from "react-native";

import api from "../utilities/api";
//import Noti from './noti';
import { Actions } from "react-native-router-flux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const instructions = Platform.select({});

export default class Profil extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      postCover: [],
      news: [],
      dataSource: [],
      mielott: "",
      text: "",
      nev: "",
      suly: "",
      nem: "fiu",
      magassag: "",
      date: "",
      creationDate: "",
      avatar: ""
    };
    this.dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1.guid != r2.guid
    });
    console.log(props);
    if (props.addedData != null) {
      // ez csak az egyszerusites kedveert
      var addedData = props.addedData;
      this.state.magassag = addedData.magassag;
      this.state.suly = addedData.suly;
      this.state.nem = addedData.nem;
      this.state.nev = addedData.nev;
      this.state.date = addedData.date;
      this.state.addedData = addedData;
      this.state.gLength = addedData.gLength;
      this.state.bLength = addedData.bLength;
      this.state.gHeight = addedData.gHeight;
      this.state.bHeight = addedData.bHeight;
    }
    console.log(this.state.nev);
  }
  goBack() {
    // a visszatero objektum:
    if (this.state.date > 24) {
      Alert.alert(
        "Hiba!",
        "A percentilis görbén maximum 24 hónapig tudod vezetni a baba korát"
      );
    } else {
      if (this.state.addedData != null) {
        var data = {
          magassag: this.state.magassag,
          nem: this.state.nem,
          suly: this.state.suly,
          nev: this.state.nev,
          date: this.state.date,
          creationDate: this.state.creationDate,
          avatar: "",
          gLength: this.state.gLength,
          bLength: this.state.bLength,
          gHeight: this.state.gHeight,
          bHeight: this.state.bHeight
        };
      } else {
        var data = {
          magassag: this.state.magassag,
          nem: this.state.nem,
          suly: this.state.suly,
          nev: this.state.nev,
          date: this.state.date,
          creationDate: this.state.creationDate,
          avatar: "",
          gLength: [
            {
              seriesName: "max",
              data: [
                { x: "Maximum", y: 52.7 },
                { x: "Maximum", y: 57.4 },
                { x: "Maximum", y: 60.9 },
                { x: "Maximum", y: 63.8 },
                { x: "Maximum", y: 66.2 },
                { x: "Maximum", y: 68.2 },
                { x: "Maximum", y: 70.0 },
                { x: "Maximum", y: 71.6 },
                { x: "Maximum", y: 73.2 },
                { x: "Maximum", y: 74.7 },
                { x: "Maximum", y: 76.1 },
                { x: "Maximum", y: 77.5 },
                { x: "Maximum", y: 78.9 },
                { x: "Maximum", y: 80.2 },
                { x: "Maximum", y: 81.4 },
                { x: "Maximum", y: 82.7 },
                { x: "Maximum", y: 83.9 },
                { x: "Maximum", y: 85.0 },
                { x: "Maximum", y: 86.2 },
                { x: "Maximum", y: 87.3 },
                { x: "Maximum", y: 88.4 },
                { x: "Maximum", y: 89.4 },
                { x: "Maximum", y: 90.5 },
                { x: "Maximum", y: 91.5 },
                { x: "Maximum", y: 92.5 }
              ],
              color: "#EC6F6A"
            },
            {
              seriesName: "idealMax",
              data: [
                { x: "Magas", y: 51.1 },
                { x: "Magas", y: 55.7 },
                { x: "Magas", y: 59.2 },
                { x: "Magas", y: 62.0 },
                { x: "Magas", y: 64.3 },
                { x: "Magas", y: 66.3 },
                { x: "Magas", y: 68.1 },
                { x: "Magas", y: 69.7 },
                { x: "Magas", y: 71.2 },
                { x: "Magas", y: 72.6 },
                { x: "Magas", y: 74.0 },
                { x: "Magas", y: 75.4 },
                { x: "Magas", y: 76.7 },
                { x: "Magas", y: 77.9 },
                { x: "Magas", y: 79.2 },
                { x: "Magas", y: 80.3 },
                { x: "Magas", y: 81.5 },
                { x: "Magas", y: 82.6 },
                { x: "Magas", y: 83.7 },
                { x: "Magas", y: 84.8 },
                { x: "Magas", y: 85.8 },
                { x: "Magas", y: 86.8 },
                { x: "Magas", y: 87.8 },
                { x: "Magas", y: 88.8 },
                { x: "Magas", y: 89.8 }
              ],
              color: "#F89B47"
            },
            {
              seriesName: "Ideal",
              data: [
                { x: "Ideális", y: 49.1 },
                { x: "Ideális", y: 53.7 },
                { x: "Ideális", y: 57.1 },
                { x: "Ideális", y: 59.8 },
                { x: "Ideális", y: 62.1 },
                { x: "Ideális", y: 64.0 },
                { x: "Ideális", y: 65.7 },
                { x: "Ideális", y: 67.3 },
                { x: "Ideális", y: 68.7 },
                { x: "Ideális", y: 70.1 },
                { x: "Ideális", y: 71.5 },
                { x: "Ideális", y: 72.8 },
                { x: "Ideális", y: 74.0 },
                { x: "Ideális", y: 75.2 },
                { x: "Ideális", y: 76.4 },
                { x: "Ideális", y: 77.5 },
                { x: "Ideális", y: 78.6 },
                { x: "Ideális", y: 79.7 },
                { x: "Ideális", y: 80.7 },
                { x: "Ideális", y: 81.7 },
                { x: "Ideális", y: 82.7 },
                { x: "Ideális", y: 83.7 },
                { x: "Ideális", y: 84.6 },
                { x: "Ideális", y: 85.5 },
                { x: "Ideális", y: 86.4 }
              ],
              color: "#8EBC43"
            },
            {
              seriesName: "idealMin",
              data: [
                { x: "Alacsony", y: 47.2 },
                { x: "Alacsony", y: 51.7 },
                { x: "Alacsony", y: 55.0 },
                { x: "Alacsony", y: 57.6 },
                { x: "Alacsony", y: 59.8 },
                { x: "Alacsony", y: 61.7 },
                { x: "Alacsony", y: 63.4 },
                { x: "Alacsony", y: 64.9 },
                { x: "Alacsony", y: 66.3 },
                { x: "Alacsony", y: 67.6 },
                { x: "Alacsony", y: 68.9 },
                { x: "Alacsony", y: 70.2 },
                { x: "Alacsony", y: 71.3 },
                { x: "Alacsony", y: 72.5 },
                { x: "Alacsony", y: 73.6 },
                { x: "Alacsony", y: 74.7 },
                { x: "Alacsony", y: 75.7 },
                { x: "Alacsony", y: 76.7 },
                { x: "Alacsony", y: 77.7 },
                { x: "Alacsony", y: 78.7 },
                { x: "Alacsony", y: 79.6 },
                { x: "Alacsony", y: 80.5 },
                { x: "Alacsony", y: 81.4 },
                { x: "Alacsony", y: 82.2 },
                { x: "Alacsony", y: 83.1 }
              ],
              color: "#F89B47"
            },
            {
              seriesName: "min",
              data: [
                { x: "Minimum", y: 45.6 },
                { x: "Minimum", y: 50.0 },
                { x: "Minimum", y: 53.2 },
                { x: "Minimum", y: 55.8 },
                { x: "Minimum", y: 58.0 },
                { x: "Minimum", y: 59.9 },
                { x: "Minimum", y: 61.5 },
                { x: "Minimum", y: 62.9 },
                { x: "Minimum", y: 64.3 },
                { x: "Minimum", y: 65.6 },
                { x: "Minimum", y: 66.8 },
                { x: "Minimum", y: 68.0 },
                { x: "Minimum", y: 69.2 },
                { x: "Minimum", y: 70.3 },
                { x: "Minimum", y: 71.3 },
                { x: "Minimum", y: 72.4 },
                { x: "Minimum", y: 73.3 },
                { x: "Minimum", y: 74.3 },
                { x: "Minimum", y: 75.2 },
                { x: "Minimum", y: 76.2 },
                { x: "Minimum", y: 77.0 },
                { x: "Minimum", y: 77.9 },
                { x: "Minimum", y: 78.7 },
                { x: "Minimum", y: 79.6 },
                { x: "Minimum", y: 80.3 }
              ],
              color: "#EC6F6A"
            },
            {
              seriesName: "állás",
              data: [
                { x: "_", y: 50 },
                { x: "_", y: 0 },
                { x: "_", y: 0 },
                { x: "_", y: 0 },
                { x: "_", y: 0 },
                { x: "_", y: 0 },
                { x: "_", y: 0 },
                { x: "_", y: 0 },
                { x: "_", y: 0 },
                { x: "_", y: 0 },
                { x: "_", y: 0 },
                { x: "_", y: 0 },
                { x: "_", y: 0 },
                { x: "_", y: 0 },
                { x: "_", y: 0 },
                { x: "_", y: 0 },
                { x: "_", y: 0 },
                { x: "_", y: 0 },
                { x: "_", y: 0 },
                { x: "_", y: 0 },
                { x: "_", y: 0 },
                { x: "_", y: 0 },
                { x: "_", y: 0 },
                { x: "_", y: 0 },
                { x: "_", y: 0 }
              ],
              color: "black"
            }
          ],
          gHeight: [
            {
              seriesName: "max",
              data: [
                { x: "Maximum", y: 4.2 },
                { x: "Maximum", y: 5.4 },
                { x: "Maximum", y: 6.5 },
                { x: "Maximum", y: 7.4 },
                { x: "Maximum", y: 8.1 },
                { x: "Maximum", y: 8.7 },
                { x: "Maximum", y: 9.2 },
                { x: "Maximum", y: 9.6 },
                { x: "Maximum", y: 10.0 },
                { x: "Maximum", y: 10.4 },
                { x: "Maximum", y: 10.7 },
                { x: "Maximum", y: 11.0 },
                { x: "Maximum", y: 11.3 },
                { x: "Maximum", y: 11.6 },
                { x: "Maximum", y: 11.9 },
                { x: "Maximum", y: 12.2 },
                { x: "Maximum", y: 12.5 },
                { x: "Maximum", y: 12.7 },
                { x: "Maximum", y: 13.0 },
                { x: "Maximum", y: 13.3 },
                { x: "Maximum", y: 13.5 },
                { x: "Maximum", y: 13.8 },
                { x: "Maximum", y: 14.1 },
                { x: "Maximum", y: 14.3 },
                { x: "Maximum", y: 14.6 }
              ],
              color: "#EC6F6A"
            },
            {
              seriesName: "idealMax",
              data: [
                { x: "Magas", y: 3.7 },
                { x: "Magas", y: 4.8 },
                { x: "Magas", y: 5.9 },
                { x: "Magas", y: 6.7 },
                { x: "Magas", y: 7.3 },
                { x: "Magas", y: 7.8 },
                { x: "Magas", y: 8.3 },
                { x: "Magas", y: 8.7 },
                { x: "Magas", y: 9.0 },
                { x: "Magas", y: 9.3 },
                { x: "Magas", y: 9.6 },
                { x: "Magas", y: 9.9 },
                { x: "Magas", y: 10.2 },
                { x: "Magas", y: 10.4 },
                { x: "Magas", y: 10.7 },
                { x: "Magas", y: 10.9 },
                { x: "Magas", y: 11.2 },
                { x: "Magas", y: 11.4 },
                { x: "Magas", y: 11.6 },
                { x: "Magas", y: 11.9 },
                { x: "Magas", y: 12.1 },
                { x: "Magas", y: 12.4 },
                { x: "Magas", y: 12.6 },
                { x: "Magas", y: 12.8 },
                { x: "Magas", y: 13.1 }
              ],
              color: "#F89B47"
            },
            {
              seriesName: "Ideal",
              data: [
                { x: "Ideális", y: 3.2 },
                { x: "Ideális", y: 4.2 },
                { x: "Ideális", y: 5.1 },
                { x: "Ideális", y: 5.8 },
                { x: "Ideális", y: 6.4 },
                { x: "Ideális", y: 6.9 },
                { x: "Ideális", y: 7.3 },
                { x: "Ideális", y: 7.6 },
                { x: "Ideális", y: 7.9 },
                { x: "Ideális", y: 8.2 },
                { x: "Ideális", y: 8.5 },
                { x: "Ideális", y: 8.7 },
                { x: "Ideális", y: 8.9 },
                { x: "Ideális", y: 9.2 },
                { x: "Ideális", y: 9.4 },
                { x: "Ideális", y: 9.6 },
                { x: "Ideális", y: 9.8 },
                { x: "Ideális", y: 10.0 },
                { x: "Ideális", y: 10.2 },
                { x: "Ideális", y: 10.4 },
                { x: "Ideális", y: 10.6 },
                { x: "Ideális", y: 10.9 },
                { x: "Ideális", y: 11.1 },
                { x: "Ideális", y: 11.3 },
                { x: "Ideális", y: 11.5 }
              ],
              color: "#8EBC43"
            },
            {
              seriesName: "idealMin",
              data: [
                { x: "Alacsony", y: 2.8 },
                { x: "Alacsony", y: 3.6 },
                { x: "Alacsony", y: 4.5 },
                { x: "Alacsony", y: 5.1 },
                { x: "Alacsony", y: 5.6 },
                { x: "Alacsony", y: 6.1 },
                { x: "Alacsony", y: 6.4 },
                { x: "Alacsony", y: 6.7 },
                { x: "Alacsony", y: 7.0 },
                { x: "Alacsony", y: 7.3 },
                { x: "Alacsony", y: 7.5 },
                { x: "Alacsony", y: 7.7 },
                { x: "Alacsony", y: 7.9 },
                { x: "Alacsony", y: 8.1 },
                { x: "Alacsony", y: 8.3 },
                { x: "Alacsony", y: 8.5 },
                { x: "Alacsony", y: 8.7 },
                { x: "Alacsony", y: 8.8 },
                { x: "Alacsony", y: 9.0 },
                { x: "Alacsony", y: 9.2 },
                { x: "Alacsony", y: 9.4 },
                { x: "Alacsony", y: 9.6 },
                { x: "Alacsony", y: 9.8 },
                { x: "Alacsony", y: 9.9 },
                { x: "Alacsony", y: 10.1 }
              ],
              color: "#F89B47"
            },
            {
              seriesName: "min",
              data: [
                { x: "Minimum", y: 2.4 },
                { x: "Minimum", y: 3.2 },
                { x: "Minimum", y: 4.0 },
                { x: "Minimum", y: 4.6 },
                { x: "Minimum", y: 5.1 },
                { x: "Minimum", y: 5.5 },
                { x: "Minimum", y: 5.8 },
                { x: "Minimum", y: 6.1 },
                { x: "Minimum", y: 6.3 },
                { x: "Minimum", y: 6.6 },
                { x: "Minimum", y: 6.8 },
                { x: "Minimum", y: 7.0 },
                { x: "Minimum", y: 7.1 },
                { x: "Minimum", y: 7.3 },
                { x: "Minimum", y: 7.5 },
                { x: "Minimum", y: 7.7 },
                { x: "Minimum", y: 7.8 },
                { x: "Minimum", y: 8.0 },
                { x: "Minimum", y: 8.2 },
                { x: "Minimum", y: 8.3 },
                { x: "Minimum", y: 8.5 },
                { x: "Minimum", y: 8.7 },
                { x: "Minimum", y: 8.8 },
                { x: "Minimum", y: 9.0 },
                { x: "Minimum", y: 9.2 }
              ],
              color: "#EC6F6A"
            },
            {
              seriesName: "állás",
              data: [
                { x: "_", y: 3.3 },
                { x: "_", y: 0 },
                { x: "_", y: 0 },
                { x: "_", y: 0 },
                { x: "_", y: 0 },
                { x: "_", y: 0 },
                { x: "_", y: 0 },
                { x: "_", y: 0 },
                { x: "_", y: 0 },
                { x: "_", y: 0 },
                { x: "_", y: 0 },
                { x: "_", y: 0 },
                { x: "_", y: 0 },
                { x: "_", y: 0 },
                { x: "_", y: 0 },
                { x: "_", y: 0 },
                { x: "_", y: 0 },
                { x: "_", y: 0 },
                { x: "_", y: 0 },
                { x: "_", y: 0 },
                { x: "_", y: 0 },
                { x: "_", y: 0 },
                { x: "_", y: 0 },
                { x: "_", y: 0 },
                { x: "_", y: 0 }
              ],
              color: "black"
            }
          ],
          bHeight: [
            {
              seriesName: "max",
              data: [
                { x: "Maximum", y: 4.3 },
                { x: "Maximum", y: 5.7 },
                { x: "Maximum", y: 7.0 },
                { x: "Maximum", y: 7.9 },
                { x: "Maximum", y: 8.6 },
                { x: "Maximum", y: 9.2 },
                { x: "Maximum", y: 9.7 },
                { x: "Maximum", y: 10.2 },
                { x: "Maximum", y: 10.5 },
                { x: "Maximum", y: 10.9 },
                { x: "Maximum", y: 11.2 },
                { x: "Maximum", y: 11.5 },
                { x: "Maximum", y: 11.8 },
                { x: "Maximum", y: 12.1 },
                { x: "Maximum", y: 12.4 },
                { x: "Maximum", y: 12.7 },
                { x: "Maximum", y: 12.9 },
                { x: "Maximum", y: 13.2 },
                { x: "Maximum", y: 13.5 },
                { x: "Maximum", y: 13.7 },
                { x: "Maximum", y: 14.0 },
                { x: "Maximum", y: 14.3 },
                { x: "Maximum", y: 14.5 },
                { x: "Maximum", y: 14.8 },
                { x: "Maximum", y: 15.1 }
              ],
              color: "#EC6F6A"
            },
            {
              seriesName: "idealMax",
              data: [
                { x: "Magas", y: 3.9 },
                { x: "Magas", y: 5.1 },
                { x: "Magas", y: 6.3 },
                { x: "Magas", y: 7.2 },
                { x: "Magas", y: 7.9 },
                { x: "Magas", y: 8.4 },
                { x: "Magas", y: 8.9 },
                { x: "Magas", y: 9.3 },
                { x: "Magas", y: 9.6 },
                { x: "Magas", y: 10.0 },
                { x: "Magas", y: 10.3 },
                { x: "Magas", y: 10.5 },
                { x: "Magas", y: 10.8 },
                { x: "Magas", y: 11.1 },
                { x: "Magas", y: 11.3 },
                { x: "Magas", y: 11.6 },
                { x: "Magas", y: 11.8 },
                { x: "Magas", y: 12.0 },
                { x: "Magas", y: 12.3 },
                { x: "Magas", y: 12.5 },
                { x: "Magas", y: 12.7 },
                { x: "Magas", y: 13.0 },
                { x: "Magas", y: 13.2 },
                { x: "Magas", y: 13.4 },
                { x: "Magas", y: 13.7 }
              ],
              color: "#F89B47"
            },
            {
              seriesName: "Ideal",
              data: [
                { x: "Ideális", y: 3.3 },
                { x: "Ideális", y: 4.5 },
                { x: "Ideális", y: 5.6 },
                { x: "Ideális", y: 6.4 },
                { x: "Ideális", y: 7.0 },
                { x: "Ideális", y: 7.5 },
                { x: "Ideális", y: 7.9 },
                { x: "Ideális", y: 8.3 },
                { x: "Ideális", y: 8.6 },
                { x: "Ideális", y: 8.9 },
                { x: "Ideális", y: 9.2 },
                { x: "Ideális", y: 9.4 },
                { x: "Ideális", y: 9.6 },
                { x: "Ideális", y: 9.9 },
                { x: "Ideális", y: 10.1 },
                { x: "Ideális", y: 10.3 },
                { x: "Ideális", y: 10.5 },
                { x: "Ideális", y: 10.7 },
                { x: "Ideális", y: 10.9 },
                { x: "Ideális", y: 11.1 },
                { x: "Ideális", y: 11.3 },
                { x: "Ideális", y: 11.5 },
                { x: "Ideális", y: 11.8 },
                { x: "Ideális", y: 12.0 },
                { x: "Ideális", y: 12.2 }
              ],
              color: "#8EBC43"
            },
            {
              seriesName: "idealMin",
              data: [
                { x: "Alacsony", y: 2.9 },
                { x: "Alacsony", y: 3.9 },
                { x: "Alacsony", y: 4.9 },
                { x: "Alacsony", y: 5.6 },
                { x: "Alacsony", y: 6.2 },
                { x: "Alacsony", y: 6.7 },
                { x: "Alacsony", y: 7.1 },
                { x: "Alacsony", y: 7.4 },
                { x: "Alacsony", y: 7.7 },
                { x: "Alacsony", y: 7.9 },
                { x: "Alacsony", y: 8.2 },
                { x: "Alacsony", y: 8.4 },
                { x: "Alacsony", y: 8.6 },
                { x: "Alacsony", y: 8.8 },
                { x: "Alacsony", y: 9.0 },
                { x: "Alacsony", y: 9.2 },
                { x: "Alacsony", y: 9.4 },
                { x: "Alacsony", y: 9.6 },
                { x: "Alacsony", y: 9.7 },
                { x: "Alacsony", y: 9.9 },
                { x: "Alacsony", y: 10.1 },
                { x: "Alacsony", y: 10.3 },
                { x: "Alacsony", y: 10.5 },
                { x: "Alacsony", y: 10.6 },
                { x: "Alacsony", y: 10.8 }
              ],
              color: "#F89B47"
            },
            {
              seriesName: "min",
              data: [
                { x: "Minimum", y: 2.5 },
                { x: "Minimum", y: 3.4 },
                { x: "Minimum", y: 4.4 },
                { x: "Minimum", y: 5.1 },
                { x: "Minimum", y: 5.6 },
                { x: "Minimum", y: 6.1 },
                { x: "Minimum", y: 6.4 },
                { x: "Minimum", y: 6.7 },
                { x: "Minimum", y: 7.0 },
                { x: "Minimum", y: 7.2 },
                { x: "Minimum", y: 7.5 },
                { x: "Minimum", y: 7.7 },
                { x: "Minimum", y: 7.8 },
                { x: "Minimum", y: 8.0 },
                { x: "Minimum", y: 8.2 },
                { x: "Minimum", y: 8.4 },
                { x: "Minimum", y: 8.5 },
                { x: "Minimum", y: 8.7 },
                { x: "Minimum", y: 8.9 },
                { x: "Minimum", y: 9.0 },
                { x: "Minimum", y: 9.2 },
                { x: "Minimum", y: 9.3 },
                { x: "Minimum", y: 9.5 },
                { x: "Minimum", y: 9.7 },
                { x: "Minimum", y: 9.8 }
              ],
              color: "#EC6F6A"
            },
            {
              seriesName: "állás",
              data: [
                { x: "_", y: 3.3 },
                { x: "_", y: 0 },
                { x: "_", y: 0 },
                { x: "_", y: 0 },
                { x: "_", y: 0 },
                { x: "_", y: 0 },
                { x: "_", y: 0 },
                { x: "_", y: 0 },
                { x: "_", y: 0 },
                { x: "_", y: 0 },
                { x: "_", y: 0 },
                { x: "_", y: 0 },
                { x: "_", y: 0 },
                { x: "_", y: 0 },
                { x: "_", y: 0 },
                { x: "_", y: 0 },
                { x: "_", y: 0 },
                { x: "_", y: 0 },
                { x: "_", y: 0 },
                { x: "_", y: 0 },
                { x: "_", y: 0 },
                { x: "_", y: 0 },
                { x: "_", y: 0 },
                { x: "_", y: 0 },
                { x: "_", y: 0 }
              ],
              color: "black"
            }
          ],

          bLength: [
            {
              seriesName: "max",
              data: [
                { x: "Maximum", y: 53.4 },
                { x: "Maximum", y: 58.4 },
                { x: "Maximum", y: 62.2 },
                { x: "Maximum", y: 65.3 },
                { x: "Maximum", y: 67.8 },
                { x: "Maximum", y: 69.9 },
                { x: "Maximum", y: 71.6 },
                { x: "Maximum", y: 73.2 },
                { x: "Maximum", y: 74.7 },
                { x: "Maximum", y: 76.2 },
                { x: "Maximum", y: 77.6 },
                { x: "Maximum", y: 78.9 },
                { x: "Maximum", y: 80.2 },
                { x: "Maximum", y: 81.5 },
                { x: "Maximum", y: 82.7 },
                { x: "Maximum", y: 83.9 },
                { x: "Maximum", y: 85.1 },
                { x: "Maximum", y: 86.2 },
                { x: "Maximum", y: 87.3 },
                { x: "Maximum", y: 88.4 },
                { x: "Maximum", y: 89.5 },
                { x: "Maximum", y: 90.5 },
                { x: "Maximum", y: 91.6 },
                { x: "Maximum", y: 92.6 },
                { x: "Maximum", y: 93.6 }
              ],
              color: "#EC6F6A"
            },
            {
              seriesName: "idealMax",
              data: [
                { x: "Magas", y: 51.8 },
                { x: "Magas", y: 56.7 },
                { x: "Magas", y: 60.5 },
                { x: "Magas", y: 63.5 },
                { x: "Magas", y: 66.0 },
                { x: "Magas", y: 68.1 },
                { x: "Magas", y: 69.8 },
                { x: "Magas", y: 71.4 },
                { x: "Magas", y: 72.9 },
                { x: "Magas", y: 74.3 },
                { x: "Magas", y: 75.6 },
                { x: "Magas", y: 77.0 },
                { x: "Magas", y: 78.2 },
                { x: "Magas", y: 79.4 },
                { x: "Magas", y: 80.6 },
                { x: "Magas", y: 81.8 },
                { x: "Magas", y: 82.9 },
                { x: "Magas", y: 84.0 },
                { x: "Magas", y: 85.1 },
                { x: "Magas", y: 86.1 },
                { x: "Magas", y: 87.1 },
                { x: "Magas", y: 88.1 },
                { x: "Magas", y: 89.1 },
                { x: "Magas", y: 90.0 },
                { x: "Magas", y: 91.0 }
              ],
              color: "#F89B47"
            },
            {
              seriesName: "Ideal",
              data: [
                { x: "Ideális", y: 49.9 },
                { x: "Ideális", y: 54.7 },
                { x: "Ideális", y: 58.4 },
                { x: "Ideális", y: 61.4 },
                { x: "Ideális", y: 63.9 },
                { x: "Ideális", y: 65.9 },
                { x: "Ideális", y: 67.6 },
                { x: "Ideális", y: 69.2 },
                { x: "Ideális", y: 70.6 },
                { x: "Ideális", y: 72.0 },
                { x: "Ideális", y: 73.3 },
                { x: "Ideális", y: 74.5 },
                { x: "Ideális", y: 75.7 },
                { x: "Ideális", y: 76.9 },
                { x: "Ideális", y: 78.0 },
                { x: "Ideális", y: 79.1 },
                { x: "Ideális", y: 80.2 },
                { x: "Ideális", y: 81.2 },
                { x: "Ideális", y: 82.3 },
                { x: "Ideális", y: 83.2 },
                { x: "Ideális", y: 84.2 },
                { x: "Ideális", y: 85.1 },
                { x: "Ideális", y: 86.0 },
                { x: "Ideális", y: 86.9 },
                { x: "Ideális", y: 87.8 }
              ],
              color: "#8EBC43"
            },
            {
              seriesName: "idealMin",
              data: [
                { x: "Alacsony", y: 47.9 },
                { x: "Alacsony", y: 52.7 },
                { x: "Alacsony", y: 56.4 },
                { x: "Alacsony", y: 59.3 },
                { x: "Alacsony", y: 61.7 },
                { x: "Alacsony", y: 63.7 },
                { x: "Alacsony", y: 65.4 },
                { x: "Alacsony", y: 66.9 },
                { x: "Alacsony", y: 68.3 },
                { x: "Alacsony", y: 69.6 },
                { x: "Alacsony", y: 70.9 },
                { x: "Alacsony", y: 72.1 },
                { x: "Alacsony", y: 73.3 },
                { x: "Alacsony", y: 74.4 },
                { x: "Alacsony", y: 75.5 },
                { x: "Alacsony", y: 76.5 },
                { x: "Alacsony", y: 77.5 },
                { x: "Alacsony", y: 78.5 },
                { x: "Alacsony", y: 79.5 },
                { x: "Alacsony", y: 80.4 },
                { x: "Alacsony", y: 81.3 },
                { x: "Alacsony", y: 82.2 },
                { x: "Alacsony", y: 83.0 },
                { x: "Alacsony", y: 83.8 },
                { x: "Alacsony", y: 84.6 }
              ],
              color: "#F89B47"
            },
            {
              seriesName: "min",
              data: [
                { x: "Minimum", y: 46.3 },
                { x: "Minimum", y: 51.1 },
                { x: "Minimum", y: 54.7 },
                { x: "Minimum", y: 57.6 },
                { x: "Minimum", y: 60.0 },
                { x: "Minimum", y: 61.9 },
                { x: "Minimum", y: 63.6 },
                { x: "Minimum", y: 65.1 },
                { x: "Minimum", y: 66.5 },
                { x: "Minimum", y: 67.7 },
                { x: "Minimum", y: 69.0 },
                { x: "Minimum", y: 70.2 },
                { x: "Minimum", y: 71.3 },
                { x: "Minimum", y: 72.4 },
                { x: "Minimum", y: 73.4 },
                { x: "Minimum", y: 74.4 },
                { x: "Minimum", y: 75.4 },
                { x: "Minimum", y: 76.3 },
                { x: "Minimum", y: 77.2 },
                { x: "Minimum", y: 78.1 },
                { x: "Minimum", y: 78.9 },
                { x: "Minimum", y: 79.7 },
                { x: "Minimum", y: 80.5 },
                { x: "Minimum", y: 81.3 },
                { x: "Minimum", y: 82.1 }
              ],
              color: "#EC6F6A"
            },
            {
              seriesName: "állás",
              data: [
                { x: "_", y: 50 },
                { x: "_", y: 0 },
                { x: "_", y: 0 },
                { x: "_", y: 0 },
                { x: "_", y: 0 },
                { x: "_", y: 0 },
                { x: "_", y: 0 },
                { x: "_", y: 0 },
                { x: "_", y: 0 },
                { x: "_", y: 0 },
                { x: "_", y: 0 },
                { x: "_", y: 0 },
                { x: "_", y: 0 },
                { x: "_", y: 0 },
                { x: "_", y: 0 },
                { x: "_", y: 0 },
                { x: "_", y: 0 },
                { x: "_", y: 0 },
                { x: "_", y: 0 },
                { x: "_", y: 0 },
                { x: "_", y: 0 },
                { x: "_", y: 0 },
                { x: "_", y: 0 },
                { x: "_", y: 0 },
                { x: "_", y: 0 }
              ],
              color: "black"
            }
          ]
        };
      }

      console.log(data);
      Actions.pop({
        //type: ActionConst.POP_TO,
        // Frissiti a bekért adatokat
      });
      Actions.refresh({ addedData: data });
    }
  }

  /* async _updateList() {
  const response = await AsyncStorage.getItem('@profil:adatok');
  const listofData = await JSON.parse(response) || [];
  this.setState({
    magassag: listofData.magassag,
    nem: listofData.nem,
    suly: listofData.suly,
    nev: listofData.nev,
    date: listofData.date,
  });
  console.log(this.state.nev);
}*/
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  componentWillMount() {
    var timeStampInMs =
      window.performance &&
      window.performance.now &&
      window.performance.timing &&
      window.performance.timing.navigationStart
        ? window.performance.now() + window.performance.timing.navigationStart
        : Date.now();
    console.log(timeStampInMs, Date.now());
    this.setState({ creationDate: Date.now() });
  }

  onChanged(text) {
    let newText = "";
    let numbers = "0123456789";

    for (var i = 0; i < text.length; i++) {
      if (numbers.indexOf(text[i]) > -1) {
        newText = newText + text[i];
      } else {
        // your call back function
        alert("Kérlek számot írj be!");
      }
    }
    this.setState({ date: text });
  }
  onChanged2(text) {
    let newText = "";
    let numbers = "0123456789.";

    for (var i = 0; i < text.length; i++) {
      if (numbers.indexOf(text[i]) > -1) {
        newText = newText + text[i];
      } else {
        // your call back function
        alert(
          "Kérlek számot írj be! Ha tört számot szeretnél beírni a vessző(,) helyett pontot(.) írj be!"
        );
      }
    }
    this.setState({ suly: text });
  }
  onChanged3(text) {
    let newText = "";
    let numbers = "0123456789";

    for (var i = 0; i < text.length; i++) {
      if (numbers.indexOf(text[i]) > -1) {
        newText = newText + text[i];
      } else {
        // your call back function
        alert("Kérlek számot írj be!");
      }
    }
    this.setState({ magassag: text });
  }

  validate() {
    var errors = [];
    if (this.state.nev == "") {
      errors.push("Kérlek add meg a baba nevét!");
    }
    if (this.state.suly == "") {
      errors.push("Kérlek add meg a baba súlyát!");
    }
    if (this.state.date == "") {
      errors.push("Kérlek add meg a baba korát!");
    }
    if (this.state.magassag == "") {
      errors.push("Kérlek add meg a baba magasságát!");
    }
    if (errors.length == 0) {
      this.goBack();
    } else {
      console.log(errors);
      alert(errors);
    }
  }
  render() {
    var { height, width } = Dimensions.get("window");
    return (
      <View style={styles.container}>
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
          <TouchableOpacity onPress={() => this.validate()}>
            <View>
              <Image
                source={require("../src/nyil_feher.png")}
                style={{
                  width: 31 / 3,
                  height: 58 / 3,
                  zIndex: 2312321312,
                  left: 10
                }}
              />
            </View>
          </TouchableOpacity>
          <View>
            <Text style={styles.HOME}>{"Profil szerkesztése"}</Text>
          </View>
          <View
            style={{ width: 31 / 3, height: 58 / 3, zIndex: 100, left: 10 }}
          />
        </View>
        <KeyboardAwareScrollView
          style={styles.scrollView}
          resetScrollToCoords={{ x: 0, y: 0 }}
          contentContainerStyle={styles.destination}
          scrollEnabled={true}
        >
          <View style={{ paddingLeft: 30, paddingRight: 30, marginTop: 30 }}>
            <View>
              <Text style={{ fontSize: 12, color: "gray" }}>{"BABA NEVE"}</Text>
            </View>
            <View>
              <TextInput
                style={{ height: 50 }}
                placeholder="BABA NEVE"
                value={this.state.nev}
                onChangeText={text => this.setState({ nev: text })}
              />
            </View>
          </View>
          <View style={{ alignItems: "center" }}>
            <View
              style={{
                width: width - 60,
                height: 1,
                margin: "auto",
                backgroundColor: "gray"
              }}
            />
          </View>

          <View style={{ paddingLeft: 30, paddingRight: 30, marginTop: 10 }}>
            <View>
              <Text style={{ fontSize: 12, color: "gray" }}>{"SÚLY (KG)"}</Text>
            </View>
            <View>
              <TextInput
                style={{ height: 50 }}
                //keyboardType='numeric'
                placeholder="KG"
                maxLength={4}
                value={this.state.suly}
                onChangeText={text => this.onChanged2(text)}
              />
            </View>
          </View>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <View
              style={{
                width: width - 60,
                height: 1,
                margin: "auto",
                backgroundColor: "gray"
              }}
            />
          </View>

          <View style={{ paddingLeft: 30, paddingRight: 30, marginTop: 10 }}>
            <View>
              <Text style={{ fontSize: 12, color: "gray" }}>{"NEM"}</Text>
            </View>
            <View>
              <Picker
                style={{ height: 70 }}
                itemStyle={{ height: 70 }}
                selectedValue={this.state.nem}
                value={this.state.nem}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({ nem: itemValue })
                }
              >
                <Picker.Item label="FIÚ" value="fiu" />
                <Picker.Item label="LÁNY" value="lany" />
              </Picker>
            </View>
          </View>

          <View style={{ paddingLeft: 30, paddingRight: 30, marginTop: 10 }}>
            <View>
              <Text style={{ fontSize: 12, color: "gray" }}>
                {"MENNYI IDŐS? (HÓNAP)"}
              </Text>
            </View>
            <View>
              <TextInput
                style={{ height: 50 }}
                placeholder="HÓNAP"
                //keyboardType='numeric'
                maxLength={2}
                value={this.state.date}
                onChangeText={text => this.onChanged(text)}
              />
            </View>
          </View>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <View
              style={{
                width: width - 60,
                height: 1,
                margin: "auto",
                backgroundColor: "gray"
              }}
            />
          </View>

          <View style={{ paddingLeft: 30, paddingRight: 30, marginTop: 10 }}>
            <View>
              <Text style={{ fontSize: 12, color: "gray" }}>
                {"MAGASSÁG (CM)"}
              </Text>
            </View>
            <View>
              <TextInput
                style={{ height: 50 }}
                placeholder="CM"
                //keyboardType='numeric'
                maxLength={3}
                value={this.state.magassag}
                onChangeText={text => this.onChanged3(text)}
              />
            </View>
          </View>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <View
              style={{
                width: width - 60,
                height: 1,
                margin: "auto",
                backgroundColor: "gray"
              }}
            />
          </View>
        </KeyboardAwareScrollView>

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
