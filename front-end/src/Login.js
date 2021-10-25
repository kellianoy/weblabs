
/** @jsxImportSource @emotion/react */
// Layout
import { useTheme } from '@mui/styles';

import {Button, TextField} from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';

const useStyles = (theme) => ({
  root: {
    flex: '1 1 auto',
    background: theme.palette.background.default,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    '& > div': {
      margin: `${theme.spacing(1)}`,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    '& fieldset': {
      border: 'none',
      '& label': {
        marginBottom: theme.spacing(.5),
        display: 'block',
      },
    },
  },
})

export default function Login({
  onUser
}) {
  const styles = useStyles(useTheme())
  return (
    <div css={styles.root}>
      <div>
        <h1 css={{marginLeft: '10px'}}>Please, log in the application</h1>
        <fieldset>
          <TextField id="username" label="Username" color="secondary" variant="standard" />
        </fieldset>
        <fieldset>
          <TextField id="password" label="Password" color="secondary" variant="standard" type="password"/>
        </fieldset>
        <fieldset>
          <Button variant="contained" color="primary" onClick={ (e) => {
              e.stopPropagation()
              onUser({username: 'david'})
            }}>
            Log In <LoginIcon/>
          </Button>
        </fieldset>
      </div>
    </div>
  );
}
