import React from "react";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";
import { FiTrash2 } from "react-icons/fi";
import { FiEdit } from "react-icons/fi";
import { FiEye } from "react-icons/fi";
import "./table.css";
import GlobalFilter from "../GlobalFilter";
import { Form, FormControl, InputGroup } from "react-bootstrap";

export default (props) => {
  let columns = props.columns;
  let data = props.data;
  let showModal = props.showModal;
  let showDeleteModal = props.showDeleteModal;
  let showFilterModal = props.showFilterModal;
  let showSearch = props.showSearch;
  let edit = props.edit;

  const tableHooks = (hooks) => {
    hooks.visibleColumns.push((columns) => [
      ...columns,
      {
        id: "contacts",
        Header: 'Actions',
        Cell: ({ row }) => {
          return (
            <div class="tableActions">
              {showSearch && <button
                id="bAcep"
                type="button"
                class="btn  btn-sm btn-height"
                title="View Contacts"
                style={{ "font-size": "1.1rem" }}
                onClick={() => showModal(row.original)}
              >
                <FiEye />
              </button>
              }
              
              <button
                id="bEdit"
                type="button"
                class="btn btn-sm btn-height"
                title="Edit"
                style={{ "font-size": "1.1rem" }}
                onClick={() => edit(row.original)}
              >
                <FiEdit />
              </button>
              <button
                id="bDel"
                type="button"
                class="btn  btn-sm btn-height"
                title="Delete"
                style={{ "font-size": "1.1rem" }}
                onClick={() => showDeleteModal(row.original)}
              >
                <FiTrash2 />
              </button>
            </div>
          );
        },
      },
    ]);
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    state,
    setGlobalFilter,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    setPageSize,
  } = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
    tableHooks
  );

  const { globalFilter, pageIndex, pageSize } = state;

  return (
    <>
      {showSearch && <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} showFilterModal={showFilterModal}/> }
      <table
        {...getTableProps()}
        id="myTable"
        class="display table dataTable no-footer"
        width="100%"
        role="grid"
        aria-describedby="myTable_info"
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? "↓"
                        : "↑"
                      : "↓↑"}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="Wrapper">
        <div className="LeftWrapper">
          <Form>
            <InputGroup size="sm">
              <InputGroup.Text>Show</InputGroup.Text>
              <FormControl
                as="select"
                custom
                onChange={(e) => setPageSize(Number(e.target.value))}
                size="sm"
              >
                {[10, 25, 50, 100].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    {pageSize}
                  </option>
                ))}
              </FormControl>
              <span className="Entries"> entries</span>
            </InputGroup>
          </Form>
        </div>
      </div>
      <div class="pageButtons">
        <span class="showPage">
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </span>
        <span class="showPage">
          Go to page:{" "}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const pageNumber = e.target.value
                ? Number(e.target.value) - 1
                : 1;
              gotoPage(pageNumber);
            }}
            style={{ width: "50px" }}
          />
        </span>
        <button class="pageButton" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {"<<"}
        </button>
        <button class="pageButton" onClick={() => previousPage()} disabled={!canPreviousPage}>
          {" "}
          Previous{" "}
        </button>
        <button  class="pageButton" onClick={() => nextPage()} disabled={!canNextPage}>
          {" "}
          Next{" "}
        </button>
        <button class="pageButton" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {">>"}
        </button>
      </div>
    </>
  );
};
