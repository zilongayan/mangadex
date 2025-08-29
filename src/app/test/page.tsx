import TestMangaDex from '../../../test-mangadex';

export default function TestPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-8">
        <h1 className="text-4xl font-bold text-center mb-8">
          🧪 Test API MangaDex
        </h1>
        <TestMangaDex />
      </div>
    </div>
  );
}
