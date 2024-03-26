'use client';

import { Client } from '@microsoft/microsoft-graph-client';
import { TokenCredentialAuthenticationProvider } from '@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials';
import { app, authentication } from '@microsoft/teams-js';
import {
  TeamsUserCredential,
  TeamsUserCredentialAuthConfig,
} from '@microsoft/teamsfx';
import { useState } from 'react';
import { testApi } from './test.actions';

export function Comp({
  clientId,
  initiateLoginEndpoint,
}: {
  clientId: string;
  initiateLoginEndpoint: string;
}) {
  const [data, setData] = useState<
    {
      account_id: number;
      ext: number;
      home_page: string;
      industry: string;
      name: string;
      notes: string;
      num_of_employees: number;
      parent_id: number;
      phone: string;
    }[]
  >([]);
  const authConfig: TeamsUserCredentialAuthConfig = {
    clientId,
    initiateLoginEndpoint,
  };

  // const { teamsUserCredential } = useTeamsUserCredential({
  //   clientId,
  //   initiateLoginEndpoint,
  // });

  return (
    <div>
      <button
        onClick={async () => {
          const teamsUserCredential = new TeamsUserCredential(authConfig);
          const authProvider = new TokenCredentialAuthenticationProvider(
            teamsUserCredential,
            {
              scopes: ['User.Read'],
            }
          );
          const graphClient = Client.initWithMiddleware({
            authProvider: authProvider,
          });
          const profile = await graphClient.api('/me').get();

          console.log('PROFILE', profile);
        }}
      ></button>
      <button
        className='border border-gray-400 p-2 rounded'
        onClick={async () => {
          app
            .initialize()
            .then(() => {
              Promise.all([
                app.getContext(),
                authentication.getAuthToken(),
              ]).then(async ([context, token]) => {
                await testApi(token).then(async (res) => {
                  setData(res.objects);
                });

                // fetch(
                //   'https://customer-insights-api.macquariecloudservices.com/api/crispaccount',
                //   {
                //     headers: {
                //       Authorization: `Bearer ${token}`,
                //       Accept: 'application/json',
                //       'Content-Type': 'application/json',
                //     },
                //   }
                // )
                //   .then((res) => {
                //     console.log(res);
                //   })
                //   .catch((err) => {
                //     console.log(err);
                //   });
              });
            })
            .catch((err) => console.log(err));
        }}
      >
        Test
      </button>
      <div>
        {data.map((d, index) => (
          <div key={index}>{d.name}</div>
        ))}
      </div>
    </div>
  );
}
