import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Image
} from "react-native";
import PureChart from "react-native-pure-chart";
import moment from "moment";
var { height, width } = Dimensions.get("window");
import { Actions, ActionConst } from "react-native-router-flux";

export default class Perc extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      magassag: this.props.gyerek.magassag,
      gender: this.props.gyerek.nem,
      suly: this.props.gyerek.suly,
      nev: this.props.gyerek.nev,
      honap: this.props.gyerek.date,
      addedData: [],
      gLength: this.props.gyerek.gLength,
      bLength: this.props.gyerek.bLength,
      gHeight: this.props.gyerek.gHeight,
      bHeight: this.props.gyerek.bHeight
    };
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
        <Text style={{ color: "white", marginBottom: 5 }}>
          {" "}
          Magassági görbe cm (lány){" "}
        </Text>
      );
    } else {
      return (
        <Text style={{ color: "white", marginBottom: 5 }}>
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

  componentDidMount() {}

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
            alignItems: "flex-end",
            paddingBottom: 10
          }}
        >
          <TouchableOpacity onPress={() => Actions.profil()}>
            <View>
              <Image
                source={require("../src/nyil_feher.png")}
                style={{
                  width: 31 / 3,
                  height: 58 / 3,
                  zIndex: 100,
                  marginLeft: 20
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
        <ScrollView>
          <View style={{ padding: 20 }}>
            {this.percentilisMagassag()}
            <PureChart
              type={"line"}
              data={this.what()}
              width={"90%"}
              gap={12}
              height={height}
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
              numberOfYAxisGuideLine={5}
            />
          </View>
          <View style={{ padding: 20, borderRadius: 10 }}>
            {this.percentilisKg()}
            <PureChart
              type={"line"}
              data={this.what2()}
              width={"90%"}
              gap={12}
              height={height}
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
              numberOfYAxisGuideLine={5}
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
    backgroundColor: "#1DB7AB"
  },
  HOME: {
    fontSize: 16,
    textAlign: "center",
    color: "white",
    fontWeight: "bold"
  }
});
