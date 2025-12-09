
import React, { useEffect, useState } from 'react';
import { fetchAllReviews, deleteReview } from '../../services/adminService';
import { Trash2, Star, Flag, CheckCircle } from 'lucide-react';

const ReviewManager = () => {
  const [reviews, setReviews] = useState<any[]>([]);

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = () => {
    fetchAllReviews().then(setReviews).catch(console.error);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Delete this review? This cannot be undone.")) {
        await deleteReview(id);
        loadReviews();
    }
  };

  return (
    <div className="p-4 md:p-8">
       <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">Review Moderation</h1>
            <p className="text-gray-500 text-sm mt-1">Monitor and moderate user submitted reviews.</p>
          </div>
       </div>

       <div className="grid gap-4">
          {reviews.map((review) => (
             <div key={review.id} className="bg-zinc-900 border border-white/5 p-4 md:p-6 rounded-2xl flex flex-col md:flex-row items-start gap-4">
                <div className={`p-3 rounded-xl hidden md:block ${review.status === 'Flagged' ? 'bg-red-500/10 text-red-500' : 'bg-white/5 text-gray-400'}`}>
                   {review.status === 'Flagged' ? <Flag size={20} /> : <Star size={20} />}
                </div>
                
                <div className="flex-1 w-full">
                   <div className="flex justify-between items-start mb-2">
                      <div>
                         <h3 className="text-white font-bold">{review.shopName}</h3>
                         <div className="text-xs text-gray-500">by {review.user} • {review.date}</div>
                      </div>
                      <div className="flex items-center gap-1 bg-yellow-500/10 text-yellow-500 px-2 py-1 rounded text-sm font-bold">
                         <Star size={12} fill="currentColor" /> {review.rating}
                      </div>
                   </div>
                   
                   <p className="text-gray-300 text-sm bg-black/20 p-3 rounded-lg border border-white/5">
                      "{review.comment}"
                   </p>
                </div>

                <div className="flex flex-row md:flex-col gap-2 w-full md:w-auto justify-end">
                   <button 
                     onClick={() => handleDelete(review.id)}
                     className="p-2 bg-white/5 md:bg-transparent hover:bg-red-500/20 text-gray-500 hover:text-red-400 rounded-lg transition-colors flex-1 md:flex-none flex justify-center"
                     title="Delete Review"
                   >
                      <Trash2 size={18} />
                   </button>
                   {review.status !== 'Published' && (
                      <button className="p-2 bg-white/5 md:bg-transparent hover:bg-green-500/20 text-gray-500 hover:text-green-400 rounded-lg transition-colors flex-1 md:flex-none flex justify-center" title="Approve">
                         <CheckCircle size={18} />
                      </button>
                   )}
                </div>
             </div>
          ))}
       </div>
    </div>
  );
};

export default ReviewManager;
