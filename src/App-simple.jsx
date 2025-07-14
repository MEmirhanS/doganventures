function App() {
  console.log("Simple App loading...");
  
  return (
    <div style={{ padding: "2rem", backgroundColor: "#000", color: "#fff", minHeight: "100vh" }}>
      <h1>DoganVentures Test</h1>
      <p>Site başarıyla çalışıyor!</p>
      <p>Tarih: {new Date().toLocaleDateString('tr-TR')}</p>
    </div>
  );
}

export default App;
