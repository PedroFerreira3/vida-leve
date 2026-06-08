import { getWhatsAppUrl } from "../../utils/whatsapp";
import { MaskIcon } from "./MaskIcon";

type WhatsAppButtonProps = {
  message: string;
  label?: string;
  className?: string;
};

export function WhatsAppButton({ message, label = "Comprar pelo WhatsApp", className = "" }: WhatsAppButtonProps) {
  return (
    <a
      className={[
        "inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-leaf-700 px-5 py-3 text-sm font-bold text-white shadow-sm transition-colors hover:bg-leaf-800 focus:outline-none focus:ring-2 focus:ring-leaf-500 focus:ring-offset-2",
        className,
      ].join(" ")}
      href={getWhatsAppUrl(message)}
      target="_blank"
      rel="noreferrer"
    >
      <MaskIcon className="size-[18px]" src="/whatsapp-icon.svg" />
      {label}
    </a>
  );
}
