// import { useState, useEffect } from 'react';
// import { api } from "../services/api";

// function CarregarFestas() {
//   const [festas, setFestas] = useState([]);

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         let res = await api.get("/api/festa");
//         // res = await res.json();
//         setFestas(res)
//       } catch (error) {
//         console.error(error);
//       }
//     }

//     fetchData();
//   }, []);
//   return <span>{festas}</span>
// }

// export default CarregarFestas; 