import React, { useRef, useEffect, useState } from 'react';
import '../stylesheets/canvasBox.css';

const CanvasBox = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  let scale = 1;
  const [isDragging, setIsDragging] = useState(false);
  const [startCoords, setStartCoords] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;

    const handleWheel = (event) => {
      event.preventDefault();
      const delta = event.deltaY;
      const zoomStep = 0.1;
      const zoomMin = 0.5;
      const zoomMax = 3;

      const newScale = scale - delta * zoomStep / 100;
      scale = Math.min(Math.max(newScale, zoomMin), zoomMax);

      canvas.style.transform = `scale(${scale})`;
    };

    const handleTouchStart = (event) => {
      if (event.touches.length !== 2) return;
      event.preventDefault();
      const touch1 = event.touches[0];
      const touch2 = event.touches[1];

      const distance = Math.hypot(
        touch2.clientX - touch1.clientX,
        touch2.clientY - touch1.clientY
      );

      container.dataset.touchDistance = distance;
    };

    const handleTouchMove = (event) => {
      if (event.touches.length !== 2) return;
      event.preventDefault();
      const touch1 = event.touches[0];
      const touch2 = event.touches[1];

      const currentDistance = Math.hypot(
        touch2.clientX - touch1.clientX,
        touch2.clientY - touch1.clientY
      );

      const previousDistance = parseFloat(container.dataset.touchDistance);
      const delta = currentDistance - previousDistance;

      const zoomStep = 0.01;
      const zoomMin = 0.5;
      const zoomMax = 3;

      const newScale = scale + delta * zoomStep;
      scale = Math.min(Math.max(newScale, zoomMin), zoomMax);

      canvas.style.transform = `scale(${scale})`;

      container.dataset.touchDistance = currentDistance;
    };

    const handleMouseDown = (event) => {
      if (event.button !== 0 || !event.ctrlKey) return;
      event.preventDefault();
      setIsDragging(true);
      setStartCoords({ x: event.clientX, y: event.clientY });
      document.body.style.cursor = 'grabbing';
    };

    const handleMouseMove = (event) => {
      if (!isDragging) return;
      event.preventDefault();

      const x = event.clientX;
      const y = event.clientY;

      const dx = x - startCoords.x;
      const dy = y - startCoords.y;

      container.scrollLeft -= dx;
      container.scrollTop -= dy;

      setStartCoords({ x, y });
    };

    const handleMouseUp = () => {
      if (!isDragging) return;
      setIsDragging(false);
      document.body.style.cursor = 'default';
    };

    container.addEventListener('wheel', handleWheel);
    container.addEventListener('touchstart', handleTouchStart);
    container.addEventListener('touchmove', handleTouchMove, {
      passive: false,
    });
    container.addEventListener('mousedown', handleMouseDown);
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseup', handleMouseUp);

    return () => {
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('mousedown', handleMouseDown);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  const handleZoomIn = () => {
    const zoomStep = 0.1;
    const zoomMax = 3;

    const newScale = scale + zoomStep;
    scale = Math.min(newScale, zoomMax);

    canvasRef.current.style.transform = `scale(${scale})`;
  };

  const handleZoomOut = () => {
    const zoomStep = 0.1;
    const zoomMin = 0.5;

    const newScale = scale - zoomStep;
    scale = Math.max(newScale, zoomMin);

    canvasRef.current.style.transform = `scale(${scale})`;
  };

  return (
    <div className="canvas-container" ref={containerRef}>
      <div className="zoom-buttons">
        <button onClick={handleZoomIn}>Zoom +</button>
        <button onClick={handleZoomOut}>Zoom -</button>
      </div>
      <div
        className="canvas-box"
        onMouseDown={(e) => e.preventDefault()} // Evita la selección de texto al arrastrar
        style={{ cursor: isDragging ? 'grabbing' : 'default' }}
        onMouseUp={() => setIsDragging(false)}
        ref={canvasRef}
      >
        <canvas width={800} height={600} />
      </div>
    </div>
  );
};

export default CanvasBox;