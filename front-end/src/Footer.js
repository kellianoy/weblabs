/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx} from "@emotion/react";

const styles = {
    footer: {
        backgroundColor: '#192E46',
        flexShrink: 0,
        padding: "10px",
        textAlign: "center",
    }
}

function Footer() {
    return (
        <footer className="App-footer" style={styles.footer}>
            <p>This was created by MESSALATI Yann and COTTART Kellian | Copyright @ECEParisLyon @Adaltas @wdavidw @sergkudinov</p>
        </footer>
    );
}

export default Footer