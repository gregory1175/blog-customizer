// Импорты компонентов и хуков React
import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Text } from '../text';
import { Separator } from '../separator';
import { RadioGroup } from '../radio-group';  	
import { useClose } from './hooks/UseClose';
import { FormEvent, useCallback, useRef, useState } from 'react';

// Импорты констант и стилей
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
import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';

// Определение интерфейса для пропсов компонента
interface ArticleParamsFormProps {
	articleState: ArticleStateType;
	setArticleState: (param: ArticleStateType) => void;
}

// Компонент формы параметров статьи
export const ArticleParamsForm = ({
	articleState,
	setArticleState,
}: ArticleParamsFormProps) => {
	// Состояние для открытия/закрытия формы
	const [isOpen, setIsOpen] = useState<boolean>(false);

	// Состояние формы для управления параметрами статьи
	const [formState, setFormState] = useState({
		fontFamily: articleState.fontFamilyOption,
		fontSize: articleState.fontSizeOption,
		fontColor: articleState.fontColor,
		backgroundColor: articleState.backgroundColor,
		contentWidth: articleState.contentWidth,
	});

	// Рефы для элементов DOM
	const rootRef = useRef<HTMLElement | null>(null);
	const formRef = useRef<HTMLFormElement>(null);

	// Хуки для закрытия формы при клике вне её
	useClose({
		isOpen: isOpen,
		onClose: () => setIsOpen(false),
		rootRef: formRef,
	});

	// Обработчик сброса формы
	const formResetHandler = useCallback(() => {
		// Установка состояния формы в значения по умолчанию
		setFormState({
			fontFamily: defaultArticleState.fontFamilyOption,
			fontSize: defaultArticleState.fontSizeOption,
			fontColor: defaultArticleState.fontColor,
			backgroundColor: defaultArticleState.backgroundColor,
			contentWidth: defaultArticleState.contentWidth,
		});

		// Сброс состояния статьи в значения по умолчанию
		setArticleState(defaultArticleState);
	}, [setArticleState]);

	// Обработчик отправки формы
	const formSubmitHandler = useCallback(
		(evt: FormEvent) => {
			evt.preventDefault();

			// Обновление состояния статьи с новыми значениями из формы
			setArticleState({
				...formState,
				fontFamilyOption: formState.fontFamily,
				fontSizeOption: formState.fontSize,
				fontColor: formState.fontColor,
				backgroundColor: formState.backgroundColor,
				contentWidth: formState.contentWidth,
			});

			// Переключение состояния открытия формы
			setIsOpen(!isOpen);
		},
		[formState, isOpen, setArticleState]
	);

	// Рендеринг компонента
	return (
		<>
			<ArrowButton onClick={() => setIsOpen(!isOpen)} isMenuOpen={isOpen} />
			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}
				ref={rootRef}>
				<form
					className={styles.form}
					onSubmit={formSubmitHandler}
					onReset={formResetHandler}
					ref={formRef}>
					{/* Заголовок формы */}
					<Text as={'h2'} size={31} weight={800} uppercase={true}>
						Задайте параметры
					</Text>
					{/* Выбор шрифта */}
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
					{/* Группа радиокнопок для размера шрифта */}
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
					{/* Выбор цвета шрифта */}
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
					{/* Разделитель */}
					<Separator />
					{/* Выбор цвета фона */}
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
					{/* Выбор ширины контента */}
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
					{/* Кнопки сброса и применения параметров */}
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
