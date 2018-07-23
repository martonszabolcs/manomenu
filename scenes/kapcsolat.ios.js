import React, { Component, PropTypes } from "react";
import {
  AsyncStorage,
  Modal,
  View,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
  Linking
} from "react-native";

import Swiper from 'react-native-swiper';
import {
  Router,
  Scene,
  Actions
} from 'react-native-router-flux';

import Communications from 'react-native-communications';
import phonecall from 'react-native-communications';
import email from 'react-native-communications';
//import MapView from 'react-native-maps';




export default class descriptions extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  componentDidMount() {
  Linking.getInitialURL().then((url) => {
    if (url) {
      console.log('Initial url is: ' + url);
    }
  }).catch(err => console.error('An error occurred', err));
}

  render() {
    var {height, width} = Dimensions.get('window');
    return (
      <View style={{backgroundColor:'#00b8ac', flex:1}}>
      <View style={{width:width, height:height/15, backgroundColor:'#00b8ac', flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
      <TouchableOpacity style={{width:31/2.5, height:58/2.5, position:'absolute', zIndex:100, left:10}} onPress={() => { Actions.pop()}}>
        <Image
          source={require('../src/nyil_feher.png')}
          style={{width:31/3, height:58/3, position:'absolute', zIndex:100, marginLeft:10, marginRight:10}}/>
      </TouchableOpacity>
            <View>
              <Text style={[styles.HOME, {color:'white'}]}>
                Kapcsolat
              </Text>
            </View>

        </View>
          <ScrollView>
          <View style={styles.ftreContainer}>

          <View style={{justifyContent:'center', alignItems:'center'}}>
          <Image
          source={require('../src/logo.png')}
          style={{width:200, height:200,  zIndex:100}}/>
            </View>
          <Text style={{textAlign:'left', color:'black', margin:5, fontSize:18,fontFamily:'AmaticSC-Bold' }}>
          {"Alapító: Ambrus Éva \nDesign: Makai Mariann \nTárhelyszolgáltató: Rackhost Zrt \nFotók: Freepik, Ambrus Éva, Happy Fotó"}
          </Text>
          <Text style={{textAlign:'left', color:'black', margin:5, fontSize:11, }}>
TARTALOM FELHASZNÁLÁSA {'\n'}

A www.manomenu.hu oldalon megjelent írásokat a szerzői jogról szóló 1999. évi LXXVI. törvény értelmében tilos máshol közzétenni. Az oldalon látható fotók sem vehetők át írásos engedély nélkül. Ha szeretnéd felhasználni valamelyik írásunkat, a következőt teheted: {'\n'}

1. feltünteted az írás első pár (legföljebb öt) sorát, a szövegben jelölve, hogy a manomenu.hu oldalról vetted az idézetet, majd egy linkre kattintva a manomenu.hu oldalra, és az eredeti cikkre irányítod az olvasót. {'\n'}

2. emailen engedélyt kérsz az írás és/vagy fotó felhasználására, és egyeztetjük annak módját. Email cím: info@manomenu.hu {'\n'}

Köszönjük Évi és Anna          </Text>

          <View style={{flexDirection:'row', justifyContent:'space-around', marginTop:20}}>
          
          <TouchableHighlight onPress={()=> Linking.openURL('https://www.facebook.com/manomenu2016/').catch(err => console.error('An error occurred', err))}>
          <View>
           <Image
                  source={require('../src/menu/cikk_fb.png')}
                style={{width:50, height:50, zIndex:100}}/>
          </View>
          </TouchableHighlight>
          
          <TouchableHighlight onPress={()=> Linking.openURL('https://www.facebook.com/groups/752237094919260/').catch(err => console.error('An error occurred', err))}>
          <View>
           <Image
                source={require('../src/menu/csoport.png')}
                style={{width:50, height:50, zIndex:100}}/>
          </View>
          </TouchableHighlight>
          
        <TouchableHighlight
                onPress={() => Communications.email(['info@manomenu.hu'],null, null,'Manó Menü','')}>
            <View>
           <Image
                  source={require('../src/menu/mail.png')}
                style={{width:50, height:50, zIndex:100}}/>
          </View>
          </TouchableHighlight>
          </View>

          <View style={{flexDirection:'row', justifyContent:'space-around', marginTop:30}}>
          
          <TouchableHighlight onPress={()=> Linking.openURL('https://www.instagram.com/manomenu_/').catch(err => console.error('An error occurred', err))}>
          <View>
           <Image
                  source={require('../src/instagram.png')}
                style={{width:50, height:50, zIndex:100}}/>
          </View>
          </TouchableHighlight>
          
          <TouchableHighlight onPress={()=> Linking.openURL('https://hu.pinterest.com/manomenu/').catch(err => console.error('An error occurred', err))}>
          <View>
           <Image
                source={require('../src/menu/cikk_pinterest.png')}
                style={{width:50, height:50, zIndex:100}}/>
          </View>
          </TouchableHighlight>
           
          <TouchableHighlight onPress={()=> Linking.openURL('https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.youtube.com%2Fchannel%2FUC8EkPnfTiH8HNzEUaiUjNqw&h=ATOCS2f4OH-3UV5m3jty2IFBXlR-W52YmvkiJbbqIHfU4_wY4FIkXrzH7FmuZPUufiPG_N1fmSJPARwae5aVMfzgCnhAnagAgGpbUOaw3h6evrFRTnjFocuNInLKWBUnmd18CPB7J-EI').catch(err => console.error('An error occurred', err))}>
          <View>
           <Image
                source={require('../src/yt.png')}
                style={{width:50, height:50, zIndex:100}}/>
          </View>
          </TouchableHighlight>

          </View>



  

          <View style={{height:50}}/>
            </View>
              </ScrollView>

      </View>
    );
  }
  }
const styles = StyleSheet.create({
ftreContainer:{
    backgroundColor:'white',
    borderWidth:2,
    borderColor:"white",
    flex:1,
    marginTop:10,
    marginBottom:5,
    marginLeft:5,
    marginRight:5,
    borderRadius:20
  },

  slide:{
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex:1,
    marginTop:20,
    marginBottom:5,
    marginLeft:5,
    marginRight:5,
  },
  ftreTitle:{
    color:'white',
        fontWeight:'bold',
    fontSize:20,
    textAlign:'center',
    margin:10,
  },
  ftreDescription:{
    color:'white',
        fontSize:15,
    marginRight:20,
    marginLeft:20
  },
  ftreCloseIcon:{
    alignSelf:'flex-end',
    flex:0.5,
    marginRight:10
  },
  ftreTitleContainer:{
    flex:1,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
  },
  ftreDescriptionContainer:{
    flex:6.5
  },
  ftreExitContainer:{
    justifyContent:'flex-start',
    alignItems:'center',
  },
  ftreExitButtonContainer:{
    width:50,
    height:50,

    backgroundColor:'transparent',


    //alignItems:'space-around',
    zIndex:2312312321
  },
  ftreExitButtonText:{
    color:'white',
    backgroundColor:'transparent',
    fontSize:20,
    fontFamily: 'futura-bold',
    textAlign:'center',
    
  },
  ftreExitButtonText2:{
    color:'white',
    backgroundColor:'transparent',
    fontSize:20,
    fontFamily: 'futura-bold',
    textAlign:'center'
  },
  step: {
    backgroundColor:'#029DAF',
    width: 50,
    height: 50,
    borderRadius:40,
    marginRight:10,
  },
  stepText: {
    backgroundColor: 'transparent',
    color: '#ffffff',
    fontSize: 20,
    fontFamily: 'futura-bold',
    textAlign:'center',
    marginTop: 13,
    marginRight: 2
  },
  description: {
    backgroundColor: 'transparent',
    color: '#ffffff',
    fontSize: 20,
    fontFamily: 'futura-bold',
  },

  description2: {
    backgroundColor: 'transparent',
    color: '#ffffff',
    fontSize: 15,
    fontFamily: 'futura-bold',
  },

  description3: {
    backgroundColor: 'transparent',
    color: '#ffffff',
    fontSize: 10,
    fontFamily: 'futura-bold',
  },
  playerImage: {
    width: 90,
    height: 90
  },

  playerImage2: {
    width: 90/1.3,
    height: 90/1.3
  },
  HOME: {
    fontSize: 18,
    textAlign: 'center',
    color:'white',
  },

  fonts: {
    marginTop: 10,
    fontFamily: 'futura-bold',
    color: 'white',
    letterSpacing:0.5
  },

  playerActiveImage: {
    width: 90,
    height: 90,
    position: 'absolute',
    zIndex: 2
  },

  playerActiveImage2: {
    width: 90/1.3,
    height: 90/1.3,
    position: 'absolute',
    zIndex: 2
  }
});