import { TAuthConfig } from 'react-oauth2-code-pkce';

export const authConfig: TAuthConfig = {
    clientId: 'users-app',
    authorizationEndpoint: 'http://api.quqee.tech/auth/realms/hits-project/protocol/openid-connect/auth',
    tokenEndpoint: 'http://api.quqee.tech/auth/realms/hits-project/protocol/openid-connect/token',
    redirectUri: 'http://localhost:5173/',
    scope: 'openid',
}