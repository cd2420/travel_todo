import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { theme } from './colors';

export default function App() {

  const [todo, setTodo] = useState(true);
  const [text, setText] = useState("")
  const [toDos, setToDos] = useState({})

  const travel = () => setTodo(false)
  const to_do = () => setTodo(true) 
  const onChangeText = (payLoad) => {
    setText(payLoad)
  }
  const addToDo = () => {
    if (text === "") {
      return
    }
    // save toDo
    const newToDos = Object.assign({}, 
                                  toDos, 
                                  {[Date.now()]: {text, work: todo}}
                                  )
    setToDos(newToDos)
    setText("")
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
    , marginTop: 20
    , fontSize: 20
  }
});
