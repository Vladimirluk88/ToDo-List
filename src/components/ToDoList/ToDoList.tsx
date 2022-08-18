import React from "react";
import { ToDoInStore, ToDosArray } from "../../types/store";
import ToDoItem from "./ToDoItem/ToDoItem";

type ToDoListPropType = {
    toDos: ToDosArray,
    deleteToDo: (id: number) => void,
    changeToDo: (id:number, toDo: ToDoInStore) => void,
}

const ToDoList: React.FC<ToDoListPropType> = ({toDos, deleteToDo, changeToDo}) => {

    return (
        <div className="ToDoList">
            {toDos.map((toDo, index) => {
                return (
                    <div key={index} className="ToDoList">
                        <div className="ToDoList__ToDo">
                            <ToDoItem id={toDo.id} title={toDo.title} description={toDo.description} status={toDo.status} deleteToDo={deleteToDo} changeToDo={changeToDo} />
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default React.memo(ToDoList);