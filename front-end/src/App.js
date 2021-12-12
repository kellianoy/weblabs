/** @jsxImportSource @emotion/react */
import { useContext, useEffect } from "react";
import axios from "axios";
//Layout
import { useTheme } from "@mui/styles";
// Local
import BadGateway from "./misc/BadGateway";
import Main from "./Main";
import Login from "./Login";
import Context from "./context/Context";
// Routes
import { Route, Routes, Navigate, useLocation } from "react-router-dom";

import Settings from "./settings/MainSettings";

const useStyles = (theme) => ({
  root: {
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    bgcolor: theme.palette.primary.main,
  },
});

export default function App() {
  const theme = useTheme();
  const styles = useStyles(theme);
  const location = useLocation();
  const { oauth, setUser, user, setUpdateChannels, setUpdateUser, updateUser } =
    useContext(Context);
  useEffect(() => {
    const fetch = async () => {
      if (!user.email) {
        try {
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
        } catch (err) {
          //We know it returns 403 if the user already exists, no need to notice it
        }
      }
      if (oauth && oauth.email) {
        try {
          const { data: get } = await axios.get(
            `http://localhost:3001/users/email/${oauth.email}`,
            {
              headers: {
                Authorization: `Bearer ${oauth.access_token}`,
              },
            }
          );
          if (updateUser) setUpdateUser(false);
          setUser(get);
          setUpdateChannels(true);
        } catch (err) {
          console.error(err);
        }
      }
    };
    fetch();
  }, [oauth, updateUser]);
  const gochannels = (
    <Navigate
      to={{
        pathname: "/channels",
        state: { from: location },
      }}
    />
  );
  const gohome = (
    <Navigate
      to={{
        pathname: "/",
        state: { from: location },
      }}
    />
  );
  return (
    <div className="App" css={styles.root}>
      <Routes>
        <Route path="/" element={oauth ? gochannels : <Login />} />
        <Route path="/channels/*" element={oauth ? <Main /> : gohome} />
        <Route path="/settings/" element={gohome} />
        <Route path="/settings/*" element={oauth ? <Settings /> : gohome} />
        <Route path="/404" element={oauth ? <BadGateway /> : <Login />} />
        <Route path="/*" element={oauth ? gochannels : <Login />} />
      </Routes>
    </div>
  );
}
