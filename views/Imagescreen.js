'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
  CameraRoll,
  Image,
  ScrollView,
  ActivityIndicator,
  AsyncStorage,
} from 'react-native';

import { createStackNavigator, NavigationActions, StackActions  } from 'react-navigation';

import InputContainer from '../components/InputContainer';
import Pipicker from '../components/Pipicker';
import PiModal from '../components/PiModal';

export default class Imagescreen extends Component {


  // static navigationOptions = {
  //   title: 'FCT-UNESP',
  //   // headerStyle: { backgroundColor: 'black'},
  //   // headerTitleStyle: { color: 'white'},
  // };

  constructor(props){
    super(props);
    this.state = {
      modalVisible: false,
      historico: [],
      email: null,
      descricao: null,
      image: this.props.navigation.state.params.uri,
      latitude: null,
      longitude: null,
      error: null,
    }
  };

  _getUser = async() => {
    let user = JSON.parse(await AsyncStorage.getItem('@UNESPapp:user'));

    let email = user.email;
    this.setState({
      email: email,
    });
  }

  componentDidMount(){
    this._getUser();
  }

  render() {

    return (
      <View style={styles.container}>
      <ScrollView>
      <Image style={styles.image} source={{ uri:  this.props.navigation.state.params.uri }}/>
      <Text style={styles.title}>Descrição</Text> 

      <InputContainer 
      label={"Email"}
      _state={"Email"}
      _value={this.state.email}
      _onChangeText={this._changeEmail}
      placeholder={"(Opcional)"}
      _multiline={false}
      _lines={1}
      />

      <InputContainer 
      label={"Descrição"}
      _state={"Descricao"}
      _value={this.state.descricao}
      _onChangeText={this._changeDescricao}
      placeholder={"Detalhe bem o problema que está sendo reportado."}
      _multiline={true}
      _lines={4}
      />

      <TouchableOpacity
      style={styles.enviar}
      onPress={this._sendPicture}
      >
      <Text style={styles.textEnviar}>Enviar</Text>
      </TouchableOpacity>

      </ScrollView>
      <PiModal 
      onCancel={this._finish}
      visible={this.state.modalVisible}
      />
      </View>
      );
  }

  _sendPicture = async () => {
    let historico = JSON.parse(await AsyncStorage.getItem('@UNESPapp:historico')) || [];
    let novoHistorico = 
    {
      id: historico.length,
      email: this.state.email,
      descricao: this.state.descricao,
      uri: this.state.image,
    }

    let novoArray = [
    ...historico,
    novoHistorico
    ];

    this.setState({ 
      historico: novoArray,
    });

    await AsyncStorage.setItem('@UNESPapp:historico',JSON.stringify(this.state.historico));
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 },
      );

    fetch('http://localhost/unespapp/Problema/insert', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body:JSON.stringify(
      {
        email_denunciante: this.state.email,
        descricao_problema: this.state.descricao,
        latitude: this.state.latitude,
        longitude: this.state.longitude,
      }
      ),
    })
    .then((response) => {
      response.json();
      console.log("RESPONSE");
      console.log(response);
    })
    .then((responseData) => {
      console.log("responseData:");
      console.log(responseData);
    }).catch((error) => {
      console.log('ERRO:');
      console.log(error);
    });

    this.setState({modalVisible: true})
  };

  _removePicture = () => {
    this.setState({image_uri: null});
  };

  _changeEmail = (email) => {
    this.setState({
      email: email,
    });
  };

  _changeDescricao = (descricao) => {
    this.setState({
      descricao: descricao,
    });
  };

  _finish = () => {
    this.setState({ 
      modalVisible: false, 
      email: "",
      descricao: "",
      image: null,
    });
    
    const resetAction = StackActions.reset({
                index: 1,
                actions: [
                  
                  
                  NavigationActions.navigate({ routeName: 'HomeScreen' }),
                  NavigationActions.navigate({ routeName: 'HistoryScreen' })
                ],
              });
    this.props.navigation.dispatch(resetAction);
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DDD',
  },
  image:{
    width: '100%',
    height: 500,
  },

  title:{
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
    alignSelf: 'center',
  },

  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
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
    margin: 20,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
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

  ImageContainer: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').width,
    alignItems: 'center',
    backgroundColor: '#03A9F4',
  },

  enviar:{
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: 'black',
    margin: 30,
  },

  textEnviar: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  }

});
