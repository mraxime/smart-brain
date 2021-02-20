import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onPictureSubmit }) => {
  return (
    <div>
      <p className="f3">
        Ce cerveau magique détectera les visages sur vos photos. Essayez-le! 😁
      </p>
      <div className="center">
        <div className="form center pa4 br3 shadow-5">
          <input
            className="f4 pa2 w-70 center"
            type="text"
            placeholder="URL de l'image"
            name="imgLinkInput"
            onChange={onInputChange}
          />
          <button
            className="w-30 grow f4 link ph3 pv2 dib white bg-blue"
            onClick={onPictureSubmit}
          >
            Détecter
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageLinkForm;
