
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
const Unix = require('../utilities/unix');





const instructions = Platform.select({
});

export default class Receptek extends Component<{}> {

  constructor(props) {
    super(props);
    this.state={
      postCover:[],
      news:[],
      dataSource: [],
      event:[],

    }
    this.dataSource = new ListView.DataSource({rowHasChanged:(r1,r2) => r1.guid != r2.guid});    
    
  }
  componentWillUnmount() {
        clearInterval(this.interval);
    }

  componentWillMount () {
   api.getEvent().then((event) => {
      this.setState({
        event: event.list.reverse(),
      })
    })

  }


  render() {
    var {height, width} = Dimensions.get('window');
    console.log(this.state.event);
    return (
      <View style={styles.container}>
      <View>
      <Image
          source={require('../src/hatter_esemeny.png')}
          style={{width:width, height:height/3, position:'absolute'}}/>
      </View>
      <View style={{width:width, height:height/15, backgroundColor:'transparent', flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
            
            <TouchableOpacity onPress={()=> Actions.pop()}>
            <View style={{width:height/15, height:height/15, justifyContent:'center', alignItems:'center'}}>
        <Image
          source={require('../src/nyil_feher.png')}
          style={{width:31/3, height:58/3,  zIndex:2312132321312, marginLeft:10}}/>
            </View>
          </TouchableOpacity>
          <View>
              <Text style={[styles.HOME, {color:'white'}]}>
                {''}
              </Text>
            </View>
            <View>
              <Text style={[styles.HOME, {color:'white'}]}>
                {''}
              </Text>
            </View>
        </View>
      <View style={{justifyContent:'center', alignItems:'center',  marginTop:height/14}}>
          <Text style={[styles.cim, {position:'relative',backgroundColor:'transparent'}]}>
                  {'ESEMÉNYEK'}
              </Text>
      </View>

        
      <View style={{flex:1, backgroundColor:'transparent', marginTop:height/14, borderRadius:10}}>
        <View style={{backgroundColor:'transparent', marginTop:0, marginBottom:30}}>
                       <ListView
            dataSource={this.dataSource.cloneWithRows(this.state.event)}
            enableEmptySections={true}
            stickyHeaderIndices={[10]}
            initialListSize={0}
            scrollEnabled={true}
            pageSize={2}
            column={2}
            renderRow={ (rowData, sectionID, rowID, highlightRow)=> (
            <View numberOfLines={2} style={{backgroundColor:'transparent', zIndex:12102102}}>
          <TouchableOpacity onPress={()=> Actions.esemenyekreszletes({id:rowData.id})}>
            <View style={{justifyContent:'center', alignItems:'center', borderRadius:10}}>
              <View style={{width:width-20, height:height/4}}>
                <Image
                  source={{uri:rowData.imageUrl}}
                  style={{width:width-20, height:height/4, zIndex:100, borderRadius:10}}/>
              </View>
              </View>
            </TouchableOpacity>
             <View style={{flexDirection:'row',alignItems:'center', width:width-40}}>
            <View>
              <Text style={{color:'red', fontSize:40, textAlign:'center', fontFamily:'AmaticSC-Bold', marginLeft:10, marginRight:10}}>
            <Unix time={rowData.date/1000} format='event' component={Text} />              
            </Text>
            </View>
              <View style={{justifyContent:'flex-start', marginLeft:10}}>
                <View>
                  <Text numberOfLines={2} style={[styles.event, {fontSize:20, marginRight:width/4}]}>
                    {rowData.title}
                  </Text>
                </View>
                <View style={{marginTop:10}}>
                <Text style={styles.event}>
                    {rowData.address}
                  </Text>
                </View>
              </View>
            </View>
            <View style={{justifyContent:'center', alignItems:'center'}}>
            <View style={{margin:10, width:width-50, height:0.3, backgroundColor:'gray', borderRadius:20}}/>
            </View>
            </View>
)}>
          </ListView>
            </View>
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
    textAlign: 'left',
    color:'black',
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
