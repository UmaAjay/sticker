import React, { useState } from 'react';
import CustomizationForm from './CustomizationForm';
import LabelPreview from './LabelPreview';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import './App.css';

const App = () => {
  const [customization, setCustomization] = useState({
    text: '',
    color: '#000000',
    fontSize: 16,
    fontFamily: 'Arial',
    image: null,
    background: null
  });

  return (
    <div className="container">
      <h1>Design your Label</h1>
      <div className="label-designer">
        <CustomizationForm onUpdate={setCustomization} />
        <LabelPreview customization={customization} />
      </div>
    </div>
  );
};

export default App;
