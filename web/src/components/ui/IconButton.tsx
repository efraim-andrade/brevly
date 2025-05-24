import { Button, type ButtonProps } from "@/components/ui/Button";
import type { IconProps } from "@phosphor-icons/react";
import type { ReactElement } from "react";

type IconButtonProps = ButtonProps & {
	icon: ReactElement<IconProps>;
};

export function IconButton({ icon, ...props }: IconButtonProps) {
	return <Button icon={icon} variant="secondary" {...props} />;
}
