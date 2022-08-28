import React, { useState } from "react";
import { ToDo, ToDoInStore, ToDosStatus } from "../../types/store";
import FormSelect from "./FormSelect/FormSelect";
import "./ToDoForm.scss";

// Типы коллбеков которые могут приходить в props
type callbackTypeToDo = (toDo: ToDo) => void;
type callbackTypeToDoInStore = (toDo: ToDoInStore) => void;

// Тип принимаемых props
type ToDoFormPropsType = {
    callback: callbackTypeToDo | callbackTypeToDoInStore;
    changeEditToggle?: () => void;
    title?: string;
    description?: string;
    status?: ToDosStatus;
    id?: number | null;
    children: React.ReactNode | string;
};

// Компонент отрисовывающий форму
const ToDoForm: React.FC<ToDoFormPropsType> = ({
    callback,
    changeEditToggle,
    title = "",
    description = "",
    status = "waiting",
    id = null,
    children = "Добавить",
}) => {
    // Сохраняем состояния инпутов и селекта для создания управляемых компонентов
    let [inputTitleVal, setInputTitleVal] = useState(title);
    let [inputDescriptionVal, setInputDescriptionVal] = useState(description);
    let [inputStatusVal, setInputStatusVal] = useState<ToDosStatus>(status);

    // В данной пеменной хранятся ошибки в случае неправильности написания toDo
    let [error, setError] = useState("");

    // Функция вызывающая коллбек с нужными для него параметрами и валидирующая форму
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let payload: ToDo | ToDoInStore;
        if (id !== null) {
            payload = {
                title: inputTitleVal,
                description: inputDescriptionVal,
                status: inputStatusVal,
                id: id,
            };
        } else {
            payload = {
                title: inputTitleVal,
                description: inputDescriptionVal,
                status: inputStatusVal,
            };
        }
        if(inputTitleVal) {
            // @ts-ignore
            callback(payload);
            setError("");
        } else {
            setError("Имя заметки обязательно!");
        }
        if (changeEditToggle !== undefined) changeEditToggle();
    };

    // Возвращаем jsx используя отедльнй компонент селекта
    return (
        <div className="ToDoForm">
            <form onSubmit={onSubmit}>
                <input
                    className="ToDoForm__input ToDoForm__input_title"
                    onChange={(e) => {
                        setInputTitleVal(e.currentTarget.value);
                        if(error) setError("");
                    }}
                    type="text"
                    placeholder="Введите имя заметки"
                    value={inputTitleVal}
                />
                <textarea
                    className="ToDoForm__input ToDoForm__input_description"
                    onChange={(e) =>
                        setInputDescriptionVal(e.currentTarget.value)
                    }
                    placeholder="Введите описание заметки"
                    value={inputDescriptionVal}
                />
                <div className="ToDoForm__select-submit">
                    <FormSelect changeStatus={(val) => {
                        setInputStatusVal(val);
                    }} status={inputStatusVal} />
                    <button className="ToDoForm__submit">{children}</button>
                </div>
                {error ? <div className="ToDoForm__error">{error}</div> : <></>}
            </form>
        </div>
    );
};

export default React.memo(ToDoForm);
