'use client';

import { useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import QuoteCard from './QuoteCard';
import MessageReviewModal from './MessageReviewModal';

export default function ApprovalDashboard({ quotes, user }: any) {
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [approving, setApproving] = useState(false);

  const handleApprove = async (quoteId: string) => {
    setApproving(true);
    try {
      const quoteRef = doc(db, 'quotes', quoteId);
      await updateDoc(quoteRef, {
        approvalStatus: 'approved',
        approvedAt: new Date().toISOString(),
        approvedBy: user.email,
      });
      setShowReviewModal(false);
      setSelectedQuote(null);
    } catch (error) {
      console.error('Error approving quote:', error);
    }
    setApproving(false);
  };

  const handleReject = async (quoteId: string, reason: string) => {
    setApproving(true);
    try {
      const quoteRef = doc(db, 'quotes', quoteId);
      await updateDoc(quoteRef, {
        approvalStatus: 'rejected',
        rejectionReason: reason,
        rejectedAt: new Date().toISOString(),
        rejectedBy: user.email,
      });
      setShowReviewModal(false);
      setSelectedQuote(null);
    } catch (error) {
      console.error('Error rejecting quote:', error);
    }
    setApproving(false);
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Pending Approvals</h2>
        <p className="text-gray-600">
          {quotes.length} quote{quotes.length !== 1 ? 's' : ''} awaiting your review
        </p>
      </div>

      {quotes.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <p className="text-gray-500 text-lg">No quotes pending approval</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {quotes.map((quote: any) => (
            <QuoteCard
              key={quote.id}
              quote={quote}
              onReview={() => {
                setSelectedQuote(quote);
                setShowReviewModal(true);
              }}
            />
          ))}
        </div>
      )}

      {showReviewModal && selectedQuote && (
        <MessageReviewModal
          quote={selectedQuote}
          onApprove={() => handleApprove(selectedQuote.id)}
          onReject={(reason) => handleReject(selectedQuote.id, reason)}
          onClose={() => {
            setShowReviewModal(false);
            setSelectedQuote(null);
          }}
          loading={approving}
        />
      )}
    </div>
  );
}
