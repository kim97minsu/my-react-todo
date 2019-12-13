// containers/TodosContainer.js
import React, { Component } from 'react';
import TodoModel from '../models/Todo';
import Todos from '../components/Todos';
import CreateTodoForm from '../components/CreateTodoForm';

class TodosContainer extends Component {

	state = {
		todos: []
	};

	constructor() {
		// super calls the parent constructor - TodoContainer Component 
		super();
		this.state = {
			todos: [],
		};
	};

	componentDidMount() {
		this.fetchData();
	};

	fetchData = () => {
		TodoModel.all().then((res)=> {
  		this.setState ({ todos: res.todos });
	  });
	};	

	createTodo = (todo) => {
		let newTodo = {
			body: todo,
			completed: false,
		};

		console.log(todo)
		TodoModel.create(newTodo).then((res) => {
			let todos = this.state.todos;
			todos.push(res);
			this.setState({ todos: todos })
		});
	};

	deleteTodo = (todo) => {
		TodoModel.delete(todo).then(data => {
			let todos = this.state.todos.filter(todo => {
				return todo._id !== data._id;
			})
			this.setState({ todos })
		})
	}

	updateTodo = todo => {
		const isUpdatedTodo = t => {
			return t._id === todo._id;
		}
		TodoModel.update(todo) 
			.then(data => {
				let todos = this.state.todos; 
				todos.find(isUpdatedTodo).body = todo.body;
				this.setState({ todos });
			})
	}

	render() {
	  return (
    	<div className='todosContainer'>
    		<CreateTodoForm
    			createTodo={ this.createTodo } />
    		<Todos 
    			todos={this.state.todos}
    			deleteTodo={this.deleteTodo}
    			/>
    	</div>
	  );
	};
}

export default TodosContainer;






