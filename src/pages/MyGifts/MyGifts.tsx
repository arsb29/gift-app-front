import {useQuery} from "@tanstack/react-query";
import { Page } from '@/components/Page.tsx';
import {FullTransaction} from "@/types.ts";
import {QUERY_KEYS} from "@/constants.ts";
import styles from './MyGifts.module.css';
import {Header} from "@/pages/GiftsPage/Header.tsx";
import {checkTransactionQueryFn} from "@/queries/needToSendGiftsQueryFn.ts";
import {GiftPurchased} from "@/components/GiftPurchased/GiftPurchased.tsx";

export function MyGifts() {
  const {isPending, isError, data: transactions} = useQuery<FullTransaction[]>({
      queryKey: [QUERY_KEYS.myGifts],
      queryFn: checkTransactionQueryFn,
  });
  if (isPending) return <div>Загрузка</div> // todo сделать спец экран для этого
  if (isError) return <div>Ошибка</div> // todo сделать спец экран для этого
  return (
    <Page back={false} withMenu className={styles.container} key="page">
      <Header
        title="Send Gifts in Telegram"
        description="Send gifts to users that can be stored in their app profile."
      />
      <div className={styles.list}>
        {transactions.map(transaction => (
          <GiftPurchased transaction={transaction} key={transaction._id} />
        ))}
      </div>
    </Page>
  );
}
