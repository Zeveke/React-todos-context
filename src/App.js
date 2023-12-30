import styles from './App.module.css';
import { useEffect, useState } from 'react';
import { AppContext } from './context';
import { ToDosListOutput } from './out-todo-list/list-output';
import { AddToDos } from './hooks/use-add-todos/use-add-todos.js';
import { ToDosSearch } from './hooks/use-todos-search/use-todos-search';
import { ToDosSort } from './hooks/use-todos-sort/use-todos-sort';

export const App = () => {
	const [toDos, setToDos] = useState([]);
	const [polSearchValue, setPolSearchValue] = useState('');
	const [isSortChecked, setIsSortChecked] = useState(false);

	const toDosAndSetterStorage = { toDos, setToDos };

	useEffect(() => {
		const acceptCustomQuerySearchAndSort = (polSearchValue, isSortChecked) => {
			let request = '';

			if (polSearchValue) {
				request += `?q=${polSearchValue}`;
			}

			if (isSortChecked && polSearchValue) {
				request += '&_sort=value';
			} else if (isSortChecked) {
				request += '?_sort=value';
			}

			return request;
		};

		fetch(
			`http://localhost:3005/todos${acceptCustomQuerySearchAndSort(
				polSearchValue,
				isSortChecked,
			)}`,
			{
				method: 'GET',
				headers: { 'Content-Type': 'application/json;charset=utf-8' },
				credentials: 'include',
				mode: 'cors',
				cache: 'default',
			},
		)
			.then((loadedData) => loadedData.json())
			.then((loadedToDos) => {
				setToDos(loadedToDos);
			});
	}, [polSearchValue, isSortChecked]);

	return (
		<div className={styles.container}>
			<div className={styles.toDosItemList}>
				<h3 className={styles.header}>Лист задач</h3>
				<div className={styles.settings}>
					<ToDosSort checked={isSortChecked} setChecked={setIsSortChecked} />
					<ToDosSearch setConfirmedSearchValue={setPolSearchValue} />
				</div>
				<AppContext.Provider value={toDosAndSetterStorage}>
					<ToDosListOutput toDosList={toDos} setToDosList={setToDos} />
				</AppContext.Provider>
			</div>
			<AddToDos tasks={toDos} setTasks={setToDos} />
		</div>
	);
};
