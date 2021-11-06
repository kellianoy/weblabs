/** @jsxImportSource @emotion/react */
// Layout
import { useTheme } from '@mui/styles';
import { Button } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';

import Cookies from 'universal-cookie';
import crypto from 'crypto';
import queryString from 'query-string';
import axios from 'axios';
import qs from 'qs'

//Encrypting data for challenge
function base64URLEncode(str) {
  return str.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

function sha256(buffer) {
  return crypto.createHash('sha256').update(buffer).digest();
}

//starting cookies
const cookies = new Cookies();

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

export default function Login
({ 
  onUser 
}) {
  const styles = useStyles(useTheme())
  
  //let's check if there are params
  const url = window.location.search;
  const params = queryString.parse(url);

  //If there is a query code
  if (params.code)
  {


    axios.post("http://127.0.0.1:5556/dex/token", qs.stringify(
      {
        grant_type: 'authorization_code',
        client_id: "example-app",
        redirect_uri: "http://localhost:3000/callback",
        code_verifier: cookies.get('codeVerifier'),
        code: params.code
      }
    )).then(function(response){
      console.log(response);
    }); 
    return null;
  }
  else {
      //Check if the user is logged in or not, if so, let's enter the app
    if (cookies.get("username")) {
      onUser( { username: cookies.get('username') })
      return null;
    }
    else { //if he is not logged, let's register
      return (
        <div css={styles.root}>
          <div>
            <h1 css={{ marginLeft: '10px' }}>Please, log in the application</h1>
            <fieldset>
              <Button variant="contained" color="primary" onClick={(e) => {
                e.stopPropagation()
      
                //First, let's build our url

                //let's generate a code verifier
                const code_verifier = base64URLEncode(crypto.randomBytes(32))

                //let's save it in the cookies
                cookies.set('codeVerifier', code_verifier, { path: '/' });
                console.log(cookies.get('codeVerifier'));

                //let's create a code challenge for this code
                const code_challenge = base64URLEncode(sha256(code_verifier))

                //we can now create our url
                var url = ["http://127.0.0.1:5556/dex/auth" 
                    + "?", "client_id=example-app"  
                    + "&", "scope=openid email offline_access"
                    + "&", "response_type=code&", "redirect_uri=http://localhost:3000/callback"
                    + "&", "code_challenge=" + code_challenge 
                    + "&", "code_challenge_method=S256"].join('');
                
                //and redirect the user to it
                console.log(url)
                window.location.replace(url)
                
              }}>
                Log In <LoginIcon />
              </Button>
            </fieldset>
          </div>
        </div>
  
      );
    }
  }
}