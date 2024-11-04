import {useEffect, useState} from "react";
import {getAuthorizationHeader} from "@/helpers/getAthorizationHeader.ts";
import {User} from "@/types.ts";
import {formatNameShort} from "@/helpers/formatName.ts";
import styles from "./Avatar.module.css";
import {cc} from "@/helpers/classConcat.ts";

type Props = {
  user: User;
  size: number;
  className?: string;
}

export function Avatar(props: Props) {
  const {user, size, className} = props;
  const {imageId} = user;
  const [image, setImage] = useState<string | null>(null);
  useEffect(() => {
    if (imageId) {
      fetch(`${import.meta.env.VITE_ENDPOINT}image/${imageId}`, {
        headers: {'authorization': getAuthorizationHeader()}
      })
        .then(res => {
          if (res.ok) return res.text();
          throw new Error(res.statusText);
        })
        .then(setImage)
        .catch()
    }
  }, [imageId]);
  const content = image ? <img className={styles.image} src={image} alt=""/> : <div>{formatNameShort(user)}</div>
  return (
    <div className={cc(styles.container, className)} style={{width: `${size}px`, height: `${size}px`}}>
      {content}
    </div>
  );
}