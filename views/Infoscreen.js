import React from 'react';

import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  Dimensions,
  Text,
} from 'react-native';

import { createStackNavigator } from 'react-navigation';

export default class Infoscreen extends React.Component {

  // static navigationOptions = {
  //   title: 'FCT-UNESP',
  //   // headerStyle: { backgroundColor: 'black'},
  //   // headerTitleStyle: { color: 'white'},
  // };

  render() {
    return (

      <View style={styles.container}>
      <ScrollView>
      <Image style={styles.logo} resizeMode={'contain'} source={require('../assets/logo.png')}/>
      <View style={styles.subcontainer}>
        <Text h1 style={styles.title}>SOBRE</Text>
        <Text style={styles.sobre}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In massa elit, vestibulum eget leo at, aliquam fringilla nisl. Aenean eros sem, condimentum a nisi ut, consequat ultricies lectus. Nam dictum ex a elit suscipit interdum. Suspendisse mattis urna orci, id luctus lectus feugiat vel. Integer sollicitudin eu felis eu convallis. Proin tellus urna, consectetur pretium ex non, tristique molestie est. Nunc aliquet, urna nec imperdiet porttitor, mi nunc sagittis tortor, nec commodo est velit quis tellus. Morbi vel aliquet felis, vel accumsan tortor. Ut lacinia non ligula sit amet vestibulum. 
        </Text>

        <Text h1 style={styles.title}>EJCOMP</Text>

        <Text style={styles.sobre}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In massa elit, vestibulum eget leo at, aliquam fringilla nisl. Aenean eros sem, condimentum a nisi ut, consequat ultricies lectus. Nam dictum ex a elit suscipit interdum. Suspendisse mattis urna orci, id luctus lectus feugiat vel. Integer sollicitudin eu felis eu convallis. Proin tellus urna, consectetur pretium ex non, tristique molestie est. Nunc aliquet, urna nec imperdiet porttitor, mi nunc sagittis tortor, nec commodo est velit quis tellus. Morbi vel aliquet felis, vel accumsan tortor. Ut lacinia non ligula sit amet vestibulum. 
        </Text>
        <Image style={styles.logoEJC} resizeMode={'contain'} source={require('../assets/ejcomp.png')}/>
        <Text h1 style={styles.footer}>Desenvolvido por EJCOMP & Robson</Text>
      </View>
      </ScrollView>
      </View>
      );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },

  subcontainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },

  title: {
    marginTop: '1%',
    fontWeight: 'bold',
    fontSize: 30,
    alignSelf: 'center',
    color: 'black',
  },

  sobre: {
    paddingHorizontal: 20,
  },

  logo:{
    marginVertical: 20,
    height: 250,
    alignSelf: 'center',
  },

  logoEJC:{
    marginVertical: 20,
    height: 70,
    alignSelf: 'center',
  },

  footer:{
    marginTop: 30,
    fontSize: 11,
    alignSelf: 'center',
  }
});

