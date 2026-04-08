import { useState } from 'react'
import TodoInput from './components/TodoInput'
import TodoDisplay from './components/TodoDisplay'

interface Todo {
  id: number
  text: string
  completed: boolean
}

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [input, setInput] = useState('')

  const addTodo = () => {
    const trimmed = input.trim()
    if (!trimmed) return
    setTodos([...todos, { id: Date.now(), text: trimmed, completed: false }])
    setInput('')
  }

  const toggleTodo = (id: number) => {
    setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t))
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(t => t.id !== id))
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-start justify-center pt-20">
      <div className="bg-white rounded-2xl shadow-md w-full max-w-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Todo List</h1>

        <TodoInput input={input} onChange={setInput} onAdd={addTodo} />
        <TodoDisplay todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />
      </div>
    </div>
  )
}
