module.exports = {
  // Only process files that are actually staged
  '*.{js,jsx,ts,tsx}': filenames => {
    // Filter out node_modules and other problematic directories
    const filteredFiles = filenames.filter(
      file =>
        !file.includes('node_modules') &&
        !file.includes('backend/node_modules') &&
        !file.includes('.next') &&
        !file.includes('dist') &&
        !file.includes('build')
    );

    if (filteredFiles.length === 0) {
      return [];
    }

    return [
      `eslint --fix --max-warnings=0 ${filteredFiles.join(' ')}`,
      `prettier --write ${filteredFiles.join(' ')}`,
    ];
  },

  '*.{json,css,md,yml,yaml}': filenames => {
    // Filter out node_modules and other problematic directories
    const filteredFiles = filenames.filter(
      file =>
        !file.includes('node_modules') &&
        !file.includes('backend/node_modules') &&
        !file.includes('.next') &&
        !file.includes('dist') &&
        !file.includes('build') &&
        !file.includes('database/cms.db')
    );

    if (filteredFiles.length === 0) {
      return [];
    }

    return [`prettier --write ${filteredFiles.join(' ')}`];
  },
};
