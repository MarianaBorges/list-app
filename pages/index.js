import React, { useState, useEffect } from "react";
import { api } from '../services/api';

import styles from '../styles/Home.module.css';

export default function Home() {

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [feed, setFeed] = useState([]);
  const [blogs, setBlogs] = useState([]);

  async function loadingData(){
    try {
      setIsLoaded(true);
      const response = await api.get("/api.json?rss_url=https://medium.com/feed/@nutanbhogendrasharma/");
      setBlogs(response.data.items);
      setFeed(response.data.feed);
    } catch (error) {
      setError(error);
    }finally{
      setIsLoaded(false);
    }
  }

  useEffect(() => {
    loadingData();
  },[])

  if (error){
    return <div>Error: {error.message}</div>
  } else if(isLoaded){
    return <div>Loading...</div>
  } else {
    return (
      <div className={styles.container}>
        <h1>
          {feed.title}
        </h1>

        {blogs.map(item => (
          <div className={styles.main}>
            <div>
              <img 
                src={item.thumbnail} 
                width='150px' 
                height='150px'
              />
            </div>

            <div>
              <a href={item.link} target="_blank">{item.title}</a>
            </div>
          </div>
        ))}
      </div>
    )
  }
}
