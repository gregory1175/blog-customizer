# Проектная работа: Вёрстка проекта

Выполнил: gregory1175

Стек технологий: HTML, SASS, TypeScript, React

[Макет проекта](https://www.figma.com/file/FEeiiGLOsE7ktXbPpBxYoD/Custom-dropdown?type=design&node-id=0%3A1&mode=design&t=eXRJnWC6Xsuw0qR4-1)

## Реализация формы редактирования свойств

#### useClose

Для реализации формы был создан кастомный хук 'useClose'.
Хук предназначен для закрытия модального окна или выпадающего списка при клике вне его области или при нажатии клавиши Escape.

Описание функционала:
- 'useCallback' используется для создания функции 'handleClickOutside', которая вызывает 'onClose', если клик произошёл вне элемента, на который ссылается rootRef.

- 'HandleEscape' создаётся для обработки нажатия клавиши 'Escape'.

- 'useEffect' применяется для добавления и последующего удаления обработчиков событий при монтировании и размонтировании компонента. Обработчики добавляются только тогда, когда 'isOpen' истинно.

#### ArticleParamsForm

Далее был реализован компонент 'ArticleParamsForm'.

Описание функционала: 
- использует хук 'useClose' для управления отображением формы параметров статьи. 
- Содержит локальное состояние для управления параметрами статьи и использует 'useRef' для ссылки на DOM-элементы. 
- Обработчики событий 'formSubmitHandler' и 'formResetHandler' используются для обновления состояния статьи и сброса формы соответственно.

### Доп инфа 
В проекте предусмотрены инструменты для разработчиков, Storybook, линтер и форматтер. Используйте следующие команды для их запуска:

``` npm run storybook | Для запуска Storybook  ```
``` npm run stylelint | Для запуска линтера стилей ```
``` npm run lint | Для запуска линтера ```
``` npm run format | Для запуска форматтера ```

