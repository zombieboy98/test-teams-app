export default function manifest() {
  return {
    $schema:
      'https://developer.microsoft.com/en-us/json-schemas/teams/v1.15/MicrosoftTeams.schema.json',
    manifestVersion: '1.15',
    version: '1.0.0',
    id: `${process.env.TEAMS_APP_ID}`,
    packageName: 'com.microsoft.teams.extension',
    developer: {
      name: 'MCS Dev Team',
      websiteUrl: `${process.env.TAB_ENDPOINT}`,
      privacyUrl: `${process.env.TAB_ENDPOINT}/privacy-policy`,
      termsOfUseUrl: `${process.env.TAB_ENDPOINT}/terms-of-use`,
    },
    icons: {
      color: 'color.png',
      outline: 'outline.png',
    },
    name: {
      short: 'MCS - Teams App',
      full: 'Macquarie Cloud Services - Teams App',
    },
    description: {
      short: 'MCS tools for Teams',
      full: 'Teams App extensive features for Macquarie Cloud Services.',
    },
    accentColor: '#FFFFFF',
    bots: [],
    composeExtensions: [],
    configurableTabs: [],
    staticTabs: [
      {
        entityId: 'dashboard',
        name: 'Dashboard',
        contentUrl: `${process.env.TAB_ENDPOINT}/tabs/dashboard`,
        websiteUrl: `${process.env.TAB_ENDPOINT}`,
        scopes: ['personal'],
      },
      {
        entityId: 'accounts',
        name: 'Accounts',
        contentUrl: `${process.env.TAB_ENDPOINT}/tabs/accounts`,
        websiteUrl: `${process.env.TAB_ENDPOINT}/accounts`,
        scopes: ['personal'],
      },
    ],
    permissions: ['identity', 'messageTeamMembers'],
    validDomains: [`${process.env.TAB_ENDPOINT}`],
    webApplicationInfo: {
      id: `${process.env.AAD_APP_CLIENT_ID}`,
      resource: `api://${process.env.TAB_DOMAIN}/${process.env.AAD_APP_CLIENT_ID}`,
    },
  };
}
