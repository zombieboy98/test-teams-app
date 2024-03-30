'use server';

export async function testApi(token: string) {
  return await fetch(
    'https://customer-insights-api.macquariecloudservices.com/api/crispaccount/',
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  )
    .then(async (res) => {
      const x = await res.json();
      return x;
    })
    .catch((err) => {
      console.log(err);
    });
}
