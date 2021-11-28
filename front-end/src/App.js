/** @jsxImportSource @emotion/react */
import { useContext } from "react";
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
  const { oauth } = useContext(Context);
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
        <Route path="/BadGateway" element={<BadGateway />} />
      </Routes>
    </div>
  );
}
