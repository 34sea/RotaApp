import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

// Interface para definir o formato de cada usuário
interface User {
  id: string;
  name: string;
}

const Infractions: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<string>('');
  const [infractionDescription, setInfractionDescription] = useState<string>('');
  const [fineAmount, setFineAmount] = useState<string>('');
  const [usersData, setUsersData] = useState<User[]>([]);

  // Carregar os dados dos usuários da tabela userRota no LocalStorage
  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const storedUsers = await AsyncStorage.getItem('userRota');
        if (storedUsers) {
          setUsersData(JSON.parse(storedUsers));
        }
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível carregar os dados dos usuários');
      }
    };
    fetchUsersData();
  }, []);

  // Função para aplicar a multa e salvá-la na tabela rotaMulta
  const handleApplyFine = async () => {
    if (!selectedUser || !infractionDescription || !fineAmount) {
      Alert.alert('Erro', 'Todos os campos precisam ser preenchidos!');
      return;
    }

    const newFine = {
      id: new Date().toISOString(),
      userId: selectedUser,
      description: infractionDescription,
      amount: fineAmount,
      date: new Date().toLocaleDateString(),
    };

    try {
      // Carregar multas existentes da tabela rotaMulta e adicionar a nova multa
      const storedFines = await AsyncStorage.getItem('rotaMulta');
      const finesArray = storedFines ? JSON.parse(storedFines) : [];

      finesArray.push(newFine);
      await AsyncStorage.setItem('rotaMulta', JSON.stringify(finesArray));

      const userName = usersData.find((user) => user.id === selectedUser)?.name;
      Alert.alert(
        'Multa Aplicada',
        `Infração aplicada ao usuário ${userName}\nDescrição: ${infractionDescription}\nValor: R$${fineAmount}`
      );

      router.push("/homeAdmin");

      // Limpar os campos após o salvamento
      setSelectedUser('');
      setInfractionDescription('');
      setFineAmount('');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar a multa.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Aplicar Infração e Multa</Text>

      {/* Selecione o usuário */}
      <Text style={styles.label}>Selecione o Usuário:</Text>
      <Picker
        selectedValue={selectedUser}
        onValueChange={(itemValue) => setSelectedUser(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Selecione um usuário" value="" />
        {usersData.map((user) => (
          <Picker.Item label={user.name} value={user.id} key={user.id} />
        ))}
      </Picker>

      {/* Campo de Descrição da Infração */}
      <Text style={styles.label}>Descrição da Infração:</Text>
      <TextInput
        style={styles.input}
        placeholder="Informe a descrição da infração"
        value={infractionDescription}
        onChangeText={setInfractionDescription}
      />

      {/* Campo para o Valor da Multa */}
      <Text style={styles.label}>Valor da Multa:</Text>
      <TextInput
        style={styles.input}
        placeholder="Informe o valor da multa"
        keyboardType="numeric"
        value={fineAmount}
        onChangeText={setFineAmount}
      />

      {/* Botão para Aplicar a Multa */}
      <TouchableOpacity style={styles.button} onPress={handleApplyFine}>
        <Text style={styles.buttonText}>Aplicar Multa</Text>
      </TouchableOpacity>
    </View>
  );
};

// Estilos para a tela
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
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 20,
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

export default Infractions;
