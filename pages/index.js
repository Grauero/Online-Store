import React from 'react';
import Link from 'next/link';

const Index = () => (
  <div>
    <h1>Index page</h1>
    <Link href="/sell">
      <a>sell</a>
    </Link>
  </div>
);

export default Index;
