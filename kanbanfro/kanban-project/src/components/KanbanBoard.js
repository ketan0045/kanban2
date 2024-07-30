import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable,Draggable } from 'react-beautiful-dnd';
import axios from 'axios';
import TaskCard from './TaskCard';

const KanbanBoard = () => {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');

  useEffect(() => {
    axios.get("http://localhost:5009/api/tasks")
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => console.error('Error fetching tasks:', error));
  }, []);

  const addNewTask = async () => {
    if (newTaskTitle.trim() === '' || newTaskDescription.trim() === '') return;

    await axios.post('http://localhost:5009/api/tasks', {
      title: newTaskTitle,
      description: newTaskDescription,
      status: 'To Do',
    })
    .then((response) => {
      setTasks((prevTasks) => [...prevTasks, response.data]);
      setNewTaskTitle('');
      setNewTaskDescription('');
    })
    .catch((error) => console.error('Error adding task:', error));
  };

  const editTask = async (taskId, updatedData) => {
    await axios.put(`http://localhost:5009/api/tasks/${taskId}`, updatedData)
      .then((response) => {
        setTasks((prevTasks) => prevTasks.map(task =>
          task._id === taskId ? { ...task, ...updatedData } : task
        ));
      })
      .catch((error) => console.error('Error editing task:', error));
  };

  const deleteTask = async (taskId) => {
    await axios.delete(`http://localhost:5009/api/tasks/${taskId}`)
      .then(() => {
        setTasks((prevTasks) => prevTasks.filter(task => task._id !== taskId));
      })
      .catch((error) => console.error('Error deleting task:', error));
  };

  const handleDragEnd = (result) => {
    // console.log("handleDragEndhandleDragEndhandleDragEndmay  ==roadide")
    // console.log(result,"resultttt")
    const { source, destination } = result;

    if (!destination) return;

    const reorderedTasks = [...tasks];
    const [movedTask] = reorderedTasks.splice(source.index, 1);
    reorderedTasks.splice(destination.index, 0, movedTask);

    setTasks(reorderedTasks);

    axios.put(`http://localhost:5009/api/tasks/${movedTask._id}`, {
      status: destination.droppableId,
    });
  };

  const handleTitleChange = (e) => {
    setNewTaskTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setNewTaskDescription(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        value={newTaskTitle}
        onChange={handleTitleChange}
        placeholder="Enter new task title"
      />
      <input
        type="text"
        value={newTaskDescription}
        onChange={handleDescriptionChange}
        placeholder="Enter task description"
      />
      <button onClick={addNewTask}>Add Task</button>

      <DragDropContext onDragEnd={(result) =>handleDragEnd(result)}>
        <div className="kanban-board">
          <Droppable droppableId="To Do">
            {(provided) => (
              // console.log(provided,"providedprovided")
              <div ref={provided.innerRef} {...provided.droppableProps} className="kanban-column">
                <h3>To Do</h3>
                {tasks.filter((task) => task.status === 'To Do').map((task, index) => (
                  <TaskCard
                    key={task._id}
                    task={task}
                    index={index}
                    editTask={editTask}
                    deleteTask={deleteTask}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          <Droppable droppableId="In Progress">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps} className="kanban-column">
                <h3>In Progress</h3>
                {tasks.filter((task) => task.status === 'In Progress').map((task, index) => (
                  <TaskCard
                    key={task._id}
                    task={task}
                    index={index}
                    editTask={editTask}
                    deleteTask={deleteTask}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          <Droppable droppableId="Done">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps} className="kanban-column">
                <h3>Done</h3>
                {tasks.filter((task) => task.status === 'Done').map((task, index) => (
                  <TaskCard
                    key={task._id}
                    task={task}
                    index={index}
                    editTask={editTask}
                    deleteTask={deleteTask}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    </div>
  );
};

export default KanbanBoard;

// https://codesandbox.io/p/sandbox/todoapp-9wstd?file=%2Fsrc%2FTaskCard.js%3A67%2C9-72%2C25
// use this Draggable




