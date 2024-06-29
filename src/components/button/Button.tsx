import React from 'react';
import { Text } from 'components/text';
import styles from './Button.module.scss';

// Добавим типизацию 
type ButtonProps = {
	title: string;
	onClick?: () => void;
	type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
	disabled?: boolean;
};

export const Button: React.FC<ButtonProps> = React.memo(({
	title,
	onClick,
	type,
	disabled = false,
}) => {
	return (
		<button 
			className={styles.button} 
			type={type} 
			onClick={onClick} 
			disabled={disabled}
		>
			<Text weight={800} uppercase>
				{title}
			</Text>
		</button>
	);
});