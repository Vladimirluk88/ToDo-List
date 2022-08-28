import React from "react";
import { ToDo } from "../../types/store";
import ToDoForm from "../ToDoForm/ToDoForm";

// Тип принимаемых props
type ToDoCreatePropsType = {
    createToDo: (toDo: ToDo) => void;
};

// Компонент обёртка для формы
const ToDoCreate: React.FC<ToDoCreatePropsType> = ({ createToDo }) => {
    return <ToDoForm callback={createToDo}>Добавить</ToDoForm>;
};

export default React.memo(ToDoCreate);
