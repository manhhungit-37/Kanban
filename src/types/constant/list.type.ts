export interface IListItem {
  id: string;
  title: string;
  cards: {
    id: string;
    title: string;
  }[]
}

export interface IList {
  listIds: string[];
  lists: {[key: string]: IListItem};
}