import React, { Component } from 'react';
import {
  ScrollView
} from 'react-native';
import axios from 'axios';
import Itens from './itens';

export default class ListaItens extends Component {

	constructor(props) {
		super(props);

		this.state = { listaItens: [] };
	}

	componentWillMount() {
		//requisção HTTP
		axios.get('http://deadpyxel.pythonanywhere.com/api/v1/universities/1/')
			.then(response => { this.setState({ listaItens: response.buildings }); })
			.catch(() => { console.log('Erro ao recuperar os dados'); });
	}

  render() {
    return (
			<ScrollView style={{ backgroundColor: '#DDD' }}>
				{ this.state.listaItens.map(item => (<Itens key={item.name} item={item} />))}
			</ScrollView>
    );
  }
}
