import React from 'react';
import { Button, ListGroup } from 'react-bootstrap';
import { FaCheck, FaPencil, FaRegTrashCan, FaShare } from "react-icons/fa6";
import ua from './ukraine.png'


const TaskList = ({ tasks, onTaskStatusChange, onDeleteTask, onEditTask }) => (
    <ListGroup>
        {tasks.length === 0 ? (
            <h2 style={{fontSize: '30px'}} className="text-light">
                Завдань немає - Слава Україні
                <img style={{width: '70px', margin: '20px'}} src={ua} alt="Ukraine"/>
            </h2>
        ) : (
            tasks.map(task => (
                <ListGroup.Item
                    key={task.id}
                    style={{ backgroundColor: task.completed ? 'rgb(173 238 217)' : 'white' }}>
                    <strong style={{ textDecoration: task.completed ? 'line-through' : 'none', fontSize: '25px' }}>{task.name}</strong>
                    <br />
                    <span style={{ fontSize: '18px' }}>
            {task.description}
          </span>
                    <div className="d-flex justify-content-end mt-4">
                        <Button variant={task.completed ? "secondary": "success"} className="ms-2" size="md" onClick={() => onTaskStatusChange(task.id, !task.completed)}>
                            {task.completed ? <FaShare></FaShare>: <FaCheck></FaCheck>}
                        </Button>
                        <Button variant="primary" className="ms-2" size="md" onClick={() => onEditTask(task.id)}>
                            <FaPencil></FaPencil>
                        </Button>
                        <Button variant="danger" className="ms-2" size="md" onClick={() => onDeleteTask(task.id)}>
                            <FaRegTrashCan></FaRegTrashCan>
                        </Button>
                    </div>
                </ListGroup.Item>
            ))
        )}
    </ListGroup>
);

export default TaskList;
