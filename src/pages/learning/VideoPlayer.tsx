import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';

interface HlsPlayerProps {
  src: string;
}

const HlsPlayer: React.FC<HlsPlayerProps> = ({ src }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [availableQualities, setAvailableQualities] = useState<number[]>([]);
  const [hlsInstance, setHlsInstance] = useState<Hls | null>(null);
  const [selectedQuality, setSelectedQuality] = useState<number>(-1); // -1 for auto quality

  useEffect(() => {
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(videoRef.current!);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        const levels = hls.levels.map((level) => level.height);
        setAvailableQualities(levels);
        setHlsInstance(hls);
      });

      return () => {
        hls.destroy();
      };
    } else if (videoRef.current?.canPlayType('application/vnd.apple.mpegurl')) {
      videoRef.current.src = src;
    }
  }, [src]);

  const handleQualityChange = (qualityIndex: number) => {
    if (hlsInstance) {
      hlsInstance.currentLevel = qualityIndex;
      setSelectedQuality(qualityIndex);
    }
  };

  useEffect(() => {
    const videoElement = videoRef.current;
    const containerElement = containerRef.current;

    if (videoElement && containerElement && availableQualities.length > 0) {
      const qualitySelector = document.createElement('div');
      qualitySelector.className = 'quality-selector';
      qualitySelector.style.cssText = `
        position: absolute;
        right: 0px;
        bottom: -25px;
        color: white;
        font-size: 14px;
        z-index: 2;
      `;

      const select = document.createElement('select');
      select.style.cssText = `
        background-color: transparent;
        color: white;
        border: none;
        outline: none;
        font-size: 14px;
        cursor: pointer;
      `;

      select.innerHTML = `
        <option value="-1">Auto</option>
        ${availableQualities.map((quality, index) => `
          <option value="${index}">${quality}p</option>
        `).join('')}
      `;

      select.value = String(selectedQuality);
      select.addEventListener('change', (e) => handleQualityChange(Number((e.target as HTMLSelectElement).value)));

      qualitySelector.appendChild(select);
      containerElement.appendChild(qualitySelector);

      return () => {
        containerElement.removeChild(qualitySelector);
      };
    }
  }, [availableQualities, selectedQuality, hlsInstance]);

  return (
    <div ref={containerRef} style={{ position: 'relative', width: '100%', maxWidth: '720px' }}>
      <video ref={videoRef} controls style={{ width: '100%' }} />
    </div>
  );
};

export default HlsPlayer;