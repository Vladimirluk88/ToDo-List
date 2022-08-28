import React from "react";
import "./Search.scss"

// Тип принимаемых props
type SearchPropsType = {
    searchQuery: string,
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

// Компонент отрисовывающий строку поиска
const Search: React.FC<SearchPropsType> = ({searchQuery, setSearchQuery}) => {

    // Возвращаем jsx с инпутом при изменении вызывающим коллбек
    return (
        <div className="ToDoList__search">
            <input onChange={(e) => {
                setSearchQuery(e.currentTarget.value);
            }} value={searchQuery} />
        </div>
    )
}

export default React.memo(Search);