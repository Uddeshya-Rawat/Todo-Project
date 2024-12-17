
import { createContext} from "react"




// we have amde a context and will reterive the functions and data from this constext only
 export const TodoData=createContext(
    {
        todos:[
          {id:1,
           todo:'todo msg',
           completed: false,
          }
        ],
        addTodo:(todo)=>{},
        updatedTodo:(id,todo)=>{},
        deleteTodo:(id)=>{},
        toggleCompleted:(id)=>{}
        }

      
 );

const Context = ({children}) => {
  return (
    <TodoData.Provider value={TodoData}>
        {children}
        </TodoData.Provider>
  )
}

export default Context