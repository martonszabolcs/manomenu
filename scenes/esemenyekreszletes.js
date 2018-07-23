
import React, { Component } from 'react';
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
  WebView
} from 'react-native';


import api from '../utilities/api';
//import Noti from './noti';
import {
  Actions
} from 'react-native-router-flux';




const instructions = Platform.select({
});

export default class Receptek extends Component<{}> {

  constructor(props) {
    super(props);
    this.state={
      postCover:[],
      news:[],
      dataSource: [],
      id: props.id

    }
    this.dataSource = new ListView.DataSource({rowHasChanged:(r1,r2) => r1.guid != r2.guid});    
    
  }
 
  componentWillMount () {
    console.log(this.state.id);
  return fetch("http://46.101.62.53/Apps/rest/content/EVENT/"+this.state.id, {
        headers: {
          accept: "application/json",
        }
      }).then((res) => res.json())
    .then((res) => {
      this.setState({
        content: res.fbUrl
      })
    })

  }


  render() {
    var {height, width} = Dimensions.get('window');
    console.log(this.state.content);
    var DEFAULT_URL = this.state.content;
    return (
      <View style={styles.container}>

<View style={{height:height-height/12}}>
   <WebView
     automaticallyAdjustContentInsets={false}
     source={{uri: DEFAULT_URL}}
     javaScriptEnabled={true}
     domStorageEnabled={true}
     decelerationRate="normal"
     startInLoadingState={true}
   />
</View>

              <View style={[styles.menu, {width:width, height:height/12}]}>
        <TouchableOpacity onPress={()=> Actions.home()
          }>
          <View style={styles.menu1}>
           <Image
              source={require('../src/menu/menuikon_home.png')}
              style={{width:height/20, height:height/20}}/>
          </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=> Actions.hozzataplalas()
          }>
          <View style={styles.menu1}>
            <Image
              source={require('../src/menu/menuikon_hozzatalp.png')}
              style={{width:height/20, height:height/20}}/>
          </View>
          </TouchableOpacity>

        <TouchableOpacity onPress={()=> Actions.receptek()}>
          <View style={styles.menu1}>
            <Image
              source={require('../src/menu/menuikon_receptek.png')}
              style={{width:height/20, height:height/20}}/>
          </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=> Actions.kedvencek()}>
          <View style={styles.menu1}>
            <Image
              source={require('../src/menu/menuikon_kedvenc.png')}
              style={{width:height/20, height:height/20}}/>
          </View>
          </TouchableOpacity>

          <TouchableOpacity >
          <View style={styles.menu1}>
            <Image
              source={require('../src/menu/menuikonaktiv_egyeb.png')}
              style={{width:height/15, height:height/40}}/>
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
    backgroundColor: 'white',


  },
  name: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  statbar: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    height:10
  },
  title: {
    fontSize: 50,
    textAlign: 'center',
    color:'black',
    margin: 10,
  },
  content: {
    fontSize: 14,
    textAlign: 'left',
    fontFamily: 'futura',
    color:'black',
    margin: 10,
  },
  menu: {
    position:'absolute',
    bottom:0,
    backgroundColor:"#f0d886",
    flexDirection:'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  instructions: {
    fontSize:20,
    textAlign: 'center',
    color: '#4aa485',
    padding: 10,
    marginBottom: 5,
  },
  nameText: {
    fontSize: 18,
    textAlign: 'center',
    color:'white',
    fontFamily:'AmaticSC-Bold'
  },
  HOME: {
    fontSize: 18,
    textAlign: 'center',
    color:'white',
  },
  cim: {
    fontSize: 16,
    textAlign: 'center',
    color:'gray',
        fontFamily:'AmaticSC-Bold'

  },
  cim: {
    fontSize: 34,
    textAlign: 'right',
    color:'white',
    fontFamily:'AmaticSC-Bold'
  },

});
