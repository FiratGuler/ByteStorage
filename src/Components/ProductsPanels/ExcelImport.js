
import db from "../../DbConnection";
import { useParams } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore";
import * as XLSX from "xlsx";
import { useNavigate } from 'react-router-dom';
import { Col, Row } from "react-bootstrap"




const updateTable = async (tableData, collectionName, documentId) => {
    try {
        const docRef = doc(db, collectionName, documentId);
        await setDoc(docRef, tableData);
        console.log("Tablo başarıyla güncellendi");
    } catch (error) {
        console.error("Tablo güncelleme hatası:", error);
    }
};


export default function ExcelImport() {

    const { id } = useParams();
    const history = useNavigate();

    const handleFileUpload = async (file) => {
        try {
            if (!file) {
                throw new Error("Please choose any excel file");
            }

            const fileReader = new FileReader();
            fileReader.readAsArrayBuffer(file);
            fileReader.onload = async (event) => {
                const data = new Uint8Array(event.target.result);
                const workbook = XLSX.read(data, { type: "array" });

                const worksheet = workbook.Sheets[workbook.SheetNames[0]];
                const tableData = XLSX.utils.sheet_to_json(worksheet);

                const excelData = {};
                tableData.forEach((row) => {
                    const key = "excel";
                    const rowWithoutKey = { ...row };
                    delete rowWithoutKey[key];
                    if (!excelData[key]) {
                        excelData[key] = [rowWithoutKey];
                    } else {
                        excelData[key].push(rowWithoutKey);
                    }
                });

                // Firestore'dan varolan belgeyi al
                const docRef = doc(db, "Ana/admin1/Products", id);
                const docSnap = await getDoc(docRef);

                // Varolan belgenin içeriğini güncelle
                const existingData = docSnap.data();
                const updatedData = { ...existingData, ...excelData };
                await updateTable(updatedData, "Ana/admin1/Products", id);

                console.log("Dosya yükleme işlemi tamamlandı.");
        
                history(`/products`);
            };
        } catch
        (error) {
            console.error("Dosya yükleme hatası:", error);
        }
    };

    return (
        <Col
            className="FileUpload"
            onDragOver={(e) => {
                e.preventDefault();
                e.stopPropagation();
                e.target.style.background = "lightgray";
            }}
            onDragLeave={(e) => {
                e.preventDefault();
                e.stopPropagation();
                e.target.style.background = "antiquewhite";
            }}
            onDrop={(e) => {
                e.preventDefault();
                e.stopPropagation();
                e.target.style.background = "antiquewhite";
                handleFileUpload(e.dataTransfer.files[0]);
            }}
        >
            <Row>
                <p >You can drag and drop excel file here to upload them. </p>
            


            </Row>



        </Col>

    );
}
