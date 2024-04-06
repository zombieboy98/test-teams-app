export default function manifest() {
  return {
    $schema:
      'https://developer.microsoft.com/en-us/json-schemas/teams/v1.15/MicrosoftTeams.schema.json',
    manifestVersion: '1.15',
    version: '1.0.0',
    id: `${process.env.TEAMS_APP_ID}`,
    packageName: 'com.microsoft.teams.extension',
    developer: {
      name: 'Macquarie Telecom Group',
      websiteUrl: 'https://macquarietechnologygroup.com/about-us',
      privacyUrl: 'https://macquarietechnologygroup.com/privacy-policy',
      termsOfUseUrl: 'https://macquarietechnologygroup.com/terms-of-use',
    },
    icons: {
      color: 'color.png',
      outline: 'outline.png',
    },
    name: {
      short: 'MCS - Customer Insights',
      full: 'Macquarie Cloud Services - Teams App',
    },
    description: {
      short: 'MCS customer insights tool',
      full: 'Macquarie Cloud Services customer insights tool for Microsoft Teams',
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
        entityId: 'customer-insights',
        name: 'Customer Insights',
        contentUrl: `${process.env.TAB_ENDPOINT}/tabs/customer-insights`,
        websiteUrl: `${process.env.TAB_ENDPOINT}/customer-insights`,
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
