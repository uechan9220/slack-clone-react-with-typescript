import styled from 'styled-components'

export const Input = styled.input`
  border: 1px solid ${props => ` ${props.theme.borderColorDark}`};
  padding: 0.5rem;
  border-radius: 5px;
  outline: none;
  &::placeholder {
    font-size: 1rem;
  }
  &:hover,
  &:active,
  &:focus {
    border: 1px solid dimgray;
  }
`