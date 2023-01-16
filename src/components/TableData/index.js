import {
    Table,
    TableContainer,
    Tbody,
    Tr,
    Th,
    Td,
    Thead,
    Button,
    leftIcon
  } from '@chakra-ui/react';
  import { Spinner } from '@chakra-ui/react';
  import React, { useMemo } from 'react';
  import { useTable, usePagination } from 'react-table';

  
  const TableData = ({ columns, data, isLoading, key }) => {
    const columnData = useMemo(() => columns, [columns]);
    const rowData = useMemo(() => data, [data]);
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns: columnData,
        data: rowData,
      },
      usePagination,
    );
  return (
    <>
      <TableContainer margin={4} border="2px" borderRadius="2xl" borderColor={"gray.300"} overflowY={"scroll"} height={"xl"}>
        <Table
          size="sm"
          bgColor="whiteAlpha.900"
          variant="simple"
          colorScheme="#0f60e8"
          color="#262626"   
          
          fontWeight="medium"
          {...getTableProps()}
        > 
          <Thead  position={"static"}  >
            {headerGroups.map((headerGroup, i) => (
              <Tr key={i} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column, i) => (
                  <Th
                    key={i}
                    py="4"
                    bg={"#0f60e8"}
                    textColor={"whiteAlpha.900"}
                    fontSize="small"
                    textAlign="center"
                    {...column.getHeaderProps()}
                    isNumeric={column.isNumeric}
                  >
                    {column.render('Header')}
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody {...getTableBodyProps()} overflow={"scroll"}>
            
            {rows.map((row, i) => {
              console.log(row);
              prepareRow(row);
              return (
                <Tr key={i} {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <>
                 
                      <Td
                        key={i}
                        py="4"
                        fontWeight="medium"
                        fontSize="13px"
                        textAlign="center"
                       
                        {...cell.getCellProps()}
                      >
                        {cell.render('Cell')}
                      </Td></>
                      
                    );
                  })}
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};
export default TableData;