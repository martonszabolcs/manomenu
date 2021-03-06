
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
  TouchableOpacity,
  ListView,
  Modal,
  Button,
  AsyncStorage,
  WebView
} from 'react-native';


import api from '../utilities/api'
import {
  Actions
} from 'react-native-router-flux';

function renderNode(node, index, siblings, parent, defaultRenderer) {
    var {height, width} = Dimensions.get('window');

        if (node.name == 'img') {
            const a = node.attribs;
            return ( <Image key="key" style={{width: width-20, height: 300}} source={{uri: a.src}}/> );
        }
    }





const instructions = Platform.select({
});

export default class ReceptekHTML extends Component<{}> {

  constructor(props) {
    super(props);
    this.state={
      postCover:[],
      recipes:[],
      title:[],
      des:[],
      dataSource: [],
      content:[],
      modalVisible: false,
      favourite: false,
      tesztak: props.tesztak,
      favorites: '',
      isliked:''

    }

    this.dataSource = new ListView.DataSource({rowHasChanged:(r1,r2) => r1.guid != r2.guid});
  }
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
 pictureHide(){
      var {height, width} = Dimensions.get('window');

  if ( this.state.content.imageUrl != 'http://46.101.62.53/Apps/rest/image/null') {
    return (
    <Image
          source={{uri: this.state.content.imageUrl}}
          style={{width:width, height:height/3.5, zIndex:100}}/>
          )
  } else {
    return ( <View/>)
  }
}

  setFavourite(value) {
    this.setState({ favourite: value });
  }


  favPics(){
    if (this.state.favourite) {
      return require('../src/menu/cikk_kedvencikon_aktiv.png');
    } else {
      return require('../src/menu/cikk_kedvencikon_inaktiv.png');
    }
  }

  favourites(){
     if(this.state.favourite){
    // remove from favorites
     var list = this.state.favorites;

            for (var i = 0; i < list.length; i++) {
                if (list[i].id == this.state.tesztak) {  // ha egyeznek az ID-k, akkor azt az elemet toroljuk
                    list.splice(i, 1);}}

            this.setState({
                favorites: list
            });
            this._update();
    }
   else{
    // add to favorites
    this._addToFavorites();
    //this.save();

   }
  }
     /*var list = this.state.content.id;
     var favoriteTopicsData = this.state.content;
    if (favoriteTopicsData.id == null || favoriteTopicsData.id == '') {  // ha uj repules (nincs azonositoja)
                    favoriteTopicsData.id = this.guid();  // minden repules kapjon egy egyedi azonositot
                    list.push(favoriteTopicsData);
                } else {  // kulonben irjuk felul azt, amelyik szerkesztve lett
                    for (var i = 0; i < list.length; i++) {
                        if (list[i].id == favoriteTopicsData.id) {  // ha egyeznek az ID-k, akkor azt az elemet modositottuk
                            list[i] = favoriteTopicsData;
                        }
                    }
                }*/


  /*async save(){
    try {
      await AsyncStorage.setItem('@Manomenu:setFavourite', JSON.stringify(this.state.content));
          console.log('saved');

    } catch (error) {
          console.log('error');
  // Error saving data
  }
}*/



  componentWillMount () {
    /*Actions.refresh({
      Id: this.state.Id});*/

      setTimeout(() => {
      var list = this.state.favorites;

                    for (var i = 0; i < list.length; i++) {
                        if (list[i].id == this.props.tesztak) {  // ha egyeznek az ID-k, akkor azt az elemet modositottuk
                           this.setState({
                            favourite: true
                          });
                        }
                    } 
                                  //console.log(list[1].id);
                                  console.log(this.props.tesztak);
}, 100)
                


    return fetch("http://46.101.62.53/Apps/rest/content/ARTICLE/"+this.state.tesztak, {
        headers: {
          accept: "application/json",
        }
      }).then((res) => res.json())
    .then((res) => {
      this.setState({
        content: res
      })
    })
  }
   favGombInitial(props) {
                 
            }

  async _addToFavorites() {


    const listofFav = [...this.state.favorites, this.state.content];

    await AsyncStorage.setItem('@favorites:lista',
    JSON.stringify(listofFav));
    console.log(listofFav);
  }

