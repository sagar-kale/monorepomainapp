import React, { Suspense, useState } from 'react';


const App1 = React.lazy(() => import('app1/App'));

import("app1/App").then((comp) => {
  console.log('component:::', comp);
});

function App(): JSX.Element {
  const [activeTab, setActiveTab] = useState('main'); // 'main' or 'app1'

  return (
    <div className="App">
      <header className="App-header">
        <h1>Main Application</h1>
      </header>

      {/* Tab Navigation */}
      <nav style={{ marginBottom: '20px' }}>
        <button onClick={() => setActiveTab('main')} style={activeTab === 'main' ? { fontWeight: 'bold' } : {}}>
          Main App
        </button>
        <button onClick={() => setActiveTab('app1')} style={activeTab === 'app1' ? { fontWeight: 'bold' } : {}}>
          App1
        </button>
      </nav>

      {/* Tab Content */}
      <div style={{ padding: '20px', border: '1px solid #ddd' }}>
        {activeTab === 'main' && (
          <div>
            <h2>Welcome to the Main App</h2>
            <p>This is the main application content.</p>
          </div>
        )}

        {activeTab === 'app1' && (

          <Suspense fallback={<div>Loading app1...</div>}>
            <App1 />
          </Suspense>

          // <iframe
          //   src="http://localhost:3001"  // Replace with your Vite app's URL
          //   title="App1 Micro-Frontend"
          //   style={{
          //     width: '100%',
          //     height: '80vh',
          //     border: 'none',
          //   }}
          // />
        )}
      </div>
    </div>
  );
}

export default App;
