import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link, useRouter } from 'expo-router';
interface Route {
  id: string;
  routeName: string;
  price: string;
}

const RouteList: React.FC = () => {
  const [routes, setRoutes] = useState<Route[]>([]);

  // Carregar as rotas cadastradas no AsyncStorage
  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const storedRoutes = await AsyncStorage.getItem('rotaAdd');
        if (storedRoutes) {
          setRoutes(JSON.parse(storedRoutes));
        } else {
          Alert.alert('Aviso', 'Não há rotas cadastradas.');
        }
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível carregar as rotas.');
      }
    };
    fetchRoutes();
  }, []);

  const renderItem = ({ item }: { item: Route }) => (
    <View style={styles.routeItem}>
      <Text style={styles.routeText}>Nome da Rota: {item.routeName}</Text>
      <Text style={styles.routeText}>Preço: {item.price},00MZN</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Lista de Rotas Cadastradas</Text>

      <FlatList
        data={routes}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
      <View style={styles.linksContainer}>
        <Link href="/AddRotas" style={styles.linkButton}>
          <Text style={styles.linkText}>Adicionar Rotas</Text>
        </Link>
      </View>
    </View>
  );
};

// Estilos para a tela de lista de rotas
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  list: {
    paddingBottom: 20,
  },
  routeItem: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  routeText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  linksContainer: {
    position: "absolute",
    bottom: 10,
    left: "5%",
    width: "90%"
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
});

export default RouteList;
