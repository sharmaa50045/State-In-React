import React, { useState, useEffect } from "react";

const initialStories = [
  {
    title: "React",
    url: "https://react.dev",
    author: "Jordan Walke",
    num_comments: 3,
    points: 4,
    objectID: 1,
  },
  {
    title: "React JSX",
    url: "https://jsx.dev",
    author: "MS Dhoni",
    num_comments: 2,
    points: 5,
    objectID: 2,
  },
  {
    title: "Redux",
    url: "https://redux.org",
    author: "Mickey Mouse",
    num_comments: 0,
    points: 6,
    objectID: 3,
  },
];

const getAsyncStories = () =>
  new Promise((resolve) =>
    setTimeout(() => resolve({ data: { stories: initialStories } }), 2000)
  );

const App = () => {
  const [stories, setStories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getAsyncStories().then((result) => {
      setStories(result.data.stories);
    });
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const searchedStories = stories.filter((story) =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ fontFamily: "Arial", padding: 20 }}>
      <h1>My Hacker Stories</h1>

      <label htmlFor="search">Search:</label>
      <input
        id="search"
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Type to search..."
      />

      <hr />

      {stories.length === 0 ? (
        <p>Loading stories...</p>
      ) : (
        <List list={searchedStories} />
      )}
    </div>
  );
};

const List = ({ list }) => (
  <ul>
    {list.map((item) => (
      <Item key={item.objectID} item={item} />
    ))}
  </ul>
);

const Item = ({ item }) => {
  return (
    <li>
      <a href={item.url}>{item.title} </a>- <span>  {item.objectID} </span> | <span>  {item.num_comments} </span> |<span> {item.points}  </span>|<span>  {item.author} </span>
    </li>
  );
};

export default App;
