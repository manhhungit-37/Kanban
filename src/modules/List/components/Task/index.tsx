import { Draggable } from '@hello-pangea/dnd';
import styles from './css/task.module.scss';
import { IListTask } from '../../types/list.type';
import { useMemo } from 'react';

interface Props {
  task: IListTask;
  index: number;
}

function Task({ task, index }: Props) {
  const isDragDisable = useMemo(() => task.id === "task-1", [task.id]);

  return (
    <Draggable draggableId={task.id} index={index} isDragDisabled={isDragDisable}>
      {(provided, snapshot) => (
        <div
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <div
            className={styles.container}
            style={{ 
              backgroundColor: isDragDisable ? "grey" : snapshot.isDragging ? "lightgreen" : "white"
            }}
          >
            <div className={styles.handle} {...provided.dragHandleProps} />
            {task.content}
          </div>
        </div>
      )}
    </Draggable>
  );
}

export default Task;