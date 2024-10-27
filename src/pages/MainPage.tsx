import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { getTodos } from '../api/todo/getTodos'
import { createTodo } from '../api/todo/createTodo'
import { deleteTodo } from '~/api/todo/deleteTodo'

interface Todo {
  title: string
  content: string
  id: string
  createdAt: string
  updatedAt: string
}

function MainPage() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const token = localStorage.getItem('token')

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const todos = await getTodos()
        setTodos(todos.data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchTodos()
  }, [token, todos])

  const handleAddTodo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const response = await createTodo({ title, content })
    setTitle('')
    setContent('')
    console.log(response)
  }

  const handleDeleteTodo = async (id: string) => {
    const response = await deleteTodo({ id })
    console.log(response)
  }

  return (
    <TodoContainer>
      <AddTodoForm onSubmit={handleAddTodo}>
        <input
          type="text"
          placeholder="제목"
          maxLength={20}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="내용"
          maxLength={50}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <AddTodoButton type="submit">추가</AddTodoButton>
      </AddTodoForm>
      <TodoList>
        {todos.length > 0 &&
          todos.map((item) => (
            <TodoItem key={item.id}>
              <TodoTitle>{item.title}</TodoTitle>
              <ButtonWrapper>
                <TodoEditButton>수정</TodoEditButton>
                <TodoDeleteButton onClick={() => handleDeleteTodo(item.id)}>
                  삭제
                </TodoDeleteButton>
              </ButtonWrapper>
            </TodoItem>
          ))}
      </TodoList>
    </TodoContainer>
  )
}

export default MainPage

const TodoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const TodoItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const ButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
`

const TodoTitle = styled.div`
  padding-left: 10px;
  padding-right: 10px;
`

const TodoEditButton = styled.button`
  background-color: #646cff;
  white-space: nowrap;
  color: white;
`

const TodoDeleteButton = styled.button`
  background-color: red;
  white-space: nowrap;
  color: white;
`

const AddTodoForm = styled.form`
  display: flex;
  gap: 10px;
`

const TodoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`

const AddTodoButton = styled.button`
  background-color: #646cff;
  color: white;
`
