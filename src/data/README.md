# Data Folder

This folder contains the source YAML data files for the application.

**Important:** The actual YAML files used by the application are located in `/public/data/`. 
This allows them to be fetched at runtime via HTTP requests.

The files in this `src/data/` directory are the source files that should be copied to `/public/data/` for use in the application.

## Current Files

- `hornet.750.vidange.arazzo.1.0.0.yaml` - Maintenance workflow definition for Honda CB750 Hornet oil change (vidange) procedures

## File Structure

All arazzo YAML files follow a similar structure:

```yaml
arazzo: <version>
info:
  title: <title>
  summary: <summary>
  description: <description>
  version: <version>
workflows:
  - workflowId: <id>
    summary: <summary>
    description: <description>
    ...
```

## Usage

YAML files in `/public/data/` can be fetched at runtime:

```javascript
fetch('/data/hornet.750.vidange.arazzo.1.0.0.yaml')
  .then(response => response.text())
  .then(text => {
    const data = yaml.load(text);
    // Use data
  });
```

## Adding New Arazzo Files

1. Create the YAML file in this `src/data/` folder
2. Copy it to `/public/data/`
3. Update the `loadArazzoFiles.js` utility to include the new file
