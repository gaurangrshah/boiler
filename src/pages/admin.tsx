import { PageLayout } from 'chakra.ui';
import { useSession } from 'next-auth/react';

export default function AdminDashboard() {
  const { data: session } = useSession();
  // session is always non-null inside this page, all the way down the React tree.
  return (
    <PageLayout title="Admin Dashboard" type="default">
      Some super secret dashboard
    </PageLayout>
  );
}

AdminDashboard.auth = true; // this will trigger auth flow when this route is hit
