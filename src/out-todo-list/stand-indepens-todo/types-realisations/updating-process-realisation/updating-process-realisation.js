import styles from './updating-process-realisation.module.css';
import { useRef } from 'react';
import { useContext } from 'react';
import { AppContext } from '../../../../context';

export const UpdatingProcessRealisation = ({
	actualToDoValue,
	setActualToDoValue,
	setIsToDoInModificationProcess,
	toDoId,
}) => {
	const initialValue = useRef(actualToDoValue);

	const { toDos, setToDos } = useContext(AppContext);

	const onRequestUpdateToDo = (value) => {
		fetch(`http://localhost:3005/todos/${toDoId}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				value,
			}),
		})
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				console.log(response);

				const updatedTaskIndex = toDos.findIndex(
					(task) => task.id === Number(toDoId),
				);
				const copyTasks = [...toDos];
				copyTasks[updatedTaskIndex] = response;
				setToDos(copyTasks);
			});
	};

	return (
		<div className={styles.todoItem}>
			<input
				name="changingToDosField"
				type="text"
				value={actualToDoValue}
				onChange={({ target }) => setActualToDoValue(target.value)}
			/>
			<div>
				<button
					type="button"
					onClick={() => {
						setActualToDoValue(initialValue.current);
						setIsToDoInModificationProcess(false);
					}}
				>
					Отменить
				</button>
				<button
					type="button"
					onClick={() => {
						setIsToDoInModificationProcess(false);
						onRequestUpdateToDo(actualToDoValue);
					}}
				>
					Сохранить
				</button>
			</div>
		</div>
	);
};
