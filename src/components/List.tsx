import { Draggable, Droppable } from "react-beautiful-dnd";

import InputContainer from "./InputContainer";
import { IListItem } from '../types/constant/list.type';

interface IProps {
  list: IListItem;
  index: number;
}

function List({ list, index }: IProps) {
  return (
      <Draggable draggableId={list.id} index={index}>
        {(provided) => (
            <div {...provided.draggableProps} ref={provided.innerRef}>
              <div {...provided.dragHandleProps} className="w-[300px] bg-gray p-4 mr-4 rounded-[5px]">
                <div className="text-[25px] font-bold leading-8 mb-5">
                  {list.title}
                </div>
                <InputContainer />
              </div>
            </div>  
        )}
      </Draggable>
    );
};

export default List;