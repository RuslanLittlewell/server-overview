import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getSearchParam } from '@utils/urlParams';

import TextField from "@mui/material/TextField";
import Slider from "@mui/material/Slider";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import Input from "@mui/material/Input";
import FilterListIcon from "@mui/icons-material/FilterList";

import "./style.scss";

const TableHeadFilter = ({ 
    action,
    type,
    tableData,
    filterParams
  }) => {
  const location = useLocation();
  const [activeActions, setActiveActions] = useState({
    filter: false,
    search: false,
    range: false,
  });
  const [filterValue, setFilterValue] = useState({});
  useEffect(() => {
    const urlParams = location.search;
    const params = getSearchParam(urlParams);
    setFilterValue(params)
  }, []);

  const { filter, search, range } = activeActions;
  const activeFilter = () => {
    switch (type) {
      case "filter":
        setActiveActions((s) => ({ ...s, filter: !filter }));
        break;
      case "search":
        setActiveActions((s) => ({ ...s, search: !search }));
        break;
      case "range":
        setActiveActions((s) => ({ ...s, range: !range }));
        break;
      default:
        break;
    }
  };
  const handleSearch = (e) => {
    action(e.target.value);
    setFilterValue(s => ({ ...s, serverName: e.target.value }));
  };
  const handleSetRange = (e) => {
    action(e.target.value);
  };
  const handleCheck = (e) => {
    const {
      target: { value },
    } = e;
    setFilterValue((s) => {
      const formatValue = typeof value === "string" ? value.split(",") : value
      action(formatValue);
      return { ...s, status: formatValue };
    }); 
  };

  const copyArray = tableData.concat();
  const filterSet = copyArray
    .map((i) => !!i.status && i.status)
    .filter((i) => i);
  const names = Array.from(new Set(filterSet));

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: 48 * 4.5 + 8,
        width: 200,
      },
    },
  };

  return (
    <>
      <div className="filter-helper">
        {search && (
          <TextField
            onChange={handleSearch}
            type="search"
            variant="standard"
            value={filterValue.serverName || ''}
            inputProps={{
              style: { background: "#fff" },
            }}
          />
        )}
        {range && (
          <Slider
            valueLabelDisplay="auto"
            defaultValue={+filterValue.cpu || 0}
            valueLabelFormat={(value) => `CPU: > ${value} %`}
            size="small"
            min={0}
            step={2}
            max={100}
            onChange={handleSetRange}
          />
        )}
        {filter && (
          <Select
            multiple
            value={filterValue.status || []}
            onChange={handleCheck}
            input={<Input />}
            renderValue={(selected) => selected?.join(", ")}
            MenuProps={MenuProps}
          >
            {names.map((name) => (
              <MenuItem key={name} value={name}>
                <Checkbox checked={filterValue?.status?.indexOf(name) > -1} />
                <ListItemText primary={name} />
              </MenuItem>
            ))}
          </Select>
        )}
      </div>
      <button onClick={() => activeFilter()}>
        <FilterListIcon />
      </button>
    </>
  );
};

export default TableHeadFilter;
