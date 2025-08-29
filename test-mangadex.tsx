'use client';

import { useState, useEffect } from 'react';

export default function TestMangaDex() {
  const [mangas, setMangas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMangas = async () => {
      try {
        setLoading(true);
        // Test direct de l'API MangaDex
        const response = await fetch('/api/mangadex/manga?limit=5&includes[]=cover_art&includes[]=author');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('API Response:', data);
        setMangas(data.data || []);
      } catch (err) {
        console.error('API Error:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchMangas();
  }, []);

  if (loading) return <div className="p-4">Chargement des mangas...</div>;
  if (error) return <div className="p-4 text-red-500">Erreur: {error}</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Test API MangaDex</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mangas.map((manga) => (
          <div key={manga.id} className="border rounded-lg p-4">
            <h3 className="font-semibold">
              {manga.attributes?.title?.en || 'Sans titre'}
            </h3>
            <p className="text-sm text-gray-600">
              {manga.attributes?.description?.en?.substring(0, 100)}...
            </p>
            <p className="text-xs text-gray-500 mt-2">
              ID: {manga.id}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
