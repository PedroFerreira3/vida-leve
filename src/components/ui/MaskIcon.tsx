import { getAssetPath } from "../../utils/assets";

type MaskIconProps = {
  src: string;
  className?: string;
};

export function MaskIcon({ src, className = "size-5" }: MaskIconProps) {
  const assetPath = getAssetPath(src);

  return (
    <span
      aria-hidden="true"
      className={`inline-block shrink-0 bg-current ${className}`}
      style={{
        WebkitMask: `url(${assetPath}) center / contain no-repeat`,
        mask: `url(${assetPath}) center / contain no-repeat`,
      }}
    />
  );
}
