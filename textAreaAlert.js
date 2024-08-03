export function autoAdjustHeight() {
  const textarea = document.querySelector('.text-area-alert');
  textarea.style.height = 'auto'; // Reset height to auto
  textarea.style.height = textarea.scrollHeight + 'px'; // Set height to content height
  document.querySelector('.text-area-alert').addEventListener('input', autoAdjustHeight);
}