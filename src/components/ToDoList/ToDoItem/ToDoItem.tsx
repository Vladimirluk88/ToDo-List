import React, { useState } from "react";
import { ToDoInStore, ToDosStatus } from "../../../types/store";

type ToDoItemPropsType = {
    deleteToDo: (id: number) => void,
    changeToDo: (id:number, toDo: ToDoInStore) => void,
}

const ToDoItem: React.FC<ToDoInStore & ToDoItemPropsType> = ({id, title, description, status, deleteToDo, changeToDo}) => {
    let [statusToggle, setStatusToggle] = useState(false)
    let [editToggle, setEditToggle] = useState<Boolean>(false);
    let [inputTitleVal, setInputTitleVal] = useState("");
    let [inputDescriptionVal, setInputDescriptionVal] = useState("");
    let [inputStatusVal, setInputStatusVal] = useState<ToDosStatus>("waiting");

    const onDelete = () => {
        deleteToDo(id);
    };

    if(!editToggle) {
        return (
            <div className="ToDo">
                <div className="ToDo__title">
                    {title}
                </div>
                <div className="ToDo__description">
                {description}
                </div>
                <div className="ToDo__status">
                    <button onClick={() => setStatusToggle(!statusToggle)} className="ToDo__status_text">
                        {status}
                    </button>
                    {statusToggle ?
                    <div className="ToDo__menu_open">
                        <button className="ToDo__waiting">
                            Ожидает
                        </button>
                        <button className="ToDo__pending">
                            В процессе
                        </button>
                        <button className="ToDo__complete">
                            Выполнено
                        </button>
                    </div>
                    :
                    <></>
                    }
                </div>
                <button onClick={onDelete} className="ToDo__delete">
                    <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M13.05 42q-1.25 0-2.125-.875T10.05 39V10.5H8v-3h9.4V6h13.2v1.5H40v3h-2.05V39q0 1.2-.9 2.1-.9.9-2.1.9Zm21.9-31.5h-21.9V39h21.9Zm-16.6 24.2h3V14.75h-3Zm8.3 0h3V14.75h-3Zm-13.6-24.2V39Z"/></svg>
                </button>
                <button onClick={() => setEditToggle(!editToggle)} className="ToDo__edit">
                    <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M9 47.4q-1.2 0-2.1-.9-.9-.9-.9-2.1v-30q0-1.2.9-2.1.9-.9 2.1-.9h20.25l-3 3H9v30h30V27l3-3v20.4q0 1.2-.9 2.1-.9.9-2.1.9Zm15-18Zm9.1-17.6 2.15 2.1L21 28.1v4.3h4.25l14.3-14.3 2.1 2.1L26.5 35.4H18v-8.5Zm8.55 8.4-8.55-8.4 5-5q.85-.85 2.125-.85t2.125.9l4.2 4.25q.85.9.85 2.125t-.9 2.075Z"/></svg>
                </button>
            </div>
        )
    } else {
        
    }
    return <></>
}



export default React.memo(ToDoItem)