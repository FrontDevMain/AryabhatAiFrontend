import { alpha, Card, Stack, styled, Typography } from "@mui/material";
import { DecreaseIcon } from "src/assets/icons/Decrease";
import { IncreaseIcon } from "src/assets/icons/Increase";
import { fIndianCurrency } from "src/utils/utility";
import { CountUp } from "use-count-up";

const CustomCard = styled(Card)(({ theme }) => ({
  width: "100%",
  margin: 0,
  padding: theme.spacing(4),
  borderRadius: theme.spacing(2),
  boxShadow: "none",
  backgroundColor: alpha(theme.palette.primary.main, 0.1),
}));

type childProps = {
  title: string;
  data: any;
};

function StatsCard({ title, data }: childProps) {
  function calculate(b: number, x: number) {
    return b + (b * x) / 100;
  }

  if (!data) {
    return <></>;
  }

  return (
    <CustomCard>
      <Typography color="text.disabled">{title}</Typography>
      <Stack
        flexDirection={"row"}
        justifyContent={"space-between"}
        alignItems={"end"}
      >
        <Typography mt={2} sx={{ letterSpacing: 1.5, fontSize: 28 }}>
          {data?.length ? (
            <CountUp
              isCounting
              end={data[1] || data[0]}
              duration={1}
              formatter={(value) => fIndianCurrency(parseInt(value + ""))}
            />
          ) : (
            "0"
          )}
        </Typography>
        <Typography sx={{ fontSize: 14 }}>
          {calculate(data[0], data[1] || 0)}
          {"% "}
          {data[1] || 0 >= data[0] ? <DecreaseIcon /> : <IncreaseIcon />}
        </Typography>
      </Stack>
    </CustomCard>
  );
}

export default StatsCard;
