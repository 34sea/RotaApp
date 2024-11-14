import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

const RouteRegister = () => {
  const [routeName, setRouteName] = useState('');
  const [price, setPrice] = useState('');

  // Função para registrar a nova rota no AsyncStorage
  const handleRegister = async () => {
    if (!routeName || !price) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    // Criar a rota a ser salva
    const newRoute = {
      id: Date.now().toString(), // Gerando um ID único com base no tempo
      routeName,
      price,
    };

    try {
      // Recuperar as rotas existentes
      const storedRoutes = await AsyncStorage.getItem('rotaAdd');
      const routes = storedRoutes ? JSON.parse(storedRoutes) : [];

      // Adicionar a nova rota
      const updatedRoutes = [...routes, newRoute];

      // Salvar novamente no AsyncStorage
      await AsyncStorage.setItem('rotaAdd', JSON.stringify(updatedRoutes));

      // Limpar os campos
      setRouteName('');
      setPrice('');

      Alert.alert('Sucesso', 'Rota registrada com sucesso!');
      router.push("/homeAdmin")
    } catch (error) {
      console.error('Erro ao registrar a rota', error);
      Alert.alert('Erro', 'Erro ao registrar a rota.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Cadastrar Nova Rota</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome da Rota"
        value={routeName}
        onChangeText={setRouteName}
      />
      <TextInput
        style={styles.input}
        placeholder="Preço"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrar Rota</Text>
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

export default RouteRegister;
