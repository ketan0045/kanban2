import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import PropTypes from 'prop-types';

const TaskCard = ({ task, index, editTask, deleteTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const toggleEdit = () => {
    setIsEditing((prev) => !prev); 
  };

  const handleEdit = () => {
    editTask(task._id, { title, description });
    toggleEdit(); 
  };

  const handleDelete = () => {
    deleteTask(task._id);
  };

  return (
    <Draggable draggableId={task._id.toString()} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="task-card"
        >
          {isEditing ? (
            <div className="edit-mode">
              <input
                type="text"
                value={title}
                onChange={handleTitleChange}
                className="task-title-input"
              />
              <input
                type="text"
                value={description}
                onChange={handleDescriptionChange}
                className="task-description-input"
              />
              <button className="edit-save-button" onClick={handleEdit}>Save</button>
              <button className="edit-cancel-button" onClick={toggleEdit}>Cancel</button>
            </div>
          ) : (
            <div className="view-mode">
              <h4 onClick={toggleEdit}>{task.title}</h4>
              <p>{task.description}</p>
              <button className="edit-button" onClick={toggleEdit}>Edit</button>
              <button className="delete-button" onClick={handleDelete}>Delete</button>
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
};


TaskCard.propTypes = {
  task: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
  editTask: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
};

export default TaskCard;

// https://codesandbox.io/p/sandbox/todoapp-9wstd?file=%2Fsrc%2FTaskCard.js%3A67%2C9-72%2C25
// use this Draggable


