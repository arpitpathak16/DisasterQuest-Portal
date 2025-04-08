import React, { useState, useEffect } from "react";

const DisasterNews = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          `https://newsapi.org/v2/everything?q=earthquake OR hurricane OR flood OR wildfire&apiKey=Your Key`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch news");
        }
        const data = await response.json();
        setNews(data.articles);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) return <p>Loading news...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Disaster News</h1>
      <ul className="space-y-4">
        {news.map((article, index) => (
          <li key={index} className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold">{article.title}</h2>
            <p className="text-sm text-muted-foreground">
              {article.description}
            </p>
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline">
              Read more
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DisasterNews;
