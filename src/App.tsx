import { useEffect, useState } from "react";
import { Button, Flex, Separator, Table, Theme } from "@radix-ui/themes";

import { getLeads } from "./services/db/leads";
import { Filter } from "./components/Filter";
import { Sort } from "./components/Sort";
import type { Lead, sortOptions } from "./types";

import "./App.scss";
import { CSVUpload } from "./components/CSVUpload";
import supabase from "./lib/createClient";

function App() {
  const [data, setData] = useState<Lead[]>([]);
  const [pagination, setPagination] = useState({
    page: 0,
    size: 10,
  });
  const [totalCount, setTotalCount] = useState(0);
  const [sortOptions, setSortOptions] = useState<sortOptions>({
    direction: "desc",
    columnName: "",
  });
  const [filterOptions, setFilterOptions] = useState({
    columnName: "",
    value: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const { data, count } = await getLeads({
        pagination,
        sortOptions,
        filterOptions,
      });
      setData(data);
      setTotalCount(count || 0);
    };

    fetchData();
  }, [pagination, sortOptions, filterOptions]);

  const handlePrevPage = () => {
    setPagination((prev) => ({
      ...prev,
      page: prev.page - 1,
    }));
  };

  const handleNextPage = () => {
    setPagination((prev) => ({
      ...prev,
      page: prev.page + 1,
    }));
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <Theme appearance="dark">
      <Flex
        direction={"column"}
        maxWidth={"800px"}
        mx={"auto"}
        pt="24px"
        mb="4px"
        gap={"4"}
      >
        <Button
          color="red"
          onClick={handleLogout}
          style={{ marginLeft: "auto", marginBottom: "16px" }}
        >
          Sign Out
        </Button>
        <CSVUpload
          setData={setData}
          setTotalCount={setTotalCount}
          totalCount={totalCount}
        />
        <Flex gap="12px" align={"center"}>
          <Filter
            filterOptions={filterOptions}
            setFilterOptions={setFilterOptions}
            disabled={data.length === 0}
          />
          <Separator orientation="vertical" />
          <Sort
            sortOptions={sortOptions}
            setSortOptions={setSortOptions}
            disabled={data.length === 0}
          />
        </Flex>

        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Lead Name</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>
                Contact Information
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Source</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Interest Level</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>
                Assigned Salesperson
              </Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {data.map((datum: Lead) => (
              <Table.Row key={datum.lead_id}>
                <Table.RowHeaderCell>{datum.lead_name}</Table.RowHeaderCell>
                <Table.Cell>{datum.contact_information}</Table.Cell>
                <Table.Cell>{datum.source}</Table.Cell>
                <Table.Cell>{datum.interest_level}</Table.Cell>
                <Table.Cell>{datum.status}</Table.Cell>
                <Table.Cell>{datum.assigned_salesperson}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>

        {totalCount > pagination.size && (
          <Flex justify="center" gap="4" mt="4">
            <Button onClick={handlePrevPage} disabled={pagination.page === 0}>
              Prev
            </Button>
            {pagination.page + 1}
            <Button
              onClick={handleNextPage}
              disabled={(pagination.page + 1) * pagination.size >= totalCount}
            >
              Next
            </Button>
          </Flex>
        )}
      </Flex>
    </Theme>
  );
}

export default App;
