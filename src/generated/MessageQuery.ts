export interface MessageQueryVariables {
  channelId?: any | null
}

export interface MessageQuery_Message_User {
  username: string
}

export interface MessageQuery_Message {
  id: any
  body: string
  data: any
  User: MessageQuery_Message_User
}

export interface MessageQuery {
  Message: MessageQuery_Message[]
}
