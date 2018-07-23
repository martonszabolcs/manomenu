
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
  Button,
  RefreshControl,
} from 'react-native';

//import Firsttime from './firsttime';
import Swiper from 'react-native-swiper';
//import Swiper from 'react-native-swiper-animated';

//import Swiper from 'react-native-page-swiper'




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
      index: 0,
      szulinap: [],
      farsang: [],
      husvet: [],
      halloween: [],
      mikulas: [],
      karacsony: [],
      szilveszer: [],
      gyereknap: [],


    }
    this.dataSource = new ListView.DataSource({rowHasChanged:(r1,r2) => r1.guid != r2.guid});
  }


    componentDidMount() {
          this.forceUpdate()

    console.log('component mounted');
    Linking.getInitialURL().then((url) => {
    if (url) {
      console.log('Initial url is: ' + url);
    }
  }).catch(err => console.error('An error occurred', err));
  }

    componentWillMount () {
    api.getSzulinap().then((szulinap) => {

      this.setState({
        szulinap: szulinap.list.reverse(),
      })
    })
 
 api.getFarsang().then((farsang) => {

      this.setState({
        farsang: farsang.list.reverse(),
      })
    })

 api.getHusvet().then((husvet) => {

      this.setState({
        husvet: husvet.list.reverse(),
      })
    })

 api.getHalloween().then((halloween) => {

      this.setState({
        halloween: halloween.list.reverse(),
      })
    })

 api.getMikulas().then((mikulás) => {

      this.setState({
        mikulás: mikulás.list.reverse(),
      })
    })

 api.getKaracsony().then((karacsony) => {

      this.setState({
        karacsony: karacsony.list.reverse(),
      })
    })

 api.getSzilveszter().then((szilveszer) => {

      this.setState({
        szilveszer: szilveszer.list.reverse(),
      })
    })

 api.getGyereknap().then((gyereknap) => {

      this.setState({
        gyereknap: gyereknap.list.reverse(),
      })
    })

  }

    

  render() {
    this.state.index;
    var {height, width} = Dimensions.get('window');


    const switchTwoValue = this.state.switchTwoValue;
    return (
      <View style={styles.container}>
       <View style={{width:width, height:height/15, backgroundColor:'#00b8ac', flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
            <TouchableOpacity onPress={() => { Actions.pop()}}>
      <View style={{width:height/15, height:height/15, justifyContent:'center', alignItems:'center'}}>
        <Image
          source={require('../src/nyil_feher.png')}
          style={{width:31/3, height:58/3,  zIndex:2312132321312, marginLeft:10}}/>
            </View>

      </TouchableOpacity>
            <View>
              <Text style={styles.HOME}>
                {'RECEPTEK'}
              </Text>
            </View>
            <View style={{width:31/3, height:58/3,  zIndex:100, left:10}}/>
 
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
                       {'SZÜLINAP'}
                     </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=> {this.setState({index:1})}}>
                   <View style={{margin:'auto'}}>
                     <Text style={styles.nameText}>
                       {'FARSANG'}
                     </Text>
                    </View>
                </TouchableOpacity>


                <TouchableOpacity onPress={()=> {this.setState({index:2})}}>
                   <View style={{margin:'auto'}}>
                     <Text style={styles.nameText}>
                       {'HÚSVÉT'}
                     </Text>
                    </View>
                </TouchableOpacity>


                <TouchableOpacity onPress={()=> {this.setState({index:3})}}>
                   <View style={{margin:'auto'}}>
                     <Text style={styles.nameText}>
                       {'HALLOWEEN'}
                     </Text>
                    </View>
                </TouchableOpacity>
                </View>
              <View style={{flexDirection:'row', justifyContent:'space-around', alignItems:'center', backgroundColor:'transparent'}}>
                <TouchableOpacity onPress={()=> {this.setState({index:4})}}>
                   <View style={{margin:'auto'}}>
                     <Text style={styles.nameText}>
                       {'MIKULÁS'}
                     </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=> {this.setState({index:5})}}>
                   <View style={{margin:'auto'}}>
                     <Text style={styles.nameText}>
                       {'KARÁCSONY'}
                     </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=> {this.setState({index:6})}}>
                   <View style={{margin:'auto'}}>
                     <Text style={styles.nameText}>
                       {'SZILVESZTER'}
                     </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=> {this.setState({index:7})}}>
                   <View style={{margin:'auto'}}>
                     <Text style={styles.nameText}>
                       {'GYEREKNAP'}
                     </Text>
                    </View>
                </TouchableOpacity>

                </View>
                </View>
                <ScrollView style={{backgroundColor:'white'}}>
                <ListView
            dataSource={this.dataSource.cloneWithRows(this.state.szulinap)}
            enableEmptySections={true}
            initialListSize={10}
            contentContainerStyle={styles.list}
            scrollEnabled={true}
            removeClippedSubviews={true}
            pageSize={10}
            //column={2}
            renderRow={ (rowData, sectionID, rowID, highlightRow)=> (
            <View numberOfLines={1} style={{backgroundColor:'white'}}>
              <View style={{marginTop:10}}>
              <TouchableOpacity onPress={() => {Actions.receptekHTML({ tesztak: rowData.id})}}>
              <View style={{backgroundColor:"#dff7f5", width:width/2-10, height:height/4, borderRadius:10}}>
                <Image
                resizeMethod="resize"
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
                       {'SZÜLINAP'}
                     </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=> {this.setState({index:1})}}>
                   <View style={{backgroundColor:'white', borderWidth:5, borderRadius:100, borderColor:'white', zIndex:-100}}>
                     <Text style={styles.nameText}>
                       {'FARSANG'}
                     </Text>
                    </View>
                </TouchableOpacity>


                <TouchableOpacity onPress={()=> {this.setState({index:2})}}>
                   <View style={{margin:'auto'}}>
                     <Text style={styles.nameText}>
                       {'HÚSVÉT'}
                     </Text>
                    </View>
                </TouchableOpacity>


                <TouchableOpacity onPress={()=> {this.setState({index:3})}}>
                   <View style={{margin:'auto'}}>
                     <Text style={styles.nameText}>
                       {'HALLOWEEN'}
                     </Text>
                    </View>
                </TouchableOpacity>
                </View>
              <View style={{flexDirection:'row', justifyContent:'space-around', alignItems:'center', backgroundColor:'transparent'}}>
                <TouchableOpacity onPress={()=> {this.setState({index:4})}}>
                   <View style={{margin:'auto'}}>
                     <Text style={styles.nameText}>
                       {'MIKULÁS'}
                     </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=> {this.setState({index:5})}}>
                   <View style={{margin:'auto'}}>
                     <Text style={styles.nameText}>
                       {'KARÁCSONY'}
                     </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=> {this.setState({index:6})}}>
                   <View style={{margin:'auto'}}>
                     <Text style={styles.nameText}>
                       {'SZILVESZTER'}
                     </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=> {this.setState({index:7})}}>
                   <View style={{margin:'auto'}}>
                     <Text style={styles.nameText}>
                       {'GYEREKNAP'}
                     </Text>
                    </View>
                </TouchableOpacity>

                </View>
                </View>
                <ScrollView style={{backgroundColor:'white'}}>
                <ListView
            dataSource={this.dataSource.cloneWithRows(this.state.farsang)}
            enableEmptySections={true}
            initialListSize={10}
            contentContainerStyle={styles.list}
            scrollEnabled={true}
            removeClippedSubviews={true}
            pageSize={10}
            //column={2}
            renderRow={ (rowData, sectionID, rowID, highlightRow)=> (
            <View numberOfLines={1} style={{backgroundColor:'white'}}>
              <View style={{marginTop:10}}>
              <TouchableOpacity onPress={() => {Actions.receptekHTML({ tesztak: rowData.id})}}>
              <View style={{backgroundColor:"#dff7f5", width:width/2-10, height:height/4, borderRadius:10}}>
                <Image
                resizeMethod="resize"
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
                       {'SZÜLINAP'}
                     </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=> {this.setState({index:1})}}>
                   <View style={{margin:'auto'}}>
                     <Text style={styles.nameText}>
                       {'FARSANG'}
                     </Text>
                    </View>
                </TouchableOpacity>


                <TouchableOpacity onPress={()=> {this.setState({index:2})}}>
                   <View style={{backgroundColor:'white', borderWidth:5, borderRadius:100, borderColor:'white', zIndex:-100}}>
                     <Text style={styles.nameText}>
                       {'HÚSVÉT'}
                     </Text>
                    </View>
                </TouchableOpacity>


                <TouchableOpacity onPress={()=> {this.setState({index:3})}}>
                   <View style={{margin:'auto'}}>
                     <Text style={styles.nameText}>
                       {'HALLOWEEN'}
                     </Text>
                    </View>
                </TouchableOpacity>
                </View>
              <View style={{flexDirection:'row', justifyContent:'space-around', alignItems:'center', backgroundColor:'transparent'}}>
                <TouchableOpacity onPress={()=> {this.setState({index:4})}}>
                   <View style={{margin:'auto'}}>
                     <Text style={styles.nameText}>
                       {'MIKULÁS'}
                     </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=> {this.setState({index:5})}}>
                   <View style={{margin:'auto'}}>
                     <Text style={styles.nameText}>
                       {'KARÁCSONY'}
                     </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=> {this.setState({index:6})}}>
                   <View style={{margin:'auto'}}>
                     <Text style={styles.nameText}>
                       {'SZILVESZTER'}
                     </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=> {this.setState({index:7})}}>
                   <View style={{margin:'auto'}}>
                     <Text style={styles.nameText}>
                       {'GYEREKNAP'}
                     </Text>
                    </View>
                </TouchableOpacity>

                </View>
                </View>
                <ScrollView style={{backgroundColor:'white'}}>
                <ListView
            dataSource={this.dataSource.cloneWithRows(this.state.husvet)}
            enableEmptySections={true}
            initialListSize={10}
            contentContainerStyle={styles.list}
            scrollEnabled={true}
            removeClippedSubviews={true}
            pageSize={10}
            //column={2}
            renderRow={ (rowData, sectionID, rowID, highlightRow)=> (
            <View numberOfLines={1} style={{backgroundColor:'white'}}>
              <View style={{marginTop:10}}>
              <TouchableOpacity onPress={() => {Actions.receptekHTML({ tesztak: rowData.id})}}>
              <View style={{backgroundColor:"#dff7f5", width:width/2-10, height:height/4, borderRadius:10}}>
                <Image
                resizeMethod="resize"
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
                       {'SZÜLINAP'}
                     </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=> {this.setState({index:1})}}>
                   <View style={{margin:'auto'}}>
                     <Text style={styles.nameText}>
                       {'FARSANG'}
                     </Text>
                    </View>
                </TouchableOpacity>


                <TouchableOpacity onPress={()=> {this.setState({index:2})}}>
                   <View style={{margin:'auto'}}>
                     <Text style={styles.nameText}>
                       {'HÚSVÉT'}
                     </Text>
                    </View>
                </TouchableOpacity>


                <TouchableOpacity onPress={()=> {this.setState({index:3})}}>
                   <View style={{backgroundColor:'white', borderWidth:5, borderRadius:100, borderColor:'white', zIndex:-100}}>
                     <Text style={styles.nameText}>
                       {'HALLOWEEN'}
                     </Text>
                    </View>
                </TouchableOpacity>
                </View>
              <View style={{flexDirection:'row', justifyContent:'space-around', alignItems:'center', backgroundColor:'transparent'}}>
                <TouchableOpacity onPress={()=> {this.setState({index:4})}}>
                   <View style={{margin:'auto'}}>
                     <Text style={styles.nameText}>
                       {'MIKULÁS'}
                     </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=> {this.setState({index:5})}}>
                   <View style={{margin:'auto'}}>
                     <Text style={styles.nameText}>
                       {'KARÁCSONY'}
                     </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=> {this.setState({index:6})}}>
                   <View style={{margin:'auto'}}>
                     <Text style={styles.nameText}>
                       {'SZILVESZTER'}
                     </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=> {this.setState({index:7})}}>
                   <View style={{margin:'auto'}}>
                     <Text style={styles.nameText}>
                       {'GYEREKNAP'}
                     </Text>
                    </View>
                </TouchableOpacity>

                </View>
                </View>
                 <ScrollView style={{backgroundColor:'white'}}>
                <ListView
            dataSource={this.dataSource.cloneWithRows(this.state.halloween)}
            enableEmptySections={true}
            initialListSize={10}
            contentContainerStyle={styles.list}
            scrollEnabled={true}
            removeClippedSubviews={true}
            pageSize={10}
            //column={2}
            renderRow={ (rowData, sectionID, rowID, highlightRow)=> (
            <View numberOfLines={1} style={{backgroundColor:'white'}}>
              <View style={{marginTop:10}}>
              <TouchableOpacity onPress={() => {Actions.receptekHTML({ tesztak: rowData.id})}}>
              <View style={{backgroundColor:"#dff7f5", width:width/2-10, height:height/4, borderRadius:10}}>
                <Image
                resizeMethod="resize"
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
                       {'SZÜLINAP'}
                     </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=> {this.setState({index:1})}}>
                   <View style={{margin:'auto'}}>
                     <Text style={styles.nameText}>
                       {'FARSANG'}
                     </Text>
                    </View>
                </TouchableOpacity>


                <TouchableOpacity onPress={()=> {this.setState({index:2})}}>
                   <View style={{margin:'auto'}}>
                     <Text style={styles.nameText}>
                       {'HÚSVÉT'}
                     </Text>
                    </View>
                </TouchableOpacity>


                <TouchableOpacity onPress={()=> {this.setState({index:3})}}>
                   <View style={{margin:'auto'}}>
                     <Text style={styles.nameText}>
                       {'HALLOWEEN'}
                     </Text>
                    </View>
                </TouchableOpacity>
                </View>
              <View style={{flexDirection:'row', justifyContent:'space-around', alignItems:'center', backgroundColor:'transparent'}}>
                <TouchableOpacity onPress={()=> {this.setState({index:4})}}>
                   <View style={{backgroundColor:'white', borderWidth:5, borderRadius:100, borderColor:'white', zIndex:-100}}>
                     <Text style={styles.nameText}>
                       {'MIKULÁS'}
                     </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=> {this.setState({index:5})}}>
                   <View style={{margin:'auto'}}>
                     <Text style={styles.nameText}>
                       {'KARÁCSONY'}
                     </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=> {this.setState({index:6})}}>
                   <View style={{margin:'auto'}}>
                     <Text style={styles.nameText}>
                       {'SZILVESZTER'}
                     </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=> {this.setState({index:7})}}>
                   <View style={{margin:'auto'}}>
                     <Text style={styles.nameText}>
                       {'GYEREKNAP'}
                     </Text>
                    </View>
                </TouchableOpacity>

                </View>
                </View>
                 <ScrollView style={{backgroundColor:'white'}}>
                <ListView
            dataSource={this.dataSource.cloneWithRows(this.state.mikulas)}
            enableEmptySections={true}
            initialListSize={10}
            contentContainerStyle={styles.list}
            scrollEnabled={true}
            removeClippedSubviews={true}
            pageSize={10}
            //column={2}
            renderRow={ (rowData, sectionID, rowID, highlightRow)=> (
            <View numberOfLines={1} style={{backgroundColor:'white'}}>
              <View style={{marginTop:10}}>
              <TouchableOpacity onPress={() => {Actions.receptekHTML({ tesztak: rowData.id})}}>
              <View style={{backgroundColor:"#dff7f5", width:width/2-10, height:height/4, borderRadius:10}}>
                <Image
                resizeMethod="resize"
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
                       {'SZÜLINAP'}
                     </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=> {this.setState({index:1})}}>
                   <View style={{margin:'auto'}}>
                     <Text style={styles.nameText}>
                       {'FARSANG'}
                     </Text>
                    </View>
                </TouchableOpacity>


                <TouchableOpacity onPress={()=> {this.setState({index:2})}}>
                   <View style={{margin:'auto'}}>
                     <Text style={styles.nameText}>
                       {'HÚSVÉT'}
                     </Text>
                    </View>
                </TouchableOpacity>


                <TouchableOpacity onPress={()=> {this.setState({index:3})}}>
                   <View style={{margin:'auto'}}>
                     <Text style={styles.nameText}>
                       {'HALLOWEEN'}
                     </Text>
                    </View>
                </TouchableOpacity>
                </View>
              <View style={{flexDirection:'row', justifyContent:'space-around', alignItems:'center', backgroundColor:'transparent'}}>
                <TouchableOpacity onPress={()=> {this.setState({index:4})}}>
                   <View style={{margin:'auto'}}>
                     <Text style={styles.nameText}>
                       {'MIKULÁS'}
                     </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=> {this.setState({index:5})}}>
                   <View style={{backgroundColor:'white', borderWidth:5, borderRadius:100, borderColor:'white', zIndex:-100}}>
                     <Text style={styles.nameText}>
                       {'KARÁCSONY'}
                     </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=> {this.setState({index:6})}}>
                   <View style={{margin:'auto'}}>
                     <Text style={styles.nameText}>
                       {'SZILVESZTER'}
                     </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=> {this.setState({index:7})}}>
                   <View style={{margin:'auto'}}>
                     <Text style={styles.nameText}>
                       {'GYEREKNAP'}
                     </Text>
                    </View>
                </TouchableOpacity>

                </View>
                </View>
                 <ScrollView style={{backgroundColor:'white'}}>
                <ListView
            dataSource={this.dataSource.cloneWithRows(this.state.karacsony)}
            enableEmptySections={true}
            initialListSize={10}
            contentContainerStyle={styles.list}
            scrollEnabled={true}
            removeClippedSubviews={true}
            pageSize={10}
            //column={2}
            renderRow={ (rowData, sectionID, rowID, highlightRow)=> (
            <View numberOfLines={1} style={{backgroundColor:'white'}}>
              <View style={{marginTop:10}}>
              <TouchableOpacity onPress={() => {Actions.receptekHTML({ tesztak: rowData.id})}}>
              <View style={{backgroundColor:"#dff7f5", width:width/2-10, height:height/4, borderRadius:10}}>
                <Image
                resizeMethod="resize"
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
                       {'SZÜLINAP'}
                     </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=> {this.setState({index:1})}}>
                   <View style={{margin:'auto'}}>
                     <Text style={styles.nameText}>
                       {'FARSANG'}
                     </Text>
                    </View>
                </TouchableOpacity>


                <TouchableOpacity onPress={()=> {this.setState({index:2})}}>
                   <View style={{margin:'auto'}}>
                     <Text style={styles.nameText}>
                       {'HÚSVÉT'}
                     </Text>
                    </View>
                </TouchableOpacity>


                <TouchableOpacity onPress={()=> {this.setState({index:3})}}>
                   <View style={{margin:'auto'}}>
                     <Text style={styles.nameText}>
                       {'HALLOWEEN'}
                     </Text>
                    </View>
                </TouchableOpacity>
                </View>
              <View style={{flexDirection:'row', justifyContent:'space-around', alignItems:'center', backgroundColor:'transparent'}}>
                <TouchableOpacity onPress={()=> {this.setState({index:4})}}>
                   <View style={{margin:'auto'}}>
                     <Text style={styles.nameText}>
                       {'MIKULÁS'}
                     </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=> {this.setState({index:5})}}>
                   <View style={{margin:'auto'}}>
                     <Text style={styles.nameText}>
                       {'KARÁCSONY'}
                     </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=> {this.setState({index:6})}}>
                   <View style={{backgroundColor:'white', borderWidth:5, borderRadius:100, borderColor:'white', zIndex:-100}}>
                     <Text style={styles.nameText}>
                       {'SZILVESZTER'}
                     </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=> {this.setState({index:7})}}>
                   <View style={{margin:'auto'}}>
                     <Text style={styles.nameText}>
                       {'GYEREKNAP'}
                     </Text>
                    </View>
                </TouchableOpacity>

                </View>
                </View>
                <ScrollView style={{backgroundColor:'white'}}>
                <ListView
            dataSource={this.dataSource.cloneWithRows(this.state.szilveszer)}
            enableEmptySections={true}
            initialListSize={10}
            contentContainerStyle={styles.list}
            scrollEnabled={true}
            removeClippedSubviews={true}
            pageSize={10}
            //column={2}
            renderRow={ (rowData, sectionID, rowID, highlightRow)=> (
            <View numberOfLines={1} style={{backgroundColor:'white'}}>
              <View style={{marginTop:10}}>
              <TouchableOpacity onPress={() => {Actions.receptekHTML({ tesztak: rowData.id})}}>
              <View style={{backgroundColor:"#dff7f5", width:width/2-10, height:height/4, borderRadius:10}}>
                <Image
                resizeMethod="resize"
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
                       {'SZÜLINAP'}
                     </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=> {this.setState({index:1})}}>
                   <View style={{margin:'auto'}}>
                     <Text style={styles.nameText}>
                       {'FARSANG'}
                     </Text>
                    </View>
                </TouchableOpacity>


                <TouchableOpacity onPress={()=> {this.setState({index:2})}}>
                   <View style={{margin:'auto'}}>
                     <Text style={styles.nameText}>
                       {'HÚSVÉT'}
                     </Text>
                    </View>
                </TouchableOpacity>


                <TouchableOpacity onPress={()=> {this.setState({index:3})}}>
                   <View style={{margin:'auto'}}>
                     <Text style={styles.nameText}>
                       {'HALLOWEEN'}
                     </Text>
                    </View>
                </TouchableOpacity>
                </View>
              <View style={{flexDirection:'row', justifyContent:'space-around', alignItems:'center', backgroundColor:'transparent'}}>
                <TouchableOpacity onPress={()=> {this.setState({index:4})}}>
                   <View style={{margin:'auto'}}>
                     <Text style={styles.nameText}>
                       {'MIKULÁS'}
                     </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=> {this.setState({index:5})}}>
                   <View style={{margin:'auto'}}>
                     <Text style={styles.nameText}>
                       {'KARÁCSONY'}
                     </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=> {this.setState({index:6})}}>
                   <View style={{margin:'auto'}}>
                     <Text style={styles.nameText}>
                       {'SZILVESZTER'}
                     </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=> {this.setState({index:7})}}>
                   <View style={{backgroundColor:'white', borderWidth:5, borderRadius:100, borderColor:'white', zIndex:-100}}>
                     <Text style={styles.nameText}>
                       {'GYEREKNAP'}
                     </Text>
                    </View>
                </TouchableOpacity>

                </View>
                </View>
                 <ScrollView style={{backgroundColor:'white'}}>
                <ListView
            dataSource={this.dataSource.cloneWithRows(this.state.gyereknap)}
            enableEmptySections={true}
            initialListSize={10}
            contentContainerStyle={styles.list}
            scrollEnabled={true}
            removeClippedSubviews={true}
            pageSize={10}
            //column={2}
            renderRow={ (rowData, sectionID, rowID, highlightRow)=> (
            <View numberOfLines={1} style={{backgroundColor:'white'}}>
              <View style={{marginTop:10}}>
              <TouchableOpacity onPress={() => {Actions.receptekHTML({ tesztak: rowData.id})}}>
              <View style={{backgroundColor:"#dff7f5", width:width/2-10, height:height/4, borderRadius:10}}>
                <Image
                resizeMethod="resize"
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
