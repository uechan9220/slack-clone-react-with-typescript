import * as React from 'react'

const initialStoreValue = {
  selectedChannel: ''
}

export const StoreContext = React.createContext<Context>({...initialStoreValue, dispatch: () => 'test'})

type Action = { type: 'SELECTED_CHANNEL'; payload: string }
interface State {
  selectedChannel: string
}

interface Context extends State {
  dispatch: (action: Action, payload?: any) => void
}

function storeReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SELECTED_CHANNEL':
      return { selectedChannel: action.payload };
    default:
      throw new Error()
  }
}

interface Props {
  children: React.ReactNode
}

export function StoreContextProvider(props: Props) {
  const [store, dispatch] = React.useReducer(storeReducer, initialStoreValue);
  return(
    <StoreContext.Provider value={{...store, dispatch}}>
      {props.children}
    </StoreContext.Provider>
  )
}
