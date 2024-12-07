import { LoadingButton } from "@mui/lab";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

type childProps = {
  title: string;
  content: React.ReactNode | string;
  open: boolean;
  loading?: boolean;
  handleClose: () => void;
  onConfirm: () => void;
};

function ConfirmationModal({
  title,
  content,
  open,
  loading = false,
  handleClose,
  onConfirm,
}: childProps) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ p: 3 }}>
        <Button onClick={handleClose} variant="outlined" fullWidth>
          No
        </Button>
        <LoadingButton
          onClick={onConfirm}
          variant="contained"
          fullWidth
          loading={loading}
        >
          Yes
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmationModal;
