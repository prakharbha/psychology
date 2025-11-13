import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="bg-white py-12 px-4 sm:px-6 lg:px-8 min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <div className="glass-card rounded-3xl p-12 max-w-md mx-auto">
          <h1 className="font-heading text-6xl font-bold text-slate-900 mb-4">404</h1>
          <h2 className="font-heading text-2xl font-bold text-slate-900 mb-4">
            Page Not Found
          </h2>
          <p className="text-slate-600 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link
            href="/"
            className="inline-block px-8 py-4 bg-dark-blue-700 text-white rounded-xl font-semibold hover:bg-slate-800 transition-all duration-300"
          >
            Go Back Home
          </Link>
        </div>
      </div>
    </div>
  );
}

