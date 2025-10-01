export const rangeSliderStyles = `
  input[type="range"].range-slider {
    -webkit-appearance: none;
    appearance: none;
    background: transparent;
    cursor: pointer;
    outline: none;
  }

  input[type="range"].range-slider::-webkit-slider-track {
    background: transparent;
    cursor: pointer;
  }

  input[type="range"].range-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: #ffffff;
    cursor: pointer;
    pointer-events: auto;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.1);
    border: 2px solid #000000;
    transition: all 0.2s ease;
    position: relative;
    z-index: 2;
  }

  input[type="range"].range-slider::-webkit-slider-thumb:hover {
    transform: scale(1.15);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2), 0 4px 8px rgba(0, 0, 0, 0.15);
    border-color: #333333;
  }

  input[type="range"].range-slider::-webkit-slider-thumb:active {
    transform: scale(1.1);
  }

  /* Firefox styles */
  input[type="range"].range-slider::-moz-range-track {
    background: transparent;
    border: none;
    cursor: pointer;
  }

  input[type="range"].range-slider::-moz-range-thumb {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: #ffffff;
    cursor: pointer;
    pointer-events: auto;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.1);
    border: 2px solid #000000;
    transition: all 0.2s ease;
    position: relative;
    z-index: 2;
  }

  input[type="range"].range-slider::-moz-range-thumb:hover {
    transform: scale(1.15);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2), 0 4px 8px rgba(0, 0, 0, 0.15);
    border-color: #333333;
  }

  input[type="range"].range-slider::-moz-range-thumb:active {
    transform: scale(1.1);
  }
`;