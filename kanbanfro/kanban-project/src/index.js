import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
reportWebVitals();

// Hello Sir!! Good Evening
// I have to discussion regarding my confirmation with you! if you have some free time let me know 
// Thanks you

// Hello good evening @Sagar sir,
// i want to discuss something, let me know when you're available.

// import React, { useEffect, useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'; // Import DragDropContext and related components
// import { useUser } from '../UserContext'; // Import useUser hook

// const KanbanBoard = () => {
//     const { userEmail, setUserEmail } = useUser(); // Access user's email from context
//     const [tasks, setTasks] = useState([]);
//     const [newTaskTitle, setNewTaskTitle] = useState('');
//     const [editTaskId, setEditTaskId] = useState('');
//     const [editTaskTitle, setEditTaskTitle] = useState('');

//     const navigate = useNavigate();

//     useEffect(() => {
//         // Check if user email is present in local storage upon component mount
//         const storedEmail = localStorage.getItem('email');
//         setUserEmail(storedEmail);
      
//         const fetchTasks = async () => {
//             try {
//                 const response = await axios.get(`http://localhost:3001/home/tasks?email=${userEmail}`);
//                 setTasks(response.data);
//             } catch (error) {
//                 console.error('Error fetching tasks:', error);
//             }
//         };

//         fetchTasks();

//     }, [userEmail]);

//     const handleAddTask = async () => {
//         if (!newTaskTitle.trim()) {
//             alert('Please enter a task title.');
//             return;
//         }

//         try {
//             const response = await axios.post('http://localhost:3001/home/tasks',
//                 { title: newTaskTitle, email: userEmail });
//             const newTask = response.data;
//             setTasks(prevTasks => [...prevTasks, newTask]);
//             setNewTaskTitle('');
//         } catch (error) {
//             console.error('Error adding task:', error);
//             alert('Failed to add task. Please try again.');
//         }
//     };

//     const handleDeleteTask = async (taskId) => {
//         try {
//             await axios.delete(`http://localhost:3001/home/tasks/${taskId}`);
//             setTasks(prevTasks => prevTasks.filter(task => task._id !== taskId));
//         } catch (error) {
//             console.error('Error deleting task:', error);
//             alert('Failed to delete task. Please try again.');
//         }
//     };

//     const handleLogout = () => {
//         localStorage.removeItem('token');
//         localStorage.removeItem('email');
//         navigate('/login');
//     };

//     const pendingTasks = tasks.filter((task) => task.status === "Pending");
//     const inProgressTasks = tasks.filter((task) => task.status === "inProgress");
//     const doneTasks = tasks.filter((task) => task.status === "done");

//     const handleOnDragEnd = async (result) => {
//         const { destination, source, draggableId } = result;
//         console.log("result", result);
//         console.log("source", source);
//         console.log("destination", destination);
//         console.log("draggableId", draggableId);

     
//         const draggedTask = tasks.find((task) => task._id === draggableId);

//         if (!draggedTask) {
//             console.error(`Task with ID ${draggableId} not found in tasks array.`);
//             return;
//         }

//         try {
//             // Send the updated position data to the backend
//             await axios.put(`http://localhost:3001/home/tasks/${draggableId}`, {
//                 status: destination.droppableId,
//                 email: userEmail,
//                 columnIndex: destination.index // Include the columnIndex in the request body
//             });

//             // Update the position in the frontend state
//             const updatedTasks = tasks.map((task) => {
//                 if (task._id === draggedTask._id) {
//                     return {
//                         ...task,
//                         status: destination.droppableId,
//                         columnIndex: destination.index // Update the columnIndex in the frontend state
//                     };
//                 }
                
//                 // Update the indices of other tasks in the same column
//                 if (task.status === destination.droppableId) {
//                     return {
//                         ...task,
                       
//                     };
//                 }
//                 return task;
//             });



//             console.log("result", result);
//             console.log("source", source);
//             console.log("destination", destination);
//             setTasks(updatedTasks);
//             console.log("updated tasks", updatedTasks);
//         } catch (error) {
//             console.error('Error updating task status:', error);
//         }
//     };


//     const handleEditTask = async (taskId) => {
//         const updatedTasks = tasks.map(task => {
//             if (task._id === taskId) {
//                 return { ...task, title: editTaskTitle, email: userEmail };
//             }
//             return task;
//         });

