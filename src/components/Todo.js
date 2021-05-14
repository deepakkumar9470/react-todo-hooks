import React,{useState, useEffect} from 'react'
import todo from '../images/todo.svg'

//* get localstorage items
const getLocalStorageItems = () =>{
    const list = localStorage.getItem('mytodo')
    if (list) {
         return JSON.parse(localStorage.getItem('mytodo'));
    }else{
       return []
    }
};

const Todo = () => {

    const [inputData, setInputData] = useState('')
    const [items, setItems] = useState(getLocalStorageItems())
    const [isToggle, setIsToggle] = useState(true)
    const[isEditItem, setIsEditItem] = useState(null)
    
    //* Add items here
    const addItems = () =>{
        if(!inputData){
             alert('Please add all fields..')
        }else if(inputData && !isToggle){
              setItems(
                  items.map((ele) =>{
                      if(ele.id === isEditItem){
                         return {...items, name : inputData}
                      }
                      return ele;
                  })
                 
              )
              setIsToggle(true);
              setInputData('');
              setIsEditItem(null)
        }
        else{
            const allInputItems = {id : new Date().getTime().toString(), name : inputData};
            setItems([...items, allInputItems])
            setInputData('')
        }
        
    };

    //* Delete items here
    const deleteItems = (index) => {
         const updatedItems = items.filter((ele) =>{
             return index !== ele.id 
         })
         setItems(updatedItems)
    };

    //* Edit items here
    const editItems = (id) =>{
        let newEditItems = items.find((ele) =>{
            return ele.id === id
        })
        setIsToggle(false);
        setInputData(newEditItems.name);
        setIsEditItem(id)
    };

     //* set localstorage to store data
    useEffect(() => {
         localStorage.setItem('mytodo', JSON.stringify(items))
    }, [items])

    return (
         <>
            <div className="main-div">
            <div className="child-div">
                <h2>TODO APP</h2>
                <figure>
                  <img src={todo} alt="todo" />
                  <figcaption>Add Your Todo List here..</figcaption>
               </figure>

                <div className="addItems">
                    <input type="text" name="item" id=""  placeholder="Add todo.." value={inputData} onChange={(e) => setInputData(e.target.value)} autoFocus/>
                    {
                        isToggle ? <i className="fas fa-plus add-btn" title="Add Items.." onClick={addItems} style={{color: '#fff'}}></i>  : <i className="far fa-edit add-btn" title="Edit item" onClick={addItems}></i>
                    }
                    
                </div>
                
                <div className="showItems">
                 {
                    items.map((ele)=>{
                        return (
                            <div className="eachItem" key={ele.id}>
                            <h3>{ele.name}</h3>
                        
                              <div className="todo-btn">
                                <i className="far fa-edit add-btn" title="Edit item" onClick={() => editItems(ele.id)}></i>
                                
                                <i className="far fa-trash-alt add-btn" title="Delete item" onClick={() => deleteItems(ele.id)}></i>
                              </div>

                         </div>
                        )
                     })
                 }
                    
                </div>

              </div>
            </div>  
            

         </>
      )
}

export default Todo
