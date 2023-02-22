import { useState } from 'react';
import { ReactComponent as CloseSVG } from '../assets/close.svg';

function InputContainer() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div>
      {!isOpen ? (
        <button onClick={() => setIsOpen(!isOpen)} className="w-full h-full py-4 text-left hover:bg-gray.100">
          + Add Card
        </button>
      ) : (
        <div>
          <textarea placeholder="Enter a title of this card..." className="w-full h-16 p-2 text-[15px] resize-none outline-0" />
          <div className="mt-2 flex items-center">
            <button className="w-[96px] h-8 text-white rounded-[7px] font-bold mr-2 bg-gray.50 hover:bg-red.50">Add Card</button>
            <button>
              <CloseSVG className="w-6 h-6 hover:fill-red.50" />
            </button>
          </div>
        </div>
      )}
    </div>  
  )
};

export default InputContainer;