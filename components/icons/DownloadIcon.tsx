type DownloadIconProps = {
  className?: string;
};

export default function DownloadIcon({ className }: DownloadIconProps) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      className={className}
      style={{ display: "inline-block", marginRight: "6px", verticalAlign: "-1px" }}
      aria-hidden="true"
    >
      <path
        fill="currentColor"
        d="M8 0a1 1 0 0 1 1 1v7.586l2.293-2.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 1 1 1.414-1.414L7 8.586V1a1 1 0 0 1 1-1Z"
      />
      <path fill="currentColor" d="M1 13a1 1 0 0 1 1-1h12a1 1 0 1 1 0 2H2a1 1 0 0 1-1-1Z" />
    </svg>
  );
}
