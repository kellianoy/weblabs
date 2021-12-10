/** @jsxImportSource @emotion/react */
import { useEffect, useContext, useState } from "react";
import PropTypes from "prop-types";
//Local
import Context from "../context/Context";
import DeleteChannel from "./DeleteChannel";
import LeaveChannel from "./LeaveChannel";

//This component is the header of each channel with the channel name and drawer when resized
export default function DeleteLink({ open, setOpen }) {
  const { setID, id, user, channels } = useContext(Context);
  const [owner, setOwner] = useState(false);
  //If we are the owner of the channel, don't display the same things
  useEffect(() => {
    const getUsers = async () => {
      try {
        const channel = channels.find((c) => c.id === id);
        if (channel && channel.owner === user.id) setOwner(true);
        else setOwner(false);
      } catch (err) {
        console.error(err);
      }
    };
    getUsers();
  }, [id, setID]);

  return owner ? (
    <DeleteChannel open={open} setOpen={setOpen} />
  ) : (
    <LeaveChannel open={open} setOpen={setOpen} />
  );
}

DeleteLink.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};
