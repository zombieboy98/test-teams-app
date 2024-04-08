import CustomerInsightsAccountDetailsPage from '@/components/page/customer-insights/accounts/[id]';

type Props = {
  params: { id: string };
};

export default function CustomerInsightsAccountDetailsWebsite({
  params,
}: Props) {
  return <CustomerInsightsAccountDetailsPage id={params.id} />;
}
