import { alpha, Card, styled, Typography } from "@mui/material";
import { fIndianCurrency } from "src/utils/utility";
import { CountUp } from "use-count-up";

const CustomCard = styled(Card)(({ theme }) => ({
  maxWidth: "90%",
  margin: "auto",
  padding: theme.spacing(4),
  borderRadius: theme.spacing(2),
  boxShadow: "none",
  backgroundColor: alpha(theme.palette.primary.main, 0.1),
}));

function StatsCard({ data }: { data: { title: string; count: number } }) {
  return (
    <CustomCard>
      <Typography color="text.disabled">{data.title}</Typography>
      <Typography variant="h4" mt={2} sx={{ letterSpacing: 1.5 }}>
        {data.count ? (
          <CountUp
            isCounting
            end={data.count}
            duration={1}
            formatter={(value) => fIndianCurrency(parseInt(value + ""))}
          />
        ) : (
          "0"
        )}
      </Typography>
    </CustomCard>
  );
}

export default StatsCard;
