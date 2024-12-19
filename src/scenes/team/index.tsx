// import { Box, Typography, useTheme } from "@mui/material";
// import { DataGrid, GridColDef } from "@mui/x-data-grid";
// import { tokens } from "../../theme";
// import { mockDataTeam } from "../../data/mockData";
// import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
// import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
// import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";

// import { FC } from "react";
// import Header from "../../components/Header";

// // Định nghĩa kiểu dữ liệu của một hàng trong bảng
// interface TeamMember {
//   id: number;
//   name: string;
//   age: number;
//   phone: string;
//   email: string;
//   access: "admin" | "manager" | "user";
// }

// const Team: FC = () => {
//   const theme = useTheme();
//   const colors = tokens(theme.palette.mode);

//   // Định nghĩa cấu hình cột với kiểu `GridColDef`
//   const columns: GridColDef<TeamMember>[] = [
//     { field: "id", headerName: "ID" },
//     {
//       field: "name",
//       headerName: "Name",
//       flex: 1,
//       cellClassName: "name-column--cell",
//     },
//     {
//       field: "age",
//       headerName: "Age",
//       type: "number",
//       headerAlign: "left",
//       align: "left",
//     },
//     {
//       field: "phone",
//       headerName: "Phone Number",
//       flex: 1,
//     },
//     {
//       field: "email",
//       headerName: "Email",
//       flex: 1,
//     },
//     {
//       field: "access",
//       headerName: "Access Level",
//       flex: 1,
//       renderCell: ({ row }: { row: TeamMember }) => (
//         <Box
//           width="60%"
//           m="0 auto"
//           p="5px"
//           display="flex"
//           justifyContent="center"
//           backgroundColor={
//             row.access === "admin"
//               ? colors.greenAccent[600]
//               : row.access === "manager"
//               ? colors.greenAccent[700]
//               : colors.greenAccent[700]
//           }
//           borderRadius="4px"
//         >
//           {row.access === "admin" && <AdminPanelSettingsOutlinedIcon />}
//           {row.access === "manager" && <SecurityOutlinedIcon />}
//           {row.access === "user" && <LockOpenOutlinedIcon />}
//           <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
//             {row.access}
//           </Typography>
//         </Box>
//       ),
//     },
//   ];

//   return (
//     <Box m="20px">
//       <Header title="TEAM" subtitle="Managing the Team Members" />
//       <Box
//         m="40px 0 0 0"
//         height="75vh"
//         sx={{
//           "& .MuiDataGrid-root": {
//             border: "none",
//           },
//           "& .MuiDataGrid-cell": {
//             borderBottom: "none",
//           },
//           "& .name-column--cell": {
//             color: colors.greenAccent[300],
//           },
//           "& .MuiDataGrid-columnHeaders": {
//             backgroundColor: colors.blueAccent[700],
//             borderBottom: "none",
//           },
//           "& .MuiDataGrid-virtualScroller": {
//             backgroundColor: colors.primary[400],
//           },
//           "& .MuiDataGrid-footerContainer": {
//             borderTop: "none",
//             backgroundColor: colors.blueAccent[700],
//           },
//           "& .MuiCheckbox-root": {
//             color: `${colors.greenAccent[200]} !important`,
//           },
//         }}
//       >
//         <DataGrid<TeamMember>
//           checkboxSelection
//           rows={mockDataTeam}
//           columns={columns}
//           getRowId={(row) => row.id} // Xác định `id` là khóa chính
//         />
//       </Box>
//     </Box>
//   );
// };

// export default Team;
