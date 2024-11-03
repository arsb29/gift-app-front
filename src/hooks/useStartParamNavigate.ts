import {retrieveLaunchParams} from "@telegram-apps/sdk-react";
import {generatePath, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {ROUTES_PATHS} from "@/navigation/routes.tsx";

export function useStartParamNavigate() {
  const {startParam} = retrieveLaunchParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (typeof startParam === 'string') {
      const [type, transactionId] = startParam.split('-');
      switch (type) {
        case 'giftPurchased':
          navigate(generatePath(ROUTES_PATHS.giftPaid, {id: transactionId}));
          break;
        default:
          break;
      }
    }
  }, []);
}