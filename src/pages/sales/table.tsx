import React from 'react';
import { Table as AntTable, Spin } from 'antd';

interface TableProps {
  columns: any[];
  data: any[];
  loading?: boolean;
  error?: string;
}

const Table: React.FC<TableProps> = ({ columns, data, loading, error }) => {
    console.log(data)
  if (loading) return <Spin size="large" />;
  if (error) return <div className="text-red-500">{error}</div>;

  return <AntTable columns={columns} dataSource={data} rowKey={(record) => record.id || record._id} />;
};

export default Table;
