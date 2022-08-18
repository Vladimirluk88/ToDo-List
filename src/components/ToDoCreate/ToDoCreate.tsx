import React, { useState } from "react";
import { ToDo, ToDosStatus } from "../../types/store";
import "./ToDoCreate.scss";

type ToDoCreatePropsType = {
    createToDo: (toDo: ToDo) => void;
};

const ToDoCreate: React.FC<ToDoCreatePropsType> = ({ createToDo }) => {
    let [inputTitleVal, setInputTitleVal] = useState("");
    let [inputDescriptionVal, setInputDescriptionVal] = useState("");
    let [inputStatusVal, setInputStatusVal] = useState<ToDosStatus>("waiting");

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        createToDo({
            title: inputTitleVal,
            description: inputDescriptionVal,
            status: inputStatusVal,
        });
    };

    return (
        <div className="ToDoCreate">
            <form onSubmit={onSubmit}>
                <input
                    onChange={(e) => setInputTitleVal(e.currentTarget.value)}
                    type="text"
                    placeholder="Введите имя заметки"
                    value={inputTitleVal}
                />
                <input
                    onChange={(e) =>
                        setInputDescriptionVal(e.currentTarget.value)
                    }
                    type="text"
                    placeholder="Введите описание заметки"
                    value={inputDescriptionVal}
                />
                <select
                    name="status"
                    onChange={(e) => {
                        // @ts-ignore
                        setInputStatusVal(e.currentTarget.value);
                    }}
                    defaultValue="waiting"
                >
                    <option value="waiting">Ожидает</option>
                    <option value="pending">Выполняется</option>
                    <option value="complete">Выполнен</option>
                </select>
                <button>Добавить</button>
            </form>
        </div>
    );
};

export default React.memo(ToDoCreate);
