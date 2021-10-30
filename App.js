import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { theme } from './colors';

export default function App() {

  const [todo, setTodo] = useState(true);
  const [text, setText] = useState("")
  const [toDos, setToDos] = useState({})
  const STORAGE_KEY = "@toDos"

  useEffect(() => {
    loadToDos()
  }, [])

  const travel = () => setTodo(false)
  const to_do = () => setTodo(true) 
  const onChangeText = (payLoad) => {
    setText(payLoad)
  }
  const addToDo = async () => {
    if (text === "") {
      return
    }
    // save toDo
    const newToDos = {...toDos
                      , [Date.now()] : {text, todo}}
    setToDos(newToDos)
    await saveToDos(newToDos)
    setText("")
  }
  const saveToDos = async (toSave) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(toSave))
    } catch (e) {

    }
    
  }
  const loadToDos = async () => {
    const s = await AsyncStorage.getItem(STORAGE_KEY)
    setToDos(JSON.parse(s))
  }

  const deleteToDo = (key) => {
    Alert.alert(
      "Delete To DO?",
      "Are you sure?",
      [
        {
          text: "Cancel"
        },
        { text: "OK", onPress: async () => {
          const newToDos = {...toDos}
          delete newToDos[key]
          setToDos(newToDos) 
          await saveToDos(newToDos)
        }}
      ]

    )
    
  }
  
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header} >
        <TouchableOpacity onPress={to_do}>
          <Text style={{...styles.btnText, color: todo ? "white" : theme.grey}}>ToDo</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={travel}>
          <Text style={{...styles.btnText, color: !todo ? "white" : theme.grey }}>Travel</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TextInput 
          onSubmitEditing={addToDo}
          onChangeText={onChangeText}
          style={styles.input}
          value={text}
          placeholder={todo ? "Add a To_Do" : "Where do you want to go?"}
          
        />
        <ScrollView>
          {
            Object.keys(toDos).map(key => (
              
              toDos[key].todo === todo ?
              
              <View key={key} style={styles.toDo}>
                <Text style={styles.toDoText}>
                  {toDos[key].text}
                </Text>
                <TouchableOpacity onPress={ () => deleteToDo(key)}>
                  <Ionicons name="trash" size={24} color="white" />
                </TouchableOpacity>
              </View>
              :
              null
            ))
          }
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bg
    , paddingHorizontal: 20
  },
  header : {
    flexDirection: "row"
    , marginTop: 100
    , justifyContent: "space-between"
  },
  btnText: {
    fontSize: 44
    , fontWeight: "600"
  },
  input: {
    backgroundColor: "white"
    , paddingVertical: 15
    , paddingHorizontal: 20
    , borderRadius: 30
    , fontSize: 20
    , marginVertical: 20
  },
  toDo: {
    backgroundColor: theme.toDoBg
    , marginBottom: 10
    , paddingVertical: 20
    , paddingHorizontal: 40
    , borderRadius: 15
    , flexDirection: "row"
    , alignItems: "center"
    , justifyContent: "space-between"
  },
  toDoText: {
    color: "white"
    , fontSize: 16
    , fontWeight: "500"
  }
});
