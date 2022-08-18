import React from "react";


type SearchPropsType = {
    searchQuery: string,
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

const Search: React.FC<SearchPropsType> = ({searchQuery, setSearchQuery}) => {
    return (
        <div className="ToDoList__search">
            <input onChange={(e) => {
                setSearchQuery(e.currentTarget.value);
            }} value={searchQuery} />
        </div>
    )
}

export default React.memo(Search);