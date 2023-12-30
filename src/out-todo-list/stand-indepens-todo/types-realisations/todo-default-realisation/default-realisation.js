import styles from './default-realisation.module.css';
import { useContext } from 'react';
import { AppContext } from '../../../../context';

export const DefaultToDoRealisation = ({
	actualToDoValue,
	setIsToDoInModificationProcess,
	toDoId,
}) => {
	const { toDos, setToDos } = useContext(AppContext);
	const onRequestDeleteToDo = () => {
		fetch(`http://localhost:3005/todos/${toDoId}`, {
			method: 'DELETE',
		})
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				console.log(response);

				const copyTasks = [...toDos];
				const updatedTasks = copyTasks.filter(
					(copyTask) => copyTask.id !== toDoId,
				);
				setToDos(updatedTasks);
			});
	};

	return (
		<div className={styles.todoItem}>
			<div>{actualToDoValue}</div>
			<div>
				<button
					type="button"
					onClick={() => {
						setIsToDoInModificationProcess(true);
					}}
				>
					Изменить
				</button>
				<button
					type="button"
					onClick={() => {
						onRequestDeleteToDo();
					}}
				>
					Удалить
				</button>
			</div>
		</div>
	);
};
