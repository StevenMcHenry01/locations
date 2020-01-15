// 3rd party imports
import React, { useReducer, useEffect } from 'react'

// My imports
import { validate } from '../../../../utils/formValidation'
import {FormControlDivStyled} from './InputStyles'

const inputReducer = (state, action) => {
  const { val, type, validators } = action
  switch (type) {
    case 'CHANGE':
      return {
        ...state,
        value: val,
        isValid: validate(val, validators)
      }
    case 'TOUCH':
      return {
        ...state,
        isTouched: true
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
  validators,
  rows,
  errorText,
  onInput,
  initialValue,
  initialValidity
}) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: initialValue || '',
    isTouched: false,
    isValid: initialValidity || false
  })

  const {value, isValid} = inputState

  useEffect(()=>{
    onInput(id, value, isValid)
  },[id, value, isValid, onInput])

  const changeHandler = event => {
    dispatch({
      type: 'CHANGE',
      val: event.target.value,
      validators: validators
    })
  }

  const touchHandler = () => {
    dispatch({
      type: 'TOUCH'
    })
  }

  const element =
    elementProp === 'input' ? (
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    ) : (
      <textarea
        id={id}
        rows={rows || 3}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    )

  return (
    // Look in global css for form invalidity css (hacky)
    // cannot use styled components for re-render reasons
    <FormControlDivStyled
      className={!inputState.isValid && inputState.isTouched && 'form__invalid'}
    >
      <label htmlFor={id}>{label}</label>
      {element}
      {!inputState.isValid && inputState.isTouched && <p>{errorText}</p>}
    </FormControlDivStyled>
  )
}

export default Input

