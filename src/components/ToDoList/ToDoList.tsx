import React, { useState } from "react";
import { ToDoInStore, ToDosArray } from "../../types/store";
import ToDoItem from "./ToDoItem/ToDoItem";
import Search from "./Search/Search";
import "./ToDoList.scss";

// Тип принимаемых props
type ToDoListPropType = {
    toDos: ToDosArray;
    deleteToDo: (id: number) => void;
    changeToDo: (toDo: ToDoInStore) => void;
};

// Компонент отрисовывающий строку запроса и список toDo
const ToDoList: React.FC<ToDoListPropType> = ({
    toDos,
    deleteToDo,
    changeToDo,
}) => {

    // Сохраняем состояние строки запроса для создания управляемого компонента
    let [searchQuery, setSearchQuery] = useState("");

    // Возвращаем jsx используя отдельный компонент для поиска и отрисовываем все toDo проитерировавшись по массиву с toDo
    return (
        <div className="ToDoList">
            <div className="ToDoList__wrapper">
                <Search
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                />
                {toDos.map((toDo) => {
                    searchQuery = searchQuery.toLowerCase();
                    let title = toDo.title.toLowerCase();
                    if (title.includes(searchQuery)) {
                        return (
                            <div key={toDo.id} className="ToDoList_wrapper">
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
                    } else return <></>
                })}
            </div>
        </div>
    );
};

export default React.memo(ToDoList);
