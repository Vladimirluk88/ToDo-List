import React, { useState } from "react";
import { ToDo, ToDosStatus } from "../../types/store";
import "./ToDoCreate.scss";

type ToDoFormPropsType<T> = {
    callback: (t: T) => void,
    title?: string,
    description?: string,
    status?: ToDosStatus,
    id?: number | null,
    children: React.ReactNode | string
};

const ToDoForm: React.FC<ToDoFormPropsType<ToDo>> = ({ callback, title = "", description = "", status = "waiting", id = null, children = "Добавить"}) => {
    let [inputTitleVal, setInputTitleVal] = useState(title);
    let [inputDescriptionVal, setInputDescriptionVal] = useState(description);
    let [inputStatusVal, setInputStatusVal] = useState<ToDosStatus>(status);

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let payload = {
            title: inputTitleVal,
            description: inputDescriptionVal,
            status: inputStatusVal,
        }
        if(id !== null) {
            // @ts-ignore
            payload.id = id
        }
        callback(payload);
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
                <button>{children}</button>
            </form>
        </div>
    );
};

export default React.memo(ToDoForm);
