interface Todo {
  id: number
  text: string
  completed: boolean
}

interface TodoDisplayProps {
  todos: Todo[]
  onToggle: (id: number) => void
  onDelete: (id: number) => void
}

export default function TodoDisplay({ todos, onToggle, onDelete }: TodoDisplayProps) {
  if (todos.length === 0) {
    return <p className="text-gray-400 text-sm text-center">No tasks yet. Add one above!</p>
  }

  return (
    <>
      <ul className="space-y-2">
        {todos.map(todo => (
          <li
            key={todo.id}
            className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 hover:bg-gray-50"
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => onToggle(todo.id)}
              className="w-4 h-4 accent-blue-500 cursor-pointer"
            />
            <span
              className={`flex-1 text-sm ${todo.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}
            >
              {todo.text}
            </span>
            <button
              onClick={() => onDelete(todo.id)}
              className="text-gray-300 hover:text-red-400 transition-colors text-lg leading-none"
            >
              &times;
            </button>
          </li>
        ))}
      </ul>
      <p className="text-xs text-gray-400 mt-4 text-right">
        {todos.filter(t => t.completed).length}/{todos.length} completed
      </p>
    </>
  )
}
