import React, { useState, useEffect } from 'react';
import { View, Image, Text, FlatList, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import style from './style';

import logo from '../../../assets/logo.png';

import api from '../../../services/api';

export default function IndexIncidents() {
  const navigation = useNavigation();
  const [incidents, setIncidents] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);

  function navigate(incident) {
    navigation.navigate('ShowIncident', { key: incident.key});
  }

  async function indexIncidents() {
    if (loading) return;

    if (total > 0 && incidents.length === total) return;
    setLoading(true);

    const response = await api.get('/incidents', {
      params: { page }
    });
    setIncidents([...incidents, ...response.data]);
    setTotal(response.headers['x-total-count'] || 0);
    setPage(page + 1);
    setLoading(false);
  }

  useEffect(() => {
    indexIncidents();
  }, []);
  return (
    <View style={style.container}>

      <View style={style.header}>
        <Image source={logo} />
        <Text style={style.headerText}>
          Total of <Text style={style.headerTextBold}>{Number(total)} cases</Text>
        </Text>
      </View>

      <Text style={style.title}>Welcome!</Text>
      <Text style={style.description}>Choose a incident below and save the day</Text>

      <FlatList
        data={incidents}
        style={style.incidents}
        keyExtractor={incident => String(incident.key)}
        showsVerticalScrollIndicator={false}
        onEndReached={indexIncidents}
        renderItem={({ item: incident }) => (
          <View style={style.incident}>
            <Text style={style.incidentProperty}>ORG:</Text>
            {/* TODO: fix backend to return something like: {incident.organization.name} */}
            <Text style={style.incidentValue}>{incident.key}</Text>

            <Text style={style.incidentProperty}>INCIDENT:</Text>
            <Text style={style.incidentValue}>{incident.title}</Text>

            <Text style={style.incidentProperty}>VALUE:</Text>
            <Text style={style.incidentValue}>
              {
                Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
                  .format(incident.value)
              }
            </Text>

            <TouchableOpacity
              style={style.showIncidentButton}
              onPress={() => navigate(incident)}
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