   async _update() {


    const listofFav = this.state.favorites;

    await AsyncStorage.setItem('@favorites:lista',
    JSON.stringify(listofFav));
    console.log('listofFav');
    console.log(listofFav);
  }

    

  componentDidMount(){
    this._updateList();
    //if  (this.props.tesztak === this.state.favorites.id)
  }
  async _updateList() {
  const response = await AsyncStorage.getItem('@favorites:lista');
  const listOfLikes = await JSON.parse(response) || [];
  this.setState({
    favorites: listOfLikes
  }, () => {
    console.log(this.state.favorites);
    if (listOfLikes.includes(this.state.tesztak)) {
      this.setState({
        favourite: true
      });
    }
    else {
      this.setState({
        favourite: false
      })
    }
    console.log(this.state.favourite + 'favourite');
  });
}



  render() {
    var {height, width} = Dimensions.get('window');
    this.favGombInitial();
    const HTML2 = `
  <div class="comment">
    <span class="c00">
      <b><i>&gt; Dwayne’s only companion at night was a Labrador retriever named Sparky.</i></b>
    <p>
    <i>Sparky could not wag his tail-because of an automobile accident many years ago, so he had no way of telling other dogs how friendly he was.
    He opened the door of the cage, something Bill couldn’t have done in a thousand years. Bill flew over to a windowsill.
    <b>The undippable flag was a beauty, and the anthem and the vacant motto might not have mattered much, if it weren’t for this: a lot of citizens were so ignored and cheated and insulted that they thought they might be in the wrong country, or even on the wrong planet, that some terrible mistake had been made.
    </p>
    <p>
      [1] <a href="https://code.facebook.com/posts/1505962329687926/flow-a-new-static-type-checker-for-javascript/" rel="nofollow">https://code.facebook.com/posts/1505962329687926/flow-a-new-...</a>
    </p>
    <img src="https://i.redd.it/1l01wjsv22my.jpg" width="400" height="400" />

    <h1>Dwayne’s only companion at night</h1>
    <h2>Dwayne’s only companion at night</h2>
    <h3>Dwayne’s only companion at night</h3>
    <h4>Dwayne’s only companion at night</h4>
    <h5>Dwayne’s only companion at night</h5>
    <h6>Dwayne’s only companion at night</h6>
    ayyy

    <iframe src="google.com" />
  </span>
</div>
`;

    console.log(this.state.favorites);

    return (
      <View style={styles.container}>
      <View style={{width:width, height:height/15, backgroundColor:'#00b8ac', flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
      <TouchableOpacity style={{width:31/2.5, height:58/2.5, position:'absolute', zIndex:100, left:10}} onPress={() => { Actions.pop()}}>
        <Image
          source={require('../src/nyil_feher.png')}
          style={{width:31/3, height:58/3, position:'absolute', zIndex:100, left:10}}/>
      </TouchableOpacity>
            <View>
              <Text style={[styles.HOME, {color:'white'}]}>
                {this.state.content.title}
              </Text>
            </View>

        </View>



        <View style={{flex:1}}>
          <WebView ref={'webview'} source={{html: this.state.content.content}} scalesPageToFit={false}
 style={{width:width, height:height}} />
        </View>
        <View style={{height:height/12}}/>

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
              source={require('../src/menu/menuikon_receptek.png')}
              style={{width:height/20, height:height/20}}/>
          </View>
          </TouchableOpacity>

          <TouchableOpacity>
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
    backgroundColor: '#f0d886',
    borderColor:'black',


  },
  nameText: {
    fontSize: 36,
    textAlign: 'left',
    marginLeft:0,
    color:'#00b8ac',
    fontFamily:'AmaticSC-Bold'
  },

  instructions: {
    fontSize:20,
    textAlign: 'center',
    color: '#4aa485',
    padding: 10,
    marginBottom: 5,
  },
  ftreExitButtonText2:{
    color:'white',
    backgroundColor:'transparent',
    fontSize:20,
    fontFamily: 'futura-bold',
    textAlign:'center'
  },
  menu: {
    position:'absolute',
    bottom:0,
    backgroundColor:"#f0d886",
    flexDirection:'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
