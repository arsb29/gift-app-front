import {FC} from 'react';
import {Action} from "@/types.ts";
import {useInfinite} from "@/hooks/useInfinite.ts";
import {Empty} from "@/components/Empty/Empty.tsx";
import {userReceiveActionsQueryFn} from "@/queries/userRecieveActionsQueryFn.ts";


type Props = {
  userId: string;
}

export const UserReceiveActions: FC = (props: Props) => {
  const {userId} = props;
  const {isPending, list: actions, isError, lastElementRef} = useInfinite<Action[]>({
    queryKey: [`userReceiveActions-${userId}`],
    queryFn: userReceiveActionsQueryFn(userId)
  });

  if (isPending) return <div>Загрузка</div> // todo сделать спец экран для этого
  if (isError) return <div>Ошибка</div> // todo сделать спец экран для этого
  const isEmpty = actions.length === 0;
  if (isEmpty) return (
    <Empty
      description="You can buy a gift to receive a gift in return."
      withBackground
    />
  )

  return (
    <div>
      {actions.map(action => (
        <div>{action._id}</div>
      ))}
    </div>
  )
}
