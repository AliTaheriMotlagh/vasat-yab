import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { User2 } from "lucide-react";

interface AvatarIconProp {
  src: string;
  size?: number;
  className?: string;
}

const AvatarIcon = ({ src, size, className }: AvatarIconProp) => {
  return (
    <>
      <Avatar
        className={cn(
          `${className}`,
          size ? `h-[${size}px] w-[${size}px]` : "h-14 w-14",
        )}
      >
        <AvatarImage src={src} />
        <AvatarFallback className="bg-sky-500">
          <User2 className="text-white" />
        </AvatarFallback>
      </Avatar>
    </>
  );
};

export default AvatarIcon;
