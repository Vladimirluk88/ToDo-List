import React, { useState } from "react";
import { ToDoInStore, ToDosArray } from "../../types/store";
import ToDoItem from "./ToDoItem/ToDoItem";
import Search from "./Search/Search";

type ToDoListPropType = {
    toDos: ToDosArray;
    deleteToDo: (id: number) => void;
    changeToDo: (toDo: ToDoInStore) => void;
};

const ToDoList: React.FC<ToDoListPropType> = ({
    toDos,
    deleteToDo,
    changeToDo,
}) => {
    let [searchQuery, setSearchQuery] = useState("");

    return (
        <div className="ToDoList">
            <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            {toDos.map((toDo, index) => {
                if(toDo.title.includes(searchQuery)) {
                    return (
                        <div key={index} className="ToDoList_wrapper">
                            <div className="ToDoList__ToDo">
                                <ToDoItem
                                    id={toDo.id}
                                    title={toDo.title}
                                    description={toDo.description}
                                    status={toDo.status}
                                    deleteToDo={deleteToDo}
                                    changeToDo={changeToDo}
                                />
                            </div>
                        </div>
                    );
                }
            })}
        </div>
    );
};

export default React.memo(ToDoList);
