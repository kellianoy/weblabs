
/** @jsxImportSource @emotion/react */
// Layout
import { useTheme } from '@mui/styles';
import { Grid, Typography } from '@mui/material';
import { ReactComponent as ChannelIcon } from './icons/channel.svg';
import { ReactComponent as FriendsIcon } from './icons/friends.svg';
import { ReactComponent as SettingsIcon } from './icons/settings.svg';
import ChannelHeader from './ChannelHeader';

const useStyles = (theme) => ({
  root: {
    flex: '1 6',
    display: 'flex',
    flexDirection: 'column',
    background: theme.palette.primary.light,
  },
  card: {
    textAlign: 'center',
  },
  icon: {
    width: '30%',
    fill: theme.palette.secondary.dark,
  }
})

export default function Welcome() {
  const styles = useStyles(useTheme())
  return (
    <div css={styles.root}>
      <ChannelHeader name={"Home"}/>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={5}
      >
        <Grid item xs>
          <div css={styles.card}>
            <ChannelIcon css={styles.icon} />
            <Typography color="contrastText">
              Create channels
            </Typography>
          </div>
        </Grid>
        <Grid item xs>
          <div css={styles.card}>
            <FriendsIcon css={styles.icon} />
            <Typography color="contrastText">
              Invite friends
            </Typography>
          </div>
        </Grid>
        <Grid item xs>
          <div css={styles.card}>
            <SettingsIcon css={styles.icon} />
            <Typography color="contrastText">
              Settings
            </Typography>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
