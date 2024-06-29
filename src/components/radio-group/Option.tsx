import React, { useRef, useCallback, memo } from 'react';
import { OptionType } from 'src/constants/articleProps';
import { Text } from 'components/text';
import { useEnterSubmit } from './hooks/useEnterSubmit';

import styles from './RadioGroup.module.scss';

type OptionProps = {
  value: OptionType['value'];
  title: OptionType['title'];
  selected: OptionType;
  groupName: string;
  onChange?: (option: OptionType) => void;
  option: OptionType;
};

const OptionComponent = (props: OptionProps) => {
  const { value, title, selected, groupName, onChange, option } = props;

  const optionRef = useRef<HTMLDivElement>(null);

  // Вынесен handleChange чтобы не создавать новую функцию при рендере
  const handleChange = useCallback(() => {
    onChange?.(option);
  }, [onChange, option]);

  useEnterSubmit({ onChange, option });

  const inputId = `${groupName}_radio_item_with_value__${value}`;
  const isChecked = value === selected.value;

  return (
    <div
      className={styles.item}
      data-checked={isChecked}
      data-testid={inputId}
      tabIndex={0}
      ref={optionRef}
    >
      <input
        className={styles.input}
        type='radio'
        name={groupName}
        id={inputId}
        value={value}
        onChange={handleChange}
        tabIndex={-1}
        checked={isChecked} // Добавлен атрибут checked для управления состоянием компонента
      />
      <label className={styles.label} htmlFor={inputId}>
        <Text size={18} uppercase>
          {title}
        </Text>
      </label>
    </div>
  );
};

export const Option = memo(OptionComponent);