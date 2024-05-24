"use client";

import getPayments from "@/actions/getPayments";
import formatDate from "@/utils/formatDate";
import { Box } from "@mui/material";
import { DataGrid, GridCellParams, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";

const PaymentsGrid = () => {
  const [pageState, setPageState] = useState<PageState>({
    isLoading: false,
    data: [],
  });
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 20,
    page: 0,
  });

  const columns: GridColDef<Payment>[] = [
    { field: "id", headerName: "Payment Id", flex: 1 },
    { field: "customerName", headerName: "Customer Name", flex: 1 },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
      renderCell: (params: GridCellParams) =>
        `${formatDate(params.value as string)}`,
    },
    { field: "status", headerName: "Status", flex: 0.5 },
    {
      field: "amount",
      headerName: "Amount",
      flex: 0.3,
      renderCell: (params: GridCellParams) => `$${params.value}  `,
    },
  ];
  const pageSizeOptions = [20, 100, 200];

  useEffect(() => {
    const fetchPayments = async () => {
      setPageState((old) => ({ ...old, isLoading: true }));
      const res = await getPayments(
        paginationModel.page + 1,
        paginationModel.pageSize
      );
      const data = res.data ? JSON.parse(res.data) : [];
      setPageState((old) => ({ ...old, isLoading: false, data }));
    };

    fetchPayments();
  }, [paginationModel.page, paginationModel.pageSize]);

  return (
    <Box flex={1}>
      <DataGrid
        columns={columns}
        rows={pageState.data}
        sx={{
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#c2c5ce",
          },
          "& .MuiDataGrid-columnHeaderTitle": {
            fontWeight: "bold",
          },
        }}
        pagination
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        pageSizeOptions={pageSizeOptions}
        loading={pageState.isLoading}
        rowCount={1000}
        paginationMode="server"
      />
    </Box>
  );
};

export default PaymentsGrid;
