"use client"
import { useEffect, useState, Suspense } from 'react';
import { verifyEmail } from '../apis/auth';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'react-toastify';

// Create a component that uses the search params inside Suspense
function VerificationContent() {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const router = useRouter();

  const handleVerifyEmail = async () => {
    try {
      const res = await verifyEmail(token);
      console.log("verifyEmail", res);
      toast.success("Verification successful. Please login");
      router.push("/login");
    } catch (error) {
      toast.error(error?.response?.data?.msg || "An unexpected error occurred");
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      console.log('Verifying email...');
      handleVerifyEmail();
    } else {
      setMessage('Invalid or missing token.');
      setLoading(false);
    }
  }, [token]);

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <p>
          {message}{' '}
          {message === 'Email verification successful.' && (
            <Link href="/login" className="text-orange-500 hover:text-orange-600">
              Click to login
            </Link>
          )}
        </p>
      )}
    </>
  );
}

export default function EmailVerification() {
  return (
    <div className='text-center mt-12'>
      <h1 className="text-xl font-semibold mb-4">Verification</h1>
      <Suspense fallback={<p>Loading verification details...</p>}>
        <VerificationContent />
      </Suspense>
    </div>
  );
}