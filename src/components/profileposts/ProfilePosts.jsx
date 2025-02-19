import React, { useEffect, useState } from "react";
import ProfilePost from "./ProfilePost";
import { Container, Grid, Skeleton } from "@chakra-ui/react";
import useGetUserPosts from "../../hooks/useGetUserPosts";

const ProfilePosts = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { posts } = useGetUserPosts();

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);
  return (
    <Container maxW={"container.lg"}>
      <Grid
        templateColumns={{ sm: "repeat(1, 1fr)", lg: "repeat(3, 1fr)" }}
        gap={1}
        columnGap={1}
      >
        {isLoading &&
          [0, 1, 2, 3, 4, 5].map((_, idx) => (
            <Skeleton key={idx} height="100px" width={"150px"} />
          ))}

        {
          !isLoading &&(
            posts?.length > 0 ? (
              posts.map((p, idx) => <ProfilePost key={idx} post={p} />)
            ) : (
              <p className="">No posts 😔</p>
            )
          )
        }
      </Grid>
    </Container>
  );
};

export default ProfilePosts;
