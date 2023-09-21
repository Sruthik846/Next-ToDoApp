"use client";

import React, { FormEventHandler, useState } from "react";
import { ITask } from "@/types/tasks";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { DeleteTodo, EditTodo } from "@/api";

interface TaskProps {
  task: ITask;
}

const Tasks: React.FC<TaskProps> = ({ task }) => {
  const router = useRouter();
  const [modalEditOpen, setModalEditOpen] = useState<boolean>(false);
  const [modalDeleteOpen, setModalDeleteOpen] = useState<boolean>(false);
  const [taskToEdit, setTaskToEdit] = useState<string>(task.text);
  const handlesubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await EditTodo({
      id: task.id,
      text: taskToEdit,
    });
    setModalEditOpen(false);
    router.refresh();
  };
  

  const handleDeleteTask = async ( id : string ) => {
    await DeleteTodo(id);
    setModalDeleteOpen(false);
    router.refresh();
  }

  return (
    <tr key={task.id}>
      <td className="w-full">{task.text}</td>
      <td className="flex gap-5">
        <FiEdit
          onClick={() => setModalEditOpen(true)}
          size={20}
          cursor="pointer"
          className="text-blue-600"
        ></FiEdit>

        <Modal modalOpen={modalEditOpen} setModalOpen={setModalEditOpen}>
          <form onSubmit={handlesubmit}>
            <h3>Edit task</h3>
            <div className="modal-action">
              <input
                value={taskToEdit}
                onChange={(e) => setTaskToEdit(e.target.value)}
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
              />
              <button type="submit" className="btn">
                Submit
              </button>
            </div>
          </form>
        </Modal>

        <FiTrash2
          onClick={() => setModalDeleteOpen(true)}
          size={20}
          cursor="pointer"
          className="text-red-600"
        ></FiTrash2>
        
        <Modal modalOpen={modalDeleteOpen} setModalOpen={setModalDeleteOpen}>
        <h5>Are you sure, you want to delete this task?</h5>
        <div className="modal-action">
          <button onClick={ () => handleDeleteTask(task.id)} className="btn bg-red-800 text-white hover:text-black">Yes</button>
        </div>
      </Modal>
      </td>
    </tr>
  );
};

export default Tasks;
