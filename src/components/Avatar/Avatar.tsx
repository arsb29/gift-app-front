import {useEffect, useState} from "react";
import {getAuthorizationHeader} from "@/helpers/getAthorizationHeader.ts";
import {User} from "@/types.ts";
import {formatNameShort} from "@/helpers/formatName.ts";
import styles from "./Avatar.module.css";

type Props = {
  user: User;
  size: number;
}

export function Avatar(props: Props) {
  const {user, size} = props;
  const {imageId} = user;
  const [image, setImage] = useState<string | null>(null);
  useEffect(() => {
    fetch(`${import.meta.env.VITE_ENDPOINT}image/${imageId}`, {
      headers: {'authorization': getAuthorizationHeader()}
    })
      .then(res => {
        if (res.ok) return res.text();
        throw new Error(res.statusText);
      })
      .then(setImage)
      .catch()
  }, []);
  if (!image) return (
    <div className={styles.container} style={{width: `${size}px`, height: `${size}px`}}>
      <div>{formatNameShort(user)}</div>
    </div>
  );
  return (
    <div className={styles.container} style={{width: `${size}px`, height: `${size}px`}}>
      <img className={styles.image} src={image} alt=""/>
    </div>
  );
}