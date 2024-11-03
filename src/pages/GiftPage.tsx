import {FC} from 'react';
import {useQuery} from "@tanstack/react-query";
import {Gift} from "@/types.ts";
import {toMilliseconds} from "@/helpers/toMilliseconds.ts";
import {useParams} from "react-router-dom";
import {QUERY_KEYS} from "@/constants.ts";
import {giftsQueryFn} from "@/queries/giftsQueryFn.ts";

export const GiftPage: FC = () => {
  const {id} = useParams();
  const {isPending, isError, data: gifts} = useQuery<Gift[]>({ //todo вынести и убрать дублирование запросов
    queryKey: [QUERY_KEYS.gifts],
    queryFn: giftsQueryFn,
    staleTime: toMilliseconds({minutes: 1})
  });
  const gift = gifts?.find(g => g._id === id);
  if (isPending) return <div>Загрузка</div> // todo сделать спец экран для этого
  if (isError || !gift) return <div>Ошибка</div> // todo сделать спец экран для этого
  return (
    <>
      <div>
        {gift.numberOfPurchased + gift.numberOfBooked} of {gift.totalNumberOf}
        {gift.giftId}
        {gift.title['en']}
        {gift.amount}
        {gift.asset}
      </div>
      <div>Recently Actions</div>

    </>

  )
};
