import * as React from 'react'

const initialStoreValue = {
  selectedChannel:
    localStorage.getItem('selected_channel') ||
    '82c255bb-924d-49de-a9f0-36f852b3e445'
}

export enum Actions {
  "SELECTED_CHANNEL"
}

export const StoreContext = React.createContext<Context>({...initialStoreValue, dispatch: () => 'test'})

type Action = { type: Actions.SELECTED_CHANNEL; payload: string }
interface State {
  selectedChannel: string
}

interface Context extends State {
  dispatch: (action: Action, payload?: any) => void
}

function storeReducer(state: State, action: Action): State {
  switch (action.type) {
    case Actions.SELECTED_CHANNEL:
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
  React.useEffect(() => {
    localStorage.setItem('selecte_channel', store.selectedChannel)
  }, [store.selectedChannel])
  console.log(store)
  return(
    <StoreContext.Provider value={{...store, dispatch}}>
      {props.children}
    </StoreContext.Provider>
  )
}
