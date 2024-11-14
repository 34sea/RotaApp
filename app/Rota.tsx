import React from 'react';
import { View, Text, StyleSheet, FlatList, ListRenderItem } from 'react-native';
import { Link, useRouter } from 'expo-router';

type Route = {
  id: string;
  routeName: string;
  driver: string;
  infractions: number;
  fines: string;
};

const routesData: Route[] = [
  { id: '1', routeName: 'Centro - Bairro Industrial', driver: 'Carlos Almeida', infractions: 2, fines: '1000 MT' },
  { id: '2', routeName: 'Bairro Alto - Mercado', driver: 'Marta Lemos', infractions: 0, fines: '0 MT' },
  { id: '3', routeName: 'Praia - Centro', driver: 'Joaquim da Silva', infractions: 1, fines: '500 MT' },
  { id: '4', routeName: 'Terminal Rodoviário - Bairro Matacuane', driver: 'Ana Santos', infractions: 3, fines: '1500 MT' },
  // Adicione mais rotas conforme necessário
];

const RouteList = () => {
  const renderRouteItem: ListRenderItem<Route> = ({ item }) => (
    <View style={styles.routeCard}>
      <Text style={styles.routeName}>{item.routeName}</Text>
      <Text style={styles.routeInfo}>Condutor: {item.driver}</Text>
      <Text style={styles.routeInfo}>Infrações: {item.infractions}</Text>
      <Text style={styles.routeInfo}>Multas: {item.fines}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Rotas Registradas</Text>
      <FlatList
        data={routesData}
        renderItem={renderRouteItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
      <View style={styles.linksContainer}>
        <Link href="/AddRotas" style={styles.linkButton}>
          <Text style={styles.linkText}>Adicionar Rotas</Text>
        </Link>
      </View>
    </View>
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
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  routeCard: {
    backgroundColor: '#E0E0E0',
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    elevation: 3,
  },
  routeName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  routeInfo: {
    fontSize: 16,
    color: '#555',
    marginTop: 5,
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
