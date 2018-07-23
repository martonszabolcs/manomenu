import React, { Component, PropTypes } from "react";
import {
  AsyncStorage,
  Modal,
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
} from "react-native";




export default class descriptions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      selectedItem: 1
    };
  }
  componentDidMount() {

BackHandler.addEventListener('hardwareBackPress', this.backPressed);
        console.log('addEventListener')
             console.log(Actions.state.index)


    /*AsyncStorage.getItem(this.props.pagekey, (err, result) => {
      if (err) {

      } else {
                if (result == null) {



        }
      }
    });
    AsyncStorage.setItem(this.props.pagekey, JSON.stringify({"value":"true"}), (err,result) => {
    });*/
  }


  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
   componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress', this.backPressed);
      console.loh('willmount back')
    }
   
  backPressed = () => {

    this.setModalVisible(!this.state.modalVisible)
    console.log(this.state.modalVisible)
    return true;
  
};



  render() {
    if (this.state.modalVisible){
    var {height, width} = Dimensions.get('window');
    return (
      <View style={{justifyContent:'center', alignItems:'center', backgroundColor:"rgba(0, 0, 0, 0.5)", opacity:1 }}>

         <Modal
          animationType={"slide"}
          transparent={true}
          style={{backgroundColor:"rgba(0, 0, 0, 0.5)"}}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            //alert("Modal has been closed.");
          }}
        >
      <View style={{width:width*2/3,height:height/2, justifyContent:'space-between', position:'absolute', right:0, bottom:width/6+2, backgroundColor:"#f6eec2", borderRadius:10}}>
      <View style={{justifyContent:'center', alignItems:'center', backgroundColor:'transparent'}}>
            <TouchableOpacity onPress={() => {
                  [this.setModalVisible(!this.state.modalVisible)];
                }}>
            <View style={{backgroundColor:'#00b8ac', width:width/4, margin:'auto', borderRadius:100}}>
          <Text style={[styles.nameText, {fontSize:20, textAlign:'center', borderRadius:20, color:'white'}]}>
Mégse </Text>
            </View>
            </TouchableOpacity>
            </View>
      <View style={{flexDirection:'row', justifyContent:'space-around'}}>
      <View style={{justifyContent:'space-around'}}>
      <Text style={styles.nameText}>
                  {'ÉTKEZÉS:'}
                </Text>
          <View style={styles.component}>
            <RadioForm formHorizontal={false} animation={true} >
              {this.state.types1.map((obj, i) => {
                var onPress = (value, index) => {
                    this.setState({
                      value1: value,
                      value1Index: index
                    })
                  }
                return (
                  <RadioButton labelHorizontal={true} key={i} >
                    {/*  You can set RadioButtonLabel before RadioButtonInput */}
                   <RadioButtonInput
                      obj={obj}
                      index={i}
                      isSelected={this.state.value1Index === i}
                      onPress={onPress}
                      buttonInnerColor={'#00b8ac'}
                      buttonOuterColor={this.state.value1Index === i ? '#f6eec2' : 'transparent'}
                      buttonSize={7}
                      buttonStyle={{}}
                      buttonWrapStyle={{marginRight:2}}
                    />
                    <RadioButtonLabel
                      obj={obj}
                      index={i}
                      onPress={onPress}
                      labelStyle={{textAlign:'right', color: 'black'}}
                      labelWrapStyle={{}}
                    />
                  </RadioButton>
                )
              })}
            </RadioForm>
      </View>
      </View>
      <View style={{justifyContent:'space-around'}}>
      <Text style={styles.nameText}>
                  {'Nap:'}
                </Text>

          <View style={styles.component}>
            <RadioForm formHorizontal={false} animation={true} initial={-1} >
              {this.state.types2.map((obj, i) => {
                var onPress = (value, index) => {
                    this.setState({
                      value2: value,
                      value2Index: index
                    })
                  }
                return (
                  <RadioButton labelHorizontal={true} key={i} >
                    {/*  You can set RadioButtonLabel before RadioButtonInput */}
                    <View style={{flexDirection:'row', justifyContent:'space-around'}}>
                    <View>
                    <RadioButtonInput
                      obj={obj}
                      index={i}
                      isSelected={this.state.value2Index === i}
                      onPress={onPress}
                      buttonInnerColor={'#00b8ac'}
                      buttonOuterColor={this.state.value2Index === i ? '#f6eec2' : 'transparent'}
                      buttonSize={7}
                      buttonStyle={{}}
                      buttonWrapStyle={{marginRight:2}}
                    />
                    </View>
                    <View>
                    <RadioButtonLabel
                      obj={obj}
                      index={i}
                      onPress={onPress}
                      labelStyle={{textAlign:'right', color: 'black'}}
                      labelWrapStyle={{}}
                    />
                    </View>
                    </View>

                  </RadioButton>
                )
              })}
            </RadioForm>
          </View>
          </View>
          </View>
          {/*<View style={{flexDirection:'row'}}>
            <View style={{width:width*2/3/2.5, height:height/2, margin:5}}>
                <Text style={styles.nameText}>
                  {'ÉTKEZÉS:'}
                </Text>
                <View style={{height:height/2, justifyContent:'space-between'}}>

                  
                  <RadioForm
                style={{justifyContent:'space-between', alignItems:'center'}}
                radio_props={radio_props}
                isSelected={true}
                initial={0}
                buttonSize={5}
                buttonColor={'#00b8ac'}
                animation={true}
                onPress={(value) => {this.setState({value:value})}}
                />
                  
                </View>
                </View>
  

            <View style={{width:width*2/3/2.5, height:height/2, margin:5}}>
                <Text style={styles.nameText}>
                  {'Nap:'}
                </Text>
                <View>
              <RadioForm
                style={{justifyContent:'space-between', alignItems:'center'}}
                radio_props={radio_props2}
                isSelected={true}
                initial={0}
                buttonSize={5}
                buttonColor={'#00b8ac'}
                animation={true}
                onPress={(value) => {this.setState({valueIndex:value})}}
                />

                  </View>
                </View>
                 <TouchableOpacity onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
          <View>
          <Text style={{fontSize: 50,
          position:'relative',
          textAlign:'center',
          zIndex:123213,
          fontFamily:'AmaticSC-Bold',
          color:'red',}}>
          {'X'}
          </Text>
          </View>
          </TouchableOpacity>
            </View>*/}
            <View style={{justifyContent:'center', alignItems:'center', backgroundColor:'transparent', top:-40}}>
            <TouchableOpacity onPress={() => {
                  [this.setModalVisible(!this.state.modalVisible), this.setMenu(!this.state.menu), this.hetikaja()];
                }}>
            <View style={{backgroundColor:'white', width:width/2+30, margin:'auto', borderRadius:100}}>
          <Text style={[styles.nameText, {fontSize:20, textAlign:'center', borderRadius:20}]}>
            Legyen ez a {this.state.types2[this.state.value2Index].label}{'i'}{' '}{this.state.types1[this.state.value1Index].label}{'!'} </Text>
            </View>
            </TouchableOpacity>
            </View>
            </View>

        </Modal>
      </View>
    );
  } else {
    return(<View/>);
  }
  }
  }
const styles = StyleSheet.create({
ftreContainer:{
    backgroundColor:'white',
    opacity:1 ,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth:2,
    borderColor:"white",
    flex:1,
    marginTop:20,
    marginBottom:20,
    marginLeft:5,
    marginRight:5,
    borderRadius:3
  },

  slide:{
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex:1,
    marginTop:30,
    marginBottom:60,
    marginLeft:20,
    marginRight:20,
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
    
    width:80,
    height:40,
    backgroundColor:'#9e0600',
    justifyContent:'center',
    zIndex:2312312321
  },
  ftreExitButtonText:{
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