/** @jsxImportSource @emotion/react */
import PropTypes from "prop-types";
//Local
import DeleteChannel from "./DeleteChannel";
import LeaveChannel from "./LeaveChannel";

//This component is the header of each channel with the channel name and drawer when resized
export default function DeleteLink({ open, setOpen, owner }) {
  return owner ? (
    <DeleteChannel open={open} setOpen={setOpen} />
  ) : (
    <LeaveChannel open={open} setOpen={setOpen} />
  );
}

DeleteLink.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  owner: PropTypes.bool.isRequired,
};
