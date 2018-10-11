import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  Dimensions,
  Text,
} from 'react-native';

import InputContainer from '../components/InputContainer';
import Pipicker from '../components/Pipicker';
import PiModal from '../components/PiModal';
//linhas 41, 42, 43 - como tratar os pickers? 41 - picker bloco, 42 - picker andar, 43 - picker sala
export default class NoImageScreen extends Component {
    render() {
        return(
            <View style={styles.container}>
                <ScrollView>
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

                    <Pipicker />
                    <Pipicker />
                    <Pipicker />

                    <TouchableOpacity
                        style={styles.enviar}
                        onPress={}
                    >
                        <Text style={styles.textEnviar}>Enviar</Text>
                    </TouchableOpacity>


                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#DDD',
    },
  
    title:{
      fontSize: 22,
      fontWeight: 'bold',
      color: 'black',
      alignSelf: 'center',
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