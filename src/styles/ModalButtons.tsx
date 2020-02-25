import styled from 'styled-components'

export const CloseButton = styled.button`
  background-color: ${props => `${props.theme.backgroundColorLight}`};
  border: 1px solid ${props => `${props.theme.borderColorLight}`};
  outline: none;
  border-radius: 1rem;
  color: dimgray;
  padding: 1rem;
  font-size: 1.5rem;
  margin-top: 1rem;
  margin-right: 1rem;
  cursor: pointer;
  :hover {
    border: 3px solid dimgray;
    color: ${props => `${props.theme.textColorDark}`};
  }
`

export const SubmitButton = styled(CloseButton)`
  background-color: darkgreen;
  border: 3px solid black;
  color: ${props => `${props.theme.textColorLight}`};
  :disabled{
    background-color: ${props => `${props.theme.backgroundColorGray}`};
    color: ${props => `${props.theme.textColorDark}`};
    cursor: default;
  }
  &:not(:disabled):hover {
    color: ${props => `${props.theme.textColorLight}`};
    border-color: 3px solid black;
  }
`

export const Form = styled.form`
  max-width: 700px;
  label {
    font-weight: bolder;
    width: 100%;
  }
  input {
    width: 100%;
    padding: 1rem;
    border: 1px solid black;
  }
`