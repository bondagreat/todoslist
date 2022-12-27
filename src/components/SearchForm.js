import { useState } from "react";

export default function SearchForm(props) {
  const [value, setValue] = useState('');

  return (
    <div className="input-group">
      <input
        type="text"
        className="form-control"
        value={value}
        onChange={(e) => {setValue(e.target.value);

          const delay = () => new Promise((resolve, reject) => {
              setTimeout(() => {
                resolve(props.setSearchInput(e.target.value));
              }, 2000)
            });
            const timeout = async () => {
              await delay()
            };
            timeout();
        }}
        placeholder="Search"
        />
      <button
        className="btn btn-warning"
        onClick={() => {
          props.setSearchInput("");
          props.setFilterFalse(false);
          props.setFilterTrue(false);
        }}
      >
        <i className="fa-solid fa-xmark" />
      </button>
      <div className="input-group">
        <button className="btn btn-primary" onClick={() => {
          if (props.filterTrue == false) props.setFilterFalse(false);
          else if (props.filterFalse == false) props.setFilterTrue(false);
        }}>
          <i className="fa-solid fa-eye" />
        </button>
        <button className="btn btn-success" onClick={() => {
          props.setFilterTrue(!props.filterTrue)
          if (props.filterFalse == true) props.setFilterFalse(!props.filterFalse)
        }}>
          <i className="fa-solid fa-check" />
        </button>
        <button className="btn btn-danger" onClick={() => {
          props.setFilterFalse(!props.filterFalse)
          if (props.filterTrue == true) props.setFilterTrue(!props.filterTrue)
        }}>
          <i className="fa-solid fa-xmark" />
        </button>
      </div>
    </div>
  );
}
