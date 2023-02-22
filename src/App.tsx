import { useCallback, useContext, useEffect, useState } from 'react';
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import List from './components/List';
import listData from './constant/list';
import { KanbanContext } from './context/kanban.context';
import { DropResult } from 'react-beautiful-dnd';

function App() {
  const { data, onChangeData } = useContext(KanbanContext);

  const onDragEnd = useCallback((result: DropResult) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    if (type === "list") {
      const newListIds = data.listIds;
      newListIds.splice(source.index, 1);
      newListIds.splice(destination.index, 0, draggableId);

      const newState = {
        ...data,
        listIds: newListIds,
      };
      onChangeData(newState);
      window.localStorage.setItem("dataKanban", JSON.stringify(newState));

      return;
    }
  }, [onChangeData]);

  return (
    <div className="flex flex-col p-5 h-screen max-h-screen">
      <h1 className="text-[50px] font-bold">Kanban</h1>
      <div className="grow">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="list-drop" type="list" direction='horizontal'>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="flex w-full"
              >
                {data.listIds.map((id: string, index: number) => {
                  const list = data.lists[id];
                  return <List list={list} key={id} index={index} />
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  )
}

export default App
