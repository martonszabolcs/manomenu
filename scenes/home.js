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
  Alert,
  Modal,
  Switch,
  TouchableOpacity,
  Linking,
  WebView,
  ListView,
  AppState,
  AsyncStorage,
  BackHandler,
  Button
} from "react-native";

//import Firsttime from './firsttime';


import api from "../utilities/api";
import { Actions } from "react-native-router-flux";

import Moment from "moment";
const Unix = require("../utilities/unix");

const instructions = Platform.select({});

export default class Home extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      receptek: [],
      des: [],
      dataSource: [],
      Id: null,
      tesztak: "",
      cacheSize: "",
      unit: "",
      token: "",
      title:"",
      body:"",
    appState: AppState.currentState,
    };

    Actions.reset("home");


    this.dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1.guid != r2.guid
    });
    this.savePercentilis();
    this.savePercentilis2();
  }

  async savePercentilis(){
    var data = {gLength: [
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
            { x: "_", y: 0 },
            { x: "_", y: 0 }
          ],
          color: "black"
        }
      ]};

      var percadatok = [
        {date:"__", honap: 0, magassag:"__", suly: "__"},
        {date:"__", honap: 1, magassag:"__", suly: "__"},
        {date:"__", honap: 2, magassag:"__", suly: "__"},
        {date:"__", honap: 3, magassag:"__", suly: "__"},
        {date:"__", honap: 4, magassag:"__", suly: "__"},
        {date:"__", honap: 5, magassag:"__", suly: "__"},
        {date:"__", honap: 6, magassag:"__", suly: "__"},
        {date:"__", honap: 7, magassag:"__", suly: "__"},
        {date:"__", honap: 8, magassag:"__", suly: "__"},
        {date:"__", honap: 9, magassag:"__", suly: "__"},
        {date:"__", honap: 10, magassag:"__", suly: "__"},
        {date:"__", honap: 11, magassag:"__", suly: "__"},
        {date:"__", honap: 12, magassag:"__", suly: "__"},
        {date:"__", honap: 13, magassag:"__", suly: "__"},
        {date:"__", honap: 14, magassag:"__", suly: "__"},
        {date:"__", honap: 15, magassag:"__", suly: "__"},
        {date:"__", honap: 16, magassag:"__", suly: "__"},
        {date:"__", honap: 17, magassag:"__", suly: "__"},
        {date:"__", honap: 18, magassag:"__", suly: "__"},
        {date:"__", honap: 19, magassag:"__", suly: "__"},
        {date:"__", honap: 20, magassag:"__", suly: "__"},
        {date:"__", honap: 21, magassag:"__", suly: "__"},
        {date:"__", honap: 22, magassag:"__", suly: "__"},
        {date:"__", honap: 23, magassag:"__", suly: "__"},
        {date:"__", honap: 24, magassag:"__", suly: "__"},
      ];
     AsyncStorage.getItem('percentilismindenadat', (err, result) => {
            if (err) {

            } else {
                if (result == null) {
                AsyncStorage.setItem('percentilismindenadat', JSON.stringify(data));
                AsyncStorage.setItem('@menu:percAdatok', JSON.stringify(percadatok));
                    
                }
            }
        });
  }

  async savePercentilis2(){
    var data = {gLength: [
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
            { x: "_", y: 0 },
            { x: "_", y: 0 }
          ],
          color: "black"
        }
      ]};

      var percadatok = [
        {date:"__", honap: 0, magassag:"__", suly: "__"},
        {date:"__", honap: 1, magassag:"__", suly: "__"},
        {date:"__", honap: 2, magassag:"__", suly: "__"},
        {date:"__", honap: 3, magassag:"__", suly: "__"},
        {date:"__", honap: 4, magassag:"__", suly: "__"},
        {date:"__", honap: 5, magassag:"__", suly: "__"},
        {date:"__", honap: 6, magassag:"__", suly: "__"},
        {date:"__", honap: 7, magassag:"__", suly: "__"},
        {date:"__", honap: 8, magassag:"__", suly: "__"},
        {date:"__", honap: 9, magassag:"__", suly: "__"},
        {date:"__", honap: 10, magassag:"__", suly: "__"},
        {date:"__", honap: 11, magassag:"__", suly: "__"},
        {date:"__", honap: 12, magassag:"__", suly: "__"},
        {date:"__", honap: 13, magassag:"__", suly: "__"},
        {date:"__", honap: 14, magassag:"__", suly: "__"},
        {date:"__", honap: 15, magassag:"__", suly: "__"},
        {date:"__", honap: 16, magassag:"__", suly: "__"},
        {date:"__", honap: 17, magassag:"__", suly: "__"},
        {date:"__", honap: 18, magassag:"__", suly: "__"},
        {date:"__", honap: 19, magassag:"__", suly: "__"},
        {date:"__", honap: 20, magassag:"__", suly: "__"},
        {date:"__", honap: 21, magassag:"__", suly: "__"},
        {date:"__", honap: 22, magassag:"__", suly: "__"},
        {date:"__", honap: 23, magassag:"__", suly: "__"},
        {date:"__", honap: 24, magassag:"__", suly: "__"},
      ];
     AsyncStorage.getItem('percentilismindenadat2', (err, result) => {
            if (err) {

            } else {
                if (result == null) {
                AsyncStorage.setItem('percentilismindenadat2', JSON.stringify(data));
                AsyncStorage.setItem('@menu:percAdatok2', JSON.stringify(percadatok));
                    
                }
            }
        });
  }

  async tokenupdate() {
    var data = {
      email: this.state.emailAddress,
      password: this.state.passWord
    };
    try {
      let response = await fetch("http://yourdomain.com", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
      if (response.status >= 200 && response.status < 300) {
        alert("authenticated successfully!!!");
      }
    } catch (errors) {
      alert(errors);
    }
  }

  componentDidUpdate(){
    console.log("upd")
  }

  componentDidMount() {
        AppState.addEventListener('change', this._handleAppStateChange);

    this.lekeres();
      
    Linking.getInitialURL()
      .then(url => {
        if (url) {
        }
      })
      .catch(err => console.error("An error occurred", err));
  }

  async lekeres() {
    api.receptek_custom().then(receptek => {
      console.log(receptek);
      this.setState({
        receptek: receptek.list.reverse(),
        receptekPic1: receptek.list[0].imageUrl,
        receptekPic2: receptek.list[1].imageUrl,
        receptekPic3: receptek.list[2].imageUrl,
        receptekTitle1: receptek.list[0].title,
        receptekTitle2: receptek.list[1].title,
        receptekTitle3: receptek.list[2].title,
        receptekid1: receptek.list[0].id,
        receptekid2: receptek.list[1].id,
        receptekid3: receptek.list[2].id
      });
    });
    api.hirek_custom().then(hirek => {
      console.log(hirek);
      this.setState({
        hirek: hirek.list.reverse(),
        hirekPic1: hirek.list[0].imageUrl,
        hirekPic2: hirek.list[1].imageUrl,
        hirekPic3: hirek.list[2].imageUrl,
        hirekTitle1: hirek.list[0].title,
        hirekTitle2: hirek.list[1].title,
        hirekTitle3: hirek.list[2].title,
        hirekid1: hirek.list[0].id,
        hirekid2: hirek.list[1].id,
        hirekid3: hirek.list[2].id
      });
    });
    return fetch("http://46.101.62.53/Apps/rest/content/10/list?category=64", {
      headers: {
        accept: "application/json",
        AppId: "3"
      }
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);

        this.setState({
          eventPic1: res.list[0].imageUrl,
          eventTitle1: res.list[0].title,
          eventcreationDate1: res.list[0].date,
          eventplace1: res.list[0].address,
          eventid1: res.list[0].id
        });
      });
  }

  componentWillMount() {
    api.token();     
    BackHandler.addEventListener("hardwareBackPress", this.backPressed);
  }
  componentWillUnMount() {

  AppState.removeEventListener('change', this._handleAppStateChange);
  
}
 _handleAppStateChange = (nextAppState) => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
        console.log('újra itt')
      this.loadAlert();
      this.loadAlert2();
      setTimeout(() => {
      console.log(this.state)

      if (this.state.title != "" && this.state.body != ""){
        Alert.alert(this.state.title, this.state.body)
        this.setState({body:"", title:""})
    }
    },4000)
    }
    this.setState({appState: nextAppState});
  };

  async loadAlert() {
    try {
      var value = await AsyncStorage.getItem("title");
      console.log(value)
      this.setState({
        title: value
      });
    } catch (error) {
      // Can't access data
    }
    }
  async loadAlert2() {

  try {
      var value = await AsyncStorage.getItem("body");
      console.log(value)
      this.setState({
        body: value
      });
    } catch (error) {
      // Can't access data
    }
}

  

  async tokenSave(responseData) {
    try {
      await AsyncStorage.setItem("@token:data", responseData.message);
      console.log(responseData.message);
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    var { height, width } = Dimensions.get("window");

    var facebook = "https://www.facebook.com/manomenu2016/";
    var facebookGroup = "https://www.facebook.com/groups/752237094919260/";
    var youtube = "https://www.youtube.com/channel/UC8EkPnfTiH8HNzEUaiUjNqw";
    var insta = "https://www.instagram.com/manomenu_/";
    var url= "https://shop.manomenu.hu/hu/"

    const switchTwoValue = this.state.switchTwoValue;
    return (
      <View style={styles.container}>
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
          <Text style={styles.HOME}>{"MANÓ MENÜ"}</Text>
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
        <ScrollView removeClippedSubviews={true}>
          <View
            style={{
              backgroundColor: "white",
              marginBottom: 30,
              marginTop: 30
            }}
          >
            <Text style={styles.nameText}>{"HÍREK"}</Text>
            <View
              style={{ flexDirection: "row", justifyContent: "space-around" }}
            >
              <TouchableOpacity
                onPress={() => {
                  Actions.cikkekHTML({ tesztak: this.state.hirekid1 });
                }}
              >
                <View
                  style={{
                    backgroundColor: "#dff7f5",
                    width: width / 2.1,
                    height: height / 4,
                    borderRadius: 10
                  }}
                >
                  <Image
                    source={{ uri: this.state.hirekPic1 }}
                    style={{
                      width: width / 2.1,
                      height: height / 6,
                      zIndex: 100,
                      borderTopLeftRadius: 10,
                      borderTopRightRadius: 10
                    }}
                  />
                  <Text
                    numberOfLines={2}
                    style={[styles.cim, { color: "#17776f" }]}
                  >
                    {this.state.hirekTitle1}
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  Actions.cikkekHTML({ tesztak: this.state.hirekid2 });
                }}
              >
                <View
                  style={{
                    backgroundColor: "#dff7f5",
                    width: width / 2.1,
                    height: height / 4,
                    borderRadius: 10
                  }}
                >
                  <Image
                    source={{ uri: this.state.hirekPic2 }}
                    style={{
                      width: width / 2.1,
                      height: height / 6,
                      zIndex: 100,
                      borderTopLeftRadius: 10,
                      borderTopRightRadius: 10
                    }}
                  />
                  <Text
                    numberOfLines={2}
                    style={[styles.cim, { color: "#17776f" }]}
                  >
                    {this.state.hirekTitle2}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                marginTop: 10
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  Actions.cikkekHTML({ tesztak: this.state.hirekid3 });
                }}
              >
                <View
                  style={{
                    backgroundColor: "#dff7f5",
                    width: width / 2.1,
                    height: height / 4,
                    borderRadius: 10
                  }}
                >
                  <Image
                    source={{ uri: this.state.hirekPic3 }}
                    style={{
                      width: width / 2.1,
                      height: height / 6,
                      zIndex: 100,
                      borderTopLeftRadius: 10,
                      borderTopRightRadius: 10
                    }}
                  />
                  <Text
                    numberOfLines={2}
                    style={[styles.cim, { color: "#17776f" }]}
                  >
                    {this.state.hirekTitle3}
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => Actions.hozzataplalas()}>
                <View
                  style={{
                    backgroundColor: "#00b8ac",
                    width: width / 2.1,
                    height: height / 4,
                    borderRadius: 10,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Text
                    style={{
                      fontSize: 36,
                      textAlign: "center",
                      color: "white",
                      fontFamily: "AmaticSC-Bold"
                    }}
                  >
                    {"TÖBB HÍR"}
                  </Text>
                  <View style={{ flexDirection: "row", marginTop: 10 }}>
                    <Image
                      source={require("../src/nyil_feher2.png")}
                      style={{
                        width: 31 / 2,
                        height: 58 / 2,
                        zIndex: 100,
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10
                      }}
                    />
                    <Image
                      source={require("../src/nyil_feher2.png")}
                      style={{
                        width: 31 / 2,
                        height: 58 / 2,
                        zIndex: 100,
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10
                      }}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ backgroundColor: "white", margin: 0 }}>
            <Text style={styles.nameText}>{"RECEPTEK"}</Text>
            <View
              style={{ flexDirection: "row", justifyContent: "space-around" }}
            >
              <TouchableOpacity
                onPress={() => {
                  Actions.receptekHTML({ tesztak: this.state.receptekid1 });
                }}
              >
                <View
                  style={{
                    backgroundColor: "#f6eec2",
                    width: width / 2.1,
                    height: height / 4,
                    borderRadius: 10
                  }}
                >
                  <Image
                    source={{ uri: this.state.receptekPic1 }}
                    style={{
                      width: width / 2.1,
                      height: height / 6,
                      zIndex: 100,
                      borderTopLeftRadius: 10,
                      borderTopRightRadius: 10
                    }}
                  />
                  <Text
                    numberOfLines={2}
                    style={[styles.cim, { color: "black" }]}
                  >
                    {this.state.receptekTitle1}
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  Actions.receptekHTML({ tesztak: this.state.receptekid2 });
                }}
              >
                <View
                  style={{
                    backgroundColor: "#f6eec2",
                    width: width / 2.1,
                    height: height / 4,
                    borderRadius: 10
                  }}
                >
                  <Image
                    source={{ uri: this.state.receptekPic2 }}
                    style={{
                      width: width / 2.1,
                      height: height / 6,
                      zIndex: 100,
                      borderTopLeftRadius: 10,
                      borderTopRightRadius: 10
                    }}
                  />
                  <Text
                    numberOfLines={2}
                    style={[styles.cim, { color: "black" }]}
                  >
                    {this.state.receptekTitle2}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                marginTop: 10
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  Actions.receptekHTML({ tesztak: this.state.receptekid3 });
                }}
              >
                <View
                  style={{
                    backgroundColor: "#f6eec2",
                    width: width / 2.1,
                    height: height / 4,
                    borderRadius: 10
                  }}
                >
                  <Image
                    source={{ uri: this.state.receptekPic3 }}
                    style={{
                      width: width / 2.1,
                      height: height / 6,
                      zIndex: 100,
                      borderTopLeftRadius: 10,
                      borderTopRightRadius: 10
                    }}
                  />
                  <Text
                    numberOfLines={2}
                    style={[styles.cim, { color: "black" }]}
                  >
                    {this.state.receptekTitle3}
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => Actions.receptek()}>
                <View
                  style={{
                    backgroundColor: "#cdb669",
                    width: width / 2.1,
                    height: height / 4,
                    borderRadius: 10,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Text
                    style={{
                      fontSize: 36,
                      textAlign: "center",
                      color: "white",
                      fontFamily: "AmaticSC-Bold"
                    }}
                  >
                    {"TÖBB RECEPT"}
                  </Text>
                  <View style={{ flexDirection: "row", marginTop: 10 }}>
                    <Image
                      source={require("../src/nyil_feher2.png")}
                      style={{
                        width: 31 / 2,
                        height: 58 / 2,
                        zIndex: 100,
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10
                      }}
                    />
                    <Image
                      source={require("../src/nyil_feher2.png")}
                      style={{
                        width: 31 / 2,
                        height: 58 / 2,
                        zIndex: 100,
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10
                      }}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              backgroundColor: "white",
              marginTop: 30,
              marginBottom: 30
            }}
          >
            <Text style={styles.nameText}>{"Webshop"}</Text>
            <TouchableOpacity
              onPress={() =>  Linking.openURL(url).catch(err =>
                    console.error("An error occurred", err)
                  )}
            >
              <View style={{ justifyContent: "center", alignItems: "center", width:width-20, borderTopWidth:1,borderBottomWidth:1, borderRadius:10, borderColor:"gray"  }}>
                <View style={{ width: width - 20, height: height / 4, }}>
                  <Image
                    source={require ('../src/webshop.png')}
                    style={{
                      width: width - 20,
                      height: height / 4,
                      zIndex: 100
                    }}
                  />
                </View>
              </View>
            </TouchableOpacity>
          </View>

          <View>
            <Text style={styles.nameText}>{"RECEPT ÉLETKOR SZERINT"}</Text>
            <View style={{ justifyContent: "space-around" }}>
              <View
                style={{ flexDirection: "row", justifyContent: "space-around" }}
              >
                <TouchableOpacity
                  onPress={() => {
                    Actions.eletkorszerint({ index: 0 });
                  }}
                >
                  <View>
                    <Image
                      source={require("../src/receptek/2.png")}
                      style={{
                        width: 400 / 2.5,
                        height: 350 / 2.5,
                        zIndex: 100
                      }}
                    />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    Actions.eletkorszerint({ index: 1 });
                  }}
                >
                  <View>
                    <Image
                      source={require("../src/receptek/3.png")}
                      style={{
                        width: 400 / 2.5,
                        height: 350 / 2.5,
                        zIndex: 100
                      }}
                    />
                  </View>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  marginTop: 30
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    Actions.eletkorszerint({ index: 2 });
                  }}
                >
                  <View>
                    <Image
                      source={require("../src/receptek/1.png")}
                      style={{
                        width: 400 / 2.5,
                        height: 350 / 2.5,
                        zIndex: 100
                      }}
                    />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    Actions.eletkorszerint({ index: 3 });
                  }}
                >
                  <View>
                    <Image
                      source={require("../src/receptek/4.png")}
                      style={{
                        width: 400 / 2.5,
                        height: 350 / 2.5,
                        zIndex: 100
                      }}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <View
                style={{
                  backgroundColor: "gray",
                  height: 0.5,
                  width: width - 80,
                  marginTop: 20,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              />
            </View>

            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL(facebook).catch(err =>
                    console.error("An error occurred", err)
                  )
                }
              >
                <View
                  style={{
                    backgroundColor: "white",
                    borderWidth: 1.5,
                    height: height / 4 + 6,
                    borderRightWidth: 0,
                    borderRadius: 5,
                    borderColor: "white",
                    width: width / 4,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Image
                    source={require("../src/facebook.png")}
                    style={{ height: height / 11, width: height / 11 }}
                  />
                  <Text style={styles.title}>{"Facebook"}</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  Linking.openURL(facebookGroup).catch(err =>
                    console.error("An error occurred", err)
                  )
                }
              >
                <View
                  style={{
                    backgroundColor: "white",
                    borderWidth: 1.5,
                    height: height / 4 + 6,
                    borderRightWidth: 0,
                    borderRadius: 5,
                    borderColor: "white",
                    width: width / 4,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Image
                    source={require("../src/group.png")}
                    style={{
                      height: height / 11,
                      width: height / 11,
                      borderRadius: 40
                    }}
                  />
                  <Text style={styles.title}>{"Facebook csoport"}</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  Linking.openURL(youtube).catch(err =>
                    console.error("An error occurred", err)
                  )
                }
              >
                <View
                  style={{
                    backgroundColor: "white",
                    borderWidth: 1.5,
                    height: height / 4 + 6,
                    borderRightWidth: 0,
                    borderRadius: 5,
                    borderColor: "white",
                    width: width / 4,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Image
                    source={require("../src/youtube.png")}
                    style={{ height: height / 11, width: height / 11 }}
                  />
                  <Text style={styles.title}>{"Youtube"}</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  Linking.openURL(insta).catch(err =>
                    console.error("An error occurred", err)
                  )
                }
              >
                <View
                  style={{
                    backgroundColor: "white",
                    borderWidth: 1.5,
                    height: height / 4 + 6,
                    borderRightWidth: 0,
                    borderRadius: 5,
                    borderColor: "white",
                    width: width / 4,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Image
                    source={require("../src/instagram.png")}
                    style={{ height: height / 11, width: height / 11 }}
                  />
                  <Text style={styles.title}>{"Instagram"}</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View
              style={{
                width: width,
                height: height / 8,
                backgroundColor: "#00b8ac",
                alignItems: "center",
                justifyContent: "center"
              }}
            />
          </View>
        </ScrollView>

        <View style={[styles.menu, { width: width, height: height / 12 }]}>
          <TouchableOpacity>
            <View style={styles.menu1}>
              <Image
                source={require("../src/menu/menuikonaktiv_home.png")}
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
                source={require("../src/menu/menuikon_kedvenc1.png")}
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
    marginLeft: 3,
    fontSize: 18,
    textAlign: "left",
    color: "white",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    fontFamily: "AmaticSC-Bold"
  },

  HOME: {
    fontSize: 18,
    textAlign: "center",
    color: "white"
  },
  event: {
    fontSize: 15,
    textAlign: "left",
    color: "black"
    //fontFamily:'AmaticSC-Bold'
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
  }
});
