import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker'; // Importação corrigida
import { router } from 'expo-router';

const UserRouteAssociation = () => {
  const [users, setUsers] = useState<{ id: string, name: string }[]>([]);
  const [routes, setRoutes] = useState<{ id: string, routeName: string }[]>([]);
  const [selectedUser, setSelectedUser] = useState<string>('');
  const [selectedRoute, setSelectedRoute] = useState<string>('');

  // Função para carregar usuários e rotas do AsyncStorage
  const loadData = async () => {
    try {
      const storedUsers = await AsyncStorage.getItem('userRota');
      const storedRoutes = await AsyncStorage.getItem('rotaAdd');
      
      if (storedUsers && storedRoutes) {
        setUsers(JSON.parse(storedUsers));
        setRoutes(JSON.parse(storedRoutes));
      } else {
        Alert.alert('Nenhum dado encontrado', 'Não há usuários ou rotas registrados.');
      }
    } catch (error) {
      console.error('Erro ao carregar dados', error);
      Alert.alert('Erro', 'Erro ao carregar dados.');
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Função para associar o usuário e a rota
  const handleAssociation = async () => {
    if (!selectedUser || !selectedRoute) {
      Alert.alert('Erro', 'Por favor, selecione um usuário e uma rota.');
      return;
    }

    const association = {
      userId: selectedUser,
      routeId: selectedRoute,
    };

    try {
      // Recupera as associações existentes
      const storedAssociations = await AsyncStorage.getItem('rotaAndUser');
      const associations = storedAssociations ? JSON.parse(storedAssociations) : [];

      // Adiciona a nova associação
      associations.push(association);

      // Salva novamente as associações no AsyncStorage
      await AsyncStorage.setItem('rotaAndUser', JSON.stringify(associations));

      Alert.alert('Sucesso', 'Usuário associado à rota com sucesso!');
      router.push("/homeAdmin")
    } catch (error) {
      console.error('Erro ao associar usuário à rota', error);
      Alert.alert('Erro', 'Erro ao associar usuário à rota.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Associação de Usuário e Rota</Text>

      {/* Select de Usuários */}
      <Text style={styles.label}>Selecione o Usuário</Text>
      <Picker
        selectedValue={selectedUser}
        style={styles.input}
        onValueChange={(itemValue: string) => setSelectedUser(itemValue)} // Tipando o itemValue como string
      >
        <Picker.Item label="Selecione um usuário" value="" />
        {users.map((user) => (
          <Picker.Item key={user.id} label={user.name} value={user.id} />
        ))}
      </Picker>

      {/* Select de Rotas */}
      <Text style={styles.label}>Selecione a Rota</Text>
      <Picker
        selectedValue={selectedRoute}
        style={styles.input}
        onValueChange={(itemValue: string) => setSelectedRoute(itemValue)} // Tipando o itemValue como string
      >
        <Picker.Item label="Selecione uma rota" value="" />
        {routes.map((route) => (
          <Picker.Item key={route.id} label={route.routeName} value={route.id} />
        ))}
      </Picker>

      <TouchableOpacity style={styles.button} onPress={handleAssociation}>
        <Text style={styles.buttonText}>Associar Usuário à Rota</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#1a2b36',
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default UserRouteAssociation;
