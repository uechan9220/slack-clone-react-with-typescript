import * as React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

const Container = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: white;
  z-index: 10;
  padding: 2rem;
  color: black;
  box-sizing: border-box;
  font-size: 2rem;
`

interface Props {
  children: React.ReactNode[] | React.ReactNode
}

export function Modal(props: Props) {
  const modalRoot = document.querySelector('#modal-root');
  React.useEffect(() => {
    const elem = document.createElement('div')
    modalRoot!.appendChild(elem)
    return () => {
      modalRoot!.removeChild(elem)
    }
  }, [modalRoot])
  return (
    ReactDOM.createPortal(<Container>{props.children}</Container>, modalRoot!)
  )
}
