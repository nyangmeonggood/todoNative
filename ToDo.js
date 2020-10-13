import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from "react-native";
import PropTypes from "prop-types"

const { width, height } = Dimensions.get("window");

//수정시 state를 변경해줘야하기 때문에 class component를 사용했다.
export default class Todo extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isEditing: false,
      toDoValue:props.text
    }
  }

  static propTypes = {
    text:PropTypes.string.isRequired,
    isCompleted:PropTypes.bool.isRequired,
    deleteToDo:PropTypes.func.isRequired,
    id:PropTypes.string.isRequired
  }
  render() {
    const { isCompleted, isEditing, toDoValue } = this.state;
    const { text, id, deleteToDo } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.column}>
          <TouchableOpacity onPress={this._toggleCompleteTodo}>
            <View
              style={[
                styles.circle,
                isCompleted ? styles.completedCircle : styles.uncompletedCircle,
              ]}
            />
          </TouchableOpacity>
          
          { isEditing ? (
            <TextInput 
              retuneKeyType={'done'} 
              onChangeText={this._controllInput} 
              style={[
                styles.text,
                styles.input,
                isCompleted ? styles.completedText : styles.uncompletedText
              ]} 
              value={toDoValue} 
              multiline={true}
              onBlur={this._finishEditing}
            />
          ) : (
            <Text 
              style={[
                styles.text,
                isCompleted ? styles.completedText : styles.uncompletedText,
              ]}
            >
              {text}
            </Text>
          )}

        </View>
        {isEditing ? (
          <View style={styles.actions}>
            <TouchableOpacity onPressOut={this._finishEditing}>
              <View style={styles.actionContainer}>
                <Text style={styles.actionText}>✅</Text>
              </View>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.actions}>
            <TouchableOpacity onPressOut={this._startEditing}>
              <View style={styles.actionContainer}>
                <Text style={styles.actionText}>✏</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPressOut={() => deleteToDo(id)}>
              <View style={styles.actionContainer}>
                <Text style={styles.actionText}>❌</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }
  _toggleCompleteTodo = () => {
    this.setState((prevState) => {
      return {
        isCompleted: !prevState.isCompleted,
      };
    });
  };
  _startEditing = () => {
    this.setState({
      isEditing: true,
    });
  };
  _finishEditing = () => {
    this.setState({
      isEditing: false,
    });
  };
  _controllInput = (text) => {
    this.setState({toDoValue : text})
  }
  _deleteTodo = id =>{
    this.setState(prevState => {
      const toDos = prevState.toDos;
      delete toDos[id];
      const newState = {
        ...prevState,
        ...toDos
      }
      return {...newState}
    })
  }
}

const styles = StyleSheet.create({
  container: {
    width: width - 50,
    borderBottomColor: "#bbb",
    borderColor: "transparent",
    borderWidth: StyleSheet.hairlineWidth,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  text: {
    fontWeight: "600",
    fontSize: 14,
    marginVertical: 14,
  },
  completedText: {
    color: "#dbdbdb",
    textDecorationLine: "line-through",
  },
  uncompletedText: {
    color: "#111",
  },
  circle: {
    borderRadius: 50,
  },
  completedCircle: {
    width: 20,
    height: 20,
    borderWidth: 3,
    marginRight: 10,
    borderColor: "#dbdbdb",
  },
  uncompletedCircle: {
    width: 20,
    height: 20,
    borderWidth: 3,
    marginRight: 10,
    borderColor: "#FC2",
  },
  column: {
    width: width / 2,
    alignItems: "center",
    flexDirection: "row",
  },
  actions: {
    flexDirection: "row",
  },
  actionContainer: {
    paddingVertical: 10,
    paddingHorizontal: 6,
  },
  input:{
    marginVertical:9,
    width: width / 2,
  }
});
