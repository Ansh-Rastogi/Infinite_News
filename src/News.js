import React from 'react'
import './News.css'

function News({news}) {
  const date = new Date(news.publishedAt).toLocaleString("en-US", {
    timeZone: 'Asia/Jakarta'
  })
  const newsSource = `${news.source.name} - ${date}`;
  return (
    <div className='news-card'>
        <img src={news.urlToImage} alt={news.title} />
        <h2>{news.title}</h2>
        <h6 className='news-source'>{newsSource}</h6>
        <p>{news.description}</p>
        <button className='btn-read-more' onClick={() => window.open(news.url)}>Read More</button>
    </div>
  )
}

export default News