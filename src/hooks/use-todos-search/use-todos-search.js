import styles from './use-todos-search.module.css';
import { useState } from 'react';

export const ToDosSearch = ({ setConfirmedSearchValue }) => {
	const [currentSearchPolValue, setCurrentSearchPolValue] = useState('');

	return (
		<div className={styles.searchContainer}>
			<input
				name="searchingToDosPol"
				type="text"
				value={currentSearchPolValue}
				placeholder="Введите текст для поиска"
				onChange={({ target }) => setCurrentSearchPolValue(target.value)}
			/>
			<div>
				<button
					type="button"
					onClick={() => {
						if (currentSearchPolValue) {
							setConfirmedSearchValue(currentSearchPolValue);
						} else {
							alert('Введите текст для поиска');
							setConfirmedSearchValue('');
						}
					}}
				>
					Искать
				</button>
				<button
					type="button"
					onClick={() => {
						setCurrentSearchPolValue('');
						setConfirmedSearchValue('');
					}}
				>
					Очистить
				</button>
			</div>
		</div>
	);
};
