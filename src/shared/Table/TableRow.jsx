import React from "react";
import moment from 'moment';
import Brightness1Icon from '@mui/icons-material/Brightness1';

const TableRow = ({ index, data, fields, style }) => {
  /* Recursion render */
  // const renderRow = (columns, value, renderChild) => {
  //   return columns?.map((item, index) =>
  //     item.items ? (
  //       <div key={`${data.id}-${item.name}-${index}`}>
  //         {renderRow(item.items, value[item.column], true)}
  //       </div>
  //     ) : (
  //       <div key={`${data.id}-${item.name}`}>
  //         {renderChild
  //           ? `${item.name}: ${value?.[item.column] || 0} ${item.suffix}`
  //           : value?.[item.column]}
  //       </div>
  //     )
  //   );
  // };
  const setStatusColor = (status) => {
    return {
      online: 'success',
      offline: 'error',
      idle: 'warning',
    }[status]
  };

  return (
    <div key={data.id} className="table__row" style={style}>
      {/* {renderRow(fields, data, false)} */}
      <div>{data.serverName}</div>
      <div>{data.location}</div>
      <div>{data.ipv4}</div>
      <div>{Math.floor(data.uptime / 60 / 60 / 24)}</div>
      <div className="table__row--status">
        {data?.status}
        { data?.status && <Brightness1Icon fontSize="1" color={setStatusColor(data?.status)}/>}
      </div>
      <div>
        <ul className="table__row--list">
          <li>CPU: {data.stats?.cpu || 0}%</li>
          <li>RAM: {data.stats?.ram || 0}%</li>
          <li>Disk: {data.stats?.disk || 0}%</li>
        </ul>
      </div>
      <div>{moment(data.created).format('DD/MM/YYYY')}</div>
    </div>
  );
};

export default TableRow;
