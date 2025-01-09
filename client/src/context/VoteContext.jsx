import React, { createContext, useState, useContext } from "react";

const VoteContext = createContext();

export const useVote = () => {
  return useContext(VoteContext);
};

export const VoteProvider = ({ children }) => {
  const [voteCount, setVoteCount] = useState(4);

  const incrementVote = () => {
    setVoteCount((prevCount) => prevCount + 1);
  };

  return (
    <VoteContext.Provider value={{ voteCount, incrementVote }}>
      {children}
    </VoteContext.Provider>
  );
};
