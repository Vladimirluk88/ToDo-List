import { useCallback, useState } from "react";
import { Store, ToDo, ToDoInStore } from "./types/store";
import "./App.css";
import ToDoCreate from "./components/ToDoCreate/ToDoCreate";
import ToDoList from "./components/ToDoList/ToDoList";

function App() {
    let [store, setStore] = useState<Store>({
        toDos: [],
    });

    //@ts-ignore
    window.store = store;

    const createToDo = useCallback((toDo: ToDo) => {
        setStore((prevStore: Store): Store => {
            let newToDoId;
            if (prevStore.toDos.length > 0) {
                newToDoId = prevStore.toDos[prevStore.toDos.length - 1]?.id + 1;
            } else {
                newToDoId = 0;
            }
            let newToDos = [
                ...prevStore.toDos,
                {
                    ...toDo,
                    id: newToDoId,
                },
            ];
            return {
                ...prevStore,
                toDos: newToDos,
            };
        });
    }, []);
    const deleteToDo = useCallback((id: number) => {
        setStore((prevStore: Store): Store => {
            let deletedToDo = prevStore.toDos.findIndex(
                (toDo: ToDoInStore) => toDo.id === id
            );
            let newToDos = [
                ...prevStore.toDos.slice(0, deletedToDo),
                ...prevStore.toDos.slice(deletedToDo + 1),
            ];
            return {
                ...prevStore,
                toDos: newToDos,
            };
        });
    }, []);
    const changeToDo = useCallback((toDo: ToDoInStore) => {
        setStore((prevStore: Store): Store => {
            console.log(toDo);
            let changedToDo = prevStore.toDos.findIndex(
                (item: ToDoInStore) => item.id === toDo.id
            );
            let newToDos = [
                ...prevStore.toDos.slice(0, changedToDo),
                { ...toDo },
                ...prevStore.toDos.slice(changedToDo + 1),
            ];
            return {
                ...prevStore,
                toDos: newToDos,
            };
        });
    }, []);

    return (
        <div className="App">
            <div className="App__list">
                <ToDoList
                    toDos={store.toDos}
                    deleteToDo={deleteToDo}
                    changeToDo={changeToDo}
                />
            </div>
            <div className="App__create">
                <ToDoCreate createToDo={createToDo} />
            </div>
        </div>
    );
}

export default App;
