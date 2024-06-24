const List = ({ items, removeItem, editItem }) => {
  return (
    <div className="">
      {items.map((item) => {
        const { id, title } = item;
        return (
          <article
            className="odd:bg-green-200 even:bg-blue-200 p-2 flex justify-between gap-2 "
            key={id}
          >
            <p>{title}</p>
            <div className=" space-x-3">
              <button
                onClick={() => editItem(id)}
                className="shadow-sm capitalize"
                type="button"
              >
                edit
              </button>
              <button
                onClick={() => removeItem(id)}
                className="shadow-sm capitalize"
                type="button"
              >
                delete
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default List;
