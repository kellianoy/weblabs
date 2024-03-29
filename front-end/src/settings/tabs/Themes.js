/** @jsxImportSource @emotion/react */
import { useContext, useState } from "react";
// Layout
import { useTheme } from "@mui/styles";
import {
  Box,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Card,
  CardMedia,
  CardActionArea,
  Stack,
  Paper,
} from "@mui/material";
// Local
import { CustomThemeContext } from "../../themes/components/CustomThemeProvider";
import cobaltPreview from "../../themes/previews/cobalt-preview.jpg";
import lightPreview from "../../themes/previews/light-preview.jpg";
import marinePreview from "../../themes/previews/marine-preview.jpg";

const useStyles = (theme) => ({
  root: {
    display: "flex",
    flex: "1 1 auto",
    flexDirection: "column",
    width: "70%",
    margin: "1%",
  },
  userinfo: {
    background: theme.palette.primary.light,
    borderRadius: "0px",
    marginTop: "2%",
    marginBottom: "1%",
    padding: "2%",
  },
  title: {
    fontFamily: theme.palette.primary.textFont,
    color: theme.palette.secondary.dark,
    fontWeight: "600",
    fontSize: "22px",
  },
  button: {
    marginLeft: "5%",
  },
  item: {
    fontFamily: theme.palette.primary.textFont,
    color: theme.palette.primary.contrastText,
    fontWeight: "600",
  },
  radio: {
    color: theme.palette.secondary.main,
    "&.Mui-checked": {
      color: theme.palette.misc.owner,
    },
  },
});

//This component exports the themes part of settings
export default function Themes() {
  const theme = useTheme();
  const styles = useStyles(theme);
  //Importing theme
  const { currentTheme, setTheme } = useContext(CustomThemeContext);
  const [value, setValue] = useState(currentTheme);
  const themes = [
    { title: "Light Theme", value: "light", image: lightPreview },
    { title: "Marine Theme", value: "marine", image: marinePreview },
    { title: "Cobalt Theme", value: "cobalt", image: cobaltPreview },
  ];

  return (
    <Box sx={styles.root}>
      <span css={styles.title}>Themes</span>
      <Paper sx={styles.userinfo} elevation={0}>
        <FormControl component="fieldset">
          <RadioGroup
            row
            aria-label="theme"
            name="radio-buttons-group"
            value={value}
          >
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={{ xs: 1, sm: 2, md: 3 }}
              sx={{ margin: "auto" }}
            >
              {themes.map((t, i) => {
                return (
                  <Card
                    key={i}
                    elevation={2}
                    sx={{
                      bgcolor: theme.palette.primary.dark,
                      padding: "2%",
                    }}
                  >
                    <CardActionArea
                      onClick={() => {
                        setValue(t.value);
                        setTheme(t.value);
                      }}
                    >
                      <Paper
                        sx={[
                          styles.userinfo,
                          {
                            background: theme.palette.primary.dark,
                            padding: "0%",
                          },
                        ]}
                        elevation={0}
                      >
                        <CardMedia
                          component="img"
                          sx={{
                            maxWidth: 300,
                            maxHeight: 300,
                          }}
                          image={t.image}
                          alt={t.value}
                        />
                        <FormControlLabel
                          sx={styles.button}
                          value={t.value}
                          control={<Radio sx={styles.radio} />}
                          label={<span css={styles.item}>{t.title}</span>}
                        />
                      </Paper>
                    </CardActionArea>
                  </Card>
                );
              })}
            </Stack>
          </RadioGroup>
        </FormControl>
      </Paper>
    </Box>
  );
}
