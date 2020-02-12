import React ,{ useState }from 'react';
import uuid from 'uuid/v4';
import { DragDropContext } from 'react-beautiful-dnd';
import DroppablePanel from './DroppablePanel';
import DraggableItem from './DraggableItem';
import './App.css';


function App() {
  const [todo,setTodo] = useState()
  const fakeTodo = [
    {
      id: uuid(),
      title: 'Todo',
      content: 'Learn React'
    },
    {
      id: uuid(),
      title: 'Todo',
      content: 'Learn Redux'
    },
    {
      id: uuid(),
      title: 'Todo',
      content:'Learn shit'
    }
  ]
  const [columns,setColumns] = useState({
    [uuid()]:{
      name: 'Todo',
      items: fakeTodo
    },
    [uuid()]:{
      name: 'Completed',
      items: []
    }
  })

  const handleDragEnd = result => {
    if(!result.destination){
      return;
    }
    const { source, destination }  = result;
    if(source.droppableId === destination.droppableId){
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index,1);
      copiedItems.splice(destination.index,0,removed);

      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems
        }
      })
    }else{
      const srcColumns = columns[source.droppableId];
      const tarColumns = columns[destination.droppableId];
      const srcItems = [...srcColumns.items];
      const tarItems = [...tarColumns.items];
      const [removed] = srcItems.splice(source.index,1);
      tarItems.splice(destination.index,0,removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...srcColumns,
          items:srcItems
        },
        [destination.droppableId]:{
          ...tarColumns,
          items: tarItems
        }
      })
    }
  }
  
  const handleChange = (e) =>{
      setTodo({
        id:uuid(),
        title: 'Todo',
        content: e.target.value
      })
  }
  const addTodo = () => {
    const currentTodos = fakeTodo;
    currentTodos.push(todo);
    const colKeys = Object.keys(columns);
    const key = colKeys[0]
    let todoCol = columns[key];
    todoCol.items = currentTodos;
    setColumns({
      ...columns,
      [key]:todoCol
    })
    setTodo(null)
  
  }
  return (
    <>
    <div className='input-area'>
      <div>
        <button onClick={addTodo}>Add Todo</button>
        <input onChange={handleChange} value={todo?todo.content:''}/>
      </div>

    </div>
    <div className='main-area'>
      <DragDropContext onDragEnd={handleDragEnd}>
      {Object.entries(columns).map(([id,column]) => {
                return <DroppablePanel droppableId={id} name={column.name} key={id}>
                            {column.items.map((item,index) => {
                              return (
                                <DraggableItem 
                                  key={item.id} 
                                  draggableId={item.id} 
                                  index={index} 
                                  title={item.title}
                                  content={item.content}
                                />
                              )
                            })}
                </DroppablePanel>

        })}
      </DragDropContext>
    </div>
    </>
  );
}

export default App;
