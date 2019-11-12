const credentials = {
    client: {
      id: process.env.APP_ID,
      secret: process.env.APP_PASSWORD,
    },
    auth: {
      tokenHost: 'https://login.microsoftonline.com',
      authorizePath: 'common/oauth2/v2.0/authorize',
      tokenPath: 'common/oauth2/v2.0/token'
    }
  };
  const oauth2 = require('simple-oauth2').create(credentials);
  
  function getAuthUrl() {
    const returnVal = oauth2.authorizationCode.authorizeURL({
      redirect_uri: process.env.REDIRECT_URI,
      scope: process.env.APP_SCOPES
    });
    return returnVal;
  }

  exports.getAuthUrl = getAuthUrl;

  async function getTokenFromCode(auth_code) {
    let result = await oauth2.authorizationCode.getToken({
      code: auth_code,
      redirect_uri: process.env.REDIRECT_URI,
      scope: process.env.APP_SCOPES
    });
  
    const token = oauth2.accessToken.create(result);
    return token;
  }
  
  exports.getTokenFromCode = getTokenFromCode;

async function checkToken (token) {
    const FIVE_MINUTES = 300000;
    const expiration = await new Date(token.expires_at) - new Date();
    console.log(`Token will expired in ${expiration}`);
    if (expiration > FIVE_MINUTES) {
      // Token is still good, just return it
      return token.access_token;
    }
  // Either no token or it's expired, use the refresh token to apply new tokens.
    else {
        const refresh_token = token.refresh_token;
        if (refresh_token) {
            const newToken = await oauth2.accessToken.create({refresh_token: refresh_token}).refresh();
            const saveToken = require('./dataset/save_token');
            //update token saveToken.updateToken
            saveToken.updateToken(newToken);
            return newToken.token.access_token;
    }
    
  }
}
exports.checkToken = checkToken;