import React, { useState, useEffect } from 'react';
import { View, Image, Text, TouchableOpacity, Linking } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as MailComposer from 'expo-mail-composer';

import style from './style';

import logo from '../../../assets/logo.png';

import api from '../../../services/api';

export default function ShowIncident() {
  const navigation = useNavigation();
  const route = useRoute();

  const incidentKey = route.params.key;
  const [incident, setIncident] = useState({});

  // TODO: fix backend and replace organizationNickname
  // TODO: break this string in multiple lines with no \n
  const heroMessage = `Hello, ${incident.key},
    I'm contacting you because I would like to help with ${incident.title} incident donating ${Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)} BRL to you!
    I hope this help you`;

  function navigate() {
    navigation.goBack();
  }

  async function showIncident() {
    const response = await api.get(`/incidents/${incidentKey}`)
    setIncident(response.data);
  }

  function sendWhatsapp() {
    // TODO: remove this const and set phone = ${incident.organization.whatsapp} after fix backend
    const phone = '55859';
    Linking.openURL(`whatsapp://send?phone=${phone}&text=${heroMessage}`);
  }

  function sendMail() {
    MailComposer.composeAsync({
      subject: `Hero of incident: ${incident.title}`,
      recipients: [], // TODO: fix backend and replace with incident.organization.email
      body: heroMessage,
    });
  }

  useEffect(() => {
    showIncident();
  }, []);

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
        {/* TODO: fix backend to return something like: {incident.organization.name} */}
        <Text style={style.incidentValue}>{incident.key}</Text>

        <Text style={style.incidentProperty}>CASO:</Text>
        <Text style={style.incidentValue}>{incident.title}</Text>
        <Text style={style.incidentValue}>{incident.description}</Text>

        <Text style={style.incidentProperty}>VALUE:</Text>
        <Text style={style.incidentValue}>
          {
            Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
              .format(incident.value)
          }
        </Text>
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
