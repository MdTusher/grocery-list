import { useEffect, useState } from "react";
import List from "./List";
import Alert from "./Alert";

const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return JSON.parse(localStorage.getItem("list"));
  } else {
    return [];
  }
};
export default function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [editId, setEditId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [alert, setAlert] = useState({
    show: false,
    type: "",
    msg: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      showAlert(true, "danger", "Enter value");
    } else if (name && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editId) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setName("");
      setEditId(null);
      setIsEditing(false);
      showAlert(true, "success", "value changed");
    } else {
      showAlert(true, "success", "new item added");
      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem]);
      setName("");
    }
  };
  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };
  const clearList = () => {
    showAlert(true, "danger", "list empty");
    setList([]);
  };
  const removeItem = (id) => {
    showAlert(true, "danger", "item removed");
    setList(list.filter((item) => item.id !== id));
  };
  const editItem = (id) => {
    const selectedItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditId(id);
    setName(selectedItem.title);
  };
  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  return (
    <section className="w-3/4 h-svh pt-6 mx-auto shadow-md flex items-center gap-6 flex-col">
      <form onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
        <h3 className="text-center  py-4 capitalize font-bold text-xl">
          grocery list
        </h3>
        <div className="flex items-center gap-2 lg:gap-8">
          <input
            className="shadow-md outline-none p-2 rounded-lg"
            type="text"
            placeholder="enter items"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button
            className="shadow-md py-2 px-4 capitalize rounded-lg"
            type="submit"
          >
            {isEditing ? "edit" : "submit"}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className="w-full px-8 flex flex-col gap-4">
          <List items={list} removeItem={removeItem} editItem={editItem} />
          <button
            className="shadow-md px-4 tracking-widest py-2 capitalize bg-slate-100 rounded-lg font-bold"
            onClick={clearList}
          >
            {" "}
            clear
          </button>
        </div>
      )}
    </section>
  );
}
