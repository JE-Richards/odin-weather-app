function round(value, precision) {
  var multiplier = Math.pow(10, precision || 0);
  return Math.round(value * multiplier) / multiplier;
}

function changeTemperatureScale(value, scale) {
  switch (scale) {
    case '℃':
      const valueF = value * (9 / 5) + 32;
      const roundedF = round(valueF, 1);
      return [roundedF, '℉'];
    case '℉':
      const valueC = (value - 32) * (5 / 9);
      const roundedC = round(valueC, 1);
      return [roundedC, '℃'];
    default:
      throw new Error('invalid scale value assigned to temperature');
  }
}

function changeSpeedScale(value, scale) {
  switch (scale) {
    case 'mph':
      const valueKmh = value * 1.60934;
      const roundedKmh = round(valueKmh, 1);
      return [roundedKmh, 'km/h'];
    case 'km/h':
      const valueMph = value / 1.60934;
      const roundedMph = round(valueMph, 1);
      return [roundedMph, 'mph'];
    default:
      throw new Error('invalid scale value assigned to speed');
  }
}

export { changeTemperatureScale, changeSpeedScale };
