// Тип статусов toDo
export type ToDosStatus = "waiting" | "pending" | "completed";

// Тип toDo
export type ToDo = {
    title: string,
    description: string,
    status: ToDosStatus,
}

// Тип toDo в сторе, с id
export type ToDoInStore = {
    id: number,
    title: string,
    description: string,
    status: ToDosStatus,
}

// Тип массива из toDo
export type ToDosArray = Array<ToDoInStore>

// Тип store
export type Store = {
    toDos: ToDosArray,
}