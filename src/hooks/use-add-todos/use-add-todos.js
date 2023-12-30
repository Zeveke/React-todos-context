import styles from './use-add-todos.module.css';
import { useState } from 'react';

export const AddToDos = ({ tasks, setTasks }) => {
	const [polValue, setPolValue] = useState('');

	const onRequestAddToDos = (event, value) => {
		if (value) {
			event.preventDefault();
			fetch(`http://localhost:3005/todos`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json;charset=utf-8' },
				body: JSON.stringify({
					value,
				}),
			})
				.then((rawResponse) => rawResponse.json())
				.then((response) => {
					console.log(response);
					setTasks([...tasks, response]);
					setPolValue('');
				});
		} else {
			alert('Введите задачу');
			setPolValue('');
			event.preventDefault();
		}
	};

	return (
		<div>
			<form
				className={styles.form}
				onSubmit={(event) => onRequestAddToDos(event, polValue)}
			>
				<input
					name="toDosPol"
					type="text"
					value={polValue}
					placeholder="Введите задачу..."
					onChange={({ target }) => setPolValue(target.value)}
				></input>
				<button type="submit">Создать новую задачу</button>
			</form>
		</div>
	);
};
