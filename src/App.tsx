import React from 'react';
import { Todo } from "./components/Todo";
import { TodoData } from "./index";
import { FilterButton } from "./components/FilterButton";
import { Form } from "./components/Form";

type AppProps = {
  tasks: TodoData[]
};

function App(props: AppProps) {
  const taskList = props.tasks.map(task => (
    <Todo
      name={task.name}
      completed={task.completed}
      id={task.id}
      key={task.id}
    />
  ));
  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form />
      <div className="filters btn-group stack-exception">
        <FilterButton name="all" pressed={true} />
        <FilterButton name="Active" pressed={false} />
        <FilterButton name="Completed" pressed={false} />
      </div>
      <h2 id="list-heading">
        3 tasks remaining
      </h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
      </ul>
    </div>
  );
}

export default App;
