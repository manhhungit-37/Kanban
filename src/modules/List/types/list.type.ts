interface IListTask {
  id: string;
  content: string;
}

interface IListColumn {
  id: string;
  title: string;
  taskIds: string[];
}

export type {
  IListTask,
  IListColumn,
}