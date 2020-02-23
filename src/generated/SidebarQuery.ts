import { Channel } from './ChannelQuery'

export interface Membership {
  direct: boolean
  id: string
  Channel: Channel
}

export interface SidebarQuery_Membership_Chanel {
  id: any;
  name: string;
}

export interface SidebarQuery_Membership {
  id: any;
  direct: boolean;
  Chanel: SidebarQuery_Membership_Chanel;
}

export interface SidebarQuery {
  Membership: SidebarQuery_Membership[];
}