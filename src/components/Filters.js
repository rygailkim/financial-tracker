import { Group, Select } from "@mantine/core";
import React, { useEffect } from "react";
import { DatePickerInput } from "@mantine/dates";

function Filters({ setFilters, filters }) {


  return (
    <Group>
      <Select
        label="Select Frequency"
        placeholder="Select Frequency"
        data={[
          { label: "Last Week", value: "7" },
          { label: "Last Month", value: "30" },
          { label: "Last Year", value: "365" },
          { label: "Custom Range", value: "custom-range" },
        ]}
        value={filters.frequency}
        onChange={(value) => setFilters({ ...filters, frequency: value })}
        name="frequency"
      />
      {filters.frequency === "custom-range" && (
        <div className="w-full">
          <DatePickerInput
            sx={{ width: "350px", height:"100% !important"}}
            type="range"
            label="Select Date Range"
            placeholder="Pick dates range"
            zIndex={10000}
            dropdownPosition="bottom"
            fullWidth
            mx="auto"
            maw={400}
            onChange={(value) => setFilters({ ...filters, dateRange: value })}
          />
        </div>
      )}
      <Select
        label="Select Type"
        placeholder="Select Type"
        data={[
          { label: "All", value: "" },
          { label: "Income", value: "income" },
          { label: "Expense", value: "expense" },
        ]}
        value={filters.type}
        onChange={(value) => setFilters({ ...filters, type: value })}
        name="type"
        dropdownPosition="bottom"
       />
    </Group>
  );
}

export default Filters;