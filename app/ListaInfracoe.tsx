import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Interface para definir o formato de cada infração
interface Infraction {
  id: string;
  userName: string;
  infractionDescription: string;
  fineAmount: string;
}

const InfractionsList: React.FC = () => {
  const [infractionsData, setInfractionsData] = useState<Infraction[]>([]);

  // Função para carregar as infrações do LocalStorage
  const fetchInfractions = async () => {
    try {
      const storedInfractions = await AsyncStorage.getItem('rotaMulta');
      if (storedInfractions) {
        const parsedInfractions: Infraction[] = JSON.parse(storedInfractions);
        setInfractionsData(parsedInfractions);
      } else {
        Alert.alert("Aviso", "Nenhuma infração encontrada no banco de dados.");
      }
    } catch (error) {
      console.error("Erro ao carregar infrações:", error);
      Alert.alert('Erro', 'Não foi possível carregar as infrações.');
    }
  };

  // Carregar dados de infrações na inicialização
  useEffect(() => {
    fetchInfractions();
  }, []);

  // Função para renderizar os itens da lista
  const renderItem = ({ item }: { item: Infraction }) => (
    <View style={styles.infractionItem}>
      <Text style={styles.infractionText}><Text style={styles.bold}>Usuário:</Text> {item.userName}</Text>
      <Text style={styles.infractionText}><Text style={styles.bold}>Infração:</Text> {item.infractionDescription}</Text>
      <Text style={styles.infractionText}><Text style={styles.bold}>Valor da Multa:</Text> {item.fineAmount}</Text>
    </View>
  );

  // Função para redirecionar à tela de adicionar infrações
  const addInfr = () => {
    router.push("/Infracoes");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Lista de Infrações</Text>
      
      {/* Lista de infrações */}
      <FlatList
        data={infractionsData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
      
      {/* Botão para adicionar nova infração */}
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
  list: {
    marginBottom: 20,
  },
  infractionItem: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  infractionText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  bold: {
    fontWeight: 'bold',
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

export default InfractionsList;
