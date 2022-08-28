import { useCallback, useState, useEffect } from "react";
import { Store, ToDo, ToDoInStore } from "./types/store";
import "./App.scss";
import ToDoCreate from "./components/ToDoCreate/ToDoCreate";
import ToDoList from "./components/ToDoList/ToDoList";

// Главный компонент который будет рендерить наше приложение
function App() {
    // Стор созданный при помощи useState
    let [store, setStore] = useState<Store>({
        toDos: [],
    });

    // listWidth для дальнейшего изменения ширины списка
    let [listWidth, setListWidth] = useState("50%");

    // При помощи данного useEffect обрабатывается изменение ширины списка до 768px
    useEffect(() => {
        let resizeCallback = () => {
            if (window.innerWidth < 768) {
                setListWidth("100%");
            }
        };
        resizeCallback();
        window.addEventListener("resize", resizeCallback);
        return () => window.removeEventListener("resize", resizeCallback);
    }, []);

    // Для удобного взаимодействия с приложением используется localStorage, данный useEffect достаёт стор из предыдущей сессии
    useEffect(() => {
        let pastStore = localStorage.getItem("store");
        if (pastStore) {
            setStore({
                toDos: JSON.parse(pastStore),
            });
        }
    }, []);

    // Функция принимает новый toDo и устанавливает новый store добавляя к старому новый toDo
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
            localStorage.setItem("store", JSON.stringify(newToDos));
            return {
                ...prevStore,
                toDos: newToDos,
            };
        });
    }, []);
    // Функция принимает id удаляемого toDo и устанавливает новый store удаляя из старого указанный toDo
    const deleteToDo = useCallback((id: number) => {
        setStore((prevStore: Store): Store => {
            let deletedToDo = prevStore.toDos.findIndex(
                (toDo: ToDoInStore) => toDo.id === id
            );
            let newToDos = [
                ...prevStore.toDos.slice(0, deletedToDo),
                ...prevStore.toDos.slice(deletedToDo + 1),
            ];
            localStorage.setItem("store", JSON.stringify(newToDos));
            return {
                ...prevStore,
                toDos: newToDos,
            };
        });
    }, []);
    // Функция принимает новый toDo и устанавливает новый store меняя старый toDo на изменённый
    const changeToDo = useCallback((toDo: ToDoInStore) => {
        setStore((prevStore: Store): Store => {
            let changedToDo = prevStore.toDos.findIndex(
                (item: ToDoInStore) => item.id === toDo.id
            );
            let newToDos = [
                ...prevStore.toDos.slice(0, changedToDo),
                { ...toDo },
                ...prevStore.toDos.slice(changedToDo + 1),
            ];
            localStorage.setItem("store", JSON.stringify(newToDos));
            return {
                ...prevStore,
                toDos: newToDos,
            };
        });
    }, []);

    // Возвращаем jsx используя отедльные компоненты для списка и формы
    return (
        <div className="App">
            <div className="App__list" style={{ width: listWidth }}>
                <ToDoList
                    toDos={store.toDos}
                    deleteToDo={deleteToDo}
                    changeToDo={changeToDo}
                />
            </div>
            <hr
                draggable
                onDrag={(e) => {
                    if (e.screenX > 320) setListWidth(`${e.screenX}px`);
                }}
                className="App__hr"
            />
            <div className="App__create">
                <ToDoCreate createToDo={createToDo} />
            </div>
        </div>
    );
}

export default App;
