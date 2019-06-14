const RANDOM_ARTICLE_URL = 'https://en.wikipedia.org/wiki/Special:Random';
const getRandomArticleButton = document.getElementById('getRandomArticle');

getRandomArticleButton.addEventListener('click', getRandomArticle);

function getRandomArticle() {
  chrome.tabs.create({ url: RANDOM_ARTICLE_URL });
}
