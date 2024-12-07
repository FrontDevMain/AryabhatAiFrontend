import {
  Button,
  Card,
  Grid,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { Filters } from "src/assets/icons/filter";

function License() {
  const theme = useTheme();
  return (
    <>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography>Site License</Typography>

        <Button
          variant="contained"
          sx={{ borderRadius: 12 }}
          // onClick={handleOpenModal}
        >
          Update License
        </Button>
      </Stack>

      <Card sx={{ p: 2, boxShadow: "none", borderRadius: 3, mt: 2 }}>
        {/* signed Key */}
        <Grid container>
          <Grid item xs={4}>
            <Typography>Signed license key</Typography>
          </Grid>
          <Grid item xs={8}>
            <TextField
              fullWidth
              multiline
              rows={6.5}
              value={
                "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJsaWNlbnNlX251bWJlciI6IjlXOTExVFNTSlFHMVUxTUZPUzdRMjZPOFpCQ0tJSjVUIiwiZXhwIjoxNzM0MzczNzk5fQ.EvA5u78FQ8YcR8yZfVSt9jgaSeq_hoxQCDgV8__gtREaB5N-p3STDDQ8YOUG1hYzWQlLeg13ej7w4zI0EZBOS1utuao02tM_BO3Hh3egHwCR3g6f3VHc3mN-dzU2CXQOVS8VeEUmkhheqsywzm-RB15HQalT2FrzGwaUF69Kun3pZWDb7wwrya8VjqdhypIMXgDXlEiMXPEAsiKEetA49uWnnwwnRpr2jnuemL5vEre2JIJXSP3Swl9SNFlrJ7RnS9IArrdrSMpAOSngfD8g94WYOG0JjUQNPAqUqpm4cPggptqNIiFtHMLLvTToitusVGbHUGnC2Tkz5ehsPWRPPA"
              }
              // onChange={(e) => setInviteEmails(e.target.value)}
            />
          </Grid>
        </Grid>

        {/* License Details */}
        <Grid container mt={4}>
          <Grid item xs={4}>
            <Typography>License Details</Typography>
          </Grid>
          <Grid item xs={8}>
            <TextField
              fullWidth
              multiline
              rows={6.5}
              value={
                "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJsaWNlbnNlX251bWJlciI6IjlXOTExVFNTSlFHMVUxTUZPUzdRMjZPOFpCQ0tJSjVUIiwiZXhwIjoxNzM0MzczNzk5fQ.EvA5u78FQ8YcR8yZfVSt9jgaSeq_hoxQCDgV8__gtREaB5N-p3STDDQ8YOUG1hYzWQlLeg13ej7w4zI0EZBOS1utuao02tM_BO3Hh3egHwCR3g6f3VHc3mN-dzU2CXQOVS8VeEUmkhheqsywzm-RB15HQalT2FrzGwaUF69Kun3pZWDb7wwrya8VjqdhypIMXgDXlEiMXPEAsiKEetA49uWnnwwnRpr2jnuemL5vEre2JIJXSP3Swl9SNFlrJ7RnS9IArrdrSMpAOSngfD8g94WYOG0JjUQNPAqUqpm4cPggptqNIiFtHMLLvTToitusVGbHUGnC2Tkz5ehsPWRPPA"
              }
              // onChange={(e) => setInviteEmails(e.target.value)}
            />
          </Grid>
        </Grid>

        {/* License last updated */}
        <Grid container mt={4}>
          <Grid item xs={4}>
            <Typography>License definition last updated </Typography>
          </Grid>
          <Grid item xs={8}>
            <TextField
              fullWidth
              rows={6.5}
              value={"2022-02-08"}
              // onChange={(e) => setInviteEmails(e.target.value)}
            />
          </Grid>
        </Grid>

        {/* License Usage Summary */}
        <Grid container mt={4}>
          <Grid item xs={4}>
            <Typography>License Usage Summary</Typography>
          </Grid>
          <Grid item xs={8}>
            <Table sx={{}}>
              <TableHead
                sx={{
                  borderRadius: 2,
                  overflow: "clip",
                  border: `1px solid ${theme.palette.text.disabled}`,
                }}
              >
                <TableRow
                  sx={{
                    backgroundColor: theme.palette.background.neutral,
                  }}
                >
                  <TableCell>Total</TableCell>
                  <TableCell>In Use</TableCell>
                  <TableCell>Available</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>09</TableCell>
                  <TableCell>04</TableCell>
                  <TableCell>05</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>09</TableCell>
                  <TableCell>04</TableCell>
                  <TableCell>05</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Grid>
        </Grid>
      </Card>
    </>
  );
}

export default License;
