'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function TaskDetail() {
  const { id } = useParams();
  const [task, setTask] = useState(null);

  useEffect(() => {
 
    const stored = JSON.parse(localStorage.getItem('tasks') || '[]');
    const foundTask = stored.find(t => t.id === id);
    setTask(foundTask);
  }, [id]);

  if (!task) return <p style={{ padding: 20 }}>Task not found</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>{task.title}</h2>
      <p>{task.description}</p>
    </div>
  );
}
