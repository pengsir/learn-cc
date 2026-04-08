interface TodoInputProps {
  input: string
  onChange: (value: string) => void
  onAdd: () => void
}

export default function TodoInput({ input, onChange, onAdd }: TodoInputProps) {
  return (
    <div className="flex gap-2 mb-6">
      <input
        type="text"
        value={input}
        onChange={e => onChange(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && onAdd()}
        placeholder="Add a new task...."
        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        onClick={onAdd}
        className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
      >
        Add
      </button>
    </div>
  )
}
