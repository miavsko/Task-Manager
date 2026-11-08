
import { useState, useEffect } from 'react'
import '../task.css'

function Task() {
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState('Medium')

  const [editingId, setEditingId] = useState(null)
  const [editTitle, setEditTitle] = useState('')
  const [editDescription, setEditDescription] = useState('')
  const [editPriority, setEditPriority] = useState('Medium')

const API = `${import.meta.env.VITE_API_URL}/task`

  // Get tasks from the backend
  const getTasks = async () => {
    const response = await fetch(API)
    const data = await response.json()
    setTasks(data)
  }

  useEffect(() => {
    getTasks()
  }, [])

  // Add a new task
  const addTask = async (e) => {
    e.preventDefault()

    if (!title.trim()) return

    await fetch(`${API}/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title,
        description,
        priority
      })
    })

    setTitle('')
    setDescription('')
    setPriority('Medium')
    getTasks()
  }

  // Delete a task
  const deleteTask = async (id) => {
    await fetch(`${API}/delete/${id}`, {
      method: 'DELETE'
    })

    getTasks()
  }

  // Complete or uncomplete a task
  const toggleTask = async (task) => {
    await fetch(`${API}/update/${task._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        completed: !task.completed
      })
    })

    getTasks()
  }

  // Start editing
  const startEditing = (task) => {
    setEditingId(task._id)
    setEditTitle(task.title)
    setEditDescription(task.description || '')
    setEditPriority(task.priority || 'Medium')
  }

  // Save edited task
  const saveEdit = async (id) => {
    await fetch(`${API}/update/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: editTitle,
        description: editDescription,
        priority: editPriority
      })
    })

    setEditingId(null)
    getTasks()
  }

  // Task statistics
  const completedTasks = tasks.filter(task => task.completed).length
  const pendingTasks = tasks.length - completedTasks

  return (
    <div className="app">

      {/* Header */}
      <header className="header">
        <h2>TaskFlow.</h2>
        <p>My Workspace</p>
      </header>

      <main className="container">

        {/* Welcome Section */}
        <section className="welcome">
          <h1>My Tasks</h1>
          <p>Organise your day and stay productive.</p>
        </section>

        {/* Statistics */}
        <section className="stats">

          <div className="stat-card total">
            <h2>{tasks.length}</h2>
            <p>Total Tasks</p>
          </div>

          <div className="stat-card completed">
            <h2>{completedTasks}</h2>
            <p>Completed</p>
          </div>

          <div className="stat-card pending">
            <h2>{pendingTasks}</h2>
            <p>Pending</p>
          </div>

        </section>

        {/* Add Task */}
        <section className="form-section">
          <h2>Add a New Task</h2>

          <form onSubmit={addTask}>

            <input
              type="text"
              placeholder="Enter task title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <textarea
              placeholder="Enter description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <div className="form-bottom">

              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="Low">Low Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="High">High Priority</option>
              </select>

              <button type="submit">+ Add Task</button>

            </div>

          </form>
        </section>

        {/* Task List */}
        <section className="tasks-section">

          <div className="section-heading">
            <h2>My Task List</h2>
            <p>{tasks.length} tasks</p>
          </div>

          {tasks.length === 0 && (
            <p className="empty-message">No tasks yet. Add your first task!</p>
          )}

          {tasks.map((task) => (

            <div className="task-card" key={task._id}>

              {editingId === task._id ? (

                <div className="edit-form">

                  <input
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    placeholder="Task title"
                  />

                  <textarea
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    placeholder="Description"
                  />

                  <select
                    value={editPriority}
                    onChange={(e) => setEditPriority(e.target.value)}
                  >
                    <option value="Low">Low Priority</option>
                    <option value="Medium">Medium Priority</option>
                    <option value="High">High Priority</option>
                  </select>

                  <div className="task-actions">
                    <button onClick={() => saveEdit(task._id)}>
                      Save
                    </button>

                    <button
                      className="cancel-btn"
                      onClick={() => setEditingId(null)}
                    >
                      Cancel
                    </button>
                  </div>

                </div>

              ) : (

                <>
                  <div className="task-info">

                    <div className="task-title">

                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => toggleTask(task)}
                      />

                      <h3 className={task.completed ? 'finished' : ''}>
                        {task.title}
                      </h3>

                    </div>

                    <p>{task.description}</p>

                    <span className={`priority ${task.priority?.toLowerCase()}`}>
                      {task.priority || 'Medium'} Priority
                    </span>

                    {task.completed && (
                      <span className="done-label">Done</span>
                    )}

                  </div>

                  <div className="task-actions">

                    <button
                      className="edit-btn"
                      onClick={() => startEditing(task)}
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => deleteTask(task._id)}
                    >
                      Delete
                    </button>

                  </div>
                </>

              )}

            </div>

          ))}

        </section>

      </main>

    </div>
  )
}

export default Task
