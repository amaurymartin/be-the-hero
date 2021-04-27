import React from 'react';
import { View, Image, Text, FlatList, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import style from './style';

import logo from '../../../assets/logo.png';

export default function IndexIncidents() {
  const navigation = useNavigation();

  function navigate() {
    navigation.navigate('ShowIncident');
  }

  return (
    <View style={style.container}>

      <View style={style.header}>
        <Image source={logo} />
        <Text style={style.headerText}>
          Total of <Text style={style.headerTextBold}>0 cases</Text>
        </Text>
      </View>

      <Text style={style.title}>Welcome!</Text>
      <Text style={style.description}>Choose a incident below and save the day</Text>

      <FlatList
        data={[1, 2, 3]}
        style={style.incidents}
        keyExtractor={incident => String(incident)}
        showsVerticalScrollIndicator={false}
        renderItem={() => (
          <View style={style.incident}>
            <Text style={style.incidentProperty}>ORG:</Text>
            <Text style={style.incidentValue}>ORG123</Text>

            <Text style={style.incidentProperty}>CASO:</Text>
            <Text style={style.incidentValue}>CASE123</Text>

            <Text style={style.incidentProperty}>VALUE:</Text>
            <Text style={style.incidentValue}>12345.67</Text>

            <TouchableOpacity
              style={style.showIncidentButton}
              onPress={navigate}
            >
              <Text style={style.showIncidentButtonText}>See details</Text>
              <Feather name="arrow-right" size={16} color="#E02041"/>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
