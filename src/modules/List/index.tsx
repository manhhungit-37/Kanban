import { useCallback, useState } from "react";
import { DragDropContext, DropResult, Droppable } from "@hello-pangea/dnd";
import { LIST_INITIAL_DATA } from "./constants/initial-data.constant";
import Column from "./components/Column";
import styles from './css/list.module.scss';

function List() {
  const [data, setData] = useState(LIST_INITIAL_DATA);

  const onDragStart = useCallback(() => {
    document.body.style.color = "orange";
  }, []);

  const onDragUpdate = useCallback(() => {
    document.body.style.backgroundColor = "rgb(153, 141, 217)";
  }, []);

  const onDragEnd = useCallback((result: DropResult) => {
    document.body.style.color = "inherit";
    document.body.style.backgroundColor = "inherit";
    const { destination, draggableId, source, type } = result;
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    if (type === "column") {
      const newColumnOrder = [...data.columnOrder];
      [newColumnOrder[source.index], newColumnOrder[destination.index]] = [newColumnOrder[destination.index], newColumnOrder[source.index]];

      setData((currentData) => ({
        ...currentData,
        columnOrder: newColumnOrder,
      }));
      return;
    }

    const start = data.columns[source.droppableId];
    const end = data.columns[destination.droppableId];
    
    if (start === end) {
      const newTaskIds = [...start.taskIds];
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);
      setData((currentData) => ({
        ...currentData,
        columns: {
          ...currentData.columns,
          [start.id]: {
            ...start,
            taskIds: newTaskIds,
          }
        }
  
      }));
      return;
    }
    const startTaskIds = [...start.taskIds], endTaskIds = [...end.taskIds];
    startTaskIds.splice(source.index, 1);
    endTaskIds.splice(destination.index, 0, draggableId);
    setData((currentData) => ({
      ...currentData,
      columns: {
        ...currentData.columns,
        [start.id]: {
          ...start,
          taskIds: startTaskIds,
        },
        [end.id]: {
          ...end,
          taskIds: endTaskIds,
        }
      }
    }))
    
  }, [data]);

  return (
    <DragDropContext onDragStart={onDragStart} onDragUpdate={onDragUpdate} onDragEnd={onDragEnd}>
      <Droppable droppableId="all-column" direction="horizontal" type="column">
        {(provided) => (
          <div className={styles.container} {...provided.droppableProps} ref={provided.innerRef}>
            {data.columnOrder.map((columnId, index) => {
              const column = data.columns[columnId];
              const tasks = column.taskIds.map((taskId) => data.tasks[taskId]);

              return <Column key={column.id} column={column} tasks={tasks} index={index} />
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default List;