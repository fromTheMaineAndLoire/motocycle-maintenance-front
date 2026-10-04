# Data Folder

This folder contains static data files used by the application.

## Current Files

- `hornet.750.vidange.arazzo.1.0.0.yaml` - Maintenance workflow definition for Honda CB750 Hornet oil change (vidange) procedures

## Usage

These YAML files contain structured data that the React application imports and uses directly, eliminating the need for a backend database.

To use data from these files in your React components:

```javascript
import workflowData from './data/hornet.750.vidange.arazzo.1.0.0.yaml';
```

Note: You may need to configure a YAML loader in your webpack configuration or use a library like `js-yaml` to parse the files.
