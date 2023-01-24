import React from 'react';
import TableHeadFilter from "../TableHeadFilter";
import TableHeadSort from "../TableHeadSort";

const HeaderActions = ({actions}) => {
    return actions?.features?.map(
      (action, index) =>
        ({
          sort: <TableHeadSort key={index} action={actions.sortActions} column={actions.column} />,
          filter: <TableHeadFilter key={index} action={actions.filterAction} type="filter"/>,
          search: <TableHeadFilter key={index} action={actions.filterAction} type="search" />,
          range: <TableHeadFilter key={index} action={actions.filterAction} type="range" />
        }[action])
    );

    // return actions.features.map((action, index) => {
    //     switch (action) {
    //         case 'sort':
    //             return <TableHeadSort key={index} action={actions.sortActions} />
    //         case 'filter':
    //             return <TableHeadFilter key={index} action={actions.filterAction} type="filter"/>
    //         case 'range':
    //             return <TableHeadFilter key={index} action={actions.filterAction} type="range" />
    //         case 'search':
    //             return <TableHeadFilter key={index} action={actions.filterAction} type="search" />
    //         default:
    //             return <></>
    //     }
    // })
  };

export default HeaderActions;
