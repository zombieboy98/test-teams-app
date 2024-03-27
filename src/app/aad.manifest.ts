export default function aadManifest() {
  return {
    id: process.env.AAD_APP_OBJECT_ID,
    appId: process.env.AAD_APP_CLIENT_ID,
    name: 'McsTeamAppDemo-AAD',
    accessTokenAcceptedVersion: 2,
    signInAudience: 'AzureADMyOrg',
    optionalClaims: {
      idToken: [],
      accessToken: [
        {
          name: 'idtyp',
          source: null,
          essential: false,
          additionalProperties: [],
        },
      ],
      saml2Token: [],
    },
    requiredResourceAccess: [
      {
        resourceAppId: 'Microsoft Graph',
        resourceAccess: [
          {
            id: 'User.Read',
            type: 'Scope',
          },
        ],
      },
    ],
    oauth2Permissions: [
      {
        adminConsentDescription:
          "Allows Teams to call the app's web APIs as the current user.",
        adminConsentDisplayName: "Teams can access app's web APIs",
        id: process.env.AAD_APP_ACCESS_AS_USER_PERMISSION_ID,
        isEnabled: true,
        type: 'User',
        userConsentDescription:
          "Enable Teams to call this app's web APIs with the same rights that you have",
        userConsentDisplayName:
          "Teams can access app's web APIs and make requests on your behalf",
        value: 'access_as_user',
      },
    ],
    preAuthorizedApplications: [
      {
        appId: '1fec8e78-bce4-4aaf-ab1b-5451cc387264',
        permissionIds: [process.env.AAD_APP_ACCESS_AS_USER_PERMISSION_ID],
      },
      {
        appId: '5e3ce6c0-2b1f-4285-8d4b-75ee78787346',
        permissionIds: [process.env.AAD_APP_ACCESS_AS_USER_PERMISSION_ID],
      },
      {
        appId: 'd3590ed6-52b3-4102-aeff-aad2292ab01c',
        permissionIds: [process.env.AAD_APP_ACCESS_AS_USER_PERMISSION_ID],
      },
      {
        appId: '00000002-0000-0ff1-ce00-000000000000',
        permissionIds: [process.env.AAD_APP_ACCESS_AS_USER_PERMISSION_ID],
      },
      {
        appId: 'bc59ab01-8403-45c6-8796-ac3ef710b3e3',
        permissionIds: [process.env.AAD_APP_ACCESS_AS_USER_PERMISSION_ID],
      },
      {
        appId: '0ec893e0-5785-4de6-99da-4ed124e5296c',
        permissionIds: [process.env.AAD_APP_ACCESS_AS_USER_PERMISSION_ID],
      },
      {
        appId: '4765445b-32c6-49b0-83e6-1d93765276ca',
        permissionIds: [process.env.AAD_APP_ACCESS_AS_USER_PERMISSION_ID],
      },
      {
        appId: '4345a7b9-9a63-4910-a426-35363201d503',
        permissionIds: [process.env.AAD_APP_ACCESS_AS_USER_PERMISSION_ID],
      },
    ],
    identifierUris: [
      `api://${process.env.TAB_DOMAIN}/${process.env.AAD_APP_CLIENT_ID}`,
    ],
    replyUrlsWithType: [
      {
        url: `${process.env.TAB_ENDPOINT}/auth-end.html`,
        type: 'Web',
      },
      {
        url: `${process.env.TAB_ENDPOINT}/auth-end.html?clientId=${process.env.AAD_APP_CLIENT_ID}`,
        type: 'Spa',
      },
      {
        url: `${process.env.TAB_ENDPOINT}/blank-auth-end.html`,
        type: 'Spa',
      },
    ],
  };
}
