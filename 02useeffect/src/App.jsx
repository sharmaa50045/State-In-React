import { useState, useEffect } from 'react';

const App = () => {
  const stories = [
    {
      title: "React Basics",
      url: "https://react.dev",
      author: "Jordan Walker",
      num_comments: 3,
      points: 5,
      objectID: 0,
    },
    {
      title: "Learn Redux",
      url: "https://redux.js.org",
      author: "Dan Abramov",
      num_comments: 5,
      points: 10,
      objectID: 1,
    },
    {
      title: "Core JavaScript",
      url: "https://javascript.org",
      author: "Mr. Javs",
      num_comments: 5,
      points: 10,
      objectID: 2,
    },
  ];

  // Step 1: Initialize state from localStorage (with fallback) //
  const [searchTerm, setSearchTerm] = useState(
    localStorage.getItem("search") || "React"
  );

  // Step 2: Synchronize localStorage with React state //
  useEffect(() => {
    localStorage.setItem("search", searchTerm);
  }, [searchTerm]);

  // Step 3: Update state on input change //
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  //  Step 4: Filter the stories //
  const searchedStories = stories.filter((story) =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>My Hacker Stories</h1>
      <Search search={searchTerm} onSearch={handleSearch} />
      <hr />
      <List list={searchedStories} />
    </div>
  );
};

const Search = ({ search, onSearch }) => (
  <div>
    <label htmlFor="search">Search: </label>
    <input id="search" type="text" value={search} onChange={onSearch} />
  </div>
);


const List = ({ list }) => (
  <ul>
    {list.map((item) => (
      <Item key={item.objectID} item={item} />
    ))}
  </ul>
);


const Item = ({ item }) => (
  <li>
    <a href={item.url}>{item.title}</a> — {item.author}
  </li>
);

export default App;
