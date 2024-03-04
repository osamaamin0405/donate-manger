//@ts-nocheck
import { Dropdown, Flex, MenuProps, TableColumnType } from "antd";
import xlsx from "better-xlsx";
import objectPath from "object-path";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable';
import "./font";
import { useTranslation } from "react-i18next";

declare type ExportProps = {
    columns: TableColumnType<any>[];
    data: any[];
    fileName: string;
    pdfTheme?: "striped" | "grid" | "plain";
}

const useExport = ({
    columns,
    data,
    fileName,
    pdfTheme
}: ExportProps) => {
    const onExcelPrint = () => {
        const file = new xlsx.File();
        const sheet = file.addSheet("Sheet1");
        const headerRow = sheet.addRow();
        columns.forEach(({ title, ExportDisable }) => {
            if (ExportDisable) return;
            const cell = headerRow.addCell();
            cell.value = title;
        });
        data.forEach((record) => {
            const row = sheet.addRow();
            columns.forEach(({ dataIndex, render,ExportDisable }, i) => {
                if(ExportDisable) return;
                const cell = row.addCell();
                if (render) {
                    cell.value = render(objectPath.get(record, dataIndex as objectPath.Path), record, i);
                    return;
                }
                
                cell.value = objectPath.get(record, dataIndex as objectPath.Path);
            });
        });

        file.saveAs('blob').then((blob: Blob) => {
            saveAs(blob, `${fileName}.xlsx`);
        })
    };

    const onCsvPrint = () => {
        let csv = "";
        columns.forEach(({ title,ExportDisable}, index) => {
            if (ExportDisable) return;
            if (index !== 0) csv += ",";

            csv += `${title.replaceAll('"', '""')}`;
        });

        csv += "\n";

        data.forEach((record) => {
            columns.forEach(({ dataIndex, render,ExportDisable }, index) => {
                if(ExportDisable) return;
                if (index !== 0) csv += ",";
                if (render) {
                    csv+= render(objectPath.get(record, dataIndex as objectPath.Path), record, index);
                    return;
                }
                csv += `${objectPath.get(record, dataIndex as objectPath.Path).replaceAll('"', '""')}`;
            });
            csv += "\n";
        });

        saveAs(new Blob([csv]), `${fileName}.csv`);
    }

    const onPdfPrint = () => {
        const doc = new jsPDF();
        doc.setFont('FreeSans');

        autoTable(doc, {
            styles: { font: "FreeSans" },
            headStyles: { fontStyle: 'normal' },
            head: [columns.filter(c => !c.ExportDisable).map(c => c.title)],
            body: data.map(r => columns.filter(c => !c.ExportDisable).map((c,i )=> {
                if(c.render) return c.render(objectPath.get(r, c.dataIndex as objectPath.Path), r,i )
                return objectPath.get(r, c.dataIndex as objectPath.Path)
            })),
            theme: pdfTheme,
        })

        doc.save(`${fileName}.pdf`);
    }

    return {
        onExcelPrint,
        onCsvPrint,
        onPdfPrint,
    }
};


export default function ExportTable({ columns, data, fileName, pdfTheme }: ExportProps) {

    const Export = useExport({ columns, data, fileName, pdfTheme }),
        events = [Export.onExcelPrint, Export.onCsvPrint, Export.onPdfPrint],
        {t} = useTranslation();

    const onMenuClick: MenuProps['onClick'] = (e) => {
        return events[parseInt(e.key)-1]();
    };

    const items = [
        {
            key: 1,
            label: t("xls"),
        },
        {
            key: 2,
            label: t("csv"),
        },
        {
            key: 3,
            label: t("pdf"),
        },
    ];
    return (
        <Flex align="flex-start" gap="small" vertical>
            <Dropdown.Button menu={{ items, onClick: onMenuClick }}>{t("export as")}</Dropdown.Button>
        </Flex>
    )

}

export { useExport };