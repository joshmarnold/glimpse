import type { sortOptions } from "@/types";
import { Flex, Select } from "@radix-ui/themes";

export const Sort = ({
  sortOptions,
  setSortOptions,
}: {
  sortOptions: sortOptions;
  setSortOptions: React.Dispatch<React.SetStateAction<sortOptions>>;
}) => {
  const handleSortColumnChange = (columnName: string) => {
    console.log(columnName);
    setSortOptions((prev) => ({
      columnName,
      direction:
        prev.columnName === columnName && prev.direction === "asc"
          ? "desc"
          : "asc",
    }));
  };

  return (
    <Flex gap="4px" align="center">
      <Select.Root
        value={sortOptions.columnName}
        // unfortunately, clicking twice doesn't trigger so can't change direction
        onValueChange={handleSortColumnChange}
      >
        <Select.Trigger placeholder="Sort By" />
        <Select.Content>
          <Select.Item value="lead_name">
            Lead Name - {sortOptions.direction}
          </Select.Item>
          <Select.Item value="status">
            Status - {sortOptions.direction}
          </Select.Item>
          <Select.Item value="assigned_salesperson">
            Assigned Salesperson - {sortOptions.direction}
          </Select.Item>
        </Select.Content>
      </Select.Root>
    </Flex>
  );
};
