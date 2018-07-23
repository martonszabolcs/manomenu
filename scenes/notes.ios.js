
import React, { Component } from 'react';
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
  TextInput,
  KeyboardAvoidingView
} from 'react-native';

//import Firsttime from './firsttime';



import api from '../utilities/api'
//import Noti from './noti'
import {
  Actions
} from 'react-native-router-flux';


import Moment from 'moment';
const Unix = require('../utilities/unixHome');



const instructions = Platform.select({
});

export default class Kedvencek extends Component<{}> {

  constructor(props) {
    console.log(props);
    super(props);
    this.state={
      postCover:[],
      message:[],
      title:[],
      des:[],
      dataSource: [],
      Id: null,
      favourite: [],
      favorites: [],
      content:"",
      update: props.update,

    }
    this._updateList();

  }
  async saveData(props) {
    var lists = this.state.notes

    await AsyncStorage.setItem('@profil:jegyzetek',
    JSON.stringify(lists));
    console.log('saved');
  }


  async _updateList() {
   try {
              var value = await AsyncStorage.getItem('@profil:jegyzetek');
             
                  var list = JSON.parse(value);

                  
                  //this.updateStatistics(list);
                  this.setState({
                      notes: list,
                  });

              // New list with no data
          } catch (error) {
              // Can't access data
          }


  console.log(this.state.notes);
}

  goBack() {
    this.saveData();
    // a visszatero objektum:

    Actions.pop();
  }





  render() {
    const keyboardVerticalOffset = Platform.OS === 'ios' ? 10 : 0
    var {height, width} = Dimensions.get('window');
    var facebook = 'https://www.facebook.com/';
    var instagram = 'https://www.instagram.com/';
    var pinterest = 'http://pinterest.com';

    console.log(this.state.notes);


    const switchTwoValue = this.state.switchTwoValue;
    return (
      <View style={styles.container}>
         <View style={{width:width, height:height/15, backgroundColor:'#00b8ac', flexDirection:'row', justifyContent:'space-between', alignItems:'flex-end',paddingBottom:10}}>
            <TouchableOpacity onPress={()=> this.goBack()}>
            <View>
                <Image
          source={require('../src/nyil_feher.png')}
          style={{width:31/3, height:58/3,  zIndex:2312321312, marginLeft:10}}/>
            </View>
          </TouchableOpacity>
            <View>
              <Text style={styles.HOME}>
                {'Jegyzetek'}
              </Text>
            </View>
            <View style={{width:31/3, height:58/3,  zIndex:100, left:10}}/>
 
        </View>

      <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={keyboardVerticalOffset}>
        <View style={{alignItems:'center'}}>
          <TextInput
            style={{height: height/2, width:width-10, marginTop:height/20, paddingTop:30, backgroundColor:'rgba(239, 218, 123, 0.7)', borderRadius:30, padding:30, color:'#a48f34', alignItems:'flex-start', justifyContent:'flex-start'}}
            multiline = {true}
            returnKeyType = 'next'
            underlineColorAndroid='rgba(0,0,0,0)'
            textAlignVertical = 'top'
            value={this.state.notes}
            onChangeText={(text) => this.setState({notes: text})}/>
        </View>
               

       </KeyboardAvoidingView>

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
  menu: {
    position:'absolute',
    bottom:0,
    backgroundColor:"#f0d886",
    flexDirection:'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  nameText: {
    fontSize: 36,
    textAlign: 'left',
    marginLeft:20,
    color:'black',
    fontFamily:'AmaticSC-Bold'
  },

  cim: {
    fontSize: 16,
    textAlign: 'left',
    color:'white',
    borderBottomLeftRadius:10,
    borderBottomRightRadius:10,

  },

 HOME: {
    fontSize: 16,
    textAlign:'center',
    color:'white',
    fontWeight:'bold'
  },
  event: {
    fontSize: 18,
    textAlign: 'center',
    color:'black',
  },
  ftreExitButtonText2:{
    color:'black',
    backgroundColor:'transparent',
    fontSize:20,
    fontFamily: 'futura-bold',
    textAlign:'center'
  },
  ftreContainer:{
    backgroundColor:'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth:2,
    borderColor:"white",
    height:150,
    marginTop:30,
    marginBottom:0,
    marginLeft:5,
    marginRight:5,
    borderRadius:20,
    padding:10
  },

  ftreExitButtonText:{
    color:'black',
    backgroundColor:'transparent',
    fontSize:20,
    fontFamily: 'futura-bold',
    textAlign:'center'
  },

  instructions: {
    fontSize:20,
    textAlign: 'center',
    color: '#4aa485',
    padding: 10,
    marginBottom: 5,
  },
  title: {
    fontSize: 17,
    textAlign: 'center',
    color:'black',
    marginTop: 10,
  },
  list: {
   flexDirection: 'row',
        flexWrap: 'wrap',
    justifyContent:'space-around'
  },
});
