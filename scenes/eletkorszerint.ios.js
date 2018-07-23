
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
  Button
} from 'react-native';

//import Firsttime from './firsttime';
import Swiper from 'react-native-swiper';




import api from '../utilities/api'
//import Noti from './noti'
import {
  Actions
} from 'react-native-router-flux';


import Moment from 'moment';
const Unix = require('../utilities/unixHome');



const instructions = Platform.select({
});

export default class Special extends Component<{}> {

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
      index: props.index,
      hathonap:[],
      hetkilenchonap:[],
      tiztizenkettohonap:[],
      tizenkettohonap:[],
      husmentes:[],
      alacsonykaloria:[],

    }
    this.dataSource = new ListView.DataSource({rowHasChanged:(r1,r2) => r1.guid != r2.guid});
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
    
    api.gethathonap().then((hathonap) => {

      this.setState({
        hathonap: hathonap.list.reverse(),
      })
    })
   
    api.gethetkilenchonap().then((hetkilenchonap) => {

      this.setState({
        hetkilenchonap: hetkilenchonap.list.reverse(),
      })
    })
   
    api.gettiztizenkettohonap().then((tiztizenkettohonap) => {

      this.setState({
        tiztizenkettohonap: tiztizenkettohonap.list.reverse(),
      })
    })
   
    api.gettizenkettohonap().then((tizenkettohonap) => {

      this.setState({
        tizenkettohonap: tizenkettohonap.list.reverse(),
      })
    })

  }

    jumpToSlide(value) {
    this.swiper.scrollBy(value);
}




  render() {
    var {height, width} = Dimensions.get('window');
    var facebook = 'https://www.facebook.com/';
    var instagram = 'https://www.instagram.com/';
    var pinterest = 'http://pinterest.com';
    //console.log(this.state.message);


    const switchTwoValue = this.state.switchTwoValue;
    return (
      <View style={styles.container}>
        <View style={{width:width, height:height/15, backgroundColor:'#00b8ac', flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
            <View>
              <Text style={[styles.HOME, {color:'white'}]}>
                {'RECEPTEK'}
              </Text>
            </View>
        </View>

          <Swiper
              ref={(component) => { this.swiper = component; }}
              style={styles.wrapper,{zIndex:50313}}
              dot={(<View style={{backgroundColor:'rgba(0,0,0,.2)', width: 8, height: 8,borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: height/11*-1, marginBottom: 3,}} />)}
              activeDot={(<View style={{backgroundColor:'#00b8ac', width: 8, height: 8,borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: height/11*-1, marginBottom: 3,}} />)}
              autoplay={false}
              index={this.state.index}
              loop={false}>

            <View style={styles.slide}>
              <View style={{width:width, height:height/8, backgroundColor:"#f0d886",  justifyContent:'space-around'}}>
              <View style={{flexDirection:'row', justifyContent:'space-around', alignItems:'center'}}>
                <TouchableOpacity onPress={()=> {this.setState({index:0})}}>
                   <View style={{backgroundColor:'white', borderWidth:5, borderRadius:100, borderColor:'white', zIndex:-100}}>
                     <Text style={styles.nameText}>
                       {'6 Hónapos'}
                     </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=> {this.setState({index:1})}}>
                   <View style={{margin:'auto'}}>
                     <Text style={styles.nameText}>
                       {'7-9 Hónapos'}
                     </Text>
                    </View>
                </TouchableOpacity>


                <TouchableOpacity onPress={()=> {this.setState({index:2})}}>
                   <View style={{margin:'auto'}}>
                     <Text style={styles.nameText}>
                       {'10-12 Hónapos'}
                     </Text>
                    </View>
                </TouchableOpacity>

              
                <TouchableOpacity onPress={()=> {this.setState({index:3})}}>
                   <View style={{margin:'auto'}}>
                     <Text style={styles.nameText}>
                       {'12+ Hónapos'}
                     </Text>
                    </View>
                </TouchableOpacity>
              


                </View>
                </View>
                <ScrollView style={{backgroundColor:'white'}}>
                <ListView
            dataSource={this.dataSource.cloneWithRows(this.state.hathonap)}
            enableEmptySections={true}
            stickyHeaderIndices={[10]}
            initialListSize={0}
            contentContainerStyle={styles.list}
            scrollEnabled={true}
            pageSize={2}
            column={2}
            renderRow={ (rowData, sectionID, rowID, highlightRow)=> (
            <View numberOfLines={1} style={{backgroundColor:'white'}}>
              <View style={{marginTop:10}}>
              <TouchableOpacity onPress={() => {Actions.receptekHTML({ tesztak: rowData.id})}}>
              <View style={{backgroundColor:"#dff7f5", width:width/2-10, height:height/4, borderRadius:10}}>
                <Image
                  source={{uri:rowData.imageUrl}}
                  style={{width:width/2-10, height:height/6, zIndex:100, borderRadius:10}}/>
                <Text numberOfLines={2} style={[styles.cim, {color:'#17776f', marginLeft:5, paddingTop:2, paddingBottom:2, textAlign:'center', fontSize:16}]}>
                  {rowData.title}
                </Text>
              </View>
              </TouchableOpacity>

              </View>
              </View>
              )}>
          </ListView>
              <View style={{height:100}}/>

        </ScrollView> 
          </View>


            <View style={styles.slide}>
              <View style={{width:width, height:height/8, backgroundColor:"#f0d886",  justifyContent:'space-around'}}>
              <View style={{flexDirection:'row', justifyContent:'space-around', alignItems:'center'}}>
                <TouchableOpacity onPress={()=> {this.setState({index:0})}}>
                   <View style={{margin:'auto'}}>
                     <Text style={styles.nameText}>
                       {'6 Hónapos'}
                     </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=> {this.setState({index:1})}}>
                   <View style={{backgroundColor:'white', borderWidth:5, borderRadius:100, borderColor:'white', zIndex:-100}}>
                     <Text style={styles.nameText}>
                       {'7-9 Hónapos'}
                     </Text>
                    </View>
                </TouchableOpacity>


                <TouchableOpacity onPress={()=> {this.setState({index:2})}}>
                   <View style={{margin:'auto'}}>
                     <Text style={styles.nameText}>
                       {'10-12 Hónapos'}
                     </Text>
                    </View>
                </TouchableOpacity>
              

                <TouchableOpacity onPress={()=> {this.setState({index:3})}}>
                   <View style={{margin:'auto'}}>
                     <Text style={styles.nameText}>
                       {'12+ Hónapos'}
                     </Text>
                    </View>
                </TouchableOpacity>
                


                </View>
                </View>
                <ScrollView style={{backgroundColor:'white'}}>
                <ListView
            dataSource={this.dataSource.cloneWithRows(this.state.hetkilenchonap)}
            enableEmptySections={true}
            stickyHeaderIndices={[10]}
            initialListSize={0}
            contentContainerStyle={styles.list}
            scrollEnabled={true}
            pageSize={2}
            column={2}
            renderRow={ (rowData, sectionID, rowID, highlightRow)=> (
            <View numberOfLines={1} style={{backgroundColor:'white'}}>
              <View style={{marginTop:10}}>
              <TouchableOpacity onPress={() => {Actions.receptekHTML({ tesztak: rowData.id})}}>
              <View style={{backgroundColor:"#dff7f5", width:width/2-10, height:height/4, borderRadius:10}}>
                <Image
                  source={{uri:rowData.imageUrl}}
                  style={{width:width/2-10, height:height/6, zIndex:100, borderRadius:10}}/>
                <Text numberOfLines={2} style={[styles.cim, {color:'#17776f', marginLeft:5, paddingTop:2, paddingBottom:2, textAlign:'center', fontSize:16}]}>
                  {rowData.title}
                </Text>
              </View>
              </TouchableOpacity>

              </View>
              </View>
              )}>
          </ListView>
              <View style={{height:100}}/>

        </ScrollView> 
          </View>


            <View style={styles.slide}>
              <View style={{width:width, height:height/8, backgroundColor:"#f0d886",  justifyContent:'space-around'}}>
              <View style={{flexDirection:'row', justifyContent:'space-around', alignItems:'center'}}>
                <TouchableOpacity onPress={()=> {this.setState({index:0})}}>
                   <View style={{margin:'auto'}}>
                     <Text style={styles.nameText}>
                       {'6 Hónapos'}
                     </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=> {this.setState({index:1})}}>
                   <View style={{margin:'auto'}}>
                     <Text style={styles.nameText}>
                       {'7-9 Hónapos'}
                     </Text>
                    </View>
                </TouchableOpacity>


                <TouchableOpacity onPress={()=> {this.setState({index:2})}}>
                   <View style={{backgroundColor:'white', borderWidth:5, borderRadius:100, borderColor:'white', zIndex:-100}}>
                     <Text style={styles.nameText}>
                       {'10-12 Hónapos'}
                     </Text>
                    </View>
                </TouchableOpacity>
                           

                <TouchableOpacity onPress={()=> {this.setState({index:3})}}>
                   <View style={{margin:'auto'}}>
                     <Text style={styles.nameText}>
                       {'12+ Hónapos'}
                     </Text>
                    </View>
                </TouchableOpacity>
                


                </View>
                </View>
               <ScrollView style={{backgroundColor:'white'}}>
                <ListView
            dataSource={this.dataSource.cloneWithRows(this.state.tiztizenkettohonap)}
            enableEmptySections={true}
            stickyHeaderIndices={[10]}
            initialListSize={0}
            contentContainerStyle={styles.list}
            scrollEnabled={true}
            pageSize={2}
            column={2}
            renderRow={ (rowData, sectionID, rowID, highlightRow)=> (
            <View numberOfLines={1} style={{backgroundColor:'white'}}>
              <View style={{marginTop:10}}>
              <TouchableOpacity onPress={() => {Actions.receptekHTML({ tesztak: rowData.id})}}>
              <View style={{backgroundColor:"#dff7f5", width:width/2-10, height:height/4, borderRadius:10}}>
                <Image
                  source={{uri:rowData.imageUrl}}
                  style={{width:width/2-10, height:height/6, zIndex:100, borderRadius:10}}/>
                <Text numberOfLines={2} style={[styles.cim, {color:'#17776f', marginLeft:5, paddingTop:2, paddingBottom:2, textAlign:'center', fontSize:16}]}>
                  {rowData.title}
                </Text>
              </View>
              </TouchableOpacity>

              </View>
              </View>
              )}>
          </ListView>
              <View style={{height:100}}/>

        </ScrollView> 
          </View>


            <View style={styles.slide}>
              <View style={{width:width, height:height/8, backgroundColor:"#f0d886",  justifyContent:'space-around'}}>
              <View style={{flexDirection:'row', justifyContent:'space-around', alignItems:'center'}}>
                <TouchableOpacity onPress={()=> {this.setState({index:0})}}>
                   <View style={{margin:'auto'}}>
                     <Text style={styles.nameText}>
                       {'6 Hónapos'}
                     </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=> {this.setState({index:1})}}>
                   <View style={{margin:'auto'}}>
                     <Text style={styles.nameText}>
                       {'7-9 Hónapos'}
                     </Text>
                    </View>
                </TouchableOpacity>


                <TouchableOpacity onPress={()=> {this.setState({index:2})}}>
                   <View style={{margin:'auto'}}>
                     <Text style={styles.nameText}>
                       {'10-12 Hónapos'}
                     </Text>
                    </View>
                </TouchableOpacity>
             

                <TouchableOpacity onPress={()=> {this.setState({index:3})}}>
                   <View style={{backgroundColor:'white', borderWidth:5, borderRadius:100, borderColor:'white', zIndex:-100}}>
                     <Text style={styles.nameText}>
                       {'12+ Hónapos'}
                     </Text>
                    </View>
                </TouchableOpacity>
                



                </View>
                </View>
                <ScrollView style={{backgroundColor:'white'}}>
                <ListView
            dataSource={this.dataSource.cloneWithRows(this.state.tizenkettohonap)}
            enableEmptySections={true}
            stickyHeaderIndices={[10]}
            initialListSize={0}
            contentContainerStyle={styles.list}
            scrollEnabled={true}
            pageSize={2}
            column={2}
            renderRow={ (rowData, sectionID, rowID, highlightRow)=> (
            <View numberOfLines={1} style={{backgroundColor:'white'}}>
              <View style={{marginTop:10}}>
              <TouchableOpacity onPress={() => {Actions.receptekHTML({ tesztak: rowData.id})}}>
              <View style={{backgroundColor:"#dff7f5", width:width/2-10, height:height/4, borderRadius:10}}>
                <Image
                  source={{uri:rowData.imageUrl}}
                  style={{width:width/2-10, height:height/6, zIndex:100, borderRadius:10}}/>
                <Text numberOfLines={2} style={[styles.cim, {color:'#17776f', marginLeft:5, paddingTop:2, paddingBottom:2, textAlign:'center', fontSize:16}]}>
                  {rowData.title}
                </Text>
              </View>
              </TouchableOpacity>

              </View>
              </View>
              )}>
          </ListView>
              <View style={{height:100}}/>

        </ScrollView> 

          </View>





              </Swiper>




        <View style={[styles.menu, {width:width, height:height/12}]}>
        <TouchableOpacity onPress={()=> Actions.home()}>
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
              source={require('../src/menu/menuikonaktiv_receptek.png')}
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
              source={require('../src/menu/menuikon_egyeb.png')}
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

  slide: {
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
    fontSize: 17,
    textAlign: 'center',
    color:'black',
    fontFamily:'AmaticSC-Bold'
  },

  cim: {
    fontSize: 16,
    textAlign: 'left',
    color:'white',
    borderBottomLeftRadius:10,
    borderBottomRightRadius:10,
    fontFamily:'AmaticSC-Bold'
  },

  HOME: {
    fontSize: 16,
    textAlign:'center',
    color:'white',

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
