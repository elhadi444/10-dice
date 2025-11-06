export default function Die({ value, isHeld, hold }) {
  return (
    <button 
      className={`w-12 h-12 rounded-md drop-shadow-md font-bold text-2xl ${isHeld ? "bg-green-400": "bg-white"}`} 
      onClick={ hold }
    >
      {value}
    </button>
  )
}