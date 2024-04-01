'use server';

import { CustomerInsightsApiClient } from '@/lib/customer-insights/customer-insights-api-client';

const apiClient = new CustomerInsightsApiClient();

export async function getCrispAccounts(token: string) {
  apiClient.setToken(token);
  return await apiClient.getCrispAccounts();
}
