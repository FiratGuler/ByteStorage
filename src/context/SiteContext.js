import { createContext, useContext, useState, useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";
import db from "../DbConnection"

const Context = createContext()

const Provider = ({ children }) => {

    const getPerson = async () => {
        const querySnapshot = await getDocs(collection(db, "/Ana/admin1/personel"))
        const data = []
        querySnapshot.forEach(doc => {
            data.push({ id: doc.id, ...doc.data() })
        })
        setEmployees(data)
        console.log("Employess data read")
    }

    const getTable = async () => {
        const querySnapshot = await getDocs(collection(db, "/Ana/admin1/Products"))
        const data = []
        querySnapshot.forEach(doc => {
          data.push({ id: doc.id, ...doc.data() })
        })
        setAllTables(data)
        console.log("Product Table reads!")
      }



    useEffect(() => {
        getPerson()
       
    }, [])

    const [Employees, setEmployees] = useState([])
    const [AllTables, setAllTables] = useState([]);
    const [editID, setEditID] = useState([])
    const [adminCheck, setAdminCheck] = useState(false)
    const [alert, setAlert] = useState([{
        alertIsActive: false,
        alertMessage: "test",
        situation: "danger"
    }])
    const [tableCategory, setTableCategory] = useState(1)

    const data = {
        Employees, setEmployees,
        AllTables, setAllTables,
        adminCheck, setAdminCheck,
        editID, setEditID,
        alert, setAlert,
        tableCategory, setTableCategory,
        getPerson,
        getTable,
    }

    return (
        <Context.Provider value={data}>
            {children}
        </Context.Provider>
    )
}

export const useSite = () => useContext(Context)

export default Provider 