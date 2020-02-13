import { Channel } from './ChannelQuery'

export interface Membership {
  direct: boolean
  id: string
  Channel: Channel
}