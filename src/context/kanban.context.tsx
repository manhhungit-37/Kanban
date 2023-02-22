import { createContext, useState, useEffect } from "react";
import listData from '../constant/list';
import { IList } from "../types/constant/list.type";

interface IProps {
  children: React.ReactNode;
}

interface IValue {
  data: IList;
  deleteList: (listId: string) => void;
  onChangeData: (value: IList) => void;
}

export const KanbanContext = createContext({} as IValue);

function KanbanProvider(props: IProps) {
  const [data, setData] = useState(listData);

  function deleteList(listId: string) {
    const lists = data.lists;
    const listIds = data.listIds;
    
    delete lists[listId];
    const index = listIds.indexOf(listId);
    listIds.splice(index, 1);

    const newList = {
      lists,
      listIds
    };

    setData(newList);
    window.localStorage.setItem("dataKanban", JSON.stringify(newList));
  }

  useEffect(() => {
    const dataStorage = JSON.parse(window.localStorage.getItem("dataKanban") ?? "{}");
    if (Object.keys(dataStorage).length > 0) {
      setData(dataStorage);
    } else {
      window.localStorage.setItem("dataKanban", JSON.stringify(data));
    }
  }, []);

  return (
    <KanbanContext.Provider
      value={{
        data,
        onChangeData: setData,
        deleteList,
      }}
    >
      {props.children}
    </KanbanContext.Provider>  
  )
};

export default KanbanProvider;