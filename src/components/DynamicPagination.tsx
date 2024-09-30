import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import styled from "styled-components";
import CardUniversity from "./CardUniversity";

const LIMIT_UNIVERSITIES = 20; // Лимит данных, получаемых за один запрос

const ListStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  overflow: auto;
  height: calc(100vh - 40px);
`;

const DynamicPagination = () => {
  interface University {
    name: string;
    country: string;
  }

  const [universities, setUniversities] = useState<University[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchUniversities = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const offset = (currentPage - 1) * LIMIT_UNIVERSITIES;
      const response = await axios.get(
        `http://universities.hipolabs.com/search?offset=${offset}&limit=${LIMIT_UNIVERSITIES}`,
      );
      if (response.data.length < LIMIT_UNIVERSITIES) setHasMore(false);
      setUniversities((prev) => [...prev, ...response.data]);
    } catch (error) {
      console.error("Error fetching universities:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUniversities();
  }, [currentPage]);

  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  useEffect(() => {
    if (inView && !loading) {
      setCurrentPage((prev) => prev + 1);
    }
  }, [inView, loading]);

  return (
    <ListStyled>
      <h1>List of Universities</h1>
      {universities.map((university, index) => (
        <CardUniversity key={index} data={university} />
      ))}
      {loading && <div>Loading...</div>}
      {hasMore && <div ref={ref} style={{ height: "20px", background: "transparent" }}></div>}
    </ListStyled>
  );
};

export default DynamicPagination;
