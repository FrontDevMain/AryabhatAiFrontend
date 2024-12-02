import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { Filters } from "src/assets/icons/filter";
import { Plus } from "src/assets/icons/Plus";

export default function LLM() {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography>LLM list</Typography>

        <Button variant="contained" sx={{ borderRadius: 12 }}>
          <Plus /> Create Model LLM
        </Button>
      </Stack>

      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
        sx={{
          borderRadius: 2,
          border: "none",
          boxShadow: "none",
          my: 1,
          "&.MuiAccordion-root::before": {
            display: "none",
          },
        }}
      >
        <AccordionSummary
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          sx={{ border: "none" }}
        >
          <ExpandMore />
          <Typography>Open Ai</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack>
            <Box>
              <Typography>Api key</Typography>
              <Typography color="text.disabled">
                Please enter your OpenAI API Key
              </Typography>
            </Box>
          </Stack>
        </AccordionDetails>
      </Accordion>
    </>
  );
}
