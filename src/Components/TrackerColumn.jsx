import React, { useState, useEffect } from 'react';
import { ref, onValue, set } from 'firebase/database';
import { db } from '../firebase.js'; // Assuming Firebase is set up

const TrackerColumn = ({ name }) => {
  const daysInMonth = 30; // Assuming 30 days in the month
  const initialTasks = Array(daysInMonth).fill(null); // Initialize all tasks to 'no task assigned' (null)
  const [tasks, setTasks] = useState(initialTasks); // State for tasks
  const [points, setPoints] = useState(0); // State for points
  const [clickCount, setClickCount] = useState(Array(daysInMonth).fill(0)); // Track clicks per day
  const [showModal, setShowModal] = useState(false); // State to show modal
  const [isAdmin, setIsAdmin] = useState(false); // Track if logged in as admin
  const [email, setEmail] = useState(''); // State for email input
  const [password, setPassword] = useState(''); // State for password input

  // Fetch tasks and points from Firebase
  const fetchTasks = () => {
    const taskRef = ref(db, `students/${name}/tasks`); // Reference to the student's tasks
    onValue(taskRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const mergedTasks = initialTasks.map((task, index) => data[index] !== undefined ? data[index] : task);
        setTasks(mergedTasks);
        const calculatedPoints = calculatePoints(mergedTasks);
        setPoints(calculatedPoints);
      } else {
        setTasks(initialTasks);
        setPoints(0); // Reset points if no tasks exist
      }
    });
  };

  // Save tasks and points to Firebase
  const saveTasksAndPoints = (updatedTasks) => {
    const taskRef = ref(db, `students/${name}/tasks`);
    set(taskRef, updatedTasks);
    const calculatedPoints = calculatePoints(updatedTasks);
    setPoints(calculatedPoints); // Update points state after saving
  };

  // Toggle task completion (if admin is logged in)
  const toggleTask = (index) => {
    const updatedTasks = [...tasks]; // Copy the current tasks
    if (updatedTasks[index] === null) {
      updatedTasks[index] = false; // Set 'not completed'
    } else if (updatedTasks[index] === false) {
      updatedTasks[index] = true; // Set 'completed'
    } else {
      updatedTasks[index] = null; // Reset to 'no task assigned'
    }

    setTasks(updatedTasks); // Update local state
    saveTasksAndPoints(updatedTasks); // Save changes to Firebase
  };

  // Calculate total points
  const calculatePoints = (updatedTasks) => {
    return updatedTasks.reduce((count, task) => (task === true ? count + 1 : count), 0);
  };

  // Handle click events and check for login prompt
  const handleDayClick = (index) => {
    const updatedClickCount = [...clickCount];
    updatedClickCount[index] += 1;
    setClickCount(updatedClickCount);
    
    // Check if we need to show the modal
    if (updatedClickCount[index] >= 3 && !isAdmin) {
      setShowModal(true); // Show modal after 3 clicks
    } else if (updatedClickCount[index] < 3) {
      // If clicks are less than 3, do not toggle the task yet
      return;
    } else {
      toggleTask(index); // Toggle task if admin is logged in or after 3 clicks
    }
  };

  // Handle admin login form submission
  const handleLogin = (e) => {
    e.preventDefault();
    if (email === 'admin@123.com' && password === 'admin123') {
      setIsAdmin(true); // Set admin access
      setShowModal(false); // Hide modal
      // Reset click count after successful login
      const updatedClickCount = [...clickCount].map(() => 0); // Reset all click counts
      setClickCount(updatedClickCount);
    } else {
      alert('Invalid credentials. Only the admin can edit tasks.');
    }
  };

  // Close modal function
  const closeModal = () => {
    setShowModal(false);
    setEmail(''); // Clear email field
    setPassword(''); // Clear password field
  };

  useEffect(() => {
    fetchTasks(); // Load tasks and points from Firebase on mount
  }, []);

  return (
    <div className="tracker-column">
      <h2>{name}</h2>
      <div className='points'>
        <strong>Total Points: {points}🏆</strong>
      </div>
      <div className="task-list">
        {tasks.map((task, index) => (
          <div
            key={index}
            className={`task ${
              task === null ? 'no-task' : task ? 'completed' : 'not-completed'
            }`}
            onClick={() => handleDayClick(index)} // Track clicks and possibly prompt login
          >
            Day {index + 1}: {task === true ? '✔️' : task === false ? '❌' : '—'}
          </div>
        ))}
      </div>
      
      {/* Milestone Messages */}
      <div>
        {points === 5 && `You have achieved your first milestone ${name}!! Keep going!`}
        {points === 10 && `Second milestone achieved ${name}!! I knew you would make it!!`}
        {points === 15 && `You were dedicated for more than two weeks, ${name}!! Time to celebrate!`}
        {points === 20 && `${name}, You are a tough hero, really! Don't give up`}
        {points === 25 && `OMG! You are only 5 days away from your reward!`}
      </div>

      {/* Modal for Login and Admin Message */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Access Restricted</h3>
            <p>Only admins can edit tasks.</p>
            <form onSubmit={handleLogin}>
              <div>
                <label>Email:</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Password:</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit">Login</button>
            </form>
            <button onClick={closeModal} className="close-button">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrackerColumn;
