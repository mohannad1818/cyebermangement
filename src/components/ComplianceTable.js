import React from 'react';
import { useTable } from 'react-table';
import styled from 'styled-components';
import { getEncryptedData } from '../utils/encryption'; // استيراد دوال التشفير

const Styles = styled.div`
  padding: 1rem;

  table {
    width: 100%;
    border-spacing: 0;
    border: 1px solid #ddd;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid #ddd;
      border-right: 1px solid #ddd;

      :last-child {
        border-right: 0;
      }
    }

    th {
      background: #55448a;
      color: white;
      font-weight: bold;
    }

    td {
      &.status-complete {
        color: green;
      }

      &.status-partial {
        color: orange;
      }

      &.status-not-applied {
        color: red;
      }
    }
  }
`;

function ComplianceTable({ data }) {
  const columns = React.useMemo(
    () => [
      {
        Header: 'الضابط',
        accessor: 'control',
      },
      {
        Header: 'الحالة',
        accessor: 'status',
        Cell: ({ value }) => {
          let className;
          if (value === 'مطبق كليًا') className = 'status-complete';
          else if (value === 'مطبق جزئيًا') className = 'status-partial';
          else if (value === 'غير مطبق') className = 'status-not-applied';
          return <span className={className}>{value}</span>;
        },
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  return (
    <Styles>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </Styles>
  );
}

export default ComplianceTable;
