'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';

const categories = ['All', 'Technical', 'Business', 'Legal', 'Environmental'];

const placeholderResults = [
  {
    title: 'KPP Technical Datasheet',
    category: 'Technical',
    description: 'Complete technical specifications and performance data',
  },
  {
    title: 'Environmental Impact Assessment',
    category: 'Environmental',
    description: 'Comprehensive environmental impact analysis',
  },
  {
    title: 'Investment Prospectus 2024',
    category: 'Business',
    description: 'Comprehensive investment opportunity overview',
  },
  {
    title: 'Government Contract',
    category: 'Legal',
    description: 'Official government contract for KPP project',
  },
];

export default function SearchSystem() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');

  const filteredResults = placeholderResults.filter(doc => {
    const matchesCategory = category === 'All' || doc.category === category;
    const matchesQuery =
      doc.title.toLowerCase().includes(query.toLowerCase()) ||
      doc.description.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <div className='w-full max-w-2xl mx-auto'>
      <form className='flex gap-2 mb-4' onSubmit={e => e.preventDefault()}>
        <div className='relative flex-1'>
          <input
            type='text'
            className='w-full border border-gray-300 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-primary'
            placeholder='Search documents...'
            value={query}
            onChange={e => setQuery(e.target.value)}
            aria-label='Search documents'
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white" />
        </div>
        <select
          className='border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary'
          value={category}
          onChange={e => setCategory(e.target.value)}
          aria-label='Filter by category'
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </form>
      <div className='space-y-4'>
        {filteredResults.length === 0 ? (
          <div className="text-white">
            No documents found.
          </div>
        ) : (
          filteredResults.map((doc, i) => (
            <div key={i} className='bg-white border rounded-lg p-4 shadow-sm'>
              <div className='flex items-center justify-between mb-1'>
                <span className='font-semibold text-primary'>{doc.title}</span>
                <span className="text-xs bg-gray-100 text-white">
                  {doc.category}
                </span>
              </div>
              <p className="text-white">{doc.description}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
