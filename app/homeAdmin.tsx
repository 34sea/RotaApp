
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link, useRouter } from 'expo-router';

export default function HomeAdmin(){
    return (
        <View>
            <Text>
                Home admin
            </Text>
        </View>
    )
}