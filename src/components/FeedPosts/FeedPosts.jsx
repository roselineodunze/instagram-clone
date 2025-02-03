import { Container, SkeletonCircle, Skeleton } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import FeedPost from "./FeedPost";
import useGetFeedPosts from "../../hooks/useGetFeedPosts";

const FeedPosts = () => {
  const [isLoading, setIsLoading] = useState(true);
  const {posts} = useGetFeedPosts()

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);
  return (
    <Container maxW={"container.sm"}>
      {isLoading &&
        [0, 1].map((_, idx) => (
          <div key={idx} className="">
            <div className="flex gap-4 w-full items-center">
              <SkeletonCircle size="8" />
              <div className="flex-grow">
                <Skeleton height="13px" width={"40%"} />
              </div>
              <Skeleton height="15px" width={"15%"} />
            </div>
            <div className="w-full my-2">
              <Skeleton
                height={{ md: "600px", base: "400px" }}
                width={"100%"}
              />
            </div>
          </div>
        ))}

        {posts.map((post) => (
          <FeedPost
          key={post.id}
          post={post}
        />
        ))}

        
    </Container>
  );
};

export default FeedPosts;
