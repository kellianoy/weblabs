/** @jsxImportSource @emotion/react */
import crypto from "crypto";
import PropTypes from "prop-types";
import Gravatar from "react-gravatar";

export default function MyGravatar({ email, md5, size }) {
  return (
    <Gravatar
      email={email}
      md5={md5 !== "" ? crypto.createHash("md5").update(md5).digest("hex") : ""}
      size={size}
      default="retro"
    />
  );
}
MyGravatar.propTypes = {
  email: PropTypes.string.isRequired,
  md5: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
};

MyGravatar.defaultProps = {
  md5: "",
};
