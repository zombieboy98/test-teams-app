import CustomerInsightsContactDetailsPage from '@/components/page/customer-insights/contacts/[id]';

type Props = {
  params: { id: string };
};

export default function CustomerInsightsContactsDetailsTab({ params }: Props) {
  return <CustomerInsightsContactDetailsPage id={params.id} />;
}
