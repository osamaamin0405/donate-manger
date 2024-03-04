import {Card, Statistic,} from "antd";
import { useTranslation } from "react-i18next";

interface StatisticCardProps  {
  title: string;
  total: number;
  subTotal: number;
  bg?: string;
}


export default function StatisticCard({title, total, subTotal, bg}: StatisticCardProps){
  const {t}  = useTranslation();
  return (
    <Card title={title} bordered={false} className="statistic-card" style={{ width: 300, backgroundColor: bg}}>
        <Statistic
              title={t("cases")}
              value={total}
              precision={0}
              valueStyle={{ color: '#3f8600' }}
            />
            <Statistic
              title={t("total value")}
              value={subTotal}
              precision={0}
              valueStyle={{ color: '#3f8600' }}
            />
    </Card>
  )
}