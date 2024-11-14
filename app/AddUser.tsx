import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

interface User {
  name: string;
  cell: string;
  email: string;
}

const AddUserScreen: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [cell, setCell] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  // Função para salvar o usuário no AsyncStorage
  const handleAddUser = async () => {
    if (!name || !cell || !email) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos!');
      return;
    }

    const newUser: User = { name, cell, email };

    try {
      // Obter os usuários existentes do AsyncStorage
      const storedUsers = await AsyncStorage.getItem('userRota');
      const users = storedUsers ? JSON.parse(storedUsers) : [];

      // Adicionar o novo usuário à lista
      users.push(newUser);

      // Salvar a lista de usuários no AsyncStorage
      await AsyncStorage.setItem('userRota', JSON.stringify(users));

      Alert.alert('Sucesso', `Usuário ${name} adicionado com sucesso!`);

      // Limpar os campos após adicionar
      setName('');
      setCell('');
      setEmail('');
      router.push("/homeAdmin")
    } catch (error) {
      Alert.alert('Erro', 'Erro ao salvar o usuário. Tente novamente.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Adicionar Novo Usuário</Text>

      {/* Nome */}
      <Text style={styles.label}>Nome:</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o nome"
        value={name}
        onChangeText={setName}
      />

      {/* Celular */}
      <Text style={styles.label}>Celular:</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o celular"
        value={cell}
        onChangeText={setCell}
        keyboardType="phone-pad"
      />

      {/* Email */}
      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      {/* Botão de Adicionar Usuário */}
      <TouchableOpacity style={styles.button} onPress={handleAddUser}>
        <Text style={styles.buttonText}>Adicionar Usuário</Text>
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
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    color: '#333',
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#1a2b36',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 8,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default AddUserScreen;
