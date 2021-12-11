/** @jsxImportSource @emotion/react */
import { useContext, useEffect } from "react";
import axios from "axios";
// Local
import BadGateway from "./misc/BadGateway";
import Main from "./Main";
import Login from "./Login";
import Context from "./context/Context";
// Routes
import { Route, Routes, Navigate, useLocation } from "react-router-dom";

const styles = {
  root: {
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
  },
};

export default function App() {
  const location = useLocation();
  const { oauth, setUser, user, setUpdateChannels } = useContext(Context);
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
          setUser(get);
          setUpdateChannels(true);
        } catch (err) {
          console.error(err);
        }
      }
    };
    fetch();
  }, [oauth]);
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
        <Route exact path="/" element={oauth ? gochannels : <Login />} />
        <Route path="/channels/*" element={oauth ? <Main /> : gohome} />
        <Route path="/404" element={oauth ? <BadGateway /> : <Login />} />
        <Route path="/*" element={oauth ? gochannels : <Login />} />
      </Routes>
    </div>
  );
}
