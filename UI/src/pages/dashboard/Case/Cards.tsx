//@ts-nocheck
import { Avatar, Button, Divider, Flex, Image, QRCode, Typography } from "antd";
import Barcode from "react-barcode";
import { useLocation, useNavigate } from "react-router-dom";
import { useRef } from 'react';
import { PrinterOutlined } from "@ant-design/icons";
import ReactToPrint from "react-to-print";
import { useTranslation } from "react-i18next";

type CardProps = {
    id: string,
    name: string,
    address: string,
    image: string;
}

function Card({ id, name, address, image }: CardProps) {
    return <Flex gap='large'>
        <div className="rounded bg-green-950 p-2 boreder-1" style={{ width: "9.9cm", height: "6.6cm" }}>
            <Typography.Title level={5} className="text-center">بطاقة الجمعية الشرعية</Typography.Title>
            {
                image ?
                    <Image preview={false} className="rounded shrink-0" style={{ width: "3cm", height: "3cm" }} src={`${process.env.REACT_APP_API_BASE_URL}/${image}`}></Image>
                    :
                    <Avatar size='large'>{name.slice(0, 2).toLocaleUpperCase()}</Avatar>
            }
            <div style={{ float: 'right' }} className="mt-1">
                <Typography.Paragraph style={{ width: "6cm" }} className=" text-lg font-bold" dir="rtl">
                    <Typography.Paragraph className=" text-lg font-bold text-wrap">
                        {name}
                    </Typography.Paragraph>
                    <Typography.Paragraph>
                        {address}
                    </Typography.Paragraph>
                </Typography.Paragraph>
            </div>
            <div className="mt-2 card-barcode">
                <Barcode renderer="img" height={2 / .0264583333} className="w-full" displayValue={false} background="#fff" margin={0} value={id} />
            </div>
        </div>
        <div className="rounded bg-green-950 p-2 boreder-1" style={{ width: "9.9cm", height: "6.6cm" }}>
            <Flex className="w-full h-full" justify="center" align="center" vertical>
                <QRCode value={id} bgColor="#fff" color="#000" />
                <Typography.Paragraph className="mt-2">
                    برجاء المحافظة على البطاقة
                </Typography.Paragraph>
            </Flex>
        </div>
    </Flex>
}


export default function ReviewCard() {

    const { rowSelectedData } = useLocation().state,
        navigate = useNavigate();
    const targetRef = useRef(),
        {t} = useTranslation();

    if (!rowSelectedData) {
        navigate("/");
        return;
    }



    return (
        <>
            <div>
                <ReactToPrint
                    bodyClass="print-agreement"
                    //@ts-ignore
                    content={() => targetRef.current}
                    trigger={() => (
                        <Button 
                            type="primary"
                            icon={<PrinterOutlined />}>
                            {t("print")}
                        </Button>
                    )}
                />
            </div>
            <Divider></Divider>
            {/* @ts-ignore */}
            <Flex ref={targetRef} vertical className="gap-9 w-full justify-center items-center" >
                {
                    rowSelectedData.map((card: any) => {
                        return <Card key={card._id} id={card._id} name={card.name} image={card.image} address={card.address} />
                    })
                }
            </Flex>
        </>
    )

}