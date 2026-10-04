import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { load } from 'js-yaml';

const ArazzoPage = () => {
  const { filename } = useParams();
  const [arazzoData, setArazzoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/data/${filename}`);
        if (!response.ok) {
          throw new Error(`Failed to load file: ${filename}`);
        }
        const text = await response.text();
        const data = load(text);
        setArazzoData(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setArazzoData(null);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [filename]);

  if (loading) {
    return (
      <div className="loading">
        <p>Loading workflow data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        <p>Error: {error}</p>
        <Link to="/" className="back-link">
          ← Back to Home
        </Link>
      </div>
    );
  }

  if (!arazzoData) {
    return (
      <div className="error">
        <p>No data found</p>
        <Link to="/" className="back-link">
          ← Back to Home
        </Link>
      </div>
    );
  }

  // Get the first workflow for display
  const workflow = arazzoData.workflows?.[0];

  return (
    <div className="arazzo-page">
      <Link to="/" className="back-link">
        ← Back to Home
      </Link>

      {/* Section 1: Title */}
      <section className="arazzo-section title-section">
        <h1 className="arazzo-title">
          {arazzoData.info?.title || arazzoData.info?.title || 'Untitled'}
        </h1>
      </section>

      {/* Section 2: Summary, Description, Version */}
      <section className="arazzo-section info-section">
        <div className="info-grid">
          <div className="info-item">
            <h3>Summary</h3>
            <p>{arazzoData.info?.summary || 'No summary available'}</p>
          </div>
          <div className="info-item">
            <h3>Description</h3>
            <p>{arazzoData.info?.description || 'No description available'}</p>
          </div>
          <div className="info-item">
            <h3>Version</h3>
            <p className="version">
              Arazzo: {arazzoData.arazzo || 'Unknown'}<br />
              Info: {arazzoData.info?.version || 'Unknown'}
            </p>
          </div>
        </div>
      </section>

      {/* Section 3: Workflow with design */}
      <section className="arazzo-section workflow-section">
        <h2>Workflow: {workflow?.summary || 'No workflow'}</h2>
        <p className="workflow-description">
          {workflow?.description || 'No description'}
        </p>

        {workflow?.steps && (
          <div className="workflow-visualization">
            <div className="workflow-steps">
              {workflow.steps.map((step, index) => (
                <div key={step.stepId || index} className="workflow-step">
                  <div className="step-number">{index + 1}</div>
                  <div className="step-content">
                    <h4>{step.stepId}</h4>
                    <p>{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Workflow inputs/outputs */}
        <div className="workflow-meta">
          <div className="meta-section">
            <h3>Inputs</h3>
            {workflow?.inputs?.properties && (
              <ul>
                {Object.entries(workflow.inputs.properties).map(([key, prop]) => (
                  <li key={key}>
                    <strong>{key}</strong> ({prop.type}): {prop.description}
                    {prop.required && <span className="required"> *Required</span>}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="meta-section">
            <h3>Outputs</h3>
            {arazzoData.workflows?.[0]?.outputs && (
              <ul>
                {Object.entries(workflow.outputs).map(([key, value]) => (
                  <li key={key}>
                    <strong>{key}</strong>: {typeof value === 'string' ? value : JSON.stringify(value)}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ArazzoPage;
