import React, { useRef } from 'react';
import Draggable from 'react-draggable';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import './LabelPreview.css';

const LabelPreview = ({ customization }) => {
  const { text, color, fontSize, fontFamily, image, background } = customization;
  const labelRef = useRef(null);

  const downloadImage = () => {
    const svgElement = labelRef.current;
    const { width, height } = svgElement.getBoundingClientRect();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = width;
    canvas.height = height;

    const data = new XMLSerializer().serializeToString(svgElement);
    const img = new Image();
    img.src = 'data:image/svg+xml;base64,' + btoa(data);

    img.onload = () => {
      ctx.drawImage(img, 0, 0, width, height);
      const a = document.createElement('a');
      a.download = 'label.png';
      a.href = canvas.toDataURL('image/png');
      a.click();
    };
  };

  const handleZoomIn = () => {
    const currentScale = labelRef.current.style.transform ? parseFloat(labelRef.current.style.transform.match(/scale\(([^)]+)\)/)[1]) : 1;
    labelRef.current.style.transform = `scale(${currentScale + 0.1})`;
  };

  const handleZoomOut = () => {
    const currentScale = labelRef.current.style.transform ? parseFloat(labelRef.current.style.transform.match(/scale\(([^)]+)\)/)[1]) : 1;
    labelRef.current.style.transform = `scale(${currentScale - 0.1})`;
  };

  return (
    <div className="label-preview">
      <div className="preview-header">
        <button onClick={handleZoomIn} className="zoom-button">Zoom In</button>
        <button onClick={handleZoomOut} className="zoom-button">Zoom Out</button>
        <button onClick={downloadImage} className="download-button">Download</button>
      </div>
      <div className="preview-area">
        <TransformWrapper>
          <TransformComponent>
            <svg ref={labelRef} width="100%" height="100%">
              <image href={background} width="100%" height="100%" />
              {image && (
                <Draggable>
                  <image href={image} x="0" y="0" height="100" width="100" />
                </Draggable>
              )}
              <Draggable>
                <text x="10" y="50" fill={color} style={{ fontSize: `${fontSize}px`, fontFamily }}>
                  {text}
                </text>
              </Draggable>
            </svg>
          </TransformComponent>
        </TransformWrapper>
      </div>
    </div>
  );
};

export default LabelPreview;
