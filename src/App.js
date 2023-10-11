import React, { useState, useEffect } from 'react';
import TaskList from './TaskList';
import TaskModal from './TaskModal';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import "./App.css"

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
    setFilteredTasks(storedTasks);
  }, []);

  const saveTasksToLocalStorage = tasks => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };

  const addTask = () => {
    if (taskName.trim() !== '') {
      const updatedTasks = tasks.map(task =>
          task.id === selectedTaskId
              ? { ...task, name: taskName, description: taskDescription }
              : task
      );

      if (selectedTaskId === null) {
        const newTask = { id: Date.now(), name: taskName, description: taskDescription, completed: false };
        updatedTasks.push(newTask);
      }

      setTasks(updatedTasks);
      setFilteredTasks(updatedTasks);
      saveTasksToLocalStorage(updatedTasks);
      handleClose();
    }
  };

  const handleTaskStatus = (taskId, completed) => {
    const updatedTasks = tasks.map(task => (task.id === taskId ? { ...task, completed } : task));
    setTasks(updatedTasks);
    setFilteredTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
  };

  const handleDeleteTask = taskId => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
    setFilteredTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
  };

  const handleClose = () => {
    setShowModal(false);
    setTaskName('');
    setTaskDescription('');
    setSelectedTaskId(null);
  };

  const handleShow = (taskId) => {
    setShowModal(true);
    setSelectedTaskId(taskId);
    const selectedTask = tasks.find(task => task.id === taskId);
    if (selectedTask) {
      setTaskName(selectedTask.name);
      setTaskDescription(selectedTask.description);
    }
  };

  const handleFilter = completed => {
    const filtered = tasks.filter(task => task.completed === completed);
    setFilteredTasks(filtered);
  };

  return (
      <div className="container">
        <div className="taskContainer">
          <h1 className="mb-4 text-light">Список завдань</h1>
          <Button variant="primary" className="mb-3" onClick={() => handleShow(null)}>
            Додати завдання
          </Button>

          <div className="mb-3">
            <Button className="me-2" variant="secondary" onClick={() => handleFilter(true)}>Виконані</Button>
            <Button variant="secondary" onClick={() => handleFilter(false)}>Не виконані</Button>
          </div>
          <TaskList
              tasks={filteredTasks}
              onTaskStatusChange={handleTaskStatus}
              onDeleteTask={handleDeleteTask}
              onEditTask={handleShow}
          />
          <TaskModal
              showModal={showModal}
              onHide={handleClose}
              taskName={taskName}
              taskDescription={taskDescription}
              onTaskNameChange={setTaskName}
              onTaskDescriptionChange={setTaskDescription}
              onSaveTask={addTask}
              isEditing={selectedTaskId !== null}
          />
        </div>
      </div>
  );
};

export default App;
