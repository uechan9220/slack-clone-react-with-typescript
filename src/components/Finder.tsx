import * as React from 'react'
import styled from 'styled-components'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'
import { StoreContext } from '../store/store'

interface Props {
  exitCallback: () => void
}

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

const ExitButtonContainer = styled.div`
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  h1 {
    width: 100%;
    text-align: center;
  }
`

const ButtonClose = styled.button`
  outline: none;
  border: none;
  border-radius: 50%;
  padding: 1rem;
  cursor: pointer;
  text-align: center;
  background-color: white;
  font-size: inherit;
  i {
    width: 100%;
    height: 100%;
  }
  &:hover {
    background-color: lightgray;
    opacity: 0.7;
  }
`

const Form = styled.form`
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

const CreateChannelMutation = gql`
  mutation CreateChannel($name: String!) {
    insert_Channel(objects: { name: $name, group: "" }) {
      returning {
        id
        name
      }
    }
  }
`

const CreateMembership = gql`
  mutation CreateMembership($userId: String, $channelId: uuid) {
    insert_Membership(objects: { userId: $userId, channelId: $channelId }) {
      returning {
        id
      }
    }
  }
`

export function Finder(props: Props) {
  const { user } = React.useContext(StoreContext)
  return (
    <Container>
      <Mutation mutation={CreateMembership} update={() => props.exitCallback()}>
        {(createMembership: any, { data }: any) => (
          <Mutation
            mutation={CreateChannelMutation}
            update={(cache: any, data: any) => {
              console.log(data)
              console.log(data.data.insert_Channel!.returning[0].id)
              console.log(user)
              createMembership({
                variables: {
                  channelId: data.data.insert_Channel!.returning[0].id,
                  userId: user
                }
              })
            }}
          >
            {(createChannel: any, { data }: any) => (
              <>
                <ExitButtonContainer>
                  <ButtonClose onClick={props.exitCallback}>
                    <i className="far fa-times-circle" />
                  </ButtonClose>
                  <h1>Create channel</h1>
                </ExitButtonContainer>
                <Form
                  onSubmit={(e: any) => {
                    console.log(e.target.channelName.value)
                    e.preventDefault()
                    createChannel({
                      variables: { name: e.target.channelName.value }
                    })
                    e.target.reset()
                  }}
                >
                  <label htmlFor="channelName">Name</label>
                  <input
                    name="channelName"
                    id="channelName"
                    placeholder="eg leads"
                  />
                  <button onClick={props.exitCallback}>Cancel</button>
                  <button type="submit">Create</button>
                </Form>
              </>
            )}
          </Mutation>
        )}
      </Mutation>
    </Container>
  )
}
