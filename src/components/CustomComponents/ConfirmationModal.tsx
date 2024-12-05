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
  handleClose: () => void;
  onConfirm: () => void;
};

function ConfirmationModal({
  title,
  content,
  open,
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
      <DialogActions>
        <Button onClick={handleClose} variant="outlined" fullWidth>
          No
        </Button>
        <Button onClick={onConfirm} variant="contained" fullWidth>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmationModal;
