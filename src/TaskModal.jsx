import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const TaskModal = ({ showModal, onHide, taskName, taskDescription, onTaskNameChange, onTaskDescriptionChange, onSaveTask, isEditing }) => (
    <Modal show={showModal} onHide={onHide}>
        <Modal.Header closeButton>
            <Modal.Title>{isEditing ? 'Редагувати завдання' : 'Додати завдання'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Group controlId="taskName">
                    <Form.Label>Назва завдання</Form.Label>
                    <Form.Control type="text" placeholder="Введіть назву завдання" value={taskName} onChange={e => onTaskNameChange(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="taskDescription">
                    <Form.Label>Опис завдання</Form.Label>
                    <Form.Control as="textarea" rows={3} placeholder="Введіть опис завдання" value={taskDescription} onChange={e => onTaskDescriptionChange(e.target.value)} />
                </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={onHide}>
                Закрити
            </Button>
            <Button variant="primary" onClick={onSaveTask}>
                {isEditing ? 'Оновити завдання' : 'Зберегти завдання'}
            </Button>
        </Modal.Footer>
    </Modal>
);

export default TaskModal;
