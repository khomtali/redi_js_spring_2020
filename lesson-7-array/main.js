let articles = [];
const inputEl = document.querySelector('.input-field');
const btnEl = document.querySelector('.button');
const articlesListEl = document.querySelector('.js-articles-list');
const indexArticleEl = document.querySelector('.index-article');

window.onRandomWikipediaArticle(article => {
  articles.push(article);
  console.log(articles.length - 1);
  renderOutput(articles);
});

function renderOutput(articles) {
  articlesListEl.innerHTML = '';
  const firstArticleEl = document.createElement('li');
  firstArticleEl.innerHTML = `<h2>First Article:</h2>${fillInnerHTML(articles[0])}`;
  articlesListEl.appendChild(firstArticleEl);
  if (articles.length > 2) {
    for (let i = 1; i < articles.length - 1; i++) {
      const otherArticleEl = document.createElement('li');
      otherArticleEl.innerHTML = fillInnerHTML(articles[i]);
      articlesListEl.appendChild(otherArticleEl);
    }
  }
  const lastArticleEl = document.createElement('li');
  if (articles.length === 1) return;
  else {
    lastArticleEl.innerHTML = `<h2>Last Article:</h2>${fillInnerHTML(articles[articles.length - 1])}`;
    articlesListEl.appendChild(lastArticleEl);
  }
}

function fillInnerHTML(article) {
  return `
    <h3>${article.title}</h3>
    ${article.extract_html}
    <img src="${article.originalimage.source}" alt="${article.title}" width="500px">
  `;
}

// bonus
function representArticleAtIndex(i) {
  indexArticleEl.innerHTML = `<h2>Article at index ${i}:</h2>`;
  indexArticleEl.innerHTML += fillInnerHTML(articles[i], i);
}
btnEl.addEventListener('click', () => {
  const index = Number(inputEl.value);
  if (isNaN(index)) return alert(`That's not a number`);
  else if (index > articles.length - 1) alert('There is no article under this number');
  else representArticleAtIndex(index);
  document.querySelector('.input-field').value = '';
});