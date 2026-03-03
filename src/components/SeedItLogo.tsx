export function SeedItLogo({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Simple pot */}
      <rect 
        x="35" 
        y="60" 
        width="30" 
        height="30" 
        fill="#059669"
        rx="4"
      />
      
      {/* Simple sprout */}
      <circle 
        cx="50" 
        cy="45" 
        r="15" 
        fill="#10B981"
      />
    </svg>
  );
}