import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addTodo, clearAll, deleteTodo, editTodo } from '../Actions/TodoActions';
import TodoItem from './TodoItem'

class FormAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      isEdit: false,
      textEdit: '',
      todoEdit: {}
    }
  }
  handleClick = (event) => {
    let textInput = event.target.value;
    this.setState({
      text: textInput
    })
  }
  addTodo = () => {
    const { text } = this.state
    const { onAddTodo, todoList } = this.props
    onAddTodo({
      text: text,
      id: todoList.length + 1 + Math.random()
    })
  }
  clearAll = () => {
    const { onClearAll } = this.props
    onClearAll()
  }
  deleteTodo = (index) => {
    const { onDeleteTodo } = this.props
    onDeleteTodo(index)
  }
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~EDIT-TODO~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  onEdit = (booleanEdit, todo) => {
    this.setState({
      idEdit: todo.id,
      isEdit: booleanEdit,
      textEdit: todo.text,
      todoEdit: todo
    })
  }
  handleChange = (event) => {
    this.setState({
      textEdit: event.target.value
    })
  }
  saveEdit = () => {
    const { textEdit, todoEdit } = this.state
    const { onEditTodo } = this.props
    this.setState({
      isEdit: false,
    })
    onEditTodo(todoEdit, textEdit)
  }
  cancelEdit=()=>{
    this.setState({
      isEdit: false,
    })
  }

  render() {
    const { todoList } = this.props
    const { isEdit, textEdit } = this.state
    return (
      <div><br></br><br></br>
        <input type='text' onChange={this.handleClick} value={this.state.text} /> <br></br>
        <li>
          <button onClick={this.addTodo}>Add</button>
          <button onClick={this.clearAll}>Clear All</button>
        </li>

        <h4>To Do List: </h4>
        {
          todoList.length > 0 &&
          todoList.map((todo) =>
            <TodoItem key={todo.id}
              onDelete={this.deleteTodo} todo={todo} editText={this.onEdit} />
          )
        }
        {
          isEdit &&
          <li className='item'>
            <input className='input-edit' type='text'
              value={textEdit}
              onChange={this.handleChange}
            />
            <button className='button-save' onClick={this.saveEdit}>Save</button>
            <button className='button-cancel' onClick={this.cancelEdit}>Cancel</button>
          </li>
        }
      </div>
    )
  }
}
const mapStateToProps = state => ({
  todoList: state.todoList
})
const mapDispatchToProps = dispatch => ({
  onAddTodo: (text) => dispatch(addTodo(text)),
  onClearAll: () => dispatch(clearAll()),
  onDeleteTodo: (index) => dispatch(deleteTodo(index)),
  onEditTodo: (todo, text) => dispatch(editTodo(todo, text))
})

export default connect(mapStateToProps, mapDispatchToProps)(FormAdd)