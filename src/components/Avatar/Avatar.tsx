import { ImgHTMLAttributes } from "react";
import styles from "./Avatar.module.css";

interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
  border?: boolean;
}

export const Avatar = ({ border, ...props }: AvatarProps) => {
  return (
    <div>
      <img
        className={`${styles.avatarImg} ${border ? styles.border : ""}`}
        {...props}
      />
    </div>
  );
};
