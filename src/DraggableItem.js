import React from 'react';

import {Draggable} from 'react-beautiful-dnd';

const DraggableItem = ({draggableId,index,...rest}) => {
    const {title,content} = rest;

    return (
        <Draggable draggableId={draggableId} index={index}> 
                {(provided,snapshot) => {
                    return (
                      <div
                      className='todo-item'
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          backgroundColor: snapshot.isDragging ? '#e1e9ed' : '#456C86', 
                          ...provided.draggableProps.style
                        }}
                      >
                        <h2>{title}</h2>
                        {content}
                      </div>
                    )
                    }}
        </Draggable>
    )
}

export default DraggableItem;