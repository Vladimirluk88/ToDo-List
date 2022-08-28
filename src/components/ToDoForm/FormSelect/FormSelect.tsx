import React from "react";
import { ToDosStatus } from "../../../types/store";
import "./FormSelect.scss";

// Тип принимаемых props
type FormSelectPropsType = {
    changeStatus: (val: ToDosStatus) => void;
    status?: ToDosStatus;
};

// Компонент для создания шаблонного select
const FormSelect: React.FC<FormSelectPropsType> = ({
    changeStatus,
    status = "waiting",
}) => {

    // Возвращаем jsx отрисовывающий селект
    return (
        // eslint-disable-next-line
        <select className={"ToDoSelect" + ` ToDoSelect_${status}`}
            name="status"
            onChange={(e) => {
                //@ts-ignore
                changeStatus(e.currentTarget.value);
            }}
            defaultValue={status}
        >
            <option className="ToDoSelect_waiting" value="waiting">
                Ожидает
            </option>
            <option className="ToDoSelect_pending" value="pending">
                В процессе
            </option>
            <option className="ToDoSelect_complete" value="complete">
                Выполнена
            </option>
        </select>
    );
};

export default React.memo(FormSelect);
