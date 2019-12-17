// 3rd party imports
import React, { useReducer } from 'react'
import styled from 'styled-components'

// My imports

const inputReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        value: action.val,
        isValid: true
      }
    default:
      return state
  }
}

const Input = ({
  label,
  id,
  elementProp,
  type,
  placeholder,
  rows,
  errorText
}) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: '',
    isValid: false
  })

  const changeHandler = event => {
    dispatch({ type: 'CHANGE', val: event.target.value })
  }

  const element =
    elementProp === 'input' ? (
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        onChange={changeHandler}
        value={inputState.value}
      />
    ) : (
      <textarea
        id={id}
        rows={rows || 3}
        onChange={changeHandler}
        value={inputState.value}
      />
    )

  return (
    // Look in global css for form invalidity css (hacky)
    // cannot use styled components for re-render reasons
    <FormControlDivStyled className={!inputState.isValid && 'form__invalid'}>
      <label htmlFor={id}>{label}</label>
      {element}
      {!inputState.isValid && <p>{errorText}</p>}
    </FormControlDivStyled>
  )
}

export default Input

// STYLING
const FormControlDivStyled = styled.div`
  margin: 1rem 0;
  label,
  input,
  textarea {
    display: block;
  }
  label {
    font-weight: bold;
    margin-bottom: 0.5rem;
  }
  input,
  textarea {
    width: 100%;
    font: inherit;
    border: 1px solid #ccc;
    background: #f8f8f8;
    padding: 0.15rem 0.25rem;
    &:focus {
      outline: none;
      background: #ebebeb;
      border-color: #510077;
    }
  }
`
