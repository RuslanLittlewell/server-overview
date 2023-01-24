import React from "react";
import Skeleton from "@mui/material/Skeleton";
import TroubleshootIcon from '@mui/icons-material/Troubleshoot';
import TableHead from "./TableHead";
import TableRow from "./TableRow";

import "./style.scss";

const Table = ({ config, data, loader }) => {
  const columnsCount = { gridTemplateColumns: `repeat(${config.length}, 1fr)` };
  
  return (
    <div className="table">
      <TableHead headFields={config} style={columnsCount} />
      <div className="table__body">
        {loader && (
          <div className="table__body--sceleton">
            {[...Array(15)].map((_, idx) => (
              <Skeleton key={idx} height={50} />
            ))}
          </div>
        )}
        {!loader &&
          data?.map((item) => (
            <TableRow
              key={item.serverId}
              index={item.id}
              data={item}
              fields={config}
              style={columnsCount}
            />
          ))}
        {((!loader && data?.length === 0) || !data) && (
          <div className="table__body--no-data">
            <TroubleshootIcon />
            No data
            </div>
        )}
      </div>
    </div>
  );
};

export default Table;
