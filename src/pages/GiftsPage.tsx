import {FC, useCallback} from 'react';
import {useQuery} from "@tanstack/react-query";
import { Page } from '@/components/Page.tsx';
import {Gift} from "@/types.ts";
import {useNavigate} from "react-router-dom";
import {ROUTES_PATHS} from "@/navigation/routes.tsx";
import {QUERY_KEYS} from "@/constants.ts";
import {giftsQueryFn} from "@/queries/giftsQueryFn.ts";
import {retrieveLaunchParams, switchInlineQuery} from "@telegram-apps/sdk-react";

export const GiftsPage: FC = () => {

  console.log(retrieveLaunchParams())
  const navigate = useNavigate();
  const {isPending, isError, data: gifts} = useQuery<Gift[]>({
      queryKey: [QUERY_KEYS.gifts],
      queryFn: giftsQueryFn,
  });
  const handleClick = useCallback((_id: Gift['_id']) => () => {
    navigate(`${ROUTES_PATHS.gifts}/${_id}`)
  }, [navigate])
  const onSend = () => {
    if (switchInlineQuery.isSupported()) {
      switchInlineQuery('Check this bot!', [
        'users',
        'bots',
        'groups',
        'channels',
      ]);
    }
  }
  if (isPending) return <div>Загрузка</div> // todo сделать спец экран для этого
  if (isError) return <div>Ошибка</div> // todo сделать спец экран для этого
  return (
    <Page back={false}>
      <button onClick={onSend}>отправить</button>
      {gifts.map(gift => (
        <div
          key={gift._id}
          onClick={handleClick(gift._id)}
        >
          {gift.numberOfPurchased + gift.numberOfBooked} of {gift.totalNumberOf}
          {gift.giftId}
          {gift.title['en']}
          {gift.amount}
          {gift.asset}
        </div> // todo  язык тянуть язык из настроек
      ))}
    </Page>
  );
};
