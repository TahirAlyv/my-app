'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AddTaskPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // ✅ İlk dəfə localStorage boşdursa default task-ları yaz
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('tasks') || '[]');
    if (stored.length === 0) {
      const initialTasks = [
        {
          id: '1',
          title: 'Read Book',
          description: 'Read 30 pages',
          done: false,
        },
        {
          id: '2',
          title: 'Play Tennis',
          description: '1 hour match',
          done: false,
        },
      ];
      localStorage.setItem('tasks', JSON.stringify(initialTasks));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTask = {
      id: crypto.randomUUID(),
      title,
      description,
      done: false,
    };

    const stored = JSON.parse(localStorage.getItem('tasks') || '[]');
    const updated = [...stored, newTask];

    localStorage.setItem('tasks', JSON.stringify(updated));

    router.push('/todolist');
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Add New Task</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <br /><br />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <br /><br />
        <button type="submit">SUBMIT</button>
      </form>
    </div>
  );
}
