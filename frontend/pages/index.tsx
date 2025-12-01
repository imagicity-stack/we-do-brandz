import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { detectLocale } from '../src/utils/locale';

export default function IndexPage() {
  const router = useRouter();

  useEffect(() => {
    const locale = detectLocale();
    router.replace(`/${locale}`);
  }, [router]);

  return (
    <main className="main-container" style={{ padding: '48px 0' }}>
      <p>Redirecting to your localized experience...</p>
    </main>
  );
}
