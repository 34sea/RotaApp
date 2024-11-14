import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

interface Fine {
  id: string;
  userId: string;
  description: string;
  amount: string;
  date: string;
}

const FineList: React.FC = () => {
  const [fines, setFines] = useState<Fine[]>([]);

  // Carregar as multas aplicadas da tabela rotaMulta no LocalStorage
  useEffect(() => {
    const fetchFines = async () => {
      try {
        const storedFines = await AsyncStorage.getItem('rotaMulta');
        if (storedFines) {
          setFines(JSON.parse(storedFines));
        } else {
          Alert.alert('Aviso', 'Não há multas registradas.');
        }
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível carregar as multas.');
      }
    };
    fetchFines();
  }, []);

  const renderItem = ({ item }: { item: Fine }) => (
    <View style={styles.fineItem}>
      <Text style={styles.fineText}>Usuário: {item.userId}</Text>
      <Text style={styles.fineText}>Descrição: {item.description}</Text>
      <Text style={styles.fineText}>Valor: {item.amount},00MZN</Text>
      <Text style={styles.fineText}>Data: {item.date}</Text>
    </View>
  );

  const addInfr = () => {

    router.push("/Infracoes");
  };


  return (
    <View style={styles.container}>
      <Text style={styles.header}>Lista de Multas Aplicadas</Text>

      <FlatList
        data={fines}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
      <TouchableOpacity style={styles.button} onPress={addInfr}>
        <Text style={styles.buttonText}>Adicionar</Text>
      </TouchableOpacity>
    </View>
  );
};

// Estilos para a tela de lista de multas
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
  list: {
    paddingBottom: 20,
  },
  fineItem: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  fineText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
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

export default FineList;
