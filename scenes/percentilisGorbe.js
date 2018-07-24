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
      magassag: this.props.gyerek.magassag,
      gender: this.props.gyerek.nem,
      suly: this.props.gyerek.suly,
      nev: this.props.gyerek.nev,
      honap: this.props.gyerek.date,
      addedData: [],
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
            { x: "_", y: 5.1 },
            { x: "_", y: 6 },
            { x: "_", y: 7 },
            { x: "_", y: 8 },
            { x: "_", y: 8.4 },
            { x: "_", y: 9 },
            { x: "_", y: 10 },
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
            { x: "_", y: 51 },
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
      dataSource: []
    };
    this.dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1.guid != r2.guid
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
        <Text style={{ color: "gray", marginBottom: 5 }}>
          {" "}
          Magassági görbe cm (lány){" "}
        </Text>
      );
    } else {
      return (
        <Text style={{ color: "gray", marginBottom: 5 }}>
          {" "}
          Magassági görbe cm (fiú){" "}
        </Text>
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

  saveNewItem() {
    var newArrayForm = {
      magassag: this.state.magassag,
      suly: this.state.suly,
      honap: this.state.honap,
      date: this.state.date
    };
    console.log(newArrayForm);
    var lists = this.state.lista.concat(newArrayForm);

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

    this.modalVisible(false);
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

  modal() {
    index = 1;
    return (
      <View style={{ marginTop: 0 }}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.modalVisible}
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
                    selectedValue={this.state.honap}
                    style={{ height: height / 4, width: width - 50 }}
                    onValueChange={(itemValue, itemIndex) =>
                      this.setState({ honap: itemValue })
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
                    onChangeText={date => this.setState({ date })}
                    value={this.state.date}
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
                    onChangeText={suly => this.setState({ suly })}
                    value={this.state.suly}
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
                    onChangeText={magassag => this.setState({ magassag })}
                    value={this.state.magassag}
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
                    this.modalVisible(false);
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
  modal2() {
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
  }

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
      modSzam: rowID,
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
                  <Text style={{ textAlign: "center", fontSize: 30 }}>
                    {" "}
                    11" "}
                  </Text>
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
                  <Text style={{ textAlign: "center", fontSize: 30 }}>
                    {" "}
                    11" "}
                  </Text>
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
        <Text style={[styles.HOME, { color: "white" }]}>{"Magasság"}</Text>
      );
    } else {
      return (
        <Text style={[styles.HOME, { color: "#008c82" }]}>{"Magasság"}</Text>
      );
    }
  }
  suly() {
    if (this.state.oldal == "suly") {
      return <Text style={[styles.HOME, { color: "white" }]}>{"Súly"}</Text>;
    } else {
      return <Text style={[styles.HOME, { color: "#008c82" }]}>{"Súly"}</Text>;
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
        <TouchableOpacity
          onPress={() => this.modalVisible(true)}
          underlayColor="transparent"
          style={[styles.newFlight, { top: addFlightTop, left: addFlightLeft }]}
        >
          <Image
            style={styles.newFlightImage}
            source={require("../src/add-flight.png")}
          />
        </TouchableOpacity>
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
                  left: 20
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
            {this.modal()}
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
                          {"kg"}
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
                          {"cm"}
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
                    <Text style={styles.backTextWhite}>Törlés</Text>
                  </TouchableOpacity>
                </View>
              )}
              rightOpenValue={this.state.swipe}
            />
          </View>
          ); } }
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
    backgroundColor: "#ED5565",
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
