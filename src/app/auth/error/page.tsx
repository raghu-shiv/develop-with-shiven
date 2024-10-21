// File: /app/auth/error.tsx
export default function ErrorPage() {
  return (
    <div className="flex items-center justify-center h-screen">
      <h1 className="text-3xl">Authentication Error</h1>
      <p className="text-lg">
        There was a problem with your login. Please try again.
      </p>
    </div>
  );
}
