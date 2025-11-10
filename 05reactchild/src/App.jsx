import { useState } from "react";

const App = () => {
  const stories = [
    { objectID: 0, title: "React Basics", author: "Jordan Walke" },
    { objectID: 1, title: "Learn Redux", author: "Dan Abramov" },
    { objectID: 2, title: "Advanced JS", author: "Brendan Eich" },
  ];

  const [searchTerm, setSearchTerm] = useState("React");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const searchedStories = stories.filter((story) =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <h1>My Hacker Stories</h1>

      {/* Corrected component usage */}
      <InputWithLabel
        id="search"
        value={searchTerm}
        onInputChange={handleSearch}
      >
        Search:
      </InputWithLabel>

      <hr />

      <List list={searchedStories} />
    </div>
  );
};

const InputWithLabel = ({ id, value, type = "text", onInputChange, children }) => (
  <div style={{ marginBottom: "10px" }}>
    <label htmlFor={id}>{children}</label>
    &nbsp;
    <input id={id} type={type} value={value} onChange={onInputChange} />
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
    <a href={item.objectID}>{item.title}</a> -{item.author}
  </li>
);

export default App;
