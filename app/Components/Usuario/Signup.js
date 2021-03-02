import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, TextInput, Button } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';


const db = openDatabase({ name: 'UserDatabase.db' });

const Signup = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const onPressCreate = () => {
    props.navigation.navigate('Home');
  }



  const onRegisterPress = () => {
    if (username === '' || password === '') {
        alert('Por favor informe seu Usuário e Senha!');
        return;
    }
    if (password !== confirmPassword) {
        alert('Senha e Confirmação de Senha não são iguais!');
        return;
    }
    db.transaction((tx) => {
        let sql = `SELECT * FROM users WHERE username='${username}'`;
        tx.executeSql(sql, [], (tx, results) => {
            const len = results.rows.length;
            if (len===0) {
                let sql = `INSERT INTO users (username, password) VALUES ("${username}", "${password}")`;
                tx.executeSql(sql, [], (tx, results) => {
                  alert('Usuário Registrado com sucesso!');
                  props.navigation.navigate('Home');
                });
            } else {
                alert('Este usuário já está sendo usado! Por favor escolher outro usuário.');
                return;
            }
        });
      
    });
  }

  return (
    <View>
      <View style={styles.container}>
      
        <Image
          style={{width: 150, height: 150}}
          source={{
            uri: `https://images.gamespress.com/Content/Artwork/NickNack/Pokemon/artwork/2020/11/26111909-196a8f67-b971-4854-8c55-96e803a5ba21/Pokemon_25th_Anniversary_Logo.png?w=240&mode=max&otf=y&quality=90&format=png&bgcolor=transparent&ex=2021-03-01+03%3A00%3A00&sky=2c75c32ed52d7e7db22d3e6543f14015f5af799da80f796eb7e4494f9ea07d3d`,
          }}
        />
        <TextInput
          style={styles.field}
          placeholder="Usuário"
          onChangeText={value => setUsername(value)}
          value={username}
        />
        <TextInput
          style={styles.field}
          placeholder="Senha"
          onChangeText={value => setPassword(value)}
          value={password}
        />
        <TextInput
          style={styles.field}
          placeholder="Confirme a Senha"
          onChangeText={value => setConfirmPassword(value)}
          value={confirmPassword}
        />
      </View>
      <View style={styles.fixToText}>
        <Button
          onPress={onRegisterPress}
          title="Criar Usuário"
          color="#0091EA"
        />
      </View>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 30,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
  },
  text: {
    fontSize: 20  ,
    marginBottom: 15,
  },
  field: {
    height: 40,
    borderWidth: 1,
    borderColor: '#000',
    textAlign: 'center',
    width: 300,
    marginTop: 10,
    borderRadius: 50,
  },
});