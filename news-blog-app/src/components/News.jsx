import React, { useEffect, useState } from 'react'
import Weather from './weather'
import Calendar from './calendar'
import './News.css'
import userLog from '../assets/images/userLog.jpg'
import noimg from '../assets/images/noimg.jpg'
import axios from 'axios'
import NewsModal from './NewsModal'
import Bookmarks from './Bookmarks'


const categories = ['general', 'world', 'business', 'technology',
    'entertainment', 'sports', 'science', 'health', 'nation'
]
const News = () => {

    const [headline, setHeadline] = useState(null)
    const [news, setNews] = useState([])
    const [selectedCategory, setSelectedCategory] = useState('general')
    const [searchInput, setSearchInput] = useState('')
    const [searchQuery, setSearchQuery] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [selectedArticle, setSelectedArticle] = useState(null)
    const [bookmarks, setBookmarks] = useState([])
    const [showBookmarksModal, setShowBookmarksModal] = useState(false)
    useEffect(() => {
        const fetchNews = async () => {
            let url = `https://gnews.io/api/v4/top-headlines?category=${selectedCategory}&lang=en&apikey=de9231c0b5f59b9a97adf9f7bee346ce`
            if (searchQuery) {
                url = `https://gnews.io/api/v4/search?q=${searchQuery}&lang=en&apikey=de9231c0b5f59b9a97adf9f7bee346ce`

            }

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
    }, [selectedCategory, searchQuery])

    const handleCategory = (e, category) => {
        e.preventDefault()
        setSelectedCategory(category)
    }

    const handleSearch = (e) => {
        e.preventDefault()
        setSearchQuery(searchInput)
        setSearchInput('')
    }

    const handleArticleClick = (article) => {
        setSelectedArticle(article)
        setShowModal(true)
        console.log(article)
    }
    const handleBookmarkClick = (article) => {
        setBookmarks((prevBookmarks) => {
            const updatedBookmarks = prevBookmarks.find((bookmark) => bookmark.title === article.title) ?
                prevBookmarks.filter((bookmark) => bookmark.title !== article.title) : [...prevBookmarks, article]
            return updatedBookmarks
        })
    }

    return (
        <div className="news">
            <header className="news-header">
                <h1 className="logo">News & Blogs</h1>
                <div className="search-bar">
                    <form onSubmit={handleSearch}>
                        <input type="text" placeholder='Search News.' value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
                        <button type='submit'>
                            <i className='fa-solid fa-magnifying-glass'></i>
                        </button>
                    </form>..
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
                            {categories.map((category) => (
                                <a key={category} href="#" className='nav-link' onClick={(e) => handleCategory(e, category)}>{category}</a>
                            ))}

                            <a href="#" className='nav-link' onClick={()=>setShowBookmarksModal(true)}>Bookmarks
                                <i className="fa-solid fa-bookmark"></i>
                            </a>

                        </div>
                    </nav>
                </div>
                <div className="news-section">
                    {headline && (<div className="headline" onClick={() => handleArticleClick(headline)}>
                        <img src={headline.image || noimg} alt={headline.title} />
                        <h2 className="headline-title">
                            {headline.title}
                            <i className={`${bookmarks.some((bookmark) => bookmark.title === headline.title) ?
                                'fa-solid' : 'fa-regular'} 
                            fa-bookmark bookmark`}
                                onClick={(e) => {
                                    e.stopPropagation() 
                                    handleBookmarkClick(headline)
                                }}></i>
                        </h2>
                    </div>)}

                    <div className="news-grid">
                        {news.map((article, index) => (
                            <div key={index} className="news-grid-item" onClick={() => handleArticleClick(article)}>
                                <img src={article.image || noimg} alt={article.title} />
                                <h2>{article.title}
                                    <i className={`${bookmarks.some((bookmark) => bookmark.title === article.title) ?
                                        'fa-solid' : 'fa-regular'} 
                                    fa-bookmark bookmark`}
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            handleBookmarkClick(article)
                                        }}></i>
                                </h2>
                            </div>

                        ))}
                    </div>
                </div>

                <NewsModal show={showModal}
                    article={selectedArticle}
                    onClose={() => setShowModal(false)} />

                <Bookmarks show={showBookmarksModal}
                    bookmarks={bookmarks}
                    onClose={() => setShowBookmarksModal(false)}
                    onSelectArticle={handleArticleClick}
                    onDeleteBookmark={handleBookmarkClick} />

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