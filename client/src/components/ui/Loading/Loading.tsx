import React from 'react';
import { Loader } from 'lucide-react';

const Loading: React.FC = () => (
  <div className="flex items-center justify-center min-h-screen text-white">
    <Loader className="animate-spin mr-2" />
    Loading Patients...
  </div>
);

export default Loading;
