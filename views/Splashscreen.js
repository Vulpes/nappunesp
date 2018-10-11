import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableWithoutFeedback,
} from 'react-native';

import BlinkText from '../components/BlinkText';

import { createStackNavigator, NavigationActions, StackActions  } from 'react-navigation'; 

import axios from 'axios';

//importando funções
import {
    Storage
} from '../utils/Storage';

//apagar esta importação
import Bloco from '../components/Pickers/Bloco';

var url = 'http://deadpyxel.pythonanywhere.com/api/v1/universities/1/';

var received;

export default class Splashscreen extends React.Component {
    constructor(){
        super();
        this.state = {
          show: false,
        }
    }


    componentWillMount(){
        /*setTimeout(() => {
            const resetAction = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'HomeScreen' })],
              });
              this.props.navigation.dispatch(resetAction);
        }, 10000);*/
        
        //recebendo as informações do servidor
        axios.get(url).then(function(response){
            console.log(response.data.buildings);
            received = response.data.buildings;
            console.log('@@@@@@@@@@@ANTES DA FUNÇÃO@@@@@@@@@@@@@@@');
            console.log(received);
            Storage.storeItem('@universities', received);
            console.log("__________@@@@@@@@@@@@____________");
            console.log(Storage.retrieveItem('@universities'));
           
        }).catch(function(error){
            console.log(error);
        });

    }


    static navigationOptions = {
        header: null,
    };

    render(){
        return (
            //TouchableWithouFeedback permite pegar o click em qualquer parte da tela
            <TouchableWithoutFeedback
                onPressIn={this._saveData}
                onPressOut={() => this.props.navigation.navigate('HomeScreen')}
            >
                <View style={styles.container}>
                    <View style={styles.containerImage}>
                        <Image style={styles.logo} resizeMode={'contain'} source={require('../assets/logo.png')}/>
                    </View>
                    <View style={styles.container2}>
                        <BlinkText text='Pressione para Continuar' />
                        <Bloco/>
                    </View>
                </View>
            </TouchableWithoutFeedback>
            
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'#fff',
    },
    logo:{
      marginVertical: 20,
      height: 250,
      alignSelf: 'center',
    },
    container2:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    containerImage:{
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center'
    }
});