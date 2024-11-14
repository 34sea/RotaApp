import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link } from 'expo-router';

const AdminHome = () => {
  const [infractionCount, setInfractionCount] = useState(0);
  const [fineCount, setFineCount] = useState(0);
  const [routeCount, setRouteCount] = useState(0);
  const [driverCount, setDriverCount] = useState(0);

  // Função para carregar os dados dinamicamente
  useEffect(() => {
    const fetchCounts = async () => {
      try {
        // Carregar o número de infrações
        const infractions = await AsyncStorage.getItem('userRota');
        const infractionData = infractions ? JSON.parse(infractions) : [];
        setInfractionCount(infractionData.length);

        // Carregar o número de multas aplicadas
        const fines = await AsyncStorage.getItem('userRota');
        const fineData = fines ? JSON.parse(fines) : [];
        setFineCount(fineData.length);

        // Carregar o número de rotas registradas
        const routes = await AsyncStorage.getItem('rotaAdd');
        const routeData = routes ? JSON.parse(routes) : [];
        setRouteCount(routeData.length);

        // Carregar o número de condutores
        const drivers = await AsyncStorage.getItem('userRota');
        const driverData = drivers ? JSON.parse(drivers) : [];
        setDriverCount(driverData.length);
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível carregar os dados.');
      }
    };

    fetchCounts();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Painel do Administrador</Text>

      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>Bem-vindo(a), Admin</Text>
        <Text style={styles.subText}>Aqui você pode gerenciar infrações, multas e rotas</Text>
      </View>

      <View style={styles.summaryContainer}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Infrações</Text>
          <Text style={styles.summaryCount}>{infractionCount}</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Multas Aplicadas</Text>
          <Text style={styles.summaryCount}>{fineCount}</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Rotas Registradas</Text>
          <Text style={styles.summaryCount}>{routeCount}</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Condutores</Text>
          <Text style={styles.summaryCount}>{driverCount}</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Ações Rápidas</Text>
      <View style={styles.linksContainer}>
        <Link href="/RotaLista" style={styles.linkButton}>
          <Text style={styles.linkText}>Rotas</Text>
        </Link>
        <Link href="/Condutores" style={styles.linkButton}>
          <Text style={styles.linkText}>Condutores</Text>
        </Link>
        <Link href="/InfraList" style={styles.linkButton}>
          <Text style={styles.linkText}>Infrações</Text>
        </Link>
        <Link href="/rotaAndUser" style={styles.linkButton}>
          <Text style={styles.linkText}>Rota - user</Text>
        </Link>
      </View>

      <Text style={styles.sectionTitle}>Notificações Recentes</Text>
      <View style={styles.notificationCard}>
        <Text style={styles.notificationText}>Novo relatório de infração adicionado.</Text>
        <Text style={styles.notificationText}>Multa pendente para aprovação.</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  welcomeContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: "rgba(26, 43, 54, 0.1)",
    borderRadius: 8,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a2b36',
    textAlign: 'center',
  },
  subText: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
    marginTop: 5,
  },
  summaryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  summaryCard: {
    width: '48%',
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'center',
    elevation: 5,
    borderWidth: 1,
    borderColor: "#1a2b36",
  },
  summaryTitle: {
    fontSize: 16,
    color: '#1a2b36',
  },
  summaryCount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a2b36',
    marginTop: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 10,
  },
  linksContainer: {
    marginBottom: 20,
  },
  linkButton: {
    display: "flex",
    backgroundColor: '#1a2b36',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
    justifyContent: "center"
  },
  linkText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    justifyContent: "center"
  },
  notificationCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
    elevation: 3,
  },
  notificationText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
});

export default AdminHome;
