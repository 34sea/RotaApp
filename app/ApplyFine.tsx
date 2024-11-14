import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native'; // Para pegar o parâmetro da URL

// Definindo o tipo para os parâmetros da navegação
type RootStackParamList = {
  ApplyFine: { userId: string };
};

type ApplyFineScreenRouteProp = RouteProp<RootStackParamList, 'ApplyFine'>;

const ApplyFine: React.FC = () => {
  const route = useRoute<ApplyFineScreenRouteProp>(); // Pegando os parâmetros da navegação
  const { userId } = route.params; // ID do usuário
  const [infraction, setInfraction] = useState('');
  const [fineAmount, setFineAmount] = useState('');

  const handleApplyFine = () => {
    if (infraction && fineAmount) {
      // Aqui você pode enviar os dados para o servidor ou salvar no banco
      Alert.alert('Infração e Multa aplicadas', `Usuário ${userId} recebeu a multa de R$${fineAmount}.`);
    } else {
      Alert.alert('Erro', 'Preencha todos os campos!');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Aplicar Infração e Multa</Text>
      <Text style={styles.subHeader}>Usuário ID: {userId}</Text>

      <TextInput
        style={styles.input}
        placeholder="Descrição da Infração"
        value={infraction}
        onChangeText={setInfraction}
      />

      <TextInput
        style={styles.input}
        placeholder="Valor da Multa"
        keyboardType="numeric"
        value={fineAmount}
        onChangeText={setFineAmount}
      />

      <Button title="Aplicar Multa" onPress={handleApplyFine} />
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
  subHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#555',
    marginBottom: 15,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
    borderRadius: 5,
  },
});

export default ApplyFine;
