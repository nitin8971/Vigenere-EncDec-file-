// Vigenère cipher encryption function
function vigenereEncrypt(plainText, key) {
  let encryptedText = '';
  const keyLength = key.length;
  const plainTextLength = plainText.length;

  for (let i = 0; i < plainTextLength; i++) {
    const plainCharCode = plainText.charCodeAt(i);
    const keyCharCode = key.charCodeAt(i % keyLength);
    const encryptedCharCode = (plainCharCode + keyCharCode) % 256;
    encryptedText += String.fromCharCode(encryptedCharCode);
  }

  return encryptedText;
}

// Vigenère cipher decryption function
function vigenereDecrypt(encryptedText, key) {
  let decryptedText = '';
  const keyLength = key.length;
  const encryptedTextLength = encryptedText.length;

  for (let i = 0; i < encryptedTextLength; i++) {
    const encryptedCharCode = encryptedText.charCodeAt(i);
    const keyCharCode = key.charCodeAt(i % keyLength);
    const decryptedCharCode = (encryptedCharCode - keyCharCode + 256) % 256;
    decryptedText += String.fromCharCode(decryptedCharCode);
  }

  return decryptedText;
}

// Encryption logic
document.getElementById('encrypt-button').addEventListener('click', function () {
  const fileInput = document.getElementById('upload-file');
  const secretKeyInput = document.getElementById('secret-key');
  const encryptionMessage = document.getElementById('encryption-message');
  const downloadLink = document.getElementById('download-link');

  const file = fileInput.files[0];
  const key = secretKeyInput.value;

  if (file && key) {
    const reader = new FileReader();
    reader.onload = function (event) {
      const fileContent = event.target.result;
      const encryptedContent = vigenereEncrypt(fileContent, key);

      const encryptedBlob = new Blob([encryptedContent], { type: 'text/plain' });
      const encryptedUrl = URL.createObjectURL(encryptedBlob);

      downloadLink.href = encryptedUrl;
      downloadLink.removeAttribute('hidden');
      downloadLink.textContent = 'Download Encrypted File';
      encryptionMessage.textContent = 'File encrypted successfully.';
    };
    reader.readAsText(file);
  } else {
    encryptionMessage.textContent = 'Please select a file and enter a secret key.';
  }
});

// Decryption logic
document.getElementById('decrypt-button').addEventListener('click', function () {
  const fileInput = document.getElementById('decrypt-file');
  const secretKeyInput = document.getElementById('decrypt-key');
  const decryptionMessage = document.getElementById('decryption-message');
  const downloadDecryptedLink = document.getElementById('download-decrypted-link');

  const file = fileInput.files[0];
  const key = secretKeyInput.value;

  if (file && key) {
    const reader = new FileReader();
    reader.onload = function (event) {
      const fileContent = event.target.result;
      const decryptedContent = vigenereDecrypt(fileContent, key);

      const decryptedBlob = new Blob([decryptedContent], { type: 'text/plain' });
      const decryptedUrl = URL.createObjectURL(decryptedBlob);

      downloadDecryptedLink.href = decryptedUrl;
      downloadDecryptedLink.removeAttribute('hidden');
      downloadDecryptedLink.textContent = 'Download Decrypted File';
      decryptionMessage.textContent = 'File decrypted successfully.';
    };
    reader.readAsText(file);
  } else {
    decryptionMessage.textContent = 'Please select a file and enter a secret key.';
  }
});
