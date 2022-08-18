import React from "react";
import { ToDo } from "../../types/store";
import ToDoForm from "../ToDoForm/ToDoForm";

type ToDoCreatePropsType = {
    createToDo: (toDo: ToDo) => void;
};

const ToDoCreate: React.FC<ToDoCreatePropsType> = ({ createToDo }) => {
    return <ToDoForm callback={createToDo}>Добавить</ToDoForm>;
};

export default React.memo(ToDoCreate);
