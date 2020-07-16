/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable consistent-return */
import React from 'react';

interface Data {
  image: undefined | HTMLImageElement;
  status: string;
}

const initialState = { image: undefined, status: 'loading' };

const useImage = (url: string, crossOrigin = 'Anonymous') => {
  const [data, setData] = React.useState<Data>(initialState);
  const { image, status } = data;

  React.useEffect(() => {
    if (!url) return;
    const img = document.createElement('img');

    const onLoad = (): void => setData({ image: img, status: 'loaded' });
    const onError = (): void => setData({ image: undefined, status: 'failed' });

    img.addEventListener('load', onLoad);
    img.addEventListener('error', onError);
    img.src = url;

    return () => {
      img.removeEventListener('load', onLoad);
      img.removeEventListener('error', onError);
      setData(initialState);
    };
  }, [url, crossOrigin]);

  return [image, status];
};

export default useImage;
