
/** @jsxImportSource @emotion/react */
import React, { useContext, useEffect } from 'react';
import axios from 'axios';
// Layout
import { useTheme } from '@mui/styles';
import { Button, IconButton, Link } from '@mui/material';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useNavigate } from 'react-router-dom'
import { Link as RouterLink } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import FolderIcon from '@mui/icons-material/Folder';
import SettingsIcon from '@mui/icons-material/Settings';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import AppBar from '@mui/material/AppBar';
import Tooltip from '@mui/material/Tooltip';
import ArrowRight from '@mui/icons-material/ArrowRight';
// Local
import Context from './Context'

const useStyles = (theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
  channels: {
    '& a': {
      padding: '.2rem .5rem',
      whiteSpace: 'nowrap',
    },
  },
  channel: {
    center: 'left',
    fontFamily: theme.palette.primary.textFont,
    fontSize: '16px',
    fontWeight: '600',
    color: theme.palette.primary.contrastText,
  },
  typetrack: {
    center: 'center',
    fontFamily: theme.palette.primary.textFont,
    fontSize: '22px',
    fontWeight: '600',
    color: theme.palette.secondary.dark,
  },
})

const StyledTabs = styled((props) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />))(
    ({ theme }) =>
    ({
      '& .MuiTabs-indicator': {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'transparent',
      },
      '& .MuiTabs-indicatorSpan': {
        maxWidth: 30,
        width: '100%',
        height: '30%',
        margin: 'auto',
        backgroundColor: theme.palette.misc.main,
      },
    }));

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: 'none',
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(1),
    color: theme.palette.primary.contrastText,
    margin: '6px',
    '&.Mui-selected': {
      color: theme.palette.misc.main,
    },
    '&:hover': {
      borderRadius: '4px',
      backgroundColor: theme.palette.primary.light,
    }
  }),
);

export default function Channels() {
  const theme = useTheme()
  const styles = useStyles(theme)
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const {
    oauth, setOauth,
    channels, setChannels
  } = useContext(Context)
  const navigate = useNavigate();
  useEffect(() => {
    const fetch = async () => {
      try {
        const { data: channels } = await axios.get('http://localhost:3001/channels', {
          headers: {
            'Authorization': `Bearer ${oauth.access_token}`
          }
        })
        setChannels(channels)
      } catch (err) {
        console.error(err)
      }
    }
    fetch()
  }, [oauth, setChannels])

  const onClickLogout = (e) => {
    e.stopPropagation()
    setOauth(null)
  }

  return (
    <div css={styles.root}>
      <Box sx={{ flexGrow: 1 }}>
        <StyledTabs
          orientation="vertical"
          value={value}
          onChange={handleChange}
          centered="true"
          variant="scrollable"
          scrollButtons='auto'
          sx={{
            [`& .${tabsClasses.scrollButtons}`]: {
              '&.Mui-disabled': { opacity: 0.3 },
            },
          }}
        >
          <StyledTab wrapped label="typetrack" css={styles.typetrack} component={RouterLink} to="/channels" />
          <Divider variant="middle" css={{ backgroundColor: theme.palette.primary.contrastText, width: "20%", margin: 'auto' }} />
          {channels.map((channel, i) => (
            <StyledTab wrapped label={channel.name} css={styles.channel} onClick={(e) => {
              e.preventDefault()
              navigate(`/channels/${channel.id}`)
            }} />
          ))}
        </StyledTabs>
        <Divider variant="middle" css={{ backgroundColor: theme.palette.primary.contrastText }} />
      </Box>

      <AppBar position="absolute" sx={{ backgroundColor: theme.palette.primary.dark, top: 'auto', bottom: 0 }}>
        <List>

          <ListItem disablePadding>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: theme.palette.misc.main, margin: 'auto', width: '36px', height: '36px', }}>
                <FolderIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={oauth.email}
              primaryTypographyProps={{
                fontSize: 16,
                fontWeight: '400',
                letterSpacing: 0,
                color: theme.palette.secondary.main,
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
              }}
              secondary="jeune âme en perdition"
              secondaryTypographyProps={{
                fontSize: 14,
                color: theme.palette.primary.contrastText,
              }}
            />
            <Tooltip title="Settings">
              <IconButton
                color="misc"
                size="large"
                sx={{
                  color: theme.palette.misc.main,
                  '& svg': {
                    color: theme.palette.misc.main,
                    transition: '0.2s',
                    transform: 'translateX(0) rotate(0)',
                  },
                  '&:hover, &:focus': {
                    bgcolor: 'unset',
                    opacity: '0.85',
                    '& svg:first-of-type': {
                      transform: 'translateX(-4px) rotate(-20deg)',
                    },
                    '& svg:last-of-type': {
                      right: 0,
                      opacity: 1,
                    },
                  },
                  '&:after': {
                    content: '""',
                    position: 'absolute',
                    height: '80%',
                    display: 'block',
                    left: 0,
                    width: '1px',
                    bgcolor: 'divider',
                  },
                }}
              >
                <SettingsIcon />
                <ArrowRight sx={{ position: 'absolute', right: 4, opacity: 0 }} />
              </IconButton>
            </Tooltip>
          </ListItem>
        </List >
      </AppBar>
    </div >
  );
}