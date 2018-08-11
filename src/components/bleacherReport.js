import React, { Component } from 'react'
import { getNewsArticles } from '../api/server'
import Button from '@material-ui/core/Button';
import Loader from './shared/loader'

function SelectNewsArticle({selectedNews, onSelect}) {
  const newsSource = [
    {name: 'Bleacher Report', title: 'bleacher-report'},
    {name: 'National Geographic', title: 'national-geographic'},
    {name: 'ESPN', title: 'espn'},
    {name: 'The Guardian', title: 'the-guardian-au'},
    {name: 'Wired', title: 'wired'},
    {name: 'BBC News', title: 'bbc-news'}
    ];
  return (
    <ul className="newsSource">
      {newsSource.map((news) => (
        <li
          style={news.title === selectedNews ? { color: '#d0021b' } : null }
          key={news.title}
          onClick={() => onSelect(news)}
        >
          {news.name}
        </li>
      ))}
    </ul>
  )
};

class BleacherReport extends Component {
  state = {
    selectedNews: {
      name:  'Bleacher Report',
      title: 'bleacher-report',
    },
    articles: null,
    loading: true,
  };

  componentDidMount = async() => {
    let bleacherArticles = await getNewsArticles('bleacher-report');
    const { articles } = bleacherArticles;
    this.setState(() => ({ articles, loading: false}));
  };

  updateLanguage = async (news) => {
    this.setState(() => ({ selectedNews: news, loading: true, articles: null }));
    const updatedArticle = await getNewsArticles(news.title);
    const { articles } = updatedArticle;
    this.setState(() => ({ articles, loading: false }));
  };

  render() {
    const { articles, selectedNews, loading } = this.state;
    return (
      <div className="bleacherReport">
        <SelectNewsArticle
          selectedNews={selectedNews.title}
          onSelect={this.updateLanguage}
        />
        {loading &&
          <Loader />
        }
        <div className="card card__grid">
        { articles &&
          articles.map((val, i) => {
            return (
              <div key={i}>
                {/*<SimpleMediaCard article={val} />*/}
                <div className="card card__container">
                  <a
                    href={val.url}
                    target="_blank"
                  >
                    <img
                      src={val.urlToImage}
                      className="card card__image"
                    />
                  </a>
                  <div className="card card__content">
                    <h3
                      className="card card__title"
                    >
                      {val.title}
                    </h3>
                    <p>{val.description}</p>
                    <p>{val.author}</p>
                  </div>
                </div>
              </div>
            )
          })
        }
        </div>
      </div>
    )
  }
}

export default BleacherReport;