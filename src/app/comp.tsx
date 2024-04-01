'use client';

import { Button } from '@/components/ui/button';
import UserContext from '@/contexts/user/user-context';
import { CrispAccount } from '@/lib/customer-insights/types';
import { useContext, useState } from 'react';
import { getCrispAccounts } from './test.actions';

export function Comp() {
  const userContext = useContext(UserContext);
  const [data, setData] = useState<CrispAccount[]>([]);

  return (
    <div>
      {userContext?.token && (
        <Button
          className='border border-gray-400 p-2 rounded'
          onClick={async () => {
            await getCrispAccounts(userContext?.token ?? '').then(
              async (res) => {
                if (res) {
                  setData(res.objects);
                }
              }
            );
          }}
        >
          Get CRISP Accounts
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
