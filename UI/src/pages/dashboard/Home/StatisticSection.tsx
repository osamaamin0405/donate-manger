
import { Row , Col, Typography } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import { getLastXDay } from "../../../utils/helpers";
import StatisticCard from "../../../components/Cards/Statistic";
import { useTranslation } from "react-i18next";


const StatisticCardsSection : React.FC = ()=>{
  const [categorys, setCategorys] = useState<any[]>(),
        {t} = useTranslation();
  useEffect(()=>{
    axios.get(`/donations/statics/${getLastXDay(7)}`)
    .then(res=>{
      setCategorys(res.data.data);
    })
    .catch()
  }, [])
  return (
    <section>
        <Typography.Title level={3} className="text-center">{t('last week statics')}</Typography.Title>
        <Row className="gap-4">
        {categorys && categorys.map(category=>{
          return (
            <Col key={category.category_name}>
              <StatisticCard
                title={category.category_name}
                total={category.total_cases}
                subTotal={category.total_value}
              />
            </Col>
          )
        })}
        </Row>
    </section>
  );
}

export default StatisticCardsSection;