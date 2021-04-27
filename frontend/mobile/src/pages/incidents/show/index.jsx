import React from 'react';
import { View, Image, Text, TouchableOpacity, Linking } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as MailComposer from 'expo-mail-composer';

import style from './style';

import logo from '../../../assets/logo.png';

export default function ShowIncident() {
  const navigation = useNavigation();
  const heroMessage = 'I\'m the hero';

  function navigate() {
    navigation.goBack();
  }

  function sendWhatsapp() {
    Linking.openURL(`whatsapp://send?phone=5585&text=${heroMessage}`);
  }

  function sendMail() {
    MailComposer.composeAsync({
      subject: '',
      recipients: [],
      body: heroMessage,
    });
  }

  return (
    <View style={style.container}>

      <View style={style.header}>
        <Image source={logo} />
        <TouchableOpacity onPress={navigate}>
          <Feather name="arrow-left" size={16} color="#E02041"/>
        </TouchableOpacity>
      </View>

      <View style={style.incident}>
        <Text style={[style.incidentProperty, { marginTop: 0 }]}>ORG:</Text>
        <Text style={style.incidentValue}>ORG123</Text>

        <Text style={style.incidentProperty}>CASO:</Text>
        <Text style={style.incidentValue}>CASE123</Text>

        <Text style={style.incidentProperty}>VALUE:</Text>
        <Text style={style.incidentValue}>12345.67</Text>
      </View>

      <View style={style.contact}>
        <Text style={style.title}>Save the day</Text>
        <Text style={style.title}>Be the hero of this incident</Text>
        <Text style={style.description}>Be the hero of this incident</Text>

        <View style={style.actions}>
          <TouchableOpacity style={style.action} onPress={sendWhatsapp}>
            <Text style={style.actionText}>Whatsapp</Text>
          </TouchableOpacity>

          <TouchableOpacity style={style.action} onPress={sendMail}>
            <Text style={style.actionText}>Email</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
