
const BlurBlobs = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <div className="absolute top-[-50px] right-[-120px] w-96 h-96 bg-green-500 bg-opacity-45 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
    </div>
  );
};

export default BlurBlobs;