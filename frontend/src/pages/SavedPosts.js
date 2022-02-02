import React from "react"
import styled from "styled-components";
import { useSelector } from "react-redux";

import Searchbar from "components/Searchbar";
import PostSightseeing from "../pages/PostSightseeing";
import user from "../reducers/user";
import AttractionCards from "components/AttractionCards";

const UserPage = () => {

    const savedPosts = useSelector((store) =>
        store.user.likedSights
    );
    console.log(savedPosts);

    return (
        <>
            <Searchbar />
            {savedPosts.length === 0 ? (
                <div>You have not saved any posts</div>
            ) : (
                <AttractionContainer>
                    {savedPosts &&
                        savedPosts.map((item) => (
                            <div>
                                <p>My liked posts</p>
                                <p>{item.name}</p>
                            </div>
                            // <AttractionCards item={item} key={item._id} />
                        ))}
                </AttractionContainer>
            )
            }
        </>

    );
};

export default UserPage;

const AttractionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 100px;
  background-color: white;
`;