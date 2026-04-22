import { Suspense } from 'react';
import CommissionClient from './CommissionClient';

export default function OrderPage() {
  return (
    <Suspense>
      <CommissionClient />
    </Suspense>
  );
}
