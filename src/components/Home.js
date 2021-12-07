import React, { useState, useEffect } from "react";
import axios from "axios";

import url from "../ServerUrl";

import { RiDeleteBin6Line } from "react-icons/ri";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";

function Task({ task, taskIndex, completeTask, deleteTask, dataIndex }) {
  return (
    <div
      className="d-flex align-items-center py-3 mx-auto px-3 mb-3"
      style={{
        backgroundColor: task.completed ? "green" : "rgb(211, 211, 211)",
      }}
    >
      {task.completed ? null : (
        <IoCheckmarkDoneCircleOutline
          style={{ color: "green" }}
          className="mx-2"
          onClick={() => completeTask(taskIndex, dataIndex)}
        />
      )}
      <b>{task.name}</b>
      {task.completed ? null : (
        <RiDeleteBin6Line
          style={{ color: "red" }}
          className="mx-2"
          onClick={() => deleteTask(taskIndex, dataIndex)}
        />
      )}
    </div>
  );
}

function Heading({ today, head }) {
  return (
    <div className="d-flex my-4 align-items-center col-12 flex-column">
      <small style={{ color: today ? "rgb(0, 140, 255)" : "#000" }}>
        {head.day}
      </small>
      <div
        className="date-head"
        style={{
          color: today ? "#fff" : "#000",
          backgroundColor: today ? "rgb(0, 140, 255)" : "#fff",
        }}
      >
        {head.date}
      </div>
    </div>
  );
}

function TaskColumn({ data, deleteTask, addTask, completeTask, dataIndex }) {
  const currdate = new Date();

  // eslint-disable-next-line
  const today = currdate.getDate() == data.head.date;

  const [addtask, setAddtask] = useState(false);

  const datadate = new Date();
  datadate.setDate(data.head.date);
  const past = datadate.setHours(0, 0, 0, 0) >= currdate.setHours(0, 0, 0, 0);
  return (
    <div className="d-flex flex-column">
      <Heading today={today} head={data.head} />
      <div className="d-flex flex-column">
        {data.tasks.map((task, index) => (
          <Task
            deleteTask={deleteTask}
            completeTask={completeTask}
            dataIndex={dataIndex}
            key={index}
            taskIndex={index}
            task={task}
          />
        ))}
      </div>
      {addtask ? (
        <input
          autoFocus
          placeholder="Task"
          type="text"
          onBlur={(e) => {
            addTask(e.target.value, dataIndex);
            setAddtask(false);
          }}
          onKeyDown={(e) => {
            // eslint-disable-next-line
            if (e.key == "Enter") {
              addTask(e.target.value, dataIndex);
              setAddtask(false);
            }
          }}
          className="mx-auto col-11 mb-5"
        />
      ) : null}
      {past ? (
        <button onClick={() => setAddtask(true)} className="add-btn">
          Add Item
        </button>
      ) : null}
    </div>
  );
}

function Home() {
  const [datas, setDatas] = useState([]);

    const addTask = (name, dataIndex) => {
        if(name!=="")
    axios
      .post(`${url}/task/add`, { name, dataIndex })
      .then((res) => {
        if (res.data.success)
          axios
            .get(`${url}/task/data`)
            .then((res) => {
              if (res.data.data) setDatas(res.data.data);
            })
            .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };
  const deleteTask = (taskIndex, dataIndex) => {
    axios
      .post(`${url}/task/delete`, { taskIndex, dataIndex })
      .then((res) => {
        if (res.data.success)
          axios
            .get(`${url}/task/data`)
            .then((res) => {
              if (res.data.data) setDatas(res.data.data);
            })
            .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };
  const completeTask = (taskIndex, dataIndex) => {
    axios
      .post(`${url}/task/completed`, { taskIndex, dataIndex })
      .then((res) => {
        if (res.data.success)
          axios
            .get(`${url}/task/data`)
            .then((res) => {
              if (res.data.data) setDatas(res.data.data);
            })
            .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get(`${url}/task/data`)
        .then((res) => {
        if (res.data.data) setDatas(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="main-body d-flex flex-column my-5">
      <h4 className="heading">AWESOME TO-DO APP</h4>
      <div className="d-flex my-4 w-100 justify-content-evenly">
        {datas.map((data, index) => (
          <TaskColumn
                key={index}
                dataIndex={index}
            completeTask={completeTask}
            deleteTask={deleteTask}
            addTask={addTask}
            data={data}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
