import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button } from "antd";
import type { ColumnsType } from "antd/es/table";

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

const columns: ColumnsType<DataType> = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Country",
    dataIndex: "country",
    key: "country",
  },
  {
    title: "Website",
    dataIndex: "web_pages",
    key: "web_pages",
    render: (web_pages) => (
      <a href={web_pages[0]} target="_blank" rel="noopener noreferrer">
        {web_pages[0]}
      </a>
    ),
  },
];

const LIMIT_LIST_SCHOOL = 10;

const ArticlesPage: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const [dataSource, setDataSource] = useState<DataType[]>([]);

  const getUniversity = async (page: number) => {
    const offset = (page - 1) * LIMIT_LIST_SCHOOL;
    try {
      const response = await axios.get(
        `http://universities.hipolabs.com/search?offset=${offset}&limit=${LIMIT_LIST_SCHOOL}`,
      );
      if (Array.isArray(response.data)) {
        setDataSource(response.data);
      } else {
        console.error("Data is not an array");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getUniversity(page);
  }, [page]);

  return (
    <>
      <Table dataSource={dataSource} columns={columns} pagination={false} />
      <Button onClick={() => setPage(page - 1)} disabled={page === 1}>
        Назад
      </Button>
      <Button onClick={() => setPage(page + 1)}>Вперед</Button>
      <div>Текущая страница: {page}</div>
    </>
  );
};

export default ArticlesPage;
