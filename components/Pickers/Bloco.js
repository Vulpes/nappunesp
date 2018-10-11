import React, { Component } from 'react';
import {
    View,
    Picker,
    Button
} from 'react-native';

import ListaItens from '../Lista/lista';


export default class Bloco extends Component {

    constructor(props){
        super(props);
        this.state={
            blocos: '',
        }
    }

    showData(){
        return(
            <ListaItens />
        );
    }
    

    render() {
        return(
            <ListaItens/>
        );
    }
}