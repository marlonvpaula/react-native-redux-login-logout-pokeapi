import React, { useState, useEffect, Component } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, TextInput, Button } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import { openDatabase } from 'react-native-sqlite-storage';
import { useSelector, useDispatch } from 'react-redux';

const Signin = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const db = openDatabase({ name: 'UserDatabase.db' });
  
  useEffect(() => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='users'",
        [],
        function (tx, res) {
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS users', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS users(user_id INTEGER PRIMARY KEY AUTOINCREMENT, username VARCHAR(60), password VARCHAR(20), user_address VARCHAR(255))',
              []
            );
          }
        }
      );
    });
  }, []);



  const onLoginPress = () => {
      if (username === '' || password === '') {
        alert('Por favor informe seu Usuário e Senha!');
        return;
      }
      db.transaction((tx) => {
        const sql = `SELECT * FROM users WHERE username='${username}'`;
        tx.executeSql(sql, [], (tx, results) => {
          const len = results.rows.length;
          if (!len) {
            alert('Este usuário não existe!');
          } else {
            const row = results.rows.item(0);
            if (password === row.password) {
              dispatch({ type: 'LOGIN'});
              const resetAction = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'Pokemons' })],
              });
              props.navigation.dispatch(resetAction);
              return;
            }
            alert('Usuário ou senha inválidos!');
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
        
        <View style={styles.container}>
          <TextInput
            style={styles.field}
            placeholder="Usuário"
            keyboardType="email-address"
            onChangeText={value => setUsername(value)}
            value={username}
          />
          <TextInput
            style={styles.field}
            placeholder="Senha"
            autoCompleteType="password"
            secureTextEntry
            onChangeText={value => setPassword(value)}
            value={password}
          />
        </View>  
      </View>
      <View style={styles.fixToText}>
        <Button
          onPress={onLoginPress}
          title="Entrar"
          color="#0091EA"
        />
      </View>
      <View style={styles.fixToText}>
        <Text style={styles.text} onPress={() => {
            props.navigation.navigate('Signup');
          }}>
          Criar Usuário
        </Text>
      </View>
    </View>
  );
};


export default Signin;

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