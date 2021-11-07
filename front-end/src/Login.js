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
    //let's ask for verification if we have a coe
    axios
    .post("http://127.0.0.1:5556/dex/token", qs.stringify(
      {
        grant_type: 'authorization_code',
        client_id: "typetrack",
        redirect_uri: "http://localhost:3000/callback",
        code_verifier: cookies.get('codeVerifier'),
        code: params.code
      }))
      .then(res => //Great ! The code worked. Now let's get the user info
        {
          console.log("yeay res", res)
          cookies.set('refresh_token', res.data.refresh_token, { path: '/' })
          axios
          .get("http://127.0.0.1:5556/dex/userinfo", {
            headers: {
              'Authorization': "Bearer " + res.data.access_token 
            }
          })
          .then(res=>
            { //Let's send the user back to the main page
              window.location.replace("http://localhost:3000")
            })
          .catch(err => console.log('error: ', err));
        }
      )
      .catch(err => console.log('error: ', err));
  }
  else {
      //Check if the user is logged in or not, if so, let's enter the app
    if (cookies.get("refresh_token")) {
      axios
      .post("http://127.0.0.1:5556/dex/token", qs.stringify(
        {
          grant_type: 'refresh_token',
          client_id: "typetrack",
          refresh_token: cookies.get("refresh_token")
        }))
        .then(res=>
        {
          cookies.set('refresh_token', res.data.refresh_token, { path: '/' })
          axios
          .get("http://127.0.0.1:5556/dex/userinfo", {
            headers: {
              'Authorization': "Bearer " + res.data.access_token 
            }
          })
          .then(res=> //we send our result to the user array
            { 
              console.log(res.data.email)
              onUser({ username: res.data.email })
            })
          .catch(err => { 
            console.log('error: ', err)
          })
        })
        .catch(err => //if error we remove the refresh token and we start again
          {
          cookies.remove("refresh_token")
          console.log('error: ', err)
        })
          
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
                    + "?", "client_id=typetrack"  
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