export const oktaConfig = {
    clientId: "0oa8jbj3jn2ct58HJ5d7",
    issuer: "https://dev-84678356.okta.com/oauth2/default",
    redirectUri: "https://localhost:3000/login/callback",
    scopes: ["openid", "profile", "email"],
    pkce: true,
    disableHttpsCheck: true
}