function Loader() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px]">
      <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      <p className="mt-4 text-lg font-medium text-gray-600">Loading...</p>
    </div>
  );
}
  
export default Loader;