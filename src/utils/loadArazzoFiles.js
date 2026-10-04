import { load } from 'js-yaml';

/**
 * Load all arazzo YAML files from the public/data directory
 * Returns a promise that resolves to { data: array of parsed YAML objects, filenames: array of filenames }
 */
export const loadArazzoFiles = async () => {
  try {
    // List of known arazzo files to load
    const fileNames = [
      'hornet.750.vidange.arazzo.1.0.0.yaml'
      // Add more file names here as they are created
    ];
    
    const files = [];
    const loadedFilenames = [];
    
    // Load each file
    for (const fileName of fileNames) {
      try {
        const response = await fetch(`/data/${fileName}`);
        if (response.ok) {
          const text = await response.text();
          const data = load(text);
          files.push(data);
          loadedFilenames.push(fileName);
        }
      } catch (e) {
        console.error(`Error loading ${fileName}:`, e);
      }
    }
    
    // For the carousel, ensure we have at least 3 items
    // Duplicate existing items if needed
    while (files.length < 3) {
      if (files.length > 0) {
        files.push({ ...files[0] });
        loadedFilenames.push(loadedFilenames[0]);
      }
    }
    
    return {
      data: files.slice(0, 3),
      filenames: loadedFilenames.slice(0, 3)
    };
  } catch (error) {
    console.error('Error loading arazzo files:', error);
    const sampleFilename = 'hornet.750.vidange.arazzo.1.0.0.yaml';
    const sampleData = {
      arazzo: '1.1.0',
      info: {
        title: 'Honda CB750 Hornet Maintenance Workflows',
        summary: 'Maintenance workflows for Honda CB750 Hornet',
        version: '1.0.0'
      }
    };
    // Return sample data if loading fails
    return {
      data: [sampleData, { ...sampleData }, { ...sampleData }],
      filenames: [sampleFilename, sampleFilename, sampleFilename]
    };
  }
};

export default loadArazzoFiles;
