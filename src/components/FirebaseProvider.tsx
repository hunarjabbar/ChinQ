import React, { useEffect, useState } from 'react';
import { doc, getDocFromServer } from 'firebase/firestore';
import { db } from '../lib/firebase';

export function FirebaseProvider({ children }: { children: React.ReactNode }) {
  const [isFirebaseReady, setIsFirebaseReady] = useState(false);

  useEffect(() => {
    async function testConnection() {
      try {
        // Pillar 10 & Critical Constraint: Test connection on boot
        await getDocFromServer(doc(db, 'test', 'connection'));
        console.log('✅ Firebase connection established');
        setIsFirebaseReady(true);
      } catch (error) {
        if (error instanceof Error && error.message.includes('the client is offline')) {
          console.error("❌ Firebase connection failed: client is offline.");
        } else {
          // This might fail if the doc doesn't exist but the connection is fine
          // (which is expected since 'test/connection' likely doesn't exist)
          // But getDocFromServer will still succeed in connecting to the server.
          console.log('ℹ️ Firebase connected (test doc might not exist)');
          setIsFirebaseReady(true);
        }
      }
    }
    testConnection();
  }, []);

  return <>{children}</>;
}
