"use client";

import React, { FormEventHandler, useState } from "react";
import Modal from "./Modal";
import { addTodo } from "@/api";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from 'uuid'

const AddTask = () => {
  const router = useRouter()
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [newStatevalue, setNewStatevalue] = useState<string>('');

  const handlesubmit : FormEventHandler<HTMLFormElement> = async(e) => {
    e.preventDefault();
    await addTodo({
      id:uuidv4(),
      text: newStatevalue
    })
    setNewStatevalue("");
    setModalOpen(false);
    router.refresh();
  };

  return (
    <div>
      <button
        onClick={() => setModalOpen(true)}
        className="btn btn-primary w-full"
      >
        Add Task
      </button>
      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <form onSubmit={handlesubmit}>
          <h3>Add new task</h3>
          <div className="modal-action">
            <input
            value={newStatevalue}
              onChange={(e) => setNewStatevalue(e.target.value)}
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
            />
            <button type="submit" className="btn">Submit</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AddTask;
