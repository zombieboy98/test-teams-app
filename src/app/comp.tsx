'use client';

import { Button } from '@/components/ui/button';
import UserContext from '@/contexts/user/user-context';
import { TeamsUserCredentialAuthConfig } from '@microsoft/teamsfx';
import { useContext, useState } from 'react';
import { testApi } from './test.actions';

export function Comp({
  clientId,
  initiateLoginEndpoint,
}: {
  clientId: string;
  initiateLoginEndpoint: string;
}) {
  const userContext = useContext(UserContext);

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

  return (
    <div>
      {userContext?.token && (
        <Button
          className='border border-gray-400 p-2 rounded'
          onClick={async () => {
            await testApi(userContext?.token ?? '').then(async (res) => {
              setData(res.objects);
            });
          }}
        >
          Test
        </Button>
      )}

      <div>
        {data.map((d, index) => (
          <div key={index}>{d.name}</div>
        ))}
      </div>
    </div>
  );
}
