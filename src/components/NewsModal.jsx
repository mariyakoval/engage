import React from "react";
import Button from "./Button";


export default function NewsModal({ news, breakingNews, onClose }) {
  if (!news) return null;

  return (
<div className="fixed inset-0 bg-black bg-opacity-50 z-50 overflow-y-auto">
  <div className="min-h-full flex items-center justify-center px-4 py-8">
    <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl">
        <div className="relative w-full bg-red-700 text-white overflow-hidden h-12">
  {/* Marquee effect for breaking news */}
  <div className="left-0 top-0 h-full flex items-center px-4 font-serif text-lg font-semibold whitespace-nowrap animate-marquee">
    🔴 Breaking News: {breakingNews} &nbsp;
  </div>
</div>
    
        <img
          src={news.image}
          alt="News"
          className="w-full h-56 object-cover rounded-md mb-4"
        />

        <h2 className="text-xl font-bold mb-2">{news.headline}</h2>
        <p className="text-gray-700 mb-4">{news.content}</p>

        <Button onClick={onClose} className="mt-4 w-full">
          <span className="text">Continue</span>
        </Button>
      </div>
    </div>
    </div>
  );
}