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
  ListView,
  AsyncStorage
} from 'react-native';
import api from '../utilities/api'
import {
  Actions
} from 'react-native-router-flux';
import OneSignal from 'react-native-onesignal'; // Import package from node modules
//import FCM, { FCMEvent } from "react-native-fcm";



export default class Noti extends Component<{}> {

  constructor(props) {
    super(props);
    this.state={
      postCover:[],
      recipes:[],
      title:[],
      des:[],
      dataSource: [],
      initialpage: 2,
      content:[],
      trueSwitchIsOn: true,
      modalVisible: false,
      inFocusDisplaying: true,
      save:"",
      trueSwitchIsOn2: true,
      modalVisible2: false,
      inFocusDisplaying2: true,
      save2:"",
      trueSwitchIsOn3: true,
      modalVisible3: false,
      inFocusDisplaying3: true,
      save3:""

    }
        this.loadSettings = this.loadSettings.bind(this);

    this.dataSource = new ListView.DataSource({rowHasChanged:(r1,r2) => r1.guid != r2.guid});    
  }

  fcm(){
      console.log(FCM);
      console.log(FCM.getFCMToken);
         FCM.requestPermissions();


    FCM.getFCMToken().then(token => {
      console.log("TOKEN (getFCMToken)", token);
      this.setState({token:token})
    //this.device();
      
       // deviceupdate endpoint
    });

    


    FCM.getInitialNotification().then(notif => {
      console.log("INITIAL NOTIFICATION", notif)

    });

    this.notificationListner = FCM.on(FCMEvent.Notification, notif => {
      console.log("Notification", notif);
      if(notif.local_notification){

        setTimeout(() => {this.notik()}, 1000)
       



         
        return;
      }
      if(notif.opened_from_tray){
        setTimeout(() => {this.notik()}, 1000)
        
        return;
      }

      if(Platform.OS ==='ios'){
              //optional
              //iOS requires developers to call completionHandler to end notification process. If you do not call it your background remote notifications could be throttled, to read more about it see the above documentation link.
              //This library handles it for you automatically with default behavior (for remote notification, finish with NoData; for WillPresent, finish depend on "show_in_foreground"). However if you want to return different result, follow the following code to override
              //notif._notificationType is available for iOS platfrom
              switch(notif._notificationType){
                case NotificationType.Remote:
                  notif.finish(RemoteNotificationResult.NewData) //other types available: RemoteNotificationResult.NewData, RemoteNotificationResult.ResultFailed
                  break;
                case NotificationType.NotificationResponse:
                  notif.finish();
                  break;
                case NotificationType.WillPresent:

                  notif.finish(WillPresentNotificationResult.All) //other types available: WillPresentNotificationResult.None
                  break;
              }
            }
      this.showLocalNotification(notif);
    });

    this.refreshTokenListener = FCM.on(FCMEvent.RefreshToken, token => {
      console.log("TOKEN (refreshUnsubscribe)", token);
      this.setState({token:token})
    });

    }

    fcm2(){
      this.notificationListner.remove();
    this.refreshTokenListener.remove();

    }

    componentDidMount() {

    //this.fcm();
 
  }

  showLocalNotification(notif) {
    if(Platform.OS ==='ios'){
    FCM.presentLocalNotification({
      title: notif.fcm.title,
      body: notif.fcm.body,
      priority: "high",
      click_action: notif.action,
      show_in_foreground: true,
      local: true
    });
  }
  if(Platform.OS ==='android'){
    FCM.presentLocalNotification({
      title: notif.fcm.title,
      body: notif.fcm.body,
      priority: "high",
      click_action: notif.action,
      show_in_foreground: true,
      local: true
    });
  }
  }

  componentWillUnmount() {
    //this.fcm2();
  }


  componentWillUpdate(){
        /*OneSignal.setSubscription(this.state.inFocusDisplaying);
        console.log('onesignal:');
        console.log(this.state.inFocusDisplaying);*/
  }

  async loadSettings () {
            try {
                var value = await AsyncStorage.getItem('@Mano:noti');
                console.log(value)
                if (value.save == 0){
                this.setState({
                  inFocusDisplaying: false,
                  trueSwitchIsOn: false,
                })
            } else {
              this.setState({
                  inFocusDisplaying: true,
                  trueSwitchIsOn: true,
                })
            }
            if (value.save2 == 0){
                this.setState({
                  inFocusDisplaying2: false,
                  trueSwitchIsOn2: false,
                })
            } else {
              this.setState({
                  inFocusDisplaying2: true,
                  trueSwitchIsOn2: true,
                })
            }
            if (value.save3 == 0){
                this.setState({
                  inFocusDisplaying3: false,
                  trueSwitchIsOn3: false,
                })
            } else {
              this.setState({
                  inFocusDisplaying3: true,
                  trueSwitchIsOn3: true,
                })
            }
            console.log('loadsetting');
            console.log(this.state.trueSwitchIsOn);
            console.log(this.state.inFocusDisplaying);
            } catch (error) {
                console.log('error')
            }
        };


      changeSwitch(value){
    if (value == true) {
      this.setState({trueSwitchIsOn: true,
        inFocusDisplaying:true,
        save:2})

    } else {
      this.setState({trueSwitchIsOn: false,
        inFocusDisplaying:false,
        save:0})}
      this.save();
      console.log(this.state.trueSwitchIsOn);
      console.log(this.state.inFocusDisplaying);
    }

