// src/App.jsx
import Card from './components/Card';
// import './App.css'; // Optional: for additional App-specific styling
import './index.css'; // Ensure this line is present


function App() {
  return (
    <>
      <h1 className="app-header">Plain CSS Example</h1>
      <div className="cards-container">
        <Card username="chaiaurcode" btnText="click me" />
        <Card username="hitesh" />
        <Card username="Sanket" btnText="follow me" />
        <Card username="Sanket" btnText="follow me" />
        <Card username="Sanket" btnText="follow me" />
        <Card username="Sanket" btnText="follow me" />
        <Card username="Sanket" btnText="follow me" />
        <Card username="Sanket" btnText="follow me" />
      </div>
    </>
  );
}

export default App;
