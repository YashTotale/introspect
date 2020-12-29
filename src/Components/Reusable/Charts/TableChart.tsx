// React Imports
import React, { FC, useState } from "react";

// Material UI Imports
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@material-ui/core";

interface TableChartProps {
  title: string;
  header: any[];
  data: any[][];
}

const TableChart: FC<TableChartProps> = ({ title, header, data }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  return (
    <>
      <Typography variant="subtitle1">{title}</Typography>
      <TableContainer>
        <Table size="small" stickyHeader>
          <TableHead>
            {header.map((title, i) => (
              <TableCell key={i} align="center">
                {title}
              </TableCell>
            ))}
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, i) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                    {row.map((value, i) => (
                      <TableCell key={i} align="center">
                        {value}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={(e, page) => setPage(page)}
        onChangeRowsPerPage={(e) => {
          setRowsPerPage(+e.target.value);
          setPage(0);
        }}
        backIconButtonProps={{
          size: "small",
        }}
        nextIconButtonProps={{
          size: "small",
        }}
      />
    </>
  );
};

export default TableChart;
