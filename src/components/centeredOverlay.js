export default function create(parentElement) {
  let overlay = document.createElement('div');
  overlay.classList.add('centeredOverlay');
  parentElement.appendChild(overlay);
  return overlay;
}
