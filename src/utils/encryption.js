// src/utils/encryption.js

import CryptoJS from 'crypto-js';

const secretKey = 'Noor1818@@'; // استخدم مفتاحًا سريًا قويًا

export const setEncryptedData = (key, data) => {
  const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
  localStorage.setItem(key, ciphertext);
};

export const getEncryptedData = (key) => {
  const ciphertext = localStorage.getItem(key);
  if (ciphertext) {
    const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  }
  return null;
};
