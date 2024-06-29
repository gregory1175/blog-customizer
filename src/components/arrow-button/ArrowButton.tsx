import arrow from 'src/images/arrow.svg';

import clsx from 'clsx';
import styles from './ArrowButton.module.scss';
import React from 'react';

/** Функция для обработки открытия/закрытия формы */
type TOnClick = {
	onClick?: (state: boolean) => void;
	isMenuOpen?: boolean;
}

export const ArrowButton = ({onClick, isMenuOpen}: TOnClick) => {
	const onClickHandle = () => {
		onClick?.(!isMenuOpen);
	}

	return (
		/* Не забываем указаывать role и aria-label атрибуты для интерактивных элементов */
		<div
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={`${styles.container} ${
			isMenuOpen ? styles.container_open : ''
			}`}
			onClick={(e: React.MouseEvent) => {
				e.stopPropagation();
				onClickHandle();
			}}
			>
			<img
				src={arrow}
				alt='иконка стрелочки'
				className={clsx(styles.arrow, isMenuOpen && styles.arrow_open)}
			/>
		</div>
	);
};
