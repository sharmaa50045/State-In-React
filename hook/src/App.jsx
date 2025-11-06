import { useState, useEffect } from "react";

// ✅ Custom Hook - useStorageState
function useStorageState(key, initialState) {
  const [value, setValue] = useState(() => {
    return localStorage.getItem(key) || initialState;
  });

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [key, value]);

  return [value, setValue];
}

// ✅ App Component
function App() {
  const stories = [
    { id: 0, title: "React Basics", author: "Jordan Walke" },
    { id: 1, title: "Learn Redux", author: "Dan Abramov" },
    { id: 2, title: "Advanced JavaScript", author: "Brendan Eich" },
  ];

  // Using our custom hook
  const [searchTerm, setSearchTerm] = useStorageState("search", "React");

  // Handler for input
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

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
}

// ✅ Search Component
const Search = ({ search, onSearch }) => (
  <div>
    <label htmlFor="search">Search: </label>
    <input id="search" type="text" value={search} onChange={onSearch} />
  </div>
);

// ✅ List Component
const List = ({ list }) => (
  <ul>
    {list.map((item) => (
      <Item key={item.id} item={item} />
    ))}
  </ul>
);

// ✅ Item Component
const Item = ({ item }) => (
  <li>
    <span>{item.title}</span> <br />
    <small>by {item.author}</small>
  </li>
);

export default App;
