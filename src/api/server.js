export const getNewsArticles = async(newspaper) => {
  let articles = await fetch(`${process.env.REACT_APP_NEWS_SITE}${newspaper}&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`)
  return articles.json();
};