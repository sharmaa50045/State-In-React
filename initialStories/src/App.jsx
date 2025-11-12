import { useState } from "react";

const initialStories = [
  {
    title: "React",
    url: "https://react.dev",
    author: "Jordean Walke",
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: "Redux",
    url: "https://redux.jsx.dev",
    author: "Jordean Walke",
    num_comments: 2,
    points: 5,
    objectID: 1,
  },
  {
    title: "Learn Javascript",
    url: "https://learnjavascript.org",
    author: "Jordean Walke",
    num_comments: 3,
    points: 4,
    objectID: 2,
  },
];

const App = () => {
  const [stories, setStories] = useState(initialStories);
  const [searchTerm, setSearchTerm] = useState("React");

  const handleSearch = (event) => setSearchTerm(event.target.value);

  const handleRemoveStory = (item) => {
    const newStories = stories.filter((story) => story.objectID !== item.objectID);
    setStories(newStories);
  };

  const searchedStories = stories.filter((story) =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ fontFamily: "Arial", padding: 100, fontSize: 20, color: "white", backgroundColor: "black" }}>
      <h1>My Hacker Stories</h1>

      <label htmlFor="search">Search: </label>
      <input
        type="text"
        id="search"
        value={searchTerm}
        onChange={handleSearch}
        style={{ marginLeft: 8 }}
      />

      <hr />

      <List list={searchedStories} onRemoveItem={handleRemoveStory} />
    </div>
  );
};

const List = ({ list, onRemoveItem }) => (
  <ul>
    {list.map((item) => (
      <Item key={item.objectID} item={item} onRemoveItem={onRemoveItem} />
    ))}
  </ul>
);

const Item = ({ item, onRemoveItem }) => (
  <li style={{ marginBottom: 8 }}>
    <span>
      <a href={item.url} >
        {item.title}
      </a>
    </span>{" "}
    | <span>{item.author}</span> | <span>{item.num_comments}</span> |{" "}
    <span>{item.points}</span>{" "} |
    <button
      type="button"
      onClick={() => onRemoveItem(item)}
      style={{ marginLeft: 8 }}
    >
      Dismiss
    </button>
  </li>
);

export default App;
