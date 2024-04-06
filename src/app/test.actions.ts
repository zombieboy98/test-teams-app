'use server';

import { CustomerInsightsApiClient } from '@/lib/customer-insights/customer-insights-api-client';

const apiClient = new CustomerInsightsApiClient();

export async function getCrispAccounts(token: string, searchParams?: string) {
  apiClient.setToken(token);
  return await apiClient.getCrispAccounts(searchParams);
}

export async function getGlobalMetric(token: string) {
  apiClient.setToken(token);
  return await apiClient.getGlobalMetric();
}
