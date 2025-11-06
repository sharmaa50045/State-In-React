import { useState, useEffect } from "react";
const useStorageState = (key, initialState) => {
  const [value, setValue] = useState(
    () => localStorage.getItem(key) || initialState
  );

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [key, value]);

  return [value, setValue];
};

const App = () => {
  const [searchTerm, setSearchTerm] = useStorageState("search", "React");

  const stories = [
    { id: 0, title: "React Basics", author: "Jordan Walke" },
    { id: 1, title: "Learn Redux", author: "Dan Abramov" },
    { id: 2, title: "Advanced JavaScript", author: "Brendan Eich" },
  ];

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const searchedStories = stories.filter((story) =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>My Hacker Stories</h1>

      <InputWithLabel
        id="search"
        label="Search:"
        value={searchTerm}
        onInputChange={handleSearch}
      />

      <hr />

      <List list={searchedStories} />
    </div>
  );
};

const InputWithLabel = ({
  id,
  label,
  value,
  type = "text",
  onInputChange
}) =>

(
  <div>
    <label htmlFor={id}>{label}</label>
    &nbsp;
    <input
      id={id}
      type={type}
      value={value}
      onChange={onInputChange}
    />
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
    <a href={item.url}>{item.title}</a> - {item.author}
  </li>
);

export default App;
