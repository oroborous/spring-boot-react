export const OktaConfig = {
    clientId: "0oa8h00btrx22LwCI5d7",
    issuer: "https://dev-84678356.okta.com/oauth2/default",
    redirectUri: "http://localhost:3000/login/callback",
    scopes: ["openid", "profile", "email"],
    pkce: true,
    disableHttpsCheck: true
}