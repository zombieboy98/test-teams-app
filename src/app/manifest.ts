import aadManifest from './aad.manifest';

export default function manifest() {
  return {
    ...aadManifest(),
    $schema:
      'https://developer.microsoft.com/en-us/json-schemas/teams/v1.15/MicrosoftTeams.schema.json',
    manifestVersion: '1.15',
    version: '1.0.0',
    id: `${process.env.TAB_ENDPOINT}`,
    packageName: 'com.microsoft.teams.extension',
    developer: {
      name: 'Teams App, Inc.',
      websiteUrl: `${process.env.TAB_ENDPOINT}`,
      privacyUrl: `${process.env.TAB_ENDPOINT}/privacy-policy`,
      termsOfUseUrl: `${process.env.TAB_ENDPOINT}/terms-of-use`,
    },
    icons: {
      color: 'color.png',
      outline: 'outline.png',
    },
    name: {
      short: 'McsTeamAppDemo',
      full: 'Macquarie Cloud Services Teams App Demo',
    },
    description: {
      short: 'A demo for teams.',
      full: 'A long description for the demo for teams.',
    },
    accentColor: '#FFFFFF',
    bots: [],
    composeExtensions: [],
    configurableTabs: [],
    staticTabs: [
      {
        entityId: 'index',
        name: 'Personal Tab',
        contentUrl: `${process.env.TAB_ENDPOINT}`,
        websiteUrl: `${process.env.TAB_ENDPOINT}`,
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
