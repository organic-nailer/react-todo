import React from 'react';
import { Todo } from "./components/Todo";
import { TodoData } from "./index";
import { FilterButton } from "./components/FilterButton";
import { Form } from "./components/Form";
import { nanoid } from "nanoid";

type AppProps = {
  tasks: TodoData[]
};

type AppState = {
  tasks: TodoData[]
};

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      tasks: props.tasks
    };
  }

  addTask = (name: string) => {
    const newTask: TodoData = { id: "todo-" + nanoid(), name: name, completed: false };
    this.setState({
      tasks: this.state.tasks.concat(newTask)
    });
    alert(name);
  }

  toggleTaskCompleted = (id: string) => {
    const updatedTasks = this.state.tasks.map(task => {
      if(id == task.id) return {...task, completed: !task.completed };
      return task;
    });
    this.setState({
      tasks: updatedTasks
    });
  }

  deleteTask = (id: string) => {
    const remainingTasks = this.state.tasks.filter(task => id !== task.id);
    this.setState({
      tasks: remainingTasks
    });
  };

  render() {
    const taskList = this.state.tasks.map(task => (
      <Todo
        name={task.name}
        completed={task.completed}
        id={task.id}
        key={task.id}
        toggleTaskCompleted={this.toggleTaskCompleted}
        deleteTask={this.deleteTask}
      />
    ));
    const tasksNoun = taskList.length !== 1 ? 'tasks' : "task";
    const headingText = `${taskList.length} ${tasksNoun} remaining`;
    return (
      <div className="todoapp stack-large">
        <h1>TodoMatic</h1>
        <Form addTask={this.addTask} />
        <div className="filters btn-group stack-exception">
          <FilterButton name="all" pressed={true} />
          <FilterButton name="Active" pressed={false} />
          <FilterButton name="Completed" pressed={false} />
        </div>
        <h2 id="list-heading">
          {headingText}
        </h2>
        <ul
          role="list"
          className="todo-list stack-large stack-exception"
          aria-labelledby="list-heading"
        >
          {taskList}
        </ul>
      </div>
    )
  }
}

export default App;
