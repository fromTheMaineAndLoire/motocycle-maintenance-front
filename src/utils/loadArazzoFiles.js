import yaml from 'js-yaml';

/**
 * Load all arazzo YAML files from the public/data directory
 * Returns a promise that resolves to an array of parsed YAML objects
 */
export const loadArazzoFiles = async () => {
  try {
    // List of known arazzo files to load
    const fileNames = [
      'hornet.750.vidange.arazzo.1.0.0.yaml'
      // Add more file names here as they are created
    ];
    
    const files = [];
    
    // Load each file
    for (const fileName of fileNames) {
      try {
        const response = await fetch(`/data/${fileName}`);
        if (response.ok) {
          const text = await response.text();
          const data = yaml.load(text);
          files.push(data);
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
      }
    }
    
    return files.slice(0, 3);
  } catch (error) {
    console.error('Error loading arazzo files:', error);
    // Return sample data if loading fails
    return [
      {
        arazzo: '1.1.0',
        info: {
          title: 'Honda CB750 Hornet Maintenance Workflows',
          summary: 'Maintenance workflows for Honda CB750 Hornet',
          version: '1.0.0'
        }
      },
      {
        arazzo: '1.1.0',
        info: {
          title: 'Honda CB750 Hornet Maintenance Workflows',
          summary: 'Maintenance workflows for Honda CB750 Hornet',
          version: '1.0.0'
        }
      },
      {
        arazzo: '1.1.0',
        info: {
          title: 'Honda CB750 Hornet Maintenance Workflows',
          summary: 'Maintenance workflows for Honda CB750 Hornet',
          version: '1.0.0'
        }
      }
    ];
  }
};

export default loadArazzoFiles;
