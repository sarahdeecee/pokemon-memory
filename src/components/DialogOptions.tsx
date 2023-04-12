import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import Options from "./Options";
import SearchBar from "./SearchBar";

function DialogOptions(props: any) {
  const {handleDialogClose, dialog, handleReset, generations, setGenerations} = props;
  const {pool, setVeto} = props;

  const resetConfirm = <>
    <DialogTitle id="alert-dialog-title">
      {"Are you sure you want to reset?"}
    </DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        Your current list of Pokemon will be reset. Do you want to reset?
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleDialogClose}>Cancel</Button>
      <Button onClick={handleReset} autoFocus>
        Confirm
      </Button>
    </DialogActions>
  </>

  const selectGenerations = <>
    <DialogTitle>Select Options</DialogTitle>
    <DialogContent>
      <Options generations={generations} setGenerations={setGenerations} />
    </DialogContent>
    <DialogTitle>Remove Pokemon from Pool</DialogTitle>
    <DialogContent>
      <SearchBar pool={pool} setVeto={setVeto} />
    </DialogContent>
    <DialogActions>
      <Button onClick={handleDialogClose}>Close</Button>
    </DialogActions>
  </>

  return (
    <Dialog onClose={handleDialogClose} open={dialog.open} disableEnforceFocus>
      {(dialog.content === 'select') ? selectGenerations : resetConfirm}
    </Dialog>
  );
}

export default DialogOptions;
