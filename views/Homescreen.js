'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  View,
  Button,
  Platform,
  CameraRoll,
  Image,
  ScrollView,
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import { createStackNavigator, NavigationActions, StackActions } from 'react-navigation';


export default class Homescreen extends Component {

  constructor(props){
    super(props);

    const { navigate } = this.props.navigation;

    this.state = {
      capturing: false,
    }
  };

  static navigationOptions = ({navigation}) => ({
    headerTransparent: true,
    headerStyle: {
      backgroundColor: 'transparent',
      borderBottomWidth: 2,
      borderBottomColor: 'white',
    },
    headerRight: 
    <TouchableOpacity onPress={() => navigation.navigate("InfoScreen")}>
      <Image style={{
      height: 30,
      width: 30,
      marginRight: 15}} source={require('../assets/about.png')} />
    </TouchableOpacity>
    
  });


  render() {
    return (
      
      <View style={styles.container}>
      <RNCamera
      ref={ref => {this.camera = ref;}}
      style = {styles.preview}
      type={RNCamera.Constants.Type.back}
      flashMode={RNCamera.Constants.FlashMode.off}
      permissionDialogTitle={'Permissão para usar a camera'}
      permissionDialogMessage={'Nós precisamos de permissão para acessar a camera do seu aparelho.'}
      >
      
      <View style={styles.container}>
      <Text style={styles.fotoText}>Tire uma foto</Text> 
      <View style={styles.buttonContainer}>
      

      <TouchableOpacity
      onPress={() => this.props.navigation.navigate('HistoryScreen')}
      style = {styles.buttonAux}
      >
      <Image style={styles.button2} source={require('../assets/history.png')} />
      </TouchableOpacity>
      

      <TouchableOpacity
      onPress={this.takePicture}
      style = {styles.capture}
      >
      <Image style={styles.take_photo} source={require('../assets/take_photo.png')} />
      </TouchableOpacity>
      

      <TouchableOpacity
      onPress={() => this.props.navigation.navigate('UserScreen')}
      style = {styles.buttonAux}
      >
      <Image style={styles.button2} source={require('../assets/user.png')} />
      </TouchableOpacity>
      

      </View>
      </View>
      </RNCamera>
      </View>
      );
  }


  takePicture = async () => {
    this.setState({capturing: true});

    if (this.camera) {
      // const options = { quality: 0.5, base64: true, fixOrientation: true };
      // const options = {fixOrientation: true };
      const data = await this.camera.takePictureAsync()
      console.log(data.uri);
      // CameraRoll.saveToCameraRoll(data.uri);
      this.props.navigation.navigate('ImageScreen', { uri: data.uri });
    }else{
      alert("CADE A CAMERA, MY FRIEND?");
    }
  };

  removePicture = () => {
    this.setState({image_uri: null});
  };

}



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  },

  fotoText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center',
    fontFamily: 'Metropolis Regular',
    marginTop: 65,
  },

  preview: {
    flex: 1,
  },

  info: {
		height: 30,
		width: 30,
	},

  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },

  capture: {
    flex: 0,
    backgroundColor: 'rgba(255,255,255,.8)',
    height: 80,
    width: 80,
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 40,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },

  buttonAux: {
    backgroundColor: 'rgba(255,255,255,.8)',
    height:40,
    width: 40,
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 5,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },

  take_photo:{
    width: 50,
    height: 50,
    alignSelf: 'center'
  },

  button:{
    width: 50,
    height: 50,
    alignSelf: 'center'
  },

  button2:{
    width: 30,
    height: 30,
    alignSelf: 'center'
  },


});
