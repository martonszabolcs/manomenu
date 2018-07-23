import React, { Component } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';


import {
  Actions
} from 'react-native-router-flux';
 var {height, width} = Dimensions.get('window');

 import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class App extends Component {
 constructor(props) {
    console.log(props);
    super(props);
  this.state = {
      notes: '',
  }
   this._updateList();
  };

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
    return (
      <View style={styles.container}>

         <View style={{width:width, height:height/15, backgroundColor:'#00b8ac', flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
             <TouchableOpacity onPress={()=> this.goBack()}>
            <View style={{width:height/15, height:height/15, justifyContent:'center', alignItems:'center'}}>
        <Image
          source={require('../src/nyil_feher.png')}
          style={{width:31/3, height:58/3,  zIndex:2312132321312, marginLeft:10}}/>
            </View>
          </TouchableOpacity>
            <View>
              <Text style={styles.HOME}>
                {'Jegyzetek'}
              </Text>
            </View>
            <View style={{width:31/3, height:58/3,  zIndex:100, left:10}}/>
 
            </View>
<KeyboardAvoidingView
        behavior = "position"
        keyboardVerticalOffset= {80}
        keyboardDismissMode = "on-drag"
      >
        <View
        style ={{height:20, backgroundColor: "transparent"}}
        />
        <ScrollView
          ref={(scroll) => {this.scroll = scroll;}}
          onContentSizeChange = {() => {this.scroll.scrollToEnd({animated: true})}}
          style = {{height:200, paddingLeft:20, paddingRight:20, backgroundColor:'rgba(239, 218, 123, 0.7)', borderRadius:30,}}
        >
            <TextInput
              blurOnSubmit = {false}
              multiline = {true}
              style={styles.text, {color:'#a48f34'}}
              placeholder='Jegyzet'
              value={this.state.notes}
              underlineColorAndroid='transparent'
              onChangeText={text => this.setState({ notes: text })}
             
            />
        </ScrollView>
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
/* 
  



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
  KeyboardAvoidingView,
  Keyboard
} from 'react-native';

//import Firsttime from './firsttime';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import api from '../utilities/api'
//import Noti from './noti'
import {
  Actions
} from 'react-native-router-flux';
import TextInputLines from './TextInputLines';


import Moment from 'moment';
import HTMLView from 'react-native-htmlview';
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
      dimensions: undefined,
      contentSize: {
       width: 0,
        height: 0,
      },
      multiline:true,

    }
    this._updateList();
    this._scrollToInput = this._scrollToInput.bind(this);

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
  componentWillMount () {
      this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', ()=>{
          this.setState(() => {
              return {typedText: 'Keyboard is shown'}
          })
      });
      this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
        this.setState(() => {
            return {typedText: 'Keyboard Hide'};
        });
      });
  }

  componentWillUnmount () {
      this.keyboardDidShowListener.remove();
      this.keyboardDidHideListener.remove();
  }




_scrollToInput (reactNode: any) {
  // Add a 'scroll' ref to your ScrollView
  this.scroll.scrollToFocusedInput(reactNode)
}

componentWillReceiveProps(props) {
     this.setState({
       multiline: props.multiline,
     });
   }


  render() {
    

  const offset = (Platform.OS === 'android') ? -200 : 0;



    let cursorPositionY = 0;
const handleSelectionChange = ({nativeEvent}) => {
  const previousCursorPositionY = cursorPositionY;
  cursorPositionY = nativeEvent.selection.cursorPositionY;
  if (cursorPositionY !== previousCursorPositionY) {        
    refToScrollView.scrollTo({y: cursorPositionY + OFFSET});
  }
}
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
<KeyboardAwareScrollView enableOnAndroid={true} enableAutomaticScroll={true} viewIsInsideTabBar={true} extraScrollHeight={100} enableResetScrollToCoords={true} onKeyboardWillShow={(frames: Object) => {
    console.log('Keyboard event', frames)
  }}>
<View>
        <TextInputLines
    style={{height: height/4, width: this.state.width + '%', marginTop:height/20, padding:30, backgroundColor:'rgba(239, 218, 123, 0.7)', borderRadius:30, color:'#a48f34', alignItems:'flex-start', justifyContent:'flex-start'}}
    onChangeText={(text) => this.setState({notes: text})}
    value={this.state.notes}
    autogrow
    multiline={this.state.multiline}
    onContentSizeChange={(event) => this.setState({contentSize: event.nativeEvent.contentSize})}
    underlineColorAndroid='transparent'
    />
     </View>
     <Text>Content Size: {JSON.stringify(this.state.contentSize)}</Text>
</KeyboardAwareScrollView>
  
          
        

               


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
*/