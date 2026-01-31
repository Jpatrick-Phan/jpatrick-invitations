import Link from 'next/link';
import { cardService } from '@/lib/cardService';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ArrowRight } from 'lucide-react';

export default async function Home() {
  const cards = await cardService.getAllCards();
  // Only show public cards on the landing page
  // Note: I am assuming visibility is top-level based on my plan, but let's check if it's in config
  // My plan said "Update SectionEditor to include Visibility in config". So it SHOULD be in config?
  // User request: "nếu private thì sẽ ko hiển thị ở ở /".
  // Legacy data structure: `theme` is top level. `config` is object.
  // I will support checking BOTH top level `visibility` OR `config.visibility` to be safe/flexible.
  // const isPrivate = card.visibility === 'private' || card.config?.visibility === 'private';

  const displayCards = cards.filter(card => {
    const isPrivate = card.visibility === 'private' || card.config?.visibility === 'private';
    return !isPrivate;
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8">
      <div className="max-w-4xl w-full space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight">Letter - Invitation Platform</h1>
          <p className="text-lg text-gray-600">Select an event to view or go to the Admin Panel to create a new one.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayCards.length === 0 && <div className="col-span-3 text-center text-gray-400">No public events found.</div>}
          {displayCards.map((card) => (
            <Link href={`/${card.id}`} key={card.id} className="block group">
              <Card className="h-full hover:shadow-xl transition-all border-none shadow-md overflow-hidden">
                <div className="h-40 bg-gray-200 relative">
                  {card.hero?.image ? (
                    <img src={card.hero.image} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-100">No Preview</div>
                  )}
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                </div>
                <CardHeader>
                  <CardTitle className="capitalize flex items-center justify-between">
                    {card.id}
                    <ArrowRight size={16} className="-ml-4 opacity-0 group-hover:opacity-100 group-hover:ml-0 transition-all text-primary" />
                  </CardTitle>
                  <CardDescription>{card.hero?.names || 'Event'}</CardDescription>
                </CardHeader>
                <CardContent>
                  <span className="text-xs font-medium px-2 py-1 bg-gray-100 rounded-full text-gray-600">{card.theme || 'Wedding'}</span>
                </CardContent>
              </Card>
            </Link>
          ))}

          <Link href="/admin" className="block group">
            <Card className="h-full border-dashed border-2 border-gray-300 bg-transparent hover:border-gray-400 hover:bg-gray-50 transition-all flex flex-col items-center justify-center text-gray-500 min-h-[250px]">
              <div className="p-4 rounded-full bg-gray-100 mb-4 group-hover:scale-110 transition-transform">
                <ArrowRight size={24} />
              </div>
              <span className="font-medium">Go to Admin Panel</span>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}
