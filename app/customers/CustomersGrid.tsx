"use client";

import { Box } from "@mui/material";
import { DataGrid, GridCellParams } from "@mui/x-data-grid";

type Props = {
  data: Customer[];
};

const CustomersGrid = ({ data }: Props) => {
  const columns = [
    { field: "fullName", headerName: "Full name", flex: 1 },
    { field: "city", headerName: "City", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    {
      field: "totalSpent",
      headerName: "Total Spent",
      flex: 1,
      renderCell: (params: GridCellParams) => `$${params.value}`,
    },
  ];
  return (
    <Box flex={1}>
      <DataGrid
        columns={columns}
        rows={data}
        hideFooter
        sx={{
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#c2c5ce",
          },
          "& .MuiDataGrid-columnHeaderTitle": {
            fontWeight: "bold",
          },
        }}
      />
    </Box>
  );
};

export default CustomersGrid;
