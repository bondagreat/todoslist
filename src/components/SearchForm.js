import { useState } from "react";

export default function SearchForm(props) {

  return (
    <div className="input-group">
      <input type="text" className="form-control" onChange={e => props.setSearchInput(e.target.value.toLowerCase())} />
      <button className="btn btn-warning">
        <i className="fa-solid fa-xmark" />
      </button>
    </div>
  )
}