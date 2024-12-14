import React, { useEffect, useState } from 'react'
import Weather from './weather'
import Calendar from './calendar'
import './News.css'
import userLog from '../assets/images/userLog.jpg'
import noimg from '../assets/images/noimg.jpg'
import axios from 'axios'

const categories = ['general', 'world', 'business', 'technology',
    'entertainment', 'sports', 'science', 'health', 'nation'
]
const News = () => {
    const [headline, setHeadline] = useState(null)
    const [news, setNews] = useState([])
    const[selectedCategory,setSelectedCategory]=useState('general')
    useEffect(() => {
        const fetchNews = async () => {
            const url = `https://gnews.io/api/v4/top-headlines?category=&{selectedCategory}&lang=en&apikey=de9231c0b5f59b9a97adf9f7bee346ce`
            const response = await axios.get(url)
            const fetchedNews = response.data.articles

            fetchedNews.forEach(articles => {
                if (!articles) {
                    noimg
                }
            });


            setHeadline(fetchedNews[0])
            setNews(fetchedNews.slice(1, 7))
            console.log(fetchedNews[0])
        }
        fetchNews()
    }, [selectedCategory])

    const handleCategory=(e,category)=>{
        e.preventDefault()
        setSelectedCategory(category)
    }



    return (
        <div className="news">
            <header className="news-header">
                <h1 className="logo">News & Blogs</h1>
                <div className="search-bar">
                    <form>
                        <input type="text" placeholder='Search News...' />
                        <button type='submit'>
                            <i className='fa-solid fa-magnifying-glass'></i>
                        </button>
                    </form>
                </div>
            </header>
            <div className="news-content">
                <div className="navbar">
                    <div className="user">
                        <img src={userLog} alt="user Image" />
                        <p>Mungai's Blog</p>
                    </div>
                    <nav className='categories'>
                        <h1 className='nav-heading'>Categories</h1>
                        
                        <div className="nav-links">
                        {categories.map((category)=>(
                            <a key= {category} href="#" className='nav-link' onClick={(e)=>handleCategory(e,category)}>{category}</a>
                        ))}
                            
                            <a href="#" className='nav-link'>Bookmarks
                                <i className="fa-regular fa-bookmark"></i>
                            </a>

                        </div>
                    </nav>
                </div>
                <div className="news-section">
                    {headline && (<div className="headline">
                        <img src={headline.image || noimg} alt={headline.title} />
                        <h2 className="headline-title">
                            {headline.title}
                            <i className="fa-regular fa-bookmark bookmark"></i>
                        </h2>
                    </div>)}

                    <div className="news-grid">
                        {news.map((article, index) => (
                            <div key={index} className="news-grid-item">
                                <img src={article.image || noimg} alt={article.title} />
                                <h2>{article.title}
                                    <i className="fa-regular fa-bookmark bookmark"></i>
                                </h2>
                            </div>

                        ))}





                    </div>
                </div>
                <div className="my-blogs">My Blogs</div>
                <div className="weather-calendar">
                    <Weather />
                    <Calendar />
                </div>

            </div>
            <footer className="news-footer">Footer</footer>
        </div>


    )
}
export default News