//         try {
//             await axios.put(`http://localhost:3001/home/tasks/${taskId}`, { title: editTaskTitle, email: userEmail });
//             setTasks(updatedTasks);
//             setEditTaskId('');
//             setEditTaskTitle('');
//         } catch (error) {
//             console.error('Error updating task:', error);
//             console.log('Failed to update task. Please try again.');
//         }
//     };

//     const handleEditButtonClick = (taskId, currentTitle) => {
//         setEditTaskId(taskId);
//         setEditTaskTitle(currentTitle);
//     };

//     const handleCancelEdit = () => {
//         setEditTaskId('');
//         setEditTaskTitle('');
//     };

//     return (
//         <>
//             <div className="d-flex justify-content-end">
//                 <button
//                     className="btn btn-sm my-3 me-3"
//                     onClick={handleLogout}
//                 >Logout</button>
//             </div>

//             <DragDropContext onDragEnd={(result) => handleOnDragEnd(result)}>
//                 <div className='kanban-board'>
//                     <div className='text-center mt-3'>
//                         <h2 className='text-black'>Kanban</h2>
//                     </div>

//                     <div className="mb-3 mt-4 mx-5">
//                         <div className="input-group">
//                             <input
//                                 onKeyDown={(e) => {
//                                     if (e.key === " " && e.target.selectionStart === 0) {
//                                         e.preventDefault();
//                                     }
//                                 }}                                
//                                 maxLength={50}
//                                 type="text"
//                                 className="form-control"
//                                 placeholder="Enter a task..."
//                                 value={newTaskTitle}
//                                 onChange={(e) => setNewTaskTitle(e.target.value)}
//                             />
//                             <button className="btn btn-outline-secondary ms-2" type="button" onClick={handleAddTask}>Add Task</button>
//                         </div>
//                     </div>

//                     <div className='d-flex justify-content-between align-items-stretch mt-5 mx-5'>
//                         <Droppable droppableId="Pending">
//                             {(provided,snapshot) => (
//                                 <div {...provided.droppableProps} ref={provided.innerRef} className='column border px-5 py-3 text-black' style={{ flex: '1', marginRight: '20px' }} >
//                                     <h2 className='text-black mb-4 mx-4'>Pending</h2>
//                                     {pendingTasks.map((tasks, index) => (
//                                         <Draggable key={tasks._id} draggableId={tasks._id} index={index} >
//                                             {(provided) => (
//                                                 <div {...provided.dragHandleProps} {...provided.draggableProps} ref={provided.innerRef} className="board-card bg-light card my-3">
//                                                     <div className="card-body">
//                                                         {editTaskId === tasks._id ? (
//                                                             <div className="mb-3 mt-2">
//                                                                 <input
//                                                                     onKeyDown={(e) => {
//                                                                         if (e.key === " " && e.target.selectionStart === 0) {
//                                                                             e.preventDefault();
//                                                                         }
//                                                                     }} 
//                                                                     maxLength={50}
//                                                                     type="text"
//                                                                     value={editTaskTitle}
//                                                                     onChange={(e) => setEditTaskTitle(e.target.value)}
//                                                                     className="form-control mb-2"
//                                                                 />
//                                                                 <button className="btn btn-primary me-2" onClick={() => handleEditTask(tasks._id)}>Save</button>
//                                                                 <button className="btn btn-secondary" onClick={() => handleCancelEdit()}>Cancel</button>
//                                                             </div>
//                                                         ) : (
//                                                             <>
//                                                                 <p className="card-text">{tasks.title}</p>
//                                                                 <p>{tasks.status}</p>
//                                                                 <button className="btn btn-info" onClick={() => handleEditButtonClick(tasks._id, tasks.title)}>Edit</button>
//                                                                 <button className="btn btn-danger me-2 mx-2" onClick={() => handleDeleteTask(tasks._id)}>Delete</button>
//                                                             </>

//                                                         )
//                                                         }
//                                                     </div>
//                                                 </div>
//                                             )}
//                                         </Draggable>
//                                     ))}
//                                     {provided.placeholder}
//                                 </div>
//                             )}

//                         </Droppable>

