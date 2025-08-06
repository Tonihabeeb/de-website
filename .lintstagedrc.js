module.exports = {
  // Only process files that are not in node_modules
  '*.{js,jsx,ts,tsx}': (filenames) => {
    const filteredFiles = filenames.filter(file => !file.includes('node_modules'));
    if (filteredFiles.length === 0) return [];
    return [
      `eslint --fix --max-warnings 0 ${filteredFiles.join(' ')}`,
      `prettier --write ${filteredFiles.join(' ')}`
    ];
  },
  '*.{json,css,md}': (filenames) => {
    const filteredFiles = filenames.filter(file => !file.includes('node_modules'));
    if (filteredFiles.length === 0) return [];
    return [`prettier --write ${filteredFiles.join(' ')}`];
  }
}; 