import React from "react";
import { render } from "react-dom";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  Dimensions,
  ScrollView,
} from "react-native";
import { AppLoading } from "expo"
import { v1 as uuidv1 } from 'uuid'
const { height, width } = Dimensions.get("window");

import { Platform } from "react-native";
import Todo from "./ToDo";

export default class App extends React.Component {
  state = {
    newToDo: "",
    loadedToDos : false,
    toDos:{}
  };

  componentDidMount = () => {
    this._loadToDos()
  }

  render() {
    const { newToDo,loadedToDos,toDos } = this.state;
    console.log(toDos)
    if(!loadedToDos){
      return <AppLoading />
    }
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="white" />
        <Text style={styles.title}>오늘 할 일</Text>

        <View style={styles.card}>
          <TextInput
            style={styles.input}
            placeholder={"해야 할 일"}
            onChangeText={this._controlNewToDo}
            returnKeyType={"done"}
            value={newToDo}
            autoCorrect={false}
            onSubmitEditing={this._addToDo}
          />
          <ScrollView contentContainerStyle={styles.todo}>
            {Object.values(toDos).map(toDo => <Todo  deleteToDo={this._deleteTodo} key={toDo.id} {...toDo}/>)}
          </ScrollView>
        </View>
      </View>
    );
  }
  _controlNewToDo = (text) => {
    this.setState({
      newToDo: text,
    });
  };
  _loadToDos = () => {
    this.setState({
      loadedToDos:true
    })
  }
  _addToDo = () => {
    const {newToDo} = this.state;
    if(newToDo !== ""){
      this.setState(prevState => {
        const ID = uuidv1();
        const newToDoObject = {
          [ID]:{
            id:ID,
            isCompleted:false,
            text:newToDo,
            createAt:Date.now()
          }
        };
        const newState = {
          ...prevState,
          newToDo:"",
          toDos:{
            ...prevState.toDos,
            ...newToDoObject
          }
        }
        return {...newState}
      })
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#b8e994",
    alignItems: "center",
  },
  title: {
    color: "white",
    fontSize: 30,
    fontWeight: "200",
    marginBottom: 30,
    ...Platform.select({
      ios: {
        marginTop: 80,
        fontFamily: "Helvetica",
      },
      android: {
        marginTop: 50,
        fontFamily: "Roboto",
      },
    }),
  },
  card: {
    backgroundColor: "white",
    flex: 1,
    width: width - 25,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    ...Platform.select({
      ios: {
        shadowColor: "rgb(50, 50, 50)",
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowOffset: {
          height: -1,
          width: 0,
        },
      },
      android: {
        elevation: 5,
      },
    }),
  },
  input: {
    textAlign: "center",
    fontSize: 20,
    padding: 20,
    borderColor: "transparent",
    borderBottomColor: "#dbdbdb",
    borderWidth: 1,
  },
  todo: {
    alignItems: "center",
  },
});
