import { useState } from 'react';


const useVisualMode = (initial) => {
  const [mode, setMode] = useState(initial);

  return { mode };
};

export default useVisualMode;