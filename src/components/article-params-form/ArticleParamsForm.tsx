import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Text } from '../text';

import { FormEvent, useRef, useState } from 'react';
import { Select } from '../select';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { Separator } from '../separator';
import { RadioGroup } from '../radio-group';
import { useOutsideClickClose } from '../select/hooks/useOutsideClickClose';
import { useClose } from './hooks/UseClose';

import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';

interface ArticleParamsFormProps {
	articleState: ArticleStateType;
	setArticleState: (param: ArticleStateType) => void;
}

export const ArticleParamsForm = ({
	articleState,
	setArticleState,
}: ArticleParamsFormProps) => {
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
	const [formState, setFormState] = useState({
		fontFamily: articleState.fontFamilyOption,
		fontSize: articleState.fontSizeOption,
		fontColor: articleState.fontColor,
		backgroundColor: articleState.backgroundColor,
		contentWidth: articleState.contentWidth,
	});

	const rootRef = useRef<HTMLElement | null>(null);
	const formRef = useRef<HTMLFormElement>(null);

	useOutsideClickClose({
		isMenuOpen,
		rootRef,
		onClose: () => setIsMenuOpen(false),
		onChange: setIsMenuOpen,
	});

	useClose({
		isMenuOpen: isMenuOpen,
		onClose: () => setIsMenuOpen(false),
		rootRef: formRef,
	});

	const formResetHandler = () => {
		setFormState((prevState) => ({
			...prevState,
			fontFamily: defaultArticleState.fontFamilyOption,
			fontSize: defaultArticleState.fontSizeOption,
			fontColor: defaultArticleState.fontColor,
			backgroundColor: defaultArticleState.backgroundColor,
			contentWidth: defaultArticleState.contentWidth,
		}));

		setArticleState(defaultArticleState);
	};

	const formSubmitHandler = (evt: FormEvent) => {
		evt.preventDefault();

		setArticleState({
			...formState,
			fontFamilyOption: formState.fontFamily,
			fontSizeOption: formState.fontSize,
			fontColor: formState.fontColor,
			backgroundColor: formState.backgroundColor,
			contentWidth: formState.contentWidth,
		});

		setIsMenuOpen(!isMenuOpen);
	};

	return (
		<>
			<ArrowButton onClick={setIsMenuOpen} isMenuOpen={isMenuOpen} />
			<aside
				className={clsx(styles.container, isMenuOpen && styles.container_open)}
				ref={rootRef}>
				<form
					className={styles.form}
					onSubmit={formSubmitHandler}
					onReset={formResetHandler}
					ref={formRef}>
					<Text as={'h2'} size={31} weight={800} uppercase={true}>
						Задайте параметры
					</Text>
					<Select
						title='Шрифт'
						selected={formState.fontFamily}
						options={fontFamilyOptions}
						onChange={(selectedOption) =>
							setFormState((prevState) => ({
								...prevState,
								fontFamily: selectedOption,
							}))
						}
					/>
					<RadioGroup
						options={fontSizeOptions}
						selected={formState.fontSize}
						title='Размер шрифта'
						name='Размер шрифта'
						onChange={(selectedOption) =>
							setFormState((prevState) => ({
								...prevState,
								fontSize: selectedOption,
							}))
						}
					/>
					<Select
						options={fontColors}
						selected={formState.fontColor}
						title='Цвет шрифта'
						onChange={(selectedOption) =>
							setFormState((prevState) => ({
								...prevState,
								fontColor: selectedOption,
							}))
						}
					/>
					<Separator />
					<Select
						options={backgroundColors}
						selected={formState.backgroundColor}
						title='Цвет фона'
						onChange={(selectedOption) =>
							setFormState((prevState) => ({
								...prevState,
								backgroundColor: selectedOption,
							}))
						}
					/>
					<Select
						options={contentWidthArr}
						selected={formState.contentWidth}
						title='Ширина контента'
						onChange={(selectedOption) =>
							setFormState((prevState) => ({
								...prevState,
								contentWidth: selectedOption,
							}))
						}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
