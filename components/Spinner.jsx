export default function Spinner() {
  return (
    <div className="spinner-overlay show">
      <div 
        className="spinner-border text-primary" 
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  )
}