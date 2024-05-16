const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md p-8 bg-white shadow-md rounded-lg">
        <h1 className="text-3xl font-bold text-gray-900">
          404 - Page Not Found
        </h1>
        <p className="text-gray-700 mt-4">
          The page you are looking for does not exist.
        </p>
      </div>
    </div>
  );
};

export default NotFoundPage;
