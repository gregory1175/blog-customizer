import { Text } from 'components/text';

import styles from './Button.module.scss';

export const Button = ({
	title,
	onClick,
	type,
	isDisabled,
}: {
	title: string;
	onClick?: () => void;
	type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
	isDisabled?: boolean;
}) => {
	return (
		<button
			className={styles.button}
			type={type}
			onClick={onClick}
			disabled={isDisabled}
		>
			<Text weight={800} uppercase>
				{title}
			</Text>
		</button>
	);
};
