import { ApiResponse, CrispAccount, MetricDataItem } from './types';

const CUSTOMER_INSIGHT_API_HOST = process.env.CUSTOMER_INSIGHT_API_HOST!;

export class CustomerInsightsApiClient {
  constructor(protected accessToken?: string) {}

  async getCrispAccounts() {
    return await fetch(`${CUSTOMER_INSIGHT_API_HOST}/crispaccount/`, {
      headers: this.getHeaders(),
    }).then(async (res) => {
      if (res.status === 200) {
        return (await res.json()) as ApiResponse<CrispAccount[]>;
      } else {
        console.error('Failed retrieving CRISP accounts');
        return null;
      }
    });
  }

  async getGlobalMetric() {
    return await fetch(`${CUSTOMER_INSIGHT_API_HOST}/globalmetric/`, {
      headers: this.getHeaders(),
    }).then(async (res) => {
      if (res.status === 200) {
        return (await res.json()) as ApiResponse<MetricDataItem[]>;
      } else {
        console.error('Failed retrieving global metric');
        return null;
      }
    });
  }

  async setToken(accessToken: string) {
    this.accessToken = accessToken;
  }

  private getHeaders(additionalHeaders?: { [key: string]: string }) {
    const baseHeaders = {
      Authorization: `Bearer ${this.accessToken}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    return { ...baseHeaders, ...additionalHeaders };
  }
}
