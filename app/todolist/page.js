'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Todolist() {
  const initialTasks = [
    { id: '1', title: 'Read Book', description: 'Read 30 pages', done: false },
    { id: '2', title: 'Play Tennis', description: '1 hour match', done: false }
  ];

  const [tasks, setTasks] = useState(initialTasks);

  useEffect(() => {
    const stored = localStorage.getItem('tasks');

    if (!stored || JSON.parse(stored).length === 0) {
 
      localStorage.setItem('tasks', JSON.stringify(initialTasks));
      setTasks(initialTasks);
    } else {
 
      setTasks(JSON.parse(stored));
    }
  }, []);

  const toggleDone = (id) => {
    const updated = tasks.map(task =>
      task.id === id ? { ...task, done: !task.done } : task
    );

    setTasks(updated);
    localStorage.setItem('tasks', JSON.stringify(updated));
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>My Tasks</h1>

      <ul>
        {tasks.map(task => (
          <li key={task.id} style={{ marginBottom: 10 }}>
            <input
              type="checkbox"
              checked={task.done}
              onChange={() => toggleDone(task.id)}
            />
            <Link href={`/todolist/${task.id}`}>
              <span style={{
                marginLeft: 8,
                textDecoration: task.done ? 'line-through' : 'none',
                cursor: 'pointer'
              }}>
                {task.title}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <Link href="/add">
        <button style={{ marginTop: 20 }}>Add Task</button>
      </Link>
    </div>
  );
}
