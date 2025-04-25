import React, { useEffect, useState } from "react";
import ProfilePost from "./ProfilePost";
import { Container, Grid, Skeleton, GridItem, Flex } from "@chakra-ui/react";
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
    {isLoading && (
      <Grid
        templateColumns={{ sm: "repeat(1, 1fr)", lg: "repeat(3, 1fr)" }}
        gap={1}
        columnGap={1}
      >
        {[...Array(6)].map((_, idx) => (
          <GridItem
            key={idx}
            overflow={"hidden"}
            position={"relative"}
            aspectRatio={1 / 1}
          >
            <Skeleton height="100%" width="100%" />
          </GridItem>
        ))}
      </Grid>
    )}

    {!isLoading && posts?.length === 0 && (
      <Flex justify="center" align="center" height="200px">
        <p className="text-lg text-gray-400">No posts yet 😔</p>
      </Flex>
    )}

    {!isLoading && posts?.length > 0 && (
      <Grid
        templateColumns={{ sm: "repeat(1, 1fr)", lg: "repeat(3, 1fr)" }}
        gap={1}
        columnGap={1}
      >
        {posts.map((p, idx) => (
          <ProfilePost key={idx} post={p} />
        ))}
      </Grid>
    )}
  </Container>
  );
};

export default ProfilePosts;
