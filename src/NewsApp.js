import React, { useEffect, useRef, useState } from "react";
import News from "./News";
import './NewsApp.css';

function NewsApp() {
    const apiKey = "027a976ed7bb49ae84197d627d1f32dd";
    // const apiKey = process.env.API_KEY;
    
    const [newsList, setNewsList] = useState([]);
    const [query, setQuery] = useState('tesla');

    const apiUrl = `https://newsapi.org/v2/everything?q=${query}&from=2023-05-20&sortBy=publishedAt&apiKey=${apiKey}`;
    
    const queryInputRef = useRef(null);

    useEffect(() => {
        fetchData();
    }, [query]);

    async function fetchData() {
        try {
            const response = await fetch(apiUrl);
            const jsonData = await response.json();

            setNewsList(jsonData.articles);
        } catch (e) {
            console.log(e, "error occured");
        }
    }

    function handleSubmit(event) {
        event.preventDefault();
        const queryValue = queryInputRef.current.value;
        setQuery(queryValue);
    }

    function oncatselect(value) {
        const queryValue = value;
        setQuery(queryValue);
    }

    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let currentDate = `${day}-${month}-${year}`;
    return (
        <div className="news-app">
            <div className="first-box">
                <ul className="first-ul">
                    <li>INDIA</li>
                    <li className="currentdate">{currentDate}</li>
                </ul>
                <hr />
            </div>
            <header className="header">
                <a href="#">
                    <img className="logo" src="https://www.pngall.com/wp-content/uploads/8/Internet-PNG-Image-File.png" alt="iconfornews" />
                </a>
                <h1 style={{ fontSize: '2.5rem', textAlign: 'left', marginBottom: '20px'}}>Infinite News</h1>
            </header>
            <form onSubmit={handleSubmit}>
                <input className="query-input" type="text" placeholder="e.g. India" ref={queryInputRef}/>
                <input className="btn-submit" onClick={handleSubmit} type="submit" value="Search" />
            </form>
            <div className="categories-container">
                <ul className="categories">
                    {/* <li><h2>IN</h2></li> */}
                    <li className="clickme" onClick={() => oncatselect('india')} id="india">India</li>
                    <li className="clickme" onClick={() => oncatselect('politics')} id="politics">Politics</li>
                    <li className="clickme" onClick={() => oncatselect('finance')} id="finance">Finance</li>
                    <li className="clickme" onClick={() => oncatselect('tech')} id="tech">Tech</li>
                    <li className="clickme" onClick={() => oncatselect('entertainment')} id="entertainment">Entertainment</li>
                    <li className="clickme" onClick={() => oncatselect('delhi')} id="delhi">Delhi</li>
                    <li className="clickme" onClick={() => oncatselect('bangalore')} id="bangalore">Bangalore</li>
                    <li className="clickme" onClick={() => oncatselect('america')} id="america">America</li>
                    <li className="clickme" onClick={() => oncatselect('sports')} id="sports">Sports</li>
                    <li className="clickme" onClick={() => oncatselect('cricket')} id="cricket">Cricket</li>
                </ul>
            </div>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 48%)",
                    justifyContent: "space-between",
                    rowGap: "20px",
                }}
            >
                {newsList?.map((news) => {
                    return <News key={news.url} news={news} />;
                })}
            </div>
        </div>
    );
}

export default NewsApp;
