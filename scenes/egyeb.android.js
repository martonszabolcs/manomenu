
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
  Linking
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

    }
    Actions.reset("egyeb")

    this.dataSource = new ListView.DataSource({rowHasChanged:(r1,r2) => r1.guid != r2.guid});    
    
  }
  componentWillUnmount() {
        clearInterval(this.interval);
    }
    

    componentDidMount() {
    console.log('component mounted');
    Linking.getInitialURL().then((url) => {
    if (url) {
      console.log('Initial url is: ' + url);
    }
  }).catch(err => console.error('An error occurred', err));
  }

  componentWillMount () {
   /* setTimeout(() => {
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
    var {height, width} = Dimensions.get('window');
    console.log(this.state.news);
    var blog = 'http://manomenu.hu/blog';
    var page = 'http://manomenu.hu';
    return (
      <View style={styles.container}>
        <Image
          source={require('../src/hatter_egyebmenu.png')}
          style={{width:width, height:height/3, position:'absolute'}}/>

      <View>
        <View style={{justifyContent:'space-around', flexDirection:'row', marginTop:height/3}}>
        <TouchableOpacity onPress={()=> Actions.hetrolhetre()}>
          <View style={{width:width/6, height:width/6}}>
            <Image
              source={require('../src/egyebmenu/hetrol_hetre.png')}
              style={{ zIndex:500, width:width/6, height:width/6}}/>
          </View>
          <View>
          <Text style={[styles.cim, {backgroundColor:'transparent'}]}>
              {'Hétről\nhétre'}
          </Text>
          </View>

          </TouchableOpacity>
          
           
         <TouchableOpacity onPress={()=> Actions.szakember()}> 
          <View style={{width:width/6, height:width/6}}>
            <Image
              source={require('../src/egyebmenu/kereses.png')}
              style={{ zIndex:500, width:width/6, height:width/6}}/>
              <Text style={[styles.cim, {backgroundColor:'transparent'}]}>
                  {'Szakember\nkereső'}
              </Text>
          </View>
          </TouchableOpacity>
          
        <TouchableOpacity onPress={()=> Actions.termek()}>
          <View style={{width:width/6, height:width/6}}>
            <Image
              source={require('../src/egyebmenu/termekajanlo.png')}
              style={{ zIndex:500, width:width/6, height:width/6}}/>
              <Text style={[styles.cim, {backgroundColor:'transparent'}]}>
                  {'Termék-\najánló'}
              </Text>
          </View>
          </TouchableOpacity>
          
        <TouchableOpacity onPress={()=> Actions.kapcsolat()}>
          <View style={{width:width/6, height:width/6}}>
            <Image
              source={require('../src/egyebmenu/ertesites.png')}
              style={{ zIndex:500, width:width/6, height:width/6}}/>
              <Text style={[styles.cim, {backgroundColor:'transparent'}]}>
                  {'Kapcsolat'}
              </Text>
          </View>
          </TouchableOpacity>
     </View>
     </View>

      <View>
        <View style={{justifyContent:'space-around', flexDirection:'row', marginTop:10}}>
        <TouchableOpacity onPress={()=> Actions.esemenyek()}>
          <View style={{width:width/6, height:width/6}}>
            <Image
              source={require('../src/egyebmenu/facebook_esemeny.png')}
              style={{ zIndex:500, width:width/6, height:width/6}}/>
          </View>
          <View>
          <Text style={[styles.cim, {backgroundColor:'transparent'}]}>
              {'Facebook\nesemények'}
          </Text>
          </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> Linking.openURL(blog).catch(err => console.error('An error occurred', err))}>
          <View style={{width:width/6, height:width/6}}>
            <Image
              source={require('../src/egyebmenu/blog.png')}
              style={{ zIndex:500, width:width/6, height:width/6}}/>
              <Text style={[styles.cim, {backgroundColor:'transparent'}]}>
                  {'Blog'}
              </Text>
          </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> {Actions.gyik({ tesztak: 295})}}>
          <View style={{width:width/6, height:width/6}}>
            <Image
              source={require('../src/egyebmenu/gyik.png')}
              style={{ zIndex:500, width:width/6, height:width/6}}/>
              <Text style={[styles.cim, {backgroundColor:'transparent'}]}>
                  {'GY.I.K.'}
              </Text>
          </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> Actions.beallitasok()}>
          <View style={{width:width/6, height:width/6}}>
            <Image
              source={require('../src/egyebmenu/bealiltasok.png')}
              style={{ zIndex:500, width:width/6, height:width/6}}/>
              <Text style={[styles.cim, {backgroundColor:'transparent'}]}>
                  {'Beállítások'}
              </Text>
          </View>
          </TouchableOpacity>
     </View>
     </View>
      <View style={{justifyContent:'center', alignItems:'center', backgroundColor:'transparent'}}>
          <TouchableOpacity onPress={()=> Actions.valaszto()} style={{zIndex:2321121321}}>
          <View style={{justifyContent:'center', alignItems:'center', marginRight:30, backgroundColor:'transparent'}}>
            <Image
              source={require('../src/egyebmenu/profil.png')}
              style={{ width:width/4.2, height:width/4.4,}}/>
              <Text style={[styles.cim, {backgroundColor:'transparent', marginRight:-20}]}>
                  {'Profil'}
              </Text>
          </View>
          </TouchableOpacity>

      </View>
      

        <Image
          source={require('../src/egyebmenu/hatter_profil2.png')}
          style={{width:width, height:height/4, bottom:30, position:'absolute', zIndex:-1}}/>
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
              style={{width:height/20, height:height/20,}}/>
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

});
