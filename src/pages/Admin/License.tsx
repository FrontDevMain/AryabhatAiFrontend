import {
  alpha,
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
import { sentenceCase } from "change-case";
import { log } from "console";
import { useEffect, useState } from "react";
import { END_POINTS } from "src/api/EndPoints";
import fetcher from "src/api/fetcher";
import { formatDate } from "src/utils/utility";

type licenseTypes = {
  status: string;
  created_at: string;
  expiry_date: string;
  users: number;
  translation: boolean;
  database: boolean;
  storage_device: boolean;
  active_users: number;
  license_number: string;
  signed_license_key: string;
};

type licenseOverviewTypes = {
  total_users: number;
  active_users: number;
  remaining_users: number;
};

export default function License() {
  const theme = useTheme();
  const [licenseDetail, setLicenseDetail] = useState({} as licenseTypes);
  const [licenseOverviewDetail, setLicenseOverviewDetail] = useState(
    {} as licenseOverviewTypes
  );

  useEffect(() => {
    getLicenseStatus();
    getLicenseoverView();
  }, []);

  const getLicenseStatus = async () => {
    try {
      const Response = await fetcher.get(
        END_POINTS.ADMIN.LICENSE.CHECK_LICENSE_STATUS
      );
      if (Response.status == 200) {
        setLicenseDetail(Response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getLicenseoverView = async () => {
    try {
      const Response = await fetcher.get(
        END_POINTS.ADMIN.LICENSE.CHECK_LICENSE_OVERVIEW
      );
      if (Response.status == 200) {
        setLicenseOverviewDetail(Response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

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
              value={licenseDetail.signed_license_key}
              onChange={(e) =>
                setLicenseDetail((prevState) => ({
                  ...prevState,
                  signed_license_key: e.target.value,
                }))
              }
            />
            <Typography
              sx={{
                bgcolor: theme.palette.primary.main,
                color: theme.palette.background.default,
                borderRadius: 1,
                width: "fit-content",
                p: 1,
                mt: 0.5,
              }}
            >
              License Number : {licenseDetail.license_number}
            </Typography>
          </Grid>
        </Grid>

        {/* License Details */}
        <Grid container mt={4}>
          <Grid item xs={4}>
            <Typography>License Details</Typography>
          </Grid>
          <Grid item xs={8}>
            <Stack
              sx={{
                border: `1px solid ${theme.palette.text.disabled}`,
                borderRadius: 2,
                p: 1,
                bgcolor: alpha(theme.palette.text.disabled, 0.1),
                maxHeight: 250,
                overflow: "scroll",
              }}
            >
              {Object.entries(licenseDetail).map((item, index) => {
                console.log(item);
                return [
                  `license_number`,
                  `signed_license_key`,
                  "users",
                  "active_users",
                ].includes(item[0]) ? null : (
                  <Stack>
                    <Typography variant="body1">
                      {" "}
                      {`${sentenceCase(item[0])} : ${item[1]}`}
                    </Typography>
                    {index % 2 == 0 && <br />}
                  </Stack>
                );
              })}
            </Stack>
            <Typography
              sx={{
                bgcolor: theme.palette.primary.main,
                color: theme.palette.background.default,
                borderRadius: 1,
                width: "fit-content",
                p: 1,
                mt: 0.5,
              }}
            >
              License expiry : {formatDate(licenseDetail.expiry_date)}
            </Typography>
          </Grid>
        </Grid>

        {/* License last updated */}
        <Grid container mt={4} alignItems={"center"}>
          <Grid item xs={4}>
            <Typography>License definition last updated </Typography>
          </Grid>
          <Grid item xs={8}>
            <TextField
              fullWidth
              disabled
              value={formatDate(licenseDetail.created_at)}
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
                <TableRow sx={{ border: "1px solid #dadada" }}>
                  <TableCell>
                    <Typography>{licenseOverviewDetail.total_users}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>
                      {licenseOverviewDetail.active_users}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>
                      {licenseOverviewDetail.remaining_users}
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Grid>
        </Grid>
      </Card>
    </>
  );
}
