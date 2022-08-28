import React, { useCallback, useEffect, useRef, useState } from "react";
import { ToDoInStore } from "../../../types/store";
import FormSelect from "../../ToDoForm/FormSelect/FormSelect";
import ToDoForm from "../../ToDoForm/ToDoForm";
import "./ToDoItem.scss";

// Тип принимаемых props
type ToDoItemPropsType = {
    deleteToDo: (id: number) => void;
    changeToDo: (toDo: ToDoInStore) => void;
};

// Компонент отрисовывающий отдельный toDo, к вышеописанным props добавляем ещё тип описывающий toDo в сторе
const ToDoItem: React.FC<ToDoInStore & ToDoItemPropsType> = ({
    id,
    title,
    description,
    status,
    deleteToDo,
    changeToDo,
}) => {
    // Сохраняем флаг который укажет что отрисовывать, статус или селект
    let [statusToggle, setStatusToggle] = useState<Boolean>(false);

    // Сохраняем флаг который укажет что отрисовывать, toDo или форму для его изменения
    let [editToggle, setEditToggle] = useState<Boolean>(false);

    // Сохраняем флаг который укажет что отрисовывать, полный toDo или toDo с сокращенными именем и описанием
    let [showFullToDo, setShowFullToDo] = useState<Boolean>(false);

    // Сохраняем ширину toDo для того чтобы определить нужно ли сокращать имя и описание
    let [toDoWidth, setToDoWidth] = useState<Number>(0);

    // Сохраняем реф на toDo чтобы определить его ширину
    const toDoRef = useRef(null);

    // Функция обёртка для вызова коллбека
    const onDelete = () => {
        setShowFullToDo(false);
        deleteToDo(id);
    };

    // Функция обёртка для изменеия рендера
    const changeEditToggle = () => {
        setEditToggle((val) => !val);
    };

    // При помощи useEffect устанавливаем ширину toDo
    useEffect(() => {
        // @ts-ignore
        setToDoWidth(toDoRef.current.getBoundingClientRect().width);
    }, []);

    // Вспомогательная функция для сокращения строки при необходимости
    const trunc = (truncateString: string) => {
        if (toDoRef.current) {
            if (truncateString.length * 20 > toDoWidth) {
                let n = +toDoWidth / 20;
                return truncateString.slice(0, n - 1) + "...";
            }
        }
        return truncateString;
    };

    // Сохраняем блок с именем и описанием для того чтобы не повторять код при отрисовке
    const titleDescriptionRender = useCallback(
        (title: string, description: string) => {
            return (
                <div onClick={() => setShowFullToDo((val) => !val)}>
                    <div className="ToDo__title">{title}</div>
                    <div className="ToDo__description">{description}</div>
                </div>
            );
        },
        []
    );

    // При ложном значении флага editToggle возвращаем jsx для отрисовки toDo, соответственно при истинном значении для отрисовки формы изменения toDo
    // Также будем отрисовывать полное имя и описание toDo при нажатии на имя или описание
    if (!editToggle) {
        return (
            <>
                {/* eslint-disable-next-line */}
                <div className={"ToDo" + ` ToDo__${status}`} ref={toDoRef}>
                    {showFullToDo
                        ? titleDescriptionRender(title, description)
                        : titleDescriptionRender(
                              trunc(title),
                              trunc(description)
                          )}
                    <div className="ToDo__buttons">
                        <div className="ToDo__status">
                            {statusToggle ? (
                                <FormSelect
                                    status={status}
                                    changeStatus={(newStatus) => {
                                        changeToDo({
                                            id,
                                            title,
                                            description,
                                            status: newStatus,
                                        });
                                        setStatusToggle((val) => !val);
                                    }}
                                />
                            ) : (
                                <button
                                    onClick={() =>
                                        setStatusToggle(!statusToggle)
                                    }
                                    className={
                                        "ToDo__status_text" +
                                        ` ToDo__status_${status}`
                                    }
                                >
                                    {status === "waiting"
                                        ? "Ожидает"
                                        : status === "pending"
                                        ? "В процессе"
                                        : "Выполнена"}
                                </button>
                            )}
                        </div>
                        <div className="ToDo__delete-edit">
                            <button
                                onClick={onDelete}
                                className="ToDo__button ToDo__button_delete"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 48 48"
                                    width="48px"
                                    height="48px"
                                >
                                    <path d="M13.05 42q-1.25 0-2.125-.875T10.05 39V10.5H8v-3h9.4V6h13.2v1.5H40v3h-2.05V39q0 1.2-.9 2.1-.9.9-2.1.9Zm21.9-31.5h-21.9V39h21.9Zm-16.6 24.2h3V14.75h-3Zm8.3 0h3V14.75h-3Zm-13.6-24.2V39Z" />
                                </svg>
                            </button>
                            <button
                                onClick={() => setEditToggle(!editToggle)}
                                className="ToDo__button ToDo__button_edit"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 48 48"
                                    width="48px"
                                    height="48px"
                                >
                                    <path d="M9 47.4q-1.2 0-2.1-.9-.9-.9-.9-2.1v-30q0-1.2.9-2.1.9-.9 2.1-.9h20.25l-3 3H9v30h30V27l3-3v20.4q0 1.2-.9 2.1-.9.9-2.1.9Zm15-18Zm9.1-17.6 2.15 2.1L21 28.1v4.3h4.25l14.3-14.3 2.1 2.1L26.5 35.4H18v-8.5Zm8.55 8.4-8.55-8.4 5-5q.85-.85 2.125-.85t2.125.9l4.2 4.25q.85.9.85 2.125t-.9 2.075Z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </>
        );
    } else {
        return (
            <ToDoForm
                callback={changeToDo}
                changeEditToggle={changeEditToggle}
                title={title}
                description={description}
                status={status}
                id={id}
            >
                Изменить
            </ToDoForm>
        );
    }
};

export default React.memo(ToDoItem);
