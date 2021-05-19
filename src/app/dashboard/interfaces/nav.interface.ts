
export interface NavInterfaceChildren {
  id: number;
  text: string;
  link?: string;
  callback?: (NavInterfaceItem?, NavInterfaceChildren?) => void;
}

export interface NavInterfaceItem {
  id: number;
  text: string;
  children: NavInterfaceChildren[];
}


