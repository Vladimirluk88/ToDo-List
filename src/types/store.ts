export type ToDosStatus = "waiting" | "pending" | "completed";

export type ToDo = {
    title: string,
    description: string,
    status: ToDosStatus,
}

export type ToDoInStore = {
    id: number,
    title: string,
    description: string,
    status: ToDosStatus,
}

export type ToDosArray = Array<ToDoInStore>

export type Store = {
    toDos: ToDosArray,
}