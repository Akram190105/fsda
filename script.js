const paletteGrid = document.getElementById('paletteGrid');
const generateBtn = document.getElementById('generateBtn');
const paletteSize = 6;

function randomHex() {
  const value = Math.floor(Math.random() * 0xffffff);
  return `#${value.toString(16).padStart(6, '0').toUpperCase()}`;
}

function createColorCard(hex) {
  const card = document.createElement('article');
  card.className = 'color-card';

  const preview = document.createElement('div');
  preview.className = 'color-box';
  preview.style.background = hex;

  const details = document.createElement('div');
  details.className = 'color-details';

  const code = document.createElement('span');
  code.className = 'color-code';
  code.textContent = hex;

  const copyButton = document.createElement('button');
  copyButton.className = 'copy-btn';
  copyButton.type = 'button';
  copyButton.textContent = 'Copy';
  copyButton.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(hex);
      copyButton.textContent = 'Copied!';
      setTimeout(() => { copyButton.textContent = 'Copy'; }, 1200);
    } catch (error) {
      console.error('Copy failed:', error);
      copyButton.textContent = 'Error';
      setTimeout(() => { copyButton.textContent = 'Copy'; }, 1200);
    }
  });

  details.append(code, copyButton);
  card.append(preview, details);
  return card;
}

function renderPalette() {
  paletteGrid.innerHTML = '';
  const colors = Array.from({ length: paletteSize }, () => randomHex());
  colors.forEach(hex => {
    const card = createColorCard(hex);
    paletteGrid.append(card);
  });
}

generateBtn.addEventListener('click', renderPalette);

renderPalette();
