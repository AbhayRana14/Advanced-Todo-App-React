import React, { useEffect, useState } from 'react'
import todo from "../Images/notebook.png"

const getLocalitems = () => {
    let list = JSON.parse(localStorage.getItem('lists'));
    if(list){
        return JSON.parse(localStorage.getItem('lists'));
    }
    else{
      return [];
    }
}
const Todo = () => {
    const [inputData, setInputData] = useState('');
    const [items, setItems] = useState(getLocalitems());
    const [toggleSubmit, setToggleSubmit] = useState(true);
    const [isEditItem, setIsEditItem] = useState(null);
    
    const addItem = () => {
        if(!inputData){
            alert('please add something first')    
        }
        else if(inputData && !toggleSubmit){
            setItems(
                items.map((elem)=>{
                    if(elem.id === isEditItem){
                        return {...elem,name : inputData};
                    }
                    return elem;
                })
            )
            setToggleSubmit(true);
            setInputData('');
            setIsEditItem(null);
        }
        else{
            const allInputData = { id : new Date().getTime().toString(), name : inputData };
            setItems([...items,allInputData]);
            setInputData('');
        }
    }

    const deleteItem = (id) =>{
        const updatedItems = items.filter((CurrentElement)=>{
            return CurrentElement.id !== id;
        })
        setItems(updatedItems);
    }

    const editItem = (id) => {
        let newEditItem = items.find((elem)=>{
            return elem.id === id;
        })
        setToggleSubmit(false);
        setInputData(newEditItem.name);
        setIsEditItem(id);
    }

    const removeAll=()=>{
        setItems([]);
    }

    useEffect(()=>{
        localStorage.setItem('lists', JSON.stringify(items));
    },[items]);

    return (
        <div className="main-div">
            <div className="child-div">
                <figure>
                    <img src={todo} alt="todo-logo"/>
                    <figcaption>Add your List here</figcaption> 
                </figure>
                <div className="addItems">
                    <input 
                    type="text" 
                    placeholder="Add Items"
                    value={inputData} 
                    onChange={(e)=>setInputData(e.target.value)}
                    />
                    {
                        toggleSubmit ? <i className="fa fa-plus add-btn" title="Add Title" onClick={addItem}></i> :
                        <i className="far fa-edit add-btn" title="Update Title" onClick={addItem}></i>
                    }
                    
                </div>
                <div className="showItems">
                {
                    items.map((currElem)=>{
                        return(
                        <div className="eachItem" key={currElem.id}>
                          <h3>{currElem.name}</h3>
                          <div className="todo-btn">
                              <i className="far fa-edit add-btn" title="editItem" onClick={()=>editItem(currElem.id)}></i>
                              <i className="far fa-trash-alt add-btn" title="deleteItem" onClick={()=>deleteItem(currElem.id)}></i>
                          </div>
                        </div>
                        )
                    })
                }
                </div>
                <div className="showItems">
                    <button className="btn effect04" data-sm-link-text="Remove All" onClick={removeAll}><span> Check List</span></button>
                </div>
            </div>
        </div>
    )
}

export default Todo
