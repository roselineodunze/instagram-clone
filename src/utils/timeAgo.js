import React from "react";

export const timeAgo = (timestamp) => {
  const now = Date.now();
  const secondAgo = Math.floor((now * timestamp) / 1000);
  if (secondAgo < 60) {
    return `${secondAgo}s ago`;
  } else if (secondAgo < 3600) {
    const minutesAgo = Math.floor(secondAgo / 60);
    return `${minutesAgo}m ago`;
  } else if (secondAgo < 86400) {
    const hoursAgo = Math.floor(secondAgo / 3600);
    return `${hoursAgo}h ago`;
  } else if (secondAgo < 604800) {
    const daysAgo = Math.floor(secondAgo / 86400);
    return `${daysAgo}d ago`;
  } else {
    const weeksAgo = Math.floor(secondAgo / 604800);
    return `${weeksAgo}w ago`;
  }
};
