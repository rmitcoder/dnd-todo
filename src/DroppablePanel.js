import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
const DroppablePanel = ({name,children,droppableId}) => {
    return <div  className='todo-panel'>
                  <h2>{name}</h2>
                  <div style={{margin: 10}}>
                  <Droppable droppableId={droppableId}>
                      {(provided, snapshot)=>{
                        return (
                          <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          className='todo-droppable-area'
                          style={{
                            background: snapshot.isDraggingOver ? '#0dc4fc': 'grey'
                          }}
                           >
                             {children}
                            {provided.placeholder}
                          </div>
                        ) 
                      }}
                  </Droppable>
            </div>
          </div>
    
}


export default DroppablePanel;