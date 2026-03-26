export function SeedItLogo({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <ellipse
        cx="50"
        cy="90"
        rx="30"
        ry="10"
        fill="#3f2f1c"
      />

      <rect
        x="48"
        y="35"
        width="5"
        height="50"
        rx="2"
        fill="#065f46"
      />

      <ellipse
        cx="30"
        cy="40"
        rx="20"
        ry="10"
        fill="#6ee7b7"
        transform="rotate(-25 30 40)"
      />

      <ellipse
        cx="70"
        cy="40"
        rx="20"
        ry="10"
        fill="#34d399"
        transform="rotate(25 70 40)"
      />
    </svg>
  );
}