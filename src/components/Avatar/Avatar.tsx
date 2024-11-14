import styles from "./Avatar.module.css";

interface AvatarProps {
  border?: boolean;
  src: string;
}

export const Avatar = ({ border, src }: AvatarProps) => {
  return (
    <div>
      <img
        src={src}
        alt=""
        className={`${styles.avatarImg} ${border ? styles.border : ""}`}
      />
    </div>
  );
};
