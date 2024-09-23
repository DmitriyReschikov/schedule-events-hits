import { TAuthConfig } from 'react-oauth2-code-pkce';

export const authConfig: TAuthConfig = {
    clientId: 'users-app',
    authorizationEndpoint: 'http://staziss-tech.ru:8085/realms/hits-project/protocol/openid-connect/auth',
    tokenEndpoint: 'http://staziss-tech.ru:8085/realms/hits-project/protocol/openid-connect/token',
    redirectUri: 'http://localhost:3000/',
    scope: 'openid'
}