
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
  TouchableHighlight
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
    this.dataSource = new ListView.DataSource({rowHasChanged:(r1,r2) => r1.guid != r2.guid});    
    
  }
  componentWillUnmount() {
        clearInterval(this.interval);
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
    console.log(width);
    if (width < 700){
    return (
      <View style={styles.container}>
      <View style={{width:width, height:height/15, backgroundColor:'transparent', position:'absolute',zIndex:2132131231, flexDirection:'row', justifyContent:'flex-start', alignItems:'center'}}>
      <TouchableOpacity onPress={() => { Actions.pop()}}>
      <View style={{width:height/15, height:height/15, justifyContent:'center', alignItems:'center'}}>
        <Image
          source={require('../src/nyil_feher.png')}
          style={{width:31/3, height:58/3,  zIndex:2312132321312, marginLeft:10}}/>
            </View>

      </TouchableOpacity>
            <View>
              <Text style={[styles.HOME, {color:'white'}]}>
                
              </Text>
            </View>

        </View>
      <View>
      <Image
          source={require('../src/hatter_hetrolhetre.png')}
          style={{width:width, height:height/3, position:'absolute'}}/>
      </View>
      <View style={{justifyContent:'flex-end', alignItems:'flex-end', marginRight:width/5, marginTop:height/8}}>
          <Text style={[styles.cim, {position:'relative',backgroundColor:'transparent'}]}>
                  {'HÉTRŐL-HÉTRE'}
              </Text>
      </View>

        <View style={{justifyContent:'space-around', flexDirection:'row', marginTop:height/6, backgroundColor:'transparent'}}>

          <TouchableOpacity style={{width:width/6, height:width/6}} onPress={()=> {Actions.hetrolHTML({tesztak: 163})}}>
          <View style={{width:width/6, height:width/6, backgroundColor:'transparent'}}>
            <Image
              source={require('../src/kekalma.png')}
              style={{ zIndex:500, width:width/6, height:width/6}}/>
          </View>
          <View>
          <Text style={[styles.cim, {backgroundColor:'transparent', textAlign:'center', top:-width/7.3, marginLeft:width/40}]}>
              {'1'}
          </Text>
          </View>
          </TouchableOpacity>
         
          <TouchableOpacity style={{width:width/6, height:width/6}} onPress={()=> {Actions.hetrolHTML({tesztak: 164})}}>
          <View style={{width:width/6, height:width/6, backgroundColor:'transparent'}}>
            <Image
              source={require('../src/kekalma.png')}
              style={{ zIndex:500, width:width/6, height:width/6}}/>
          </View>
          <View>
          <Text style={[styles.cim, {backgroundColor:'transparent', textAlign:'center', top:-width/7.3, marginLeft:width/40}]}>
              {'2'}
          </Text>
          </View>
          </TouchableOpacity>
          
          <TouchableOpacity style={{width:width/6, height:width/6}} onPress={()=> {Actions.hetrolHTML({tesztak:165})}}>
          <View style={{width:width/6, height:width/6, backgroundColor:'transparent'}}>
            <Image
              source={require('../src/kekalma.png')}
              style={{ zIndex:500, width:width/6, height:width/6}}/>
          </View>
          <View>
          <Text style={[styles.cim, {backgroundColor:'transparent', textAlign:'center', top:-width/7.3, marginLeft:width/40}]}>
              {'3'}
          </Text>
          </View>
          </TouchableOpacity>
          
          <TouchableOpacity style={{width:width/6, height:width/6}} onPress={()=> {Actions.hetrolHTML({tesztak:166})}}>
          <View style={{width:width/6, height:width/6, backgroundColor:'transparent'}}>
            <Image
              source={require('../src/kekalma.png')}
              style={{ zIndex:500, width:width/6, height:width/6}}/>
          </View>
          <View>
          <Text style={[styles.cim, {backgroundColor:'transparent', textAlign:'center', top:-width/7.3, marginLeft:width/40}]}>
              {'4'}
          </Text>
          </View>
          </TouchableOpacity>
          
          <TouchableOpacity style={{width:width/6, height:width/6}} onPress={()=> {Actions.hetrolHTML({tesztak: 262})}}>
          <View style={{width:width/6, height:width/6, backgroundColor:'transparent'}}>
            <Image
              source={require('../src/kekalma.png')}
              style={{ zIndex:500, width:width/6, height:width/6}}/>
          </View>
          <View>
          <Text style={[styles.cim, {backgroundColor:'transparent', textAlign:'center', top:-width/7.3, marginLeft:width/40}]}>
              {'5'}
          </Text>
          </View>
          </TouchableOpacity>
        </View>


        <View style={{justifyContent:'space-around', flexDirection:'row', marginTop:20}}>

        <TouchableOpacity style={{width:width/6, height:width/6}} onPress={()=> {Actions.hetrolHTML({tesztak: 263})}}>
          <View style={{width:width/6, height:width/6, backgroundColor:'transparent'}}>
            <Image
              source={require('../src/sargaalma.png')}
              style={{ zIndex:500, width:width/6, height:width/6}}/>
          </View>
          <View>
          <Text style={[styles.cim, {backgroundColor:'transparent', textAlign:'center', top:-width/7.3, marginLeft:width/40}]}>
              {'6'}
          </Text>
          </View>
          </TouchableOpacity>
          
          <TouchableOpacity style={{width:width/6, height:width/6}} onPress={()=> {Actions.hetrolHTML({tesztak: 264})}}>
          <View style={{width:width/6, height:width/6, backgroundColor:'transparent'}}>
            <Image
              source={require('../src/sargaalma.png')}
              style={{ zIndex:500, width:width/6, height:width/6}}/>
          </View>
          <View>
          <Text style={[styles.cim, {backgroundColor:'transparent', textAlign:'center', top:-width/7.3, marginLeft:width/40}]}>
              {'7'}
          </Text>
          </View>
          </TouchableOpacity>
          
          <TouchableOpacity style={{width:width/6, height:width/6}} onPress={()=> {Actions.hetrolHTML({tesztak: 265})}}>
          <View style={{width:width/6, height:width/6, backgroundColor:'transparent'}}>
            <Image
              source={require('../src/sargaalma.png')}
              style={{ zIndex:500, width:width/6, height:width/6}}/>
          </View>
          <View>
          <Text style={[styles.cim, {backgroundColor:'transparent', textAlign:'center', top:-width/7.3, marginLeft:width/40}]}>
              {'8'}
          </Text>
          </View>
          </TouchableOpacity>
          
          <TouchableOpacity style={{width:width/6, height:width/6}} onPress={()=> {Actions.hetrolHTML({tesztak: 266})}}>
          <View style={{width:width/6, height:width/6, backgroundColor:'transparent'}}>
            <Image
              source={require('../src/sargaalma.png')}
              style={{ zIndex:500, width:width/6, height:width/6}}/>
          </View>
          <View>
          <Text style={[styles.cim, {backgroundColor:'transparent', textAlign:'center', top:-width/7.3, marginLeft:width/40}]}>
              {'9'}
          </Text>
          </View>
          </TouchableOpacity>
          
          <TouchableOpacity style={{width:width/6, height:width/6}} onPress={()=> {Actions.hetrolHTML({tesztak: 267})}}>
          <View style={{width:width/6, height:width/6, backgroundColor:'transparent'}}>
            <Image
              source={require('../src/sargaalma.png')}
              style={{ zIndex:500, width:width/6, height:width/6}}/>
          </View>
          <View>
          <Text style={[styles.cim, {backgroundColor:'transparent', textAlign:'center', top:-width/7.3, marginLeft:width/40}]}>
              {'10'}
          </Text>
          </View>
          </TouchableOpacity>

      </View>
        <View style={{justifyContent:'space-around', flexDirection:'row', marginTop:20}}>

        <TouchableOpacity style={{width:width/6, height:width/6}} onPress={()=> {Actions.hetrolHTML({tesztak: 268})}}>
          <View style={{width:width/6, height:width/6, backgroundColor:'transparent'}}>
            <Image
              source={require('../src/pirosalma.png')}
              style={{ zIndex:500, width:width/6, height:width/6}}/>
          </View>
          <View>
          <Text style={[styles.cim, {backgroundColor:'transparent', textAlign:'center', top:-width/7.3, marginLeft:width/40}]}>
              {'11'}
          </Text>
          </View>
          </TouchableOpacity>
          
          <TouchableOpacity style={{width:width/6, height:width/6}} onPress={()=> {Actions.hetrolHTML({tesztak: 269})}}>
          <View style={{width:width/6, height:width/6, backgroundColor:'transparent'}}>
            <Image
              source={require('../src/pirosalma.png')}
              style={{ zIndex:500, width:width/6, height:width/6}}/>
          </View>
          <View>
          <Text style={[styles.cim, {backgroundColor:'transparent', textAlign:'center', top:-width/7.3, marginLeft:width/40}]}>
              {'12'}
          </Text>
          </View>
          </TouchableOpacity>
          
          <TouchableOpacity style={{width:width/6, height:width/6}} onPress={()=> {Actions.hetrolHTML({tesztak: 270})}}>
          <View style={{width:width/6, height:width/6, backgroundColor:'transparent'}}>
            <Image
              source={require('../src/pirosalma.png')}
              style={{ zIndex:500, width:width/6, height:width/6}}/>
          </View>
          <View>
          <Text style={[styles.cim, {backgroundColor:'transparent', textAlign:'center', top:-width/7.3, marginLeft:width/40}]}>
              {'13'}
          </Text>
          </View>
          </TouchableOpacity>
          
          <TouchableOpacity style={{width:width/6, height:width/6}} onPress={()=> {Actions.hetrolHTML({tesztak: 271})}}>
          <View style={{width:width/6, height:width/6, backgroundColor:'transparent'}}>
            <Image
              source={require('../src/pirosalma.png')}
              style={{ zIndex:500, width:width/6, height:width/6}}/>
          </View>
          <View>
          <Text style={[styles.cim, {backgroundColor:'transparent', textAlign:'center', top:-width/7.3, marginLeft:width/40}]}>
              {'14'}
          </Text>
          </View>
          </TouchableOpacity>
          
          <TouchableOpacity style={{width:width/6, height:width/6}} onPress={()=> {Actions.hetrolHTML({tesztak: 272})}}>
          <View style={{width:width/6, height:width/6, backgroundColor:'transparent'}}>
            <Image
              source={require('../src/pirosalma.png')}
              style={{ zIndex:500, width:width/6, height:width/6}}/>
          </View>
          <View>
          <Text style={[styles.cim, {backgroundColor:'transparent', textAlign:'center', top:-width/7.3, marginLeft:width/40}]}>
              {'15'}
          </Text>
          </View>
          </TouchableOpacity>

      </View>   

      <View style={{justifyContent:'space-around', flexDirection:'row', marginTop:20}}>

        <TouchableOpacity style={{width:width/6, height:width/6}} onPress={()=> {Actions.hetrolHTML({tesztak: 273})}}>
          <View style={{width:width/6, height:width/6, backgroundColor:'transparent'}}>
            <Image
              source={require('../src/zoldalma.png')}
              style={{ zIndex:500, width:width/6, height:width/6}}/>
          </View>
          <View>
          <Text style={[styles.cim, {backgroundColor:'transparent', textAlign:'center', top:-width/7.3, marginLeft:width/40}]}>
              {'16'}
          </Text>
          </View>
          </TouchableOpacity>
          
          <TouchableOpacity style={{width:width/6, height:width/6}} onPress={()=> {Actions.hetrolHTML({tesztak: 274})}}>
          <View style={{width:width/6, height:width/6, backgroundColor:'transparent'}}>
            <Image
              source={require('../src/zoldalma.png')}
              style={{ zIndex:500, width:width/6, height:width/6}}/>
          </View>
          <View>
          <Text style={[styles.cim, {backgroundColor:'transparent', textAlign:'center', top:-width/7.3, marginLeft:width/40}]}>
              {'17'}
          </Text>
          </View>
          </TouchableOpacity>
          
          <TouchableOpacity style={{width:width/6, height:width/6}} onPress={()=> {Actions.hetrolHTML({tesztak: 275})}}>
          <View style={{width:width/6, height:width/6, backgroundColor:'transparent'}}>
            <Image
              source={require('../src/zoldalma.png')}
              style={{ zIndex:500, width:width/6, height:width/6}}/>
          </View>
          <View>
          <Text style={[styles.cim, {backgroundColor:'transparent', textAlign:'center', top:-width/7.3, marginLeft:width/40}]}>
              {'18'}
          </Text>
          </View>
          </TouchableOpacity>
          
          <TouchableOpacity style={{width:width/6, height:width/6}} onPress={()=> {Actions.hetrolHTML({tesztak: 276})}}>
          <View style={{width:width/6, height:width/6, backgroundColor:'transparent'}}>
            <Image
              source={require('../src/zoldalma.png')}
              style={{ zIndex:500, width:width/6, height:width/6}}/>
          </View>
          <View>
          <Text style={[styles.cim, {backgroundColor:'transparent', textAlign:'center', top:-width/7.3, marginLeft:width/40}]}>
              {'19'}
          </Text>
          </View>
          </TouchableOpacity>
          
          <TouchableOpacity style={{width:width/6, height:width/6}} onPress={()=> {Actions.hetrolHTML({tesztak: 277})}}>
          <View style={{width:width/6, height:width/6, backgroundColor:'transparent'}}>
            <Image
              source={require('../src/zoldalma.png')}
              style={{ zIndex:500, width:width/6, height:width/6}}/>
          </View>
          <View>
          <Text style={[styles.cim, {backgroundColor:'transparent', textAlign:'center', top:-width/7.3, marginLeft:width/40}]}>
              {'20'}
          </Text>
          </View>
          </TouchableOpacity>
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

          <TouchableOpacity onPress={()=> Actions.egyeb()}>
          <View style={styles.menu1}>
            <Image
              source={require('../src/menu/menuikonaktiv_egyeb.png')}
              style={{width:height/15, height:height/40}}/>
          </View>
          </TouchableOpacity>
        </View>
  </View>
    )
} else {
  return (
      <View style={styles.container}>
      <View style={{width:width, height:height/15, backgroundColor:'transparent', position:'absolute',zIndex:2132131231, flexDirection:'row', justifyContent:'flex-start', alignItems:'center'}}>
      <TouchableOpacity onPress={() => { Actions.pop()}}>
      <View style={{width:height/15, height:height/15, justifyContent:'center', alignItems:'center'}}>
        <Image
          source={require('../src/nyil_feher.png')}
          style={{width:31/3, height:58/3,  zIndex:2312132321312, marginLeft:10}}/>
            </View>

      </TouchableOpacity>
            <View>
              <Text style={[styles.HOME, {color:'white'}]}>
                
              </Text>
            </View>

        </View>
      <View>
      <Image
          source={require('../src/hatter_hetrolhetre.png')}
          style={{width:width, height:height/3, position:'absolute'}}/>
      </View>
      <View style={{justifyContent:'flex-end', alignItems:'flex-end', marginRight:width/5, marginTop:height/8}}>
          <Text style={[styles.cim, {position:'relative',backgroundColor:'transparent'}]}>
                  {'HÉTRŐL-HÉTRE'}
              </Text>
      </View>

        <View style={{justifyContent:'space-around', flexDirection:'row', marginTop:height/6, backgroundColor:'transparent'}}>

          <TouchableOpacity style={{width:width/6, height:width/6}} onPress={()=> {Actions.hetrolHTML({tesztak: 163})}}>
          <View style={{width:width/6, height:width/6, backgroundColor:'transparent'}}>
            <Image
              source={require('../src/kekalma.png')}
              style={{ zIndex:500, width:width/6, height:width/6}}/>
          </View>
          <View>
          <Text style={[styles.cim, {backgroundColor:'transparent', textAlign:'center', top:-width/10, marginLeft:width/40}]}>
              {'1'}
          </Text>
          </View>
          </TouchableOpacity>
         
          <TouchableOpacity style={{width:width/6, height:width/6}} onPress={()=> {Actions.hetrolHTML({tesztak: 164})}}>
          <View style={{width:width/6, height:width/6, backgroundColor:'transparent'}}>
            <Image
              source={require('../src/kekalma.png')}
              style={{ zIndex:500, width:width/6, height:width/6}}/>
          </View>
          <View>
          <Text style={[styles.cim, {backgroundColor:'transparent', textAlign:'center', top:-width/10, marginLeft:width/40}]}>
              {'2'}
          </Text>
          </View>
          </TouchableOpacity>
          
          <TouchableOpacity style={{width:width/6, height:width/6}} onPress={()=> {Actions.hetrolHTML({tesztak:165})}}>
          <View style={{width:width/6, height:width/6, backgroundColor:'transparent'}}>
            <Image
              source={require('../src/kekalma.png')}
              style={{ zIndex:500, width:width/6, height:width/6}}/>
          </View>
          <View>
          <Text style={[styles.cim, {backgroundColor:'transparent', textAlign:'center', top:-width/10, marginLeft:width/40}]}>
              {'3'}
          </Text>
          </View>
          </TouchableOpacity>
          
          <TouchableOpacity style={{width:width/6, height:width/6}} onPress={()=> {Actions.hetrolHTML({tesztak:166})}}>
          <View style={{width:width/6, height:width/6, backgroundColor:'transparent'}}>
            <Image
              source={require('../src/kekalma.png')}
              style={{ zIndex:500, width:width/6, height:width/6}}/>
          </View>
          <View>
          <Text style={[styles.cim, {backgroundColor:'transparent', textAlign:'center', top:-width/10, marginLeft:width/40}]}>
              {'4'}
          </Text>
          </View>
          </TouchableOpacity>
          
          <TouchableOpacity style={{width:width/6, height:width/6}} onPress={()=> {Actions.hetrolHTML({tesztak: 262})}}>
          <View style={{width:width/6, height:width/6, backgroundColor:'transparent'}}>
            <Image
              source={require('../src/kekalma.png')}
              style={{ zIndex:500, width:width/6, height:width/6}}/>
          </View>
          <View>
          <Text style={[styles.cim, {backgroundColor:'transparent', textAlign:'center', top:-width/10, marginLeft:width/40}]}>
              {'5'}
          </Text>
          </View>
          </TouchableOpacity>
        </View>


        <View style={{justifyContent:'space-around', flexDirection:'row', marginTop:20}}>

        <TouchableOpacity style={{width:width/6, height:width/6}} onPress={()=> {Actions.hetrolHTML({tesztak: 263})}}>
          <View style={{width:width/6, height:width/6, backgroundColor:'transparent'}}>
            <Image
              source={require('../src/sargaalma.png')}
              style={{ zIndex:500, width:width/6, height:width/6}}/>
          </View>
          <View>
          <Text style={[styles.cim, {backgroundColor:'transparent', textAlign:'center', top:-width/10, marginLeft:width/40}]}>
              {'6'}
          </Text>
          </View>
          </TouchableOpacity>
          
          <TouchableOpacity style={{width:width/6, height:width/6}} onPress={()=> {Actions.hetrolHTML({tesztak: 264})}}>
          <View style={{width:width/6, height:width/6, backgroundColor:'transparent'}}>
            <Image
              source={require('../src/sargaalma.png')}
              style={{ zIndex:500, width:width/6, height:width/6}}/>
          </View>
          <View>
          <Text style={[styles.cim, {backgroundColor:'transparent', textAlign:'center', top:-width/10, marginLeft:width/40}]}>
              {'7'}
          </Text>
          </View>
          </TouchableOpacity>
          
          <TouchableOpacity style={{width:width/6, height:width/6}} onPress={()=> {Actions.hetrolHTML({tesztak: 265})}}>
          <View style={{width:width/6, height:width/6, backgroundColor:'transparent'}}>
            <Image
              source={require('../src/sargaalma.png')}
              style={{ zIndex:500, width:width/6, height:width/6}}/>
          </View>
          <View>
          <Text style={[styles.cim, {backgroundColor:'transparent', textAlign:'center', top:-width/10, marginLeft:width/40}]}>
              {'8'}
          </Text>
          </View>
          </TouchableOpacity>
          
          <TouchableOpacity style={{width:width/6, height:width/6}} onPress={()=> {Actions.hetrolHTML({tesztak: 266})}}>
          <View style={{width:width/6, height:width/6, backgroundColor:'transparent'}}>
            <Image
              source={require('../src/sargaalma.png')}
              style={{ zIndex:500, width:width/6, height:width/6}}/>
          </View>
          <View>
          <Text style={[styles.cim, {backgroundColor:'transparent', textAlign:'center', top:-width/10, marginLeft:width/40}]}>
              {'9'}
          </Text>
          </View>
          </TouchableOpacity>
          
          <TouchableOpacity style={{width:width/6, height:width/6}} onPress={()=> {Actions.hetrolHTML({tesztak: 267})}}>
          <View style={{width:width/6, height:width/6, backgroundColor:'transparent'}}>
            <Image
              source={require('../src/sargaalma.png')}
              style={{ zIndex:500, width:width/6, height:width/6}}/>
          </View>
          <View>
          <Text style={[styles.cim, {backgroundColor:'transparent', textAlign:'center', top:-width/10, marginLeft:width/40}]}>
              {'10'}
          </Text>
          </View>
          </TouchableOpacity>

      </View>
        <View style={{justifyContent:'space-around', flexDirection:'row', marginTop:20}}>

        <TouchableOpacity style={{width:width/6, height:width/6}} onPress={()=> {Actions.hetrolHTML({tesztak: 268})}}>
          <View style={{width:width/6, height:width/6, backgroundColor:'transparent'}}>
            <Image
              source={require('../src/pirosalma.png')}
              style={{ zIndex:500, width:width/6, height:width/6}}/>
          </View>
          <View>
          <Text style={[styles.cim, {backgroundColor:'transparent', textAlign:'center', top:-width/10, marginLeft:width/40}]}>
              {'11'}
          </Text>
          </View>
          </TouchableOpacity>
          
          <TouchableOpacity style={{width:width/6, height:width/6}} onPress={()=> {Actions.hetrolHTML({tesztak: 269})}}>
          <View style={{width:width/6, height:width/6, backgroundColor:'transparent'}}>
            <Image
              source={require('../src/pirosalma.png')}
              style={{ zIndex:500, width:width/6, height:width/6}}/>
          </View>
          <View>
          <Text style={[styles.cim, {backgroundColor:'transparent', textAlign:'center', top:-width/10, marginLeft:width/40}]}>
              {'12'}
          </Text>
          </View>
          </TouchableOpacity>
          
          <TouchableOpacity style={{width:width/6, height:width/6}} onPress={()=> {Actions.hetrolHTML({tesztak: 270})}}>
          <View style={{width:width/6, height:width/6, backgroundColor:'transparent'}}>
            <Image
              source={require('../src/pirosalma.png')}
              style={{ zIndex:500, width:width/6, height:width/6}}/>
          </View>
          <View>
          <Text style={[styles.cim, {backgroundColor:'transparent', textAlign:'center', top:-width/10, marginLeft:width/40}]}>
              {'13'}
          </Text>
          </View>
          </TouchableOpacity>
          
          <TouchableOpacity style={{width:width/6, height:width/6}} onPress={()=> {Actions.hetrolHTML({tesztak: 271})}}>
          <View style={{width:width/6, height:width/6, backgroundColor:'transparent'}}>
            <Image
              source={require('../src/pirosalma.png')}
              style={{ zIndex:500, width:width/6, height:width/6}}/>
          </View>
          <View>
          <Text style={[styles.cim, {backgroundColor:'transparent', textAlign:'center', top:-width/10, marginLeft:width/40}]}>
              {'14'}
          </Text>
          </View>
          </TouchableOpacity>
          
          <TouchableOpacity style={{width:width/6, height:width/6}} onPress={()=> {Actions.hetrolHTML({tesztak: 272})}}>
          <View style={{width:width/6, height:width/6, backgroundColor:'transparent'}}>
            <Image
              source={require('../src/pirosalma.png')}
              style={{ zIndex:500, width:width/6, height:width/6}}/>
          </View>
          <View>
          <Text style={[styles.cim, {backgroundColor:'transparent', textAlign:'center', top:-width/10, marginLeft:width/40}]}>
              {'15'}
          </Text>
          </View>
          </TouchableOpacity>

      </View>   

      <View style={{justifyContent:'space-around', flexDirection:'row', marginTop:20}}>

        <TouchableOpacity style={{width:width/6, height:width/6}} onPress={()=> {Actions.hetrolHTML({tesztak: 273})}}>
          <View style={{width:width/6, height:width/6, backgroundColor:'transparent'}}>
            <Image
              source={require('../src/zoldalma.png')}
              style={{ zIndex:500, width:width/6, height:width/6}}/>
          </View>
          <View>
          <Text style={[styles.cim, {backgroundColor:'transparent', textAlign:'center', top:-width/10, marginLeft:width/40}]}>
              {'16'}
          </Text>
          </View>
          </TouchableOpacity>
          
          <TouchableOpacity style={{width:width/6, height:width/6}} onPress={()=> {Actions.hetrolHTML({tesztak: 274})}}>
          <View style={{width:width/6, height:width/6, backgroundColor:'transparent'}}>
            <Image
              source={require('../src/zoldalma.png')}
              style={{ zIndex:500, width:width/6, height:width/6}}/>
          </View>
          <View>
          <Text style={[styles.cim, {backgroundColor:'transparent', textAlign:'center', top:-width/10, marginLeft:width/40}]}>
              {'17'}
          </Text>
          </View>
          </TouchableOpacity>
          
          <TouchableOpacity style={{width:width/6, height:width/6}} onPress={()=> {Actions.hetrolHTML({tesztak: 275})}}>
          <View style={{width:width/6, height:width/6, backgroundColor:'transparent'}}>
            <Image
              source={require('../src/zoldalma.png')}
              style={{ zIndex:500, width:width/6, height:width/6}}/>
          </View>
          <View>
          <Text style={[styles.cim, {backgroundColor:'transparent', textAlign:'center', top:-width/10, marginLeft:width/40}]}>
              {'18'}
          </Text>
          </View>
          </TouchableOpacity>
          
          <TouchableOpacity style={{width:width/6, height:width/6}} onPress={()=> {Actions.hetrolHTML({tesztak: 276})}}>
          <View style={{width:width/6, height:width/6, backgroundColor:'transparent'}}>
            <Image
              source={require('../src/zoldalma.png')}
              style={{ zIndex:500, width:width/6, height:width/6}}/>
          </View>
          <View>
          <Text style={[styles.cim, {backgroundColor:'transparent', textAlign:'center', top:-width/10, marginLeft:width/40}]}>
              {'19'}
          </Text>
          </View>
          </TouchableOpacity>
          
          <TouchableOpacity style={{width:width/6, height:width/6}} onPress={()=> {Actions.hetrolHTML({tesztak: 277})}}>
          <View style={{width:width/6, height:width/6, backgroundColor:'transparent'}}>
            <Image
              source={require('../src/zoldalma.png')}
              style={{ zIndex:500, width:width/6, height:width/6}}/>
          </View>
          <View>
          <Text style={[styles.cim, {backgroundColor:'transparent', textAlign:'center', top:-width/10, marginLeft:width/40}]}>
              {'20'}
          </Text>
          </View>
          </TouchableOpacity>
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

          <TouchableOpacity onPress={()=> Actions.egyeb()}>
          <View style={styles.menu1}>
            <Image
              source={require('../src/menu/menuikonaktiv_egyeb.png')}
              style={{width:height/15, height:height/40}}/>
          </View>
          </TouchableOpacity>
        </View>
  </View>

)}
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
