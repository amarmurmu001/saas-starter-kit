"use client"
import { useEffect, useState } from 'react';
import { auth } from '../../utils/firebase';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

 
  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      if (!user) {
        router.push('/auth/login');
      } else {
        setIsLoading(false);
      }
    });
    return () => unsubscribe();
  }, [router]);
 

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }


  return (
    <div >
      <div className="p-4 align-item-center center m-auto">
        <h1 className="text-3xl">Welcome to Your Dashboard!</h1>
        
        
        {user && (
          <div>
            <h2>User Details:</h2>
            <p>Email: {user.email}</p>
            <p>UID: {user.uid}</p>
          </div>
        )}
      </div>
    </div>
  );
}
