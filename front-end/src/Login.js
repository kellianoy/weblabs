
/** @jsxImportSource @emotion/react */
import { useContext, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import crypto from 'crypto'
import qs from 'qs'
import axios from 'axios'
// Layout
import { useTheme } from '@mui/styles';
import { Link } from '@mui/material';
// Local
import Context from './Context'
import {
  useNavigate
} from "react-router-dom";

import { Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import StarIcon from '@mui/icons-material/Star';
import FullscreenIcon from '@mui/icons-material/Fullscreen';

import Grid from '@mui/material/Grid';

const base64URLEncode = (str) => {
  return str.toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

const sha256 = (buffer) => {
  return crypto
    .createHash('sha256')
    .update(buffer)
    .digest()
}

const useStyles = (theme) => ({
  root: {
    background: theme.palette.primary.dark,
    width:'100%',
    height:'100%'
  },
  cards: {
    display : 'flex',
    flex: '1 1 auto',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign : 'center',
    alignItems: 'center',
  },
  topleftsub: {
    textAlign: 'left',
    fontFamily: theme.palette.primary.textFont,
    fontSize: '24px',
    fontWeight: '600',
    color: theme.palette.primary.contrastText,
    margin:'0px',
    marginTop:'65px',
    marginLeft:'5%',
  },
  midleftsub: {
    textAlign: 'left',
    fontFamily: theme.palette.primary.textFont,
    fontSize: '26px',
    fontWeight: '600',
    color: theme.palette.primary.contrastText,
    margin:'0px',
    marginBottom: '1%',
  },
  middle: {
    display: 'flex',
    flex: '1 1 auto',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
  typetrack: {
    textAlign: 'left',
    fontFamily: theme.palette.primary.textFont,
    fontSize: '60px',
    fontWeight: '600',
    color: theme.palette.secondary.dark,
    margin:'0px',
    marginLeft:'5%',
  },
  titles: {
    textAlign: 'center',
    fontFamily: theme.palette.primary.textFont,
    fontSize: '42px',
    fontWeight: '600',
    color: theme.palette.secondary.dark,
    margin:'0px',
  },
  subtitles: {
    textAlign: 'center',
    fontFamily: theme.palette.primary.textFont,
    fontSize: '24px',
    fontWeight: '600',
    color: theme.palette.primary.contrastText,
    margin:'5px',
  },
  icons: {
    transform: 'scale(3)',
    color: theme.palette.secondary.dark,
    marginBottom: '8%',
  },
})

const Redirect = ({
  config,
  codeVerifier,
}) => {
  const styles = useStyles(useTheme())
  const redirect = (e) => {
    e.stopPropagation()
    const code_challenge = base64URLEncode(sha256(codeVerifier))
    const url = [
      `${config.authorization_endpoint}?`,
      `client_id=${config.client_id}&`,
      `scope=${config.scope}&`,
      `response_type=code&`,
      `redirect_uri=${config.redirect_uri}&`,
      `code_challenge=${code_challenge}&`,
      `code_challenge_method=S256`,
    ].join('')
    window.location = url
  }
  return (
    <div css={styles.root}>
      <Grid container rowSpacing={{ xs: 18, sm: 20, md: 30 }} columnSpacing={{ xs: 6, sm: 10, md: 14 }}>
        <Grid item xs={12}>
            <h2 css={styles.topleftsub}> Refined chatting for tasteful people </h2>
            <h1 css={styles.typetrack}> typetrack. </h1> 
        </Grid>
        <Grid item xs={12}>
          <div css={styles.middle}>
            <h1 css={styles.midleftsub}>Please, log in the application</h1>
              <Button size="medium" variant="contained" color="misc" onClick={
                redirect
              }>
                Log In
              </Button>
          </div>
        </Grid>
        <Grid item xs={4}>
            <div css={styles.cards}>
              <MenuIcon css={styles.icons}/>
              <h1 css={styles.titles}>Channels</h1>
              <h2 css={styles.subtitles}> Navigating through channels </h2>
              <h2 css={styles.subtitles}> never felt that good </h2>
            </div>
        </Grid>
        <Grid item xs={4}>
            <div css={styles.cards}>
              <StarIcon css={styles.icons}/>
              <h1 css={styles.titles}>Unique</h1>
              <h2 css={styles.subtitles}> Premium chatting experience</h2>
            </div>
        </Grid>
        <Grid item xs={4}>
            <div css={styles.cards}>
              <FullscreenIcon css={styles.icons}/>
              <h1 css={styles.titles}>Focused</h1>
              <h2 css={styles.subtitles}> Made by users for users, using </h2>
              <h2 css={styles.subtitles}> your feedback to improve</h2>
            </div>
        </Grid>
      </Grid>
    </div>
  )
}

const Tokens = ({
  oauth
}) => {
  const {setOauth} = useContext(Context)
  const styles = useStyles(useTheme())
  const {id_token} = oauth
  const id_payload = id_token.split('.')[1]
  const {email} = JSON.parse(atob(id_payload))
  const logout = (e) => {
    e.stopPropagation()
    setOauth(null)
  }
  return (
    <div css={styles.root}>
      Welcome {email} <Link onClick={logout} color="secondary">logout</Link>
    </div>
  )
}

const LoadToken = ({
  code,
  codeVerifier,
  config,
  removeCookie,
  setOauth
}) => {
  const styles = useStyles(useTheme())
  const navigate = useNavigate();
  useEffect( () => {
    const fetch = async () => {
      try {
        const {data} = await axios.post(
          config.token_endpoint
        , qs.stringify ({
          grant_type: 'authorization_code',
          client_id: `${config.client_id}`,
          code_verifier: `${codeVerifier}`,
          redirect_uri: `${config.redirect_uri}`,
          code: `${code}`,
        }))
        removeCookie('code_verifier')
        setOauth(data)
        navigate('/')
      }catch (err) {
        console.error(err)
      }
    }
    fetch()
  })
  return (
    <div css={styles.root}>Loading tokens</div>
  )
}

export default function Login({
  onUser
}) {
  const styles = useStyles(useTheme());
  // const location = useLocation();
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const {oauth, setOauth} = useContext(Context)
  const config = {
    authorization_endpoint: 'http://localhost:5556/dex/auth',
    token_endpoint: 'http://localhost:5556/dex/token',
    client_id: 'webtech-frontend',
    redirect_uri: 'http://localhost:3000',
    scope: 'openid%20email%20offline_access',
  }
  const params = new URLSearchParams(window.location.search)
  const code = params.get('code')
  // is there a code query parameters in the url 
  if(!code){ // no: we are not being redirected from an oauth server
    if(!oauth){
      const codeVerifier = base64URLEncode(crypto.randomBytes(32))
      console.log('set code_verifier', codeVerifier)
      setCookie('code_verifier', codeVerifier)
      return (
        <Redirect codeVerifier={codeVerifier} config={config} css={styles.root} />
      )
    }else{ // yes: user is already logged in, great, is is working
      return (
        <Tokens oauth={oauth} css={styles.root} />
      )
    }
  }else{ // yes: we are coming from an oauth server
    console.log('get code_verifier', cookies.code_verifier)
    return (
      <LoadToken
        code={code}
        codeVerifier={cookies.code_verifier}
        config={config}
        setOauth={setOauth}
        removeCookie={removeCookie} />
    )
  }
}
