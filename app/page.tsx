'use client';

import { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, onSnapshot, query, where, orderBy } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import ApprovalDashboard from '@/components/ApprovalDashboard';
import LoginForm from '@/components/LoginForm';

export default function Home() {
  const [user, setUser] = useState(null);
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      if (currentUser) {
        // Subscribe to quotes awaiting approval
        const q = query(
          collection(db, 'quotes'),
          where('approvalStatus', '==', 'pending'),
          orderBy('createdAt', 'desc')
        );

        const unsubQuotes = onSnapshot(q, (snapshot) => {
          setQuotes(snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          })));
        });

        return () => unsubQuotes();
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <LoginForm />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Elroi 1 — Approval Dashboard</h1>
          <button
            onClick={() => signOut(auth)}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            Sign Out
          </button>
        </div>

        <ApprovalDashboard quotes={quotes} user={user} />
      </div>
    </div>
  );
}
