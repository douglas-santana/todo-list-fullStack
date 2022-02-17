import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Main() {
  const [task, setTask] = useState('');
  const [arrTasks, setArrTasks] = useState([]);

  const handleChange = (e) => {
    const { value } = e.target;
    setTask(value);
  }

  const addTaskonList = async () => {
    setArrTasks([...arrTasks, task]);
    await axios.post('http://localhost:3001/', { task });
  }

  const getTasks = async () => {
    const { data: { tasks: arrTasksSaved }} = await axios.get('http://localhost:3001/');
    setArrTasks(arrTasksSaved);
  }

  useEffect(() => {
    getTasks();
  }, [])

  return (
    <>
      <div className='addTask'>
        <input type='text' onChange={handleChange}/>
        <button onClick={addTaskonList}>Adicionar</button>
      </div>
      <div>
        <ul>{arrTasks.map((task) => <li key={task}>{task}</li>)}</ul>
      </div>
    </>
  );
}

export default Main;