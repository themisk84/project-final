// import React from "react";
// import styled from "styled-components";
// import { useSelector } from "react-redux";

// import Searchbar from "components/Searchbar";
// import PostSightseeing from "../pages/PostSightseeing";
// import user from "../reducers/user";
// import AttractionCards from "components/AttractionCards";
// import { FaRegCompass } from "react-icons/fa";

// const MyPosts = () => {
//   const savedPosts = useSelector((store) => store.user.savedSights);
//   console.log(savedPosts);

//   return (
//     <>
//       {savedPosts.length === 0 && <div>You have not saved any posts</div>}
//       <AttractionContainer>
//         <StyledHeadline>My liked posts</StyledHeadline>

//         {savedPosts.map((item) => {
//           return (
//             <LikedPostWrapper key={item._id}>
//               <ImageContainer image={item.imageUrl} />
//               <InfoContainer>
//                 <ActivityName>{item.name}</ActivityName>
//                 <InfoWrapper>
//                   <FaRegCompass
//                     style={{
//                       marginRight: "6",
//                       height: "14",
//                     }}
//                   />
//                   <p
//                     style={{
//                       fontSize: "14px",
//                       fontStyle: "italic",
//                     }}
//                   >
//                     {item.location}
//                   </p>
//                 </InfoWrapper>
//                 <InfoWrapper>
//                   <p>Category:</p>
//                   <p style={{ marginLeft: 5 }}>{item.category}</p>
//                 </InfoWrapper>
//               </InfoContainer>
//             </LikedPostWrapper>
//             // <AttractionCards item={item} key={item._id} />
//           );
//         })}
//       </AttractionContainer>
//     </>
//   );
// };

// export default MyPosts;

// const AttractionContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   padding: 20px;
//   width: 100%;
//   margin-top: 70px;
// `;
// const StyledHeadline = styled.h2`
//   margin: 0;
//   color: #061137;
//   margin: 25px 0;
// `;
// const LikedPostWrapper = styled.div`
//   border-radius: 20px;
//   width: 100%;
//   height: 150px;
//   margin-bottom: 20px;
//   overflow: hidden;
//   display: flex;
//   background-color: white;
// `;
// const ImageContainer = styled.div`
//   height: 100%;
//   width: 45%;
//   background-image: ${(props) => `url(${props.image})`};
//   background-size: cover;
//   background-position: center;
// `;
// const InfoContainer = styled.div`
//   background-color: white;
//   border-radius: 20px;
//   margin-left: -20px;
//   padding: 15px;
// `;
// const ActivityName = styled.h3`
//   margin: 0;
//   margin-top: 10px;
// `;
// const InfoWrapper = styled.div`
//   display: flex;
//   align-items: center;
// `;