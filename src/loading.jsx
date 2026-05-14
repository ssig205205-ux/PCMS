
export default function LoadingScreen() {
  return (
    <div className="loading-screen">
      <div className="wifi-loader">
        <div className="wifi-circle circle1"></div>
        <div className="wifi-circle circle2"></div>
        <div className="wifi-circle circle3"></div>
        <div className="wifi-dot"></div>
      </div>

      <h2>Connecting...</h2>
    </div>
  );
}
