import { useState } from "react"
import ListItem from "./components/ListItem";
import ClearListButton from "./components/ClearListButton";
import NewItemButton from "./components/NewItemButton";

function App() {

  //localStorage.setItem("listItems", JSON.stringify([1,2,3]));
  //const info = JSON.parse(localStorage.getItem("listItems"));


  const [listItems, setListItems] = useState(
    JSON.parse(localStorage.getItem("listItems")) || []
  )

  const handleItemChecked = (e) => {
    const newList = listItems.map((item) => {
      if (e.target.name === item.id) {
        item.checked = !item.checked;
      }
      return item;
    })
    localStorage.setItem("listItems", JSON.stringify(newList));
    setListItems(newList);
  }

  return (
    <div className="container text-center mt-2">
      <div className="row">
        <div className="col text-start">
          <h1>Shopping List</h1>
        </div>
        <div className="col text-end mt-1">
          <ClearListButton setListItems={setListItems} />
          <NewItemButton listItems={listItems} setListItems={setListItems} />
        </div>
      </div>
      <hr />
      {
        listItems.length === 0 && (
          <div>
            <h3>Your list is empty</h3>
            Please add new item to start.
          </div>
        )
      }
      {
        listItems.map((item) => (
          <ListItem
            item={item}
            handleItemChecked={handleItemChecked}
            listItems={listItems}
            setListItems={setListItems}
          />
        ))
      }

      <hr />

      <div className="col text-end">
        <ClearListButton setListItems={setListItems} />
        <NewItemButton />
      </div>

    </div>
  )
}

export default App