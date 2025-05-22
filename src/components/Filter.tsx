import { Flex, Select, TextField } from "@radix-ui/themes";

export const Filter = ({ filterOptions, setFilterOptions }: any) => {
  const handleFilterValueChange = (e) => {
    const value = e.target.value;

    setFilterOptions((prev: any) => {
      return {
        ...prev,
        value,
      };
    });
  };

  const handleValueChange = (columnName) => {
    setFilterOptions((prev: any) => {
      return {
        ...prev,
        columnName,
      };
    });
  };

  return (
    <Flex gap={"4px"}>
      <TextField.Root
        placeholder="filter"
        value={filterOptions.value}
        onChange={handleFilterValueChange}
      />
      <Select.Root onValueChange={handleValueChange}>
        <Select.Trigger placeholder="Column" />
        <Select.Content>
          <Select.Item value="lead_name">Lead Name</Select.Item>
          <Select.Item value="source">Source</Select.Item>
          <Select.Item value="interest_level">Interest Level</Select.Item>
          <Select.Item value="status">Status</Select.Item>
          <Select.Item value="assigned_salesperson">
            Assigned Salesperson
          </Select.Item>
        </Select.Content>
      </Select.Root>
    </Flex>
  );
};
