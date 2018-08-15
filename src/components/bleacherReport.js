import React, { Component } from 'react'
import { getNewsArticles } from '../api/server'
import Loader from './shared/loader'

function SelectNewsArticle({selectedNews, onSelect, showMenu}) {
  const newsSource = [
    {name: 'Bleacher Report', title: 'bleacher-report'},
    {name: 'ABC', title: 'abc-news-au'},
    {name: 'IGN', title: 'IGN'},
    {name: 'National Geographic', title: 'national-geographic'},
    {name: 'ESPN', title: 'espn'},
    {name: 'The Guardian', title: 'the-guardian-au'},
    {name: 'Wired', title: 'wired'},
    {name: 'BBC News', title: 'bbc-news'},
    {name: 'Fortune', title: 'fortune'},
    {name: 'Hacker News', title: 'hacker-news'},
    {name: 'New Scientist', title: 'new-scientist'},
    {name: 'NFL', title: 'nfl'},
    {name: 'Business Insider', title: 'business-insider'},
    {name: 'The New York Times', title: 'the-new-york-times'},
    {name: 'Vice News', title: 'vice-news'},
    ];
  return (
    <div
      className={showMenu ? 'menu--open' : 'menu--closed'}
    >
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
    </div>
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
    showWebsites: false
  };

  componentDidMount = async() => {
    let bleacherArticles = await getNewsArticles('bleacher-report');
    const { articles } = bleacherArticles;
    this.setState(() => ({ articles, loading: false}));
  };

  changeClass = () => {
    this.setState(() => ({ showWebsites: !this.state.showWebsites}))
  }

  updateLanguage = async (news) => {
    this.setState(() => ({ selectedNews: news, loading: true, articles: null, showWebsites: !this.state.showWebsites }));
    const updatedArticle = await getNewsArticles(news.title);
    const { articles } = updatedArticle;
    this.setState(() => ({ articles, loading: false }));
  };

  render() {
    const { articles, selectedNews, loading } = this.state;
    return (
      <div className="bleacherReport">
        <div className="headline">Top Stories at {selectedNews.name}</div>
        <div onClick={this.changeClass}>
          <div className="hamburger__menu">
          </div>
          <div className="hamburger__menu">
          </div>
          <div className="hamburger__menu">
        </div>
        </div>
        <SelectNewsArticle
          selectedNews={selectedNews.title}
          onSelect={this.updateLanguage}
          showMenu={this.state.showWebsites}
        />
        {loading &&
          <Loader />
        }
        <div className="card card__grid">
        { articles &&
          articles.map((val, i) => {
            return (
              <div key={i}>
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