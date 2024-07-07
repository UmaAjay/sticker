import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { FileUpload } from 'primereact/fileupload';
import axios from 'axios';
import './CustomizationForm.css';

const CustomizationForm = ({ onUpdate }) => {
  const [text, setText] = useState('');
  const [color, setColor] = useState('#000000');
  const [fontSize, setFontSize] = useState(16);
  const [fontFamily, setFontFamily] = useState('Arial');
  const [image, setImage] = useState(null);
  const [backgrounds, setBackgrounds] = useState([]);
  const [selectedBackground, setSelectedBackground] = useState(null);

  const fonts = [
    { label: 'Standard', value: 'Arial' },
    { label: 'Rounded', value: 'Comic Sans MS' },
    { label: 'Typewriter', value: 'Courier New' },
    { label: 'Handwriting', value: 'Cursive' },
    { label: 'Child\'s hand', value: 'Brush Script MT' },
    { label: 'Script', value: 'Times New Roman' }
  ];

  const colors = [
    '#ff0000', '#ff7f7f', '#ff9999', '#ffc0cb', '#ffb6c1',
    '#ffa07a', '#ff4500', '#ffa500', '#ff8c00', '#8b0000',
    '#ff0000', '#ff7f7f', '#ff9999', '#ffc0cb', '#ffb6c1',
    '#ffa07a', '#ff4500', '#ffa500', '#ff8c00', '#8b0000'
  ];

  const fetchBackgrounds = async () => {
    try {
      const response = await axios.get('https://api.pexels.com/v1/search?query=backgrounds&per_page=10', {
        headers: {
          Authorization: 'YOUR_PEXELS_API_KEY'
        }
      });
      setBackgrounds(response.data.photos);
    } catch (error) {
      console.error("Error fetching backgrounds", error);
    }
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
    onUpdate({ text: e.target.value, color, fontSize, fontFamily, image, background: selectedBackground });
  };
  const handleColorChange = (color) => {
    setColor(color);
    onUpdate({ text, color, fontSize, fontFamily, image, background: selectedBackground });
  };
  const handleFontSizeChange = (e) => {
    setFontSize(e.target.value);
    onUpdate({ text, color, fontSize: e.target.value, fontFamily, image, background: selectedBackground });
  };
  const handleFontFamilyChange = (font) => {
    setFontFamily(font.value);
    onUpdate({ text, color, fontSize, fontFamily: font.value, image, background: selectedBackground });
  };
  const handleImageChange = (e) => {
    const file = e.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      onUpdate({ text, color, fontSize, fontFamily, image: imageUrl, background: selectedBackground });
    }
  };
  const handleBackgroundChange = (url) => {
    setSelectedBackground(url);
    onUpdate({ text, color, fontSize, fontFamily, image, background: url });
  };

  useEffect(() => {
    fetchBackgrounds();
  }, []);

  return (
    <div className="customization-form">
      <div className="form-group">
        <label>Enter Text:</label>
        <InputText 
          value={text} 
          onChange={handleTextChange} 
          placeholder="Enter text" 
          className="mb-4 w-full" 
        />
      </div>
      <div className="form-group">
        <label>Choose Font:</label>
        <div className="font-options">
          {fonts.map((font, index) => (
            <Button key={index} label={font.label} className={`font-button ${fontFamily === font.value ? 'selected' : ''}`} onClick={() => handleFontFamilyChange(font)} />
          ))}
        </div>
      </div>
      <div className="form-group">
        <label>Choose Font Color:</label>
        <div className="color-options">
          {colors.map((col, index) => (
            <Button key={index} style={{ backgroundColor: col }} className={`color-button ${color === col ? 'selected' : ''}`} onClick={() => handleColorChange(col)} />
          ))}
        </div>
      </div>
      <div className="form-group">
        <label>Font Size:</label>
        <input 
          type="number" 
          value={fontSize} 
          onChange={handleFontSizeChange} 
          min={10} 
          max={50} 
          className="w-full p-2 border" 
        />
      </div>
      <div className="form-group">
        <label>Upload Image:</label>
        <FileUpload 
          mode="basic" 
          accept="image/*" 
          maxFileSize={1000000} 
          customUpload 
          auto 
          uploadHandler={handleImageChange} 
          chooseLabel="Upload Image" 
          className="mb-4 w-full" 
        />
      </div>
      <div className="form-group">
        <label>Choose Background:</label>
        <div className="background-options">
          {backgrounds.map((bg, index) => (
            <img
              key={index}
              src={bg.src.medium}
              alt={bg.photographer}
              className="background-thumbnail"
              onClick={() => handleBackgroundChange(bg.src.medium)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomizationForm;
