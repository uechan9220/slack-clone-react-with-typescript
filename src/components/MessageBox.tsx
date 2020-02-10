import * as React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  margin-top: 85px;
  li {
    margin: 0.5rem 0;
  }
  p {
    margin-top: .25px;
  }
`

const UserName = styled.span`
  font-weight: 800;
  margin-right: 5px;
  font-size: 1.2rem;
`

const DateSpan = styled.span`
  color: darkgray;
`

export function MessageBox() {
  const message = [
    {
      message:
        '今夜は月がきれいですね。ですが僕は月よりも寿司が好きです。ちなみに今日誕生日の人いますか？',
      user: 'boku_doraemoon',
      date: 'Sat Feb 11 2020 12:00:00 GMT+0900 (CEST)'
    },
    {
      message:
        '今夜は月がきれいですね。ですが僕は月よりも寿司が好きです。ちなみに今日誕生日の人いますか？',
      user: 'boku_doraemoon',
      date: 'Sat Feb 11 2020 12:00:00 GMT+0900 (CEST)'
    },
    {
      message:
        '今夜は月がきれいですね。ですが僕は月よりも寿司が好きです。ちなみに今日誕生日の人いますか？',
      user: 'boku_doraemoon',
      date: 'Sat Feb 11 2020 12:00:00 GMT+0900 (CEST)'
    },
    {
      message:
        '今夜は月がきれいですね。ですが僕は月よりも寿司が好きです。ちなみに今日誕生日の人いますか？',
      user: 'boku_doraemoon',
      date: 'Sat Feb 11 2020 12:00:00 GMT+0900 (CEST)'
    },
    {
      message:
        '今夜は月がきれいですね。ですが僕は月よりも寿司が好きです。ちなみに今日誕生日の人いますか？',
      user: 'boku_doraemoon',
      date: 'Sat Feb 11 2020 12:00:00 GMT+0900 (CEST)'
    },
    {
      message:
        '今夜は月がきれいですね。ですが僕は月よりも寿司が好きです。ちなみに今日誕生日の人いますか？',
      user: 'boku_doraemoon',
      date: 'Sat Feb 11 2020 12:00:00 GMT+0900 (CEST)'
    }
  ]
  return (
    <Container>
      <ul>
        {message.map((message, index) => (
          <li key={index}>
            <UserName>{message.user}</UserName>
            <DateSpan>
              {new Intl.DateTimeFormat('en-GB').format(new Date(message.date))}
            </DateSpan>
            <p>{message.message}</p>
          </li>
        ))}
      </ul>
    </Container>
  )
}
