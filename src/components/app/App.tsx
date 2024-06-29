import React, { CSSProperties, useState } from 'react';
import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import { defaultArticleState } from '../../constants/articleProps';
import styles from './App.module.scss';

export const App = () => {
  const [articleState, setArticleState] = useState(defaultArticleState);

  // Стили для главного контейнера, используя CSS переменные.
  const mainStyle: React.CSSProperties & { [key: string]: string | number } = {
	'--font-family': articleState.fontFamilyOption.value,
	'--font-size': articleState.fontSizeOption.value,
	'--font-color': articleState.fontColor.value,
	'--container-width': articleState.contentWidth.value,
	'--bg-color': articleState.backgroundColor.value,
  };  

  return (
    <main className={styles.main} style={mainStyle}>
      <ArticleParamsForm
        articleState={articleState}
        setArticleState={setArticleState}
      />
      <Article />
    </main>
  );
};