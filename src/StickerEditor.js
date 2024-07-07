import React, { useState, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Slider } from 'primereact/slider';
import { Dropdown } from 'primereact/dropdown';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import 'primeicons/primeicons.css';

const StickerEditor = () => {
  const [lineOne, setLineOne] = useState('Paragon');
  const [lineTwo, setLineTwo] = useState('Sticker');
  const [lineOneSize, setLineOneSize] = useState(80);
  const [lineTwoSize, setLineTwoSize] = useState(140);
  const [theme, setTheme] = useState('pink');
  const [image, setImage] = useState(null);
  const [crop, setCrop] = useState({ aspect: 1 });
  const [croppedImageUrl, setCroppedImageUrl] = useState(null);
  const imageRef = useRef(null);

  const themes = [
    { label: 'Pink', value: 'pink' },
    { label: 'Blue', value: 'blue' },
    { label: 'Green', value: 'green' },
    { label: 'Winner', value: 'winner' },
  ];

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onCropComplete = (crop) => {
    if (imageRef.current && crop.width && crop.height) {
      const croppedImageUrl = getCroppedImg(imageRef.current, crop);
      setCroppedImageUrl(croppedImageUrl);
    }
  };

  const getCroppedImg = (image, crop) => {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return canvas.toDataURL('image/jpeg');
  };

  return (
    <div className="container mx-auto p-4">
      <div className="relative one p-4 flex flex-col items-center justify-center bg-white rounded-full shadow-xl border-2" style={{ width: '600px', height: '600px' }}>
        {croppedImageUrl ? (
          <img src={croppedImageUrl} alt="Cropped" className="w-full h-full object-cover rounded-full" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
        )}
        <div
          className={`two text-center text-${theme}-500`}
          style={{ fontSize: `${lineOneSize}px`, position: 'absolute', top: '20%' }}
        >
          {lineOne}
        </div>
        <div
          className={`two text-center text-${theme}-500`}
          style={{ fontSize: `${lineTwoSize}px`, position: 'absolute', bottom: '20%' }}
        >
          {lineTwo}
        </div>
      </div>
      <div className="control p-4 mt-4 border rounded-lg shadow-lg bg-white">
        <div className="mb-4">
          <label className="block mb-2">Line 1:</label>
          <InputText value={lineOne} onChange={(e) => setLineOne(e.target.value)} className="w-full" />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Line 2:</label>
          <InputText value={lineTwo} onChange={(e) => setLineTwo(e.target.value)} className="w-full" />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Line 1 Size:</label>
          <Slider value={lineOneSize} onChange={(e) => setLineOneSize(e.value)} min={10} max={200} />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Line 2 Size:</label>
          <Slider value={lineTwoSize} onChange={(e) => setLineTwoSize(e.value)} min={10} max={200} />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Theme:</label>
          <Dropdown value={theme} options={themes} onChange={(e) => setTheme(e.value)} className="w-full" />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Upload Image:</label>
          <input type="file" accept="image/*" onChange={handleImageChange} className="w-full" />
        </div>
        {image && (
          <ReactCrop
            src={image}
            crop={crop}
            onImageLoaded={(img) => (imageRef.current = img)}
            onChange={(newCrop) => setCrop(newCrop)}
            onComplete={onCropComplete}
          />
        )}
        <Button label="Render Me!" icon="pi pi-check" className="w-full mt-4" onClick={() => alert('Render functionality not implemented')} />
      </div>
    </div>
  );
};

export default StickerEditor;
