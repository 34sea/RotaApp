import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Definindo o tipo do usuário
interface User {
  id: string;
  name: string;
  email: string;
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  // Função para carregar os usuários do AsyncStorage
  const loadUsers = async () => {
    try {
      const storedUsers = await AsyncStorage.getItem('userRota');
      if (storedUsers) {
        const parsedUsers = JSON.parse(storedUsers);
        // Se algum usuário não tem id, gera um ID único
        const usersWithIds = parsedUsers.map((user: User, index: number) => ({
          ...user,
          id: user.id || `${Date.now()}-${index}`, // Gerando ID único
        }));
        setUsers(usersWithIds);
      } else {
        Alert.alert('Nenhum usuário encontrado', 'Não há usuários registrados no sistema.');
      }
    } catch (error) {
      console.error('Erro ao carregar usuários do AsyncStorage', error);
      Alert.alert('Erro', 'Erro ao carregar os usuários.');
    }
  };

  // Chamar a função loadUsers assim que o componente for montado
  useEffect(() => {
    loadUsers();
  }, []);

  // Renderizar item do usuário
  const renderUserItem = ({ item }: { item: User }) => (
    <View style={styles.userCard}>
      <Text style={styles.userName}>{item.name}</Text>
      <Text style={styles.userInfo}>Email: {item.email}</Text>
    </View>
  );

  const addInfr = () => {
    router.push("/AddUser");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Lista de Usuários</Text>
      <FlatList
        data={users}
        renderItem={renderUserItem}
        keyExtractor={(item) => item.id} // Garantindo uma chave única
        contentContainerStyle={styles.listContainer}
      />
      <TouchableOpacity style={styles.button} onPress={addInfr}>
        <Text style={styles.buttonText}>Adicionar</Text>
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
  listContainer: {
    paddingBottom: 20,
  },
  userCard: {
    backgroundColor: '#E0E0E0',
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    elevation: 3,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  userInfo: {
    fontSize: 16,
    color: '#555',
    marginTop: 5,
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

export default UserList;
