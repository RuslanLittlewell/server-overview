/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from "react";

import { useAlert } from "react-alert";
import { useLocation, useNavigate } from "react-router-dom";
import { setSearchParam, getSearchParam } from '@utils/urlParams';

import Table from "@shared/Table";
import Button from "@mui/material/Button";
import LoadingButton from '@mui/lab/LoadingButton';
import RefreshIcon from '@mui/icons-material/Refresh';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import "./style.scss";

const Main = ({ 
    sortTable,
    filterTable,
    fetchTableData,
    setFilterParams,
    filterParams,
    filteredTableData,
  }) => {
  const [loading, setLoading] = useState(true);
  const navigation = useNavigate();
  const location = useLocation();
  const alert = useAlert();
  const urlParams = location.search;
  const params = getSearchParam(urlParams);

  const tableConfig = [
    {
      name: "Server name",
      column: "serverName",
      features: ["search"],
      filterAction: (e) => handleFilterTable("serverName", e),
    },
    { name: "Location", column: "location" },
    { name: "IPv4", column: "ipv4" },
    {
      name: "Uptime(Days)",
      column: "uptime",
      features: ["sort"],
      format: "day",
      sortActions: (e) => handleSortTable("uptime", e),
    },
    {
      name: "Status",
      column: "status",
      features: ["filter", "sort"],
      filterAction: (e) => handleFilterTable("status", e),
      sortActions: (e) => handleSortTable("status", e),
    },
    {
      name: "Stats",
      column: "stats",
      features: ["range"],
      filterAction: (e) => handleFilterTable("cpu", e),
      items: [
        { name: "CPU", column: "cpu", suffix: "%" },
        { name: "RAM", column: "ram", suffix: "%" },
        { name: "Disk", column: "disk", suffix: "%" },
      ],
    },
    {
      name: "Created",
      column: "created",
      format: "DD/MM/YYY",
      features: ["sort"],
      sortActions: (e) => handleSortTable("created", e),
    },
  ];
  const handleFetch = useCallback( async (params) => {
    setLoading(true);
    await fetchTableData(params)
      .then(() => {
        if (Object.keys(params).length) {
          filterTable();
          sortTable();
        }
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        alert.error(e.error);
      });
  }, []);

  useEffect(() => {
    setFilterParams(params);
    handleFetch(params);
  }, []);

  const handleSortTable = (name, value) => {
    compareSetParams('sort', `${name},${value}`);
    sortTable();
  };

  const handleFilterTable = (name, value) => {
    compareSetParams(name, value);
    filterTable();
  };

  const compareSetParams = (name, value) => {
    setFilterParams({ [name]: value });
    const searchParams = setSearchParam({ ...filterParams, [name]: value });
    navigation(`?${searchParams}`, { replace: true })
  };

  const refreshTable = () => handleFetch(params);

  const handleCopyUrl =() => {
    alert.success('URL copied');
  }

  return (
    <div className="main-page">
      <div className="main-page__header">
        <h1>Servers Overview</h1>
        <div className="action-buttons">
          <CopyToClipboard text={window.location.href} onCopy={() => handleCopyUrl()}>
          <Button
            variant="outlined"
            size="small"
          >
            Copy URL
          </Button>
          </CopyToClipboard>
          <LoadingButton
            onClick={() => refreshTable()}
            loading={loading}
            endIcon={<RefreshIcon />}
            variant="outlined"
            size="small"
            color="success"
          >
            Refresh
          </LoadingButton>
        </div>
      </div>

      <div className="content__wrapper">
        <Table config={tableConfig} data={filteredTableData} loader={loading} />
      </div>
    </div>
  );
};

export default Main;
