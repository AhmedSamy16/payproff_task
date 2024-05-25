import months from "@/utils/months";
import { Box, MenuItem, TextField } from "@mui/material";

type Props = {
  year: number;
  onYearChange: (value: number) => void;
  month: string;
  onMonthChange: (value: string) => void;
  day: number;
  onDayChange: (value: number) => void;
};

const OverviewSelectBox = ({
  day,
  month,
  onDayChange,
  onMonthChange,
  onYearChange,
  year,
}: Props) => {
  return (
    <Box
      flexBasis="60%"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        gap: "10px",
        flexWrap: "wrap",
      }}
    >
      <TextField
        label="Year"
        select
        value={year}
        sx={{ minWidth: "140px" }}
        onChange={(e) => onYearChange(+e.target.value)}
      >
        <MenuItem value={2024}>2024</MenuItem>
        <MenuItem value={2023}>2023</MenuItem>
      </TextField>
      <TextField
        sx={{ minWidth: "140px" }}
        label="Month"
        select
        onChange={(e) => onMonthChange(e.target.value)}
        value={month}
        defaultValue={""}
      >
        {months.map((m) => (
          <MenuItem key={m} value={m}>
            {m}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        sx={{ minWidth: "140px" }}
        label="Day"
        select
        onChange={(e) => onDayChange(+e.target.value)}
      >
        {Array.from({ length: 30 }, (_, i) => i + 1).map((n) => (
          <MenuItem key={n} value={n.toString()}>
            {n}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
};

export default OverviewSelectBox;
