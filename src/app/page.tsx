'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();
  
  useEffect(() => {
    router.replace('/sent');
  }, [router]);
  
  return (
    <div className="p-8 flex justify-center items-center">
      <p>正在重定向到已发送页面...</p>
    </div>
  );
}
