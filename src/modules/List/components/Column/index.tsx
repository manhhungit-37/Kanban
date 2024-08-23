import { Draggable, Droppable } from '@hello-pangea/dnd';
import { IListColumn, IListTask } from '../../types/list.type';
import Task from '../Task';
import styles from './css/column.module.scss';

interface Props {
  column: IListColumn;
  tasks: IListTask[];
  index: number;
}

function Column({ column, tasks, index }: Props) {
  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided) => (
        <div className={styles.container} {...provided.draggableProps} ref={provided.innerRef}>
          <div className={styles.title} {...provided.dragHandleProps}>{column.title}</div>
          <Droppable droppableId={column.id} type="TASK">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={styles.taskWrapper}
              >
                <div
                  className={styles.taskList}
                  style={{
                    backgroundColor: !snapshot.isDraggingOver ? "skyblue" : "white",
                  }}
                >
                  {tasks.map((task, index) => (
                    <Task key={task.id} task={task} index={index} />
                  ))}
                  {provided.placeholder}
                </div>
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  )
}

export default Column;