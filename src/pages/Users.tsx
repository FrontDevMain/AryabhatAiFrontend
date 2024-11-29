import {
  Box,
  Button,
  Chip,
  Divider,
  IconButton,
  Stack,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import { Filters } from "src/assets/icons/filter";
import { Plus } from "src/assets/icons/Plus";
import { Avatar } from "src/components/avatar";

const CustomTableRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  "&:not(:last-child)": {
    marginBottom: "16px", // Adds spacing between rows
  },
}));

function Users() {
  const users = [
    {
      id: 0,
      name: "Alpha",
      email: "Alpha@xyz.com",
      role: "User",
      license: "No",
    },
    {
      id: 1,
      name: "Alpha",
      email: "Alpha@xyz.com",
      role: "Admin",
      license: "No",
    },
    {
      id: 2,
      name: "Alpha",
      email: "Alpha@xyz.com",
      role: "User",
      license: "Yes",
    },
  ];

  return (
    <>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography>User List</Typography>
        <Stack direction={"row"} alignItems={"center"} gap={2}>
          <IconButton>
            <Filters />
          </IconButton>
          <Button variant="contained">
            <Plus /> Invite User
          </Button>
        </Stack>
      </Stack>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>Username</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>License</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((item, index) => (
            <UserDetail item={item} />
          ))}
        </TableBody>
      </Table>
    </>
  );
}

function UserDetail({ item }: any) {
  return (
    <>
      <TableRow>
        <TableCell sx={{ p: 0.5 }}></TableCell>
      </TableRow>
      <CustomTableRow>
        <TableCell sx={{ borderTopLeftRadius: 20, borderBottomLeftRadius: 20 }}>
          <Stack flexDirection={"row"} gap={1} alignItems={"center"}>
            <Avatar src="" name={item.name} sx={{ height: 33, width: 33 }} />
            {item.name}
          </Stack>
        </TableCell>
        <TableCell>{item.email}</TableCell>
        <TableCell>{item.role}</TableCell>
        <TableCell>
          {" "}
          <Chip
            label={item.license}
            sx={{
              color: "common.white",
              backgroundColor:
                item.license == "No" ? "secondary.main" : "#008080",
            }}
          />
        </TableCell>
        <TableCell
          sx={{ borderTopRightRadius: 20, borderBottomRightRadius: 20 }}
        >
          ...
        </TableCell>
      </CustomTableRow>
    </>
  );
}

export default Users;
