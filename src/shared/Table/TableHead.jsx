import React from "react";
import HeaderActions from "./components/HeaderActions";

const TableHead = ({ style, headFields }) => {

  return (
    <div className="table__head" style={style}>
      {headFields.map((i, index) => (
      <div key={index}>
        {i.name}
        {i.features && (
          <div className="table__head--actions">
            <HeaderActions actions={i.features && i} />
          </div>
        )}
      </div>
    ))}
    </div>
  );
};

export default TableHead;
