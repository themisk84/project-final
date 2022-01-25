// import React, { useState } from "react";
// import styled from "styled-components";
// import { FaSortDown } from "react-icons/fa";
// import { API_URL } from "utilis/urls";
// import { Link } from "react-router-dom";

// const StyledToggle = styled.div`
//   color: white;
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `;

// const Select = styled.select`
//   border: 1px white solid;
//   border-radius: 8px;
//   background-color: rgba(255, 255, 255, 0.4);
//   width: 100%;
//   height: 35px;
//   margin: 5px 0;
//   padding: 10px;
//   font-size: 18px;
//   }
// `;
// const Option = styled.option``;

// const FilterText = styled.p`
//   color: white;
//   margin-bottom: 5px;
//   font-size: 16px;
//   font-weight: bold;
// `;

// const FilteringDiv = ({
//   visible,
//   category,
//   showMenu,
//   categories,
//   handleCategory,
//   fetchCategory,
//   countries,
// }) => {
// //   const [land, setLand] = useState("");
//   return (
//     <>
//       <StyledToggle onClick={showMenu}>
//         <FilterText>Filter Menu</FilterText>
//         <FaSortDown style={{ marginBottom: 5 }} />
//       </StyledToggle>
//       {visible && (
//         <div>
//           <FilterText>Country</FilterText>
//           <form>
//             <label htmlFor="country"></label>
//             <Select
//               id="country"
//               value={land}
//               onChange={(event) => setLand(event.target.value)}
//             >
//               {/* <option disabled value="">
//                   Change country
//                 </option> */}
//               {countries.map((option, index) => (
//                 <option key={index} value={option}>
//                   {console.log(land)}
//                   {option}
//                 </option>
//               ))}
//             </Select>
//           </form>
//           <div>
//             <div onClick={fetchCategory(category)}>
//               {categories.map((category) => (
//                 <button
//                   key={category}
//                   value={category}
//                   onClick={handleCategory}
//                 >
//                   {category}
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default FilteringDiv;
