/** @jsxImportSource @emotion/react */
import { useContext, useEffect, useState } from "react";
import axios from "axios";
// Layout
import { useTheme } from "@mui/styles";
import {
  Box,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  AppBar,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Card,
  CardMedia,
  CardActionArea,
} from "@mui/material";
// Local
import Context from "../../context/Context";
import MyGravatar from "./MyGravatar";

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
    marginLeft: "1%",
  },
  item: {
    fontFamily: theme.palette.primary.textFont,
    color: theme.palette.primary.contrastText,
    fontWeight: "600",
  },
  field: {
    fontFamily: theme.palette.primary.textFont,
    fontSize: 18,
    fontWeight: "400",
    color: theme.palette.primary.contrastText,
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  radio: {
    color: theme.palette.secondary.main,
    "&.Mui-checked": {
      color: theme.palette.misc.owner,
    },
  },
});
//This component exports the account part of settings
export default function Avatars() {
  const { user, oauth, setUser } = useContext(Context);
  const [go, setGo] = useState(false);
  const theme = useTheme();
  const styles = useStyles(theme);
  const [value, setValue] = useState(false);
  const avatars = [];
  avatars.push({ title: `Default`, value: `` });
  for (let i = 1; i < 18; i++) {
    avatars.push({ title: `Preset ${i}`, value: `avatar${i}` });
  }
  useEffect(() => {
    const updateAvatar = async () => {
      if (go) {
        try {
          const { data: user } = await axios.put(
            `http://localhost:3001/users/${oauth.email}`,
            {
              avatar: value,
            },
            {
              headers: {
                Authorization: `Bearer ${oauth.access_token}`,
              },
            }
          );
          setUser(user);
          setGo(false);
        } catch (err) {
          console.error(err);
        }
      }
    };
    updateAvatar();
  }, [go]);

  return (
    <Box sx={styles.root}>
      <span css={styles.title}>Avatars</span>
      <Paper sx={styles.userinfo} elevation={0}>
        <List>
          <AppBar
            sx={{
              position: "relative",
              bgcolor: theme.palette.primary.dark,
            }}
          >
            <ListItem>
              <ListItemAvatar sx={{ marginRight: "14px" }}>
                <Avatar
                  sx={{
                    bgcolor: theme.palette.primary.main,
                    margin: "auto",
                    width: "128px",
                    height: "128px",
                  }}
                >
                  <MyGravatar
                    email={oauth.email}
                    md5={user.avatar || ""}
                    size={128}
                  />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={user.username}
                primaryTypographyProps={styles.title}
              />
            </ListItem>
          </AppBar>
        </List>
      </Paper>
      <span css={styles.title}>Preset avatars</span>
      <Paper sx={styles.userinfo} elevation={0}>
        <FormControl component="fieldset">
          <RadioGroup
            row
            aria-label="theme"
            name="radio-buttons-group"
            value={value}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                margin: "auto",
                flexWrap: "wrap",
              }}
            >
              {avatars.map((t, i) => {
                const md5 = t.value;
                return (
                  <Card
                    key={i}
                    elevation={2}
                    sx={{
                      marginRight: "2%",
                      marginBottom: "2%",
                      padding: "1%",
                      bgcolor: theme.palette.primary.dark,
                    }}
                  >
                    <CardActionArea
                      onClick={() => {
                        setValue(t.value);
                        setGo(true);
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
                      >
                        <CardMedia
                          sx={{
                            maxWidth: 200,
                            maxHeight: 200,
                          }}
                          alt={t.value}
                        >
                          <Avatar
                            sx={{
                              bgcolor: theme.palette.primary.main,
                              margin: "auto",
                              width: "200px",
                              height: "200px",
                            }}
                          >
                            <MyGravatar
                              email={oauth.email}
                              md5={md5}
                              size={200}
                            />
                          </Avatar>
                        </CardMedia>
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
            </Box>
          </RadioGroup>
        </FormControl>
      </Paper>
    </Box>
  );
}
