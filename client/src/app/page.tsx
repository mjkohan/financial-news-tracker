import { Suspense } from 'react';
import PostsOverview from '@/components/NewsOverview';
import { ModeToggle } from '@/components/theme/mode-toggle';
// import StockTracker from '@/components/StockTracker';
//import MarketIndices from '@/components/MarketIndices';

export default function Home() {
  return (
    <main className="container mx-auto py-8">
      <div className="grid gap-8">
        <ModeToggle/>
        {/* <MarketIndices /> */}
          {/* <PostsOverview /> */}
        {/* <StockTracker /> */}
      </div>
    </main>
  );
}
