import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { postSignup } from '../api/auth/postSignup'
import { postLogin } from '../api/auth/postLogin'
import { useNavigate } from 'react-router-dom'

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isFormValid, setIsFormValid] = useState(false)

  const navigate = useNavigate()

  const validateEmail = (email: string) => {
    return email.includes('@') && email.includes('.')
  }

  const validatePassword = (password: string) => {
    return password.length >= 8
  }

  useEffect(() => {
    const isValid = validateEmail(email) && validatePassword(password)
    setIsFormValid(isValid)
  }, [email, password])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isFormValid && isLogin) {
      try {
        const response = await postLogin({ email, password })
        localStorage.setItem('token', response.token)
        alert('로그인이 완료되었습니다.')
        navigate('/')
      } catch (error) {
        console.error('로그인 실패:', error)
      }
    } else if (isFormValid && !isLogin) {
      try {
        const response = await postSignup({ email, password })
        localStorage.setItem('token', response.token)
        alert('회원가입이 완료되었습니다.')
        navigate('/')
      } catch (error) {
        console.error('회원가입 실패:', error)
      }
    } else return
  }

  return (
    <div>
      <FlexRow>
        <h2>{isLogin ? '로그인' : '회원가입'}</h2>
        <StyledButton onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? '회원가입' : '로그인'}
        </StyledButton>
      </FlexRow>
      <form onSubmit={handleSubmit}>
        <FlexColumn>
          <StyledInput
            type="email"
            placeholder="todo@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <StyledInput
            type="password"
            placeholder="8자 이상 입력해주세요."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <StyledSubmitButton type="submit" disabled={!isFormValid}>
            {isLogin ? '로그인' : '회원가입'}
          </StyledSubmitButton>
        </FlexColumn>
      </form>
    </div>
  )
}

export default AuthPage

const FlexRow = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`

const StyledInput = styled.input`
  padding: 10px;
`

const StyledButton = styled.button`
  padding: 10px;
  height: 40px;
  border: none;
  &:hover {
    background-color: #646cff;
    color: white;
  }
`

const StyledSubmitButton = styled(StyledButton)<{ disabled: boolean }>`
  background-color: ${(props) => (props.disabled ? '#ccc' : '#646cff')};
  color: ${(props) => (props.disabled ? '#666' : 'white')};
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  &:hover {
    background-color: ${(props) => (props.disabled ? '#ccc' : '#646cff')};
  }
`
