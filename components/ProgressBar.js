export default function ProgressBar({ progress }) {
  return (
    <div className="progress-bar-container">
      <div className="progress-bar" style={{ width: `${progress}%` }}></div>
      <p>{progress}% completed</p>
    </div>
  );
}