//                         <Droppable droppableId="inProgress">
//                             {(provided) => (
//                                 <div {...provided.droppableProps} ref={provided.innerRef} className='column border px-5 py-3 text-black' style={{ flex: '1', marginRight: '20px' }}>
//                                     <h2 className='text-black mb-4 mx-3'>In Progress</h2>
//                                     {inProgressTasks.map((tasks, index) => (
//                                         <Draggable key={tasks._id} draggableId={tasks._id} index={index}>
//                                             {(provided) => (
//                                                 <div {...provided.dragHandleProps} {...provided.draggableProps} ref={provided.innerRef} className="board-card bg-light card my-3">
//                                                     <div className="card-body">
//                                                         {editTaskId === tasks._id ? (
//                                                             <div className="mb-3 mt-2">
//                                                                 <input
//                                                                     onKeyDown={(e) => {
//                                                                         if (e.key === " " && e.target.selectionStart === 0) {
//                                                                             e.preventDefault();
//                                                                         }
//                                                                     }} 
//                                                                     type="text"
//                                                                     value={editTaskTitle}
//                                                                     onChange={(e) => setEditTaskTitle(e.target.value)}
//                                                                     className="form-control mb-2"
//                                                                 />
//                                                                 <button className="btn btn-primary me-2" onClick={() => handleEditTask(tasks._id)}>Save</button>
//                                                                 <button className="btn btn-secondary" onClick={() => handleCancelEdit()}>Cancel</button>
//                                                             </div>
//                                                         ) : (
//                                                             <>
//                                                                 <p className="card-text">{tasks.title}</p>
//                                                                 <p>{tasks.status}</p>
//                                                                 <button className="btn btn-info" onClick={() => handleEditButtonClick(tasks._id, tasks.title)}>Edit</button>
//                                                                 <button className="btn btn-danger me-2 mx-2" onClick={() => handleDeleteTask(tasks._id)}>Delete</button>

//                                                             </>
//                                                         )}
//                                                     </div>
//                                                 </div>
//                                             )}
//                                         </Draggable>
//                                     ))}
//                                     {provided.placeholder}
//                                 </div>

//                             )}

//                         </Droppable>

//                         <Droppable droppableId="done">
//                             {(provided) => (
//                                 <div {...provided.droppableProps} ref={provided.innerRef} className='column border px-5 py-3 text-black' style={{ flex: '1' }}>
//                                     <h2 className='text-black mb-4 mx-5'>Done</h2>
//                                     {doneTasks.map((tasks, index) => (
//                                         <Draggable key={tasks._id} draggableId={tasks._id} index={index}>
//                                             {(provided) => (
//                                                 <div {...provided.dragHandleProps} {...provided.draggableProps} ref={provided.innerRef} className="board-card bg-light card my-3">
//                                                     <div className="card-body">
//                                                         {editTaskId === tasks._id ? (
//                                                             <div className="mb-3 mt-2">
//                                                                 <input
//                                                                     onKeyDown={(e) => {
//                                                                         if (e.key === " " && e.target.selectionStart === 0) {
//                                                                             e.preventDefault();
//                                                                         }
//                                                                     }} 
//                                                                     type="text"
//                                                                     value={editTaskTitle}
//                                                                     onChange={(e) => setEditTaskTitle(e.target.value)}
//                                                                     className="form-control mb-2"
//                                                                 />
//                                                                 <button className="btn btn-primary me-2" onClick={() => handleEditTask(tasks._id)}>Save</button>
//                                                                 <button className="btn btn-secondary" onClick={() => handleCancelEdit()}>Cancel</button>
//                                                             </div>
//                                                         ) : (
//                                                             <>
//                                                                 <p className="card-text">{tasks.title}</p>
//                                                                 <p>{tasks.status}</p>
//                                                                 <button className="btn btn-info" onClick={() => handleEditButtonClick(tasks._id, tasks.title)}>Edit</button>
//                                                                 <button className="btn btn-danger me-2 mx-2" onClick={() => handleDeleteTask(tasks._id)}>Delete</button>

//                                                             </>
//                                                         )
//                                                         }
//                                                     </div>
//                                                 </div>
//                                             )}
//                                         </Draggable>
//                                     ))}
//                                     {provided.placeholder}
//                                 </div>
//                             )}

//                         </Droppable>
//                     </div>
//                 </div>
//             </DragDropContext>
//         </>
//     )
// }

// export default KanbanBoard;