      changeSwitch2(value){
    if (value == true) {
      this.setState({trueSwitchIsOn2: true,
        inFocusDisplaying2:true,
        save2:2})

    } else {
      this.setState({trueSwitchIsOn2: false,
        inFocusDisplaying2:false,
        save2:0})}
      this.save();
      console.log(this.state.trueSwitchIsOn);
      console.log(this.state.inFocusDisplaying);
    }

      changeSwitch3(value){
    if (value == true) {
      this.setState({trueSwitchIsOn3: true,
        inFocusDisplaying3:true,
        save3:2})

    } else {
      this.setState({trueSwitchIsOn3: false,
        inFocusDisplaying3:false,
        save3:0})}
      this.save();
      console.log(this.state.trueSwitchIsOn2);
      console.log(this.state.inFocusDisplaying2);
    }

    async save(data){
    var data ={
      save: this.state.save,
      save2: this.state.save2,
      save3: this.state.save3,

    }
      
      try {
      await AsyncStorage.setItem('@Angyal:noti', JSON.stringify(data));
      console.log(data);
      } catch (error) {
  // Error saving data
      }

    }

  componentWillMount () {
            this.loadSettings();
/*        OneSignal.enableSound(true);
        OneSignal.addEventListener('received', this.onReceived);
        OneSignal.addEventListener('opened', this.onOpened);
        OneSignal.addEventListener('registered', this.onRegistered);
        OneSignal.addEventListener('ids', this.onIds);
        StatusBar.setBarStyle('light-content', true);
        StatusBar.setHidden(true);
        OneSignal.getPermissionSubscriptionState((status) => {
    console.log(status);
});*/

        
    }

    componentWillUnmount() {
        /*OneSignal.removeEventListener('received', this.onReceived);
        OneSignal.removeEventListener('opened', this.onOpened);
        OneSignal.removeEventListener('registered', this.onRegistered);
        OneSignal.removeEventListener('ids', this.onIds);*/
       
    }
    /*onReceived(notification) {
        console.log("Notification received: ", notification);
    }

    onOpened(openResult) {
      console.log('Message: ', openResult.notification.payload.body);
      console.log('Data: ', openResult.notification.payload.additionalData);
      console.log('isActive: ', openResult.notification.isAppInFocus);
      console.log('openResult: ', openResult);
    }

    onRegistered(notifData) {
        console.log("Device had been registered for push notifications!", notifData);
    }

    onIds(device) {
    console.log('Device info: ', device);
    }*/
    setModalVisible(visible) {
      this.setState({ modalVisible: visible })}


  render() {
    var {height, width} = Dimensions.get('window');

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
                {'BEÁLLÍTÁSOK'}
              </Text>
            </View>
            <View style={{width:31/3, height:58/3,  zIndex:100, left:10}}/>
 
        </View>
      <View style={{width:width, height:height,}}>
          <View style={styles.ftreContainer, {height:height-50}}>
          <View style={{ borderRadius:20, padding:10}}>
          <Text style={{fontSize: 18, margin:10,
          textAlign: 'left',
          color:'gray',
          //fontFamily:'corbel'
        }}>
          {'ÉRTESÍTÉSEK'}
          </Text>
           
          <View style={{flexDirection:'row', justifyContent:'space-between'}}>
          <Text style={{fontSize: 18, margin:10,
          textAlign: 'center',
          color:'black',
          //fontFamily:'corbel'
        }}>
          {'HÍREK'}
          </Text>
          <Switch
          onValueChange={(value) =>    this.changeSwitch(value) }
          style={{marginBottom: 10}}
          value={this.state.trueSwitchIsOn} />
            </View>


          <View style={{flexDirection:'row', justifyContent:'space-between'}}>
          <Text style={{fontSize: 18, margin:10,
          textAlign: 'center',
          color:'black',
          //fontFamily:'corbel'
        }}>
          {'AKCIÓK'}
          </Text>
          <Switch
          onValueChange={(value) =>    this.changeSwitch2(value) }
          style={{marginBottom: 10}}
          value={this.state.trueSwitchIsOn2} />
            </View>


          <View style={{flexDirection:'row', justifyContent:'space-between'}}>
          <Text style={{fontSize: 18, margin:10,
          textAlign: 'center',
          color:'black',
          //fontFamily:'corbel'
        }}>
          {'RECEPTEK'}
          </Text>
          <Switch
          onValueChange={(value) =>    this.changeSwitch3(value) }
          style={{marginBottom: 10}}
          value={this.state.trueSwitchIsOn3} />
            </View>
          <View style={{height:20}}/>

            </View>
            </View>
            </View>


        <View style={[styles.menu, {width:width, height:height/12}]}>
        <TouchableOpacity  onPress={()=> Actions.home()
          }>
          <View style={styles.menu1}>
           <Image
              source={require('../src/menu/menuikon_home.png')}
              style={{width:height/20, height:height/20}}/>
          </View>
          </TouchableOpacity>
          

        <TouchableOpacity  onPress={()=> Actions.hozzataplalas()}>
          <View style={styles.menu1}>
            <Image
              source={require('../src/menu/menuikon_hozzatalp.png')}
              style={{width:height/20, height:height/20}}/>
          </View>
          </TouchableOpacity>

          <TouchableOpacity  onPress={()=> Actions.receptek()}>
          <View style={styles.menu1}>
            <Image
              source={require('../src/menu/menuikon_receptek.png')}
              style={{width:height/20, height:height/20}}/>
          </View>
          </TouchableOpacity>

          <TouchableOpacity  onPress={()=> Actions.kedvencek()}>
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
    flexDirection:'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderColor:'black',
    borderTopWidth:0.5,
  },
  nameText: {
    fontSize: 18,
    textAlign: 'center',
    color:'white',
    //fontFamily:'corbel'
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
