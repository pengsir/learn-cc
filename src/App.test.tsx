import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import App from './App'

describe('App', () => {
  it('renders empty state message', () => {
    render(<App />)
    expect(screen.getByText('No tasks yet. Add one above!')).toBeInTheDocument()
  })

  it('adds a todo when Add button is clicked', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.type(screen.getByPlaceholderText('Add a new task...'), 'Buy milk')
    await user.click(screen.getByRole('button', { name: 'Add' }))

    expect(screen.getByText('Buy milk')).toBeInTheDocument()
    expect(screen.queryByText('No tasks yet. Add one above!')).not.toBeInTheDocument()
  })

  it('adds a todo when Enter is pressed', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.type(screen.getByPlaceholderText('Add a new task...'), 'Walk the dog{Enter}')

    expect(screen.getByText('Walk the dog')).toBeInTheDocument()
  })

  it('does not add an empty or whitespace-only todo', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.type(screen.getByPlaceholderText('Add a new task...'), '   ')
    await user.click(screen.getByRole('button', { name: 'Add' }))

    expect(screen.getByText('No tasks yet. Add one above!')).toBeInTheDocument()
  })

  it('clears the input after adding a todo', async () => {
    const user = userEvent.setup()
    render(<App />)

    const input = screen.getByPlaceholderText('Add a new task...')
    await user.type(input, 'Read a book')
    await user.click(screen.getByRole('button', { name: 'Add' }))

    expect(input).toHaveValue('')
  })

  it('toggles a todo as completed', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.type(screen.getByPlaceholderText('Add a new task...'), 'Test toggle{Enter}')

    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).not.toBeChecked()

    await user.click(checkbox)
    expect(checkbox).toBeChecked()

    await user.click(checkbox)
    expect(checkbox).not.toBeChecked()
  })

  it('deletes a todo', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.type(screen.getByPlaceholderText('Add a new task...'), 'Delete me{Enter}')
    expect(screen.getByText('Delete me')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: '×' }))
    expect(screen.queryByText('Delete me')).not.toBeInTheDocument()
  })

  it('shows completed count', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.type(screen.getByPlaceholderText('Add a new task...'), 'Task 1{Enter}')
    await user.type(screen.getByPlaceholderText('Add a new task...'), 'Task 2{Enter}')

    expect(screen.getByText('0/2 completed')).toBeInTheDocument()

    await user.click(screen.getAllByRole('checkbox')[0])
    expect(screen.getByText('1/2 completed')).toBeInTheDocument()
  })
})
