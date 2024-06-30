import { memo } from 'react';
import { Text } from 'components/text';
import styles from './Button.module.scss';

// добавим типизацию
type ButtonProps = {
	title: string;
	onClick?: () => void;
	type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
	disabled?: boolean;
};

const ButtonComponent: React.FC<ButtonProps> = ({
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
			disabled={disabled}>
			<Text weight={800} uppercase>
				{title}
			</Text>
		</button>
	);
};

ButtonComponent.displayName = 'ButtonComponent';

export const Button = memo(ButtonComponent);
