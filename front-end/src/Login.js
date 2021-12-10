/** @jsxImportSource @emotion/react */
import { useContext, useEffect } from "react";
import { useCookies } from "react-cookie";
import crypto from "crypto";
import qs from "qs";
import axios from "axios";
// Layout
import { useTheme } from "@mui/styles";
import { Link } from "@mui/material";
// Local
import Context from "./context/Context";
import { useNavigate } from "react-router-dom";
import Start from "./misc/Start";
import PropTypes from "prop-types";

const base64URLEncode = (str) => {
  return str
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
};

const sha256 = (buffer) => {
  return crypto.createHash("sha256").update(buffer).digest();
};

const useStyles = (theme) => ({
  root: {
    background: theme.palette.primary.dark,
    height: "100vh",
  },
});

const Redirect = ({ config, codeVerifier }) => {
  const styles = useStyles(useTheme());
  const redirect = (e) => {
    e.stopPropagation();
    const code_challenge = base64URLEncode(sha256(codeVerifier));
    const url = [
      `${config.authorization_endpoint}?`,
      `client_id=${config.client_id}&`,
      `scope=${config.scope}&`,
      `response_type=code&`,
      `redirect_uri=${config.redirect_uri}&`,
      `code_challenge=${code_challenge}&`,
      `code_challenge_method=S256`,
    ].join("");
    window.location = url;
  };
  return (
    <div css={styles.root}>
      <Start redirect={redirect} />
    </div>
  );
};

const Tokens = ({ oauth }) => {
  const { setOauth } = useContext(Context);
  const styles = useStyles(useTheme());
  const { id_token } = oauth;
  const id_payload = id_token.split(".")[1];
  const { email } = JSON.parse(atob(id_payload));
  const logout = (e) => {
    e.stopPropagation();
    setOauth(null);
  };
  return (
    <div css={styles.root}>
      Welcome {email}{" "}
      <Link onClick={logout} color="secondary">
        logout
      </Link>
    </div>
  );
};

const LoadToken = ({
  code,
  codeVerifier,
  config,
  removeCookie,
  setOauth,
  oauth,
}) => {
  const styles = useStyles(useTheme());
  const navigate = useNavigate();
  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await axios.post(
          config.token_endpoint,
          qs.stringify({
            grant_type: "authorization_code",
            client_id: `${config.client_id}`,
            code_verifier: `${codeVerifier}`,
            redirect_uri: `${config.redirect_uri}`,
            code: `${code}`,
          })
        );

        //We remove the codeverifier from the cookies
        removeCookie("code_verifier");
        //We set our data as our oauth factor -> we can get the email and all
        setOauth(data);

        //If there is not already a user with that email, let's create one, if not do nothing
        //To get the users in the db
        const { data: users } = await axios.get(`http://localhost:3001/users`, {
          headers: {
            Authorization: `Bearer ${oauth.access_token}`,
          },
        });
        //using an email, create a new user entry in the db
        if (!users.find((user) => user.email === oauth.email)) {
          //Function to create a user in the db
          await axios.post(
            `http://localhost:3001/users`,
            {
              username: oauth.email,
              email: oauth.email,
            },
            {
              headers: {
                Authorization: `Bearer ${oauth.access_token}`,
              },
            }
          );
        }
        navigate("/");
      } catch (err) {
        console.error(err);
      }
    };
    fetch();
  });
  return <div css={styles.root}>Loading tokens</div>;
};

export default function Login() {
  const styles = useStyles(useTheme());
  // const location = useLocation();
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const { oauth, setOauth } = useContext(Context);
  const config = {
    authorization_endpoint: "http://localhost:5556/dex/auth",
    token_endpoint: "http://localhost:5556/dex/token",
    client_id: "webtech-frontend",
    redirect_uri: "http://localhost:3000",
    scope: "openid%20email%20offline_access",
  };
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");
  // is there a code query parameters in the url
  if (!code) {
    // no: we are not being redirected from an oauth server
    if (!oauth) {
      const codeVerifier = base64URLEncode(crypto.randomBytes(32));
      setCookie("code_verifier", codeVerifier);
      return (
        <Redirect
          codeVerifier={codeVerifier}
          config={config}
          css={styles.root}
        />
      );
    } else {
      // yes: user is already logged in, great, is is working
      return <Tokens oauth={oauth} css={styles.root} />;
    }
  } else {
    // yes: we are coming from an oauth server
    return (
      <LoadToken
        code={code}
        codeVerifier={cookies.code_verifier}
        config={config}
        setOauth={setOauth}
        removeCookie={removeCookie}
      />
    );
  }
}

LoadToken.propTypes = {
  code: PropTypes.string.isRequired,
  codeVerifier: PropTypes.string.isRequired,
  config: PropTypes.object.isRequired,
  removeCookie: PropTypes.func.isRequired,
  setOauth: PropTypes.func.isRequired,
  oauth: PropTypes.object.isRequired,
};

Tokens.propTypes = {
  oauth: PropTypes.element.isRequired,
};

Redirect.propTypes = {
  codeVerifier: PropTypes.string.isRequired,
  config: PropTypes.object.isRequired,
};
