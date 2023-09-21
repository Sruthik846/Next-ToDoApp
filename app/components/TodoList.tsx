import { ITask } from "@/types/tasks";
import React from "react";
import Tasks from "./Tasks";

interface TodoListProps {
  tasks: ITask[];
}

const TodoList: React.FC<TodoListProps> = ({ tasks }) => {
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Tasks</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <Tasks key={task.id} task={task}></Tasks>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TodoList;
