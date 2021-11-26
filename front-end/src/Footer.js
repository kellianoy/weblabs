/** @jsxImportSource @emotion/react */

import { useTheme } from '@mui/styles';

const useStyles = (theme) => ({
  footer: {
      backgroundColor: '#192E46',
      flexShrink: 0,
      padding: "10px",
      textAlign: "center",
  }
})

function Footer() {
  const styles = useStyles(useTheme())
  return (
      <footer className="App-footer" style={styles.footer}>
          <span>This was created by MESSALATI Yann and COTTART Kellian <br></br>Copyright @ECEParisLyon @Adaltas @wdavidw @sergkudinov</span>
      </footer>
  );
}

export default Footer
