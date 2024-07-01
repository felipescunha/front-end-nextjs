import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { motion } from "framer-motion";
import { IUser } from "@/interfaces/user.interface";
import { cn } from "@/lib/utils";

interface FollowingProps {
  followingList: IUser[];
  followingOpened: boolean;
  followingSize?: number;
  handleChangeFollowingPage: (pageNumber: number) => void;
  handleChangeUser: (username: string) => void;
}

export default function Following({
  followingList,
  followingSize,
  handleChangeFollowingPage,
  followingOpened,
  handleChangeUser,
}: FollowingProps) {
  const [actualPage, setActualPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(
    Math.ceil((followingSize || 0) / 30)
  );
  const [totalItems, setTotalItems] = useState<number>(followingSize || 0);

  useEffect(() => {
    setTotalPages(Math.ceil((followingSize || 0) / 30));
    setTotalItems(followingSize || 0);
  }, [followingSize]);

  const handlePage = (page: number) => {
    setActualPage(page);
    handleChangeFollowingPage(page);
  };

  // my handlenextpage is not understaning the totalpages and gaving me 0
  const handleNextPage = useCallback(() => {
    console.log(actualPage, totalPages);
    if (actualPage < totalPages) {
      setActualPage(actualPage + 1);
      handleChangeFollowingPage(actualPage + 1);
    }
  }, [actualPage, totalPages]);

  const handleBackPage = useCallback(() => {
    if (actualPage > 1) {
      setActualPage(actualPage - 1);
      handleChangeFollowingPage(actualPage - 1);
    }
  }, [actualPage]);

  return (
    followingOpened && (
      <motion.div
        className="flex flex-row flex-wrap gap-2.5 bg-gray-700 text-white h-2/4 w-full justify-center items-start rounded-xl p-4"
        animate={{ width: 800 }}
        transition={{ delay: 1 }}
        initial={{ width: 0 }}
      >
        {followingList &&
          followingList.map((user: IUser) => (
            <div
              key={user.id}
              className="flex flex-col items-center hover:bg-gray-500 p-2 rounded-xl w-36"
              onClick={() => {
                setTotalItems(0);
                setActualPage(1);
                setTotalPages(0);
                handleChangeUser(user.login);
              }}
            >
              <Image
                src={user.avatar_url}
                alt={user.login}
                className="rounded-full mt-2"
                height={48}
                width={48}
              />
              <p>{user.login}</p>
              <p>{user.name}</p>
            </div>
          ))}
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious onClick={handleBackPage} />
            </PaginationItem>
            {totalPages > 0 &&
              Array.from({ length: totalPages }, (_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink
                    href="#"
                    onClick={() => handlePage(index + 1)}
                    className={index + 1 === actualPage ? cn("bg-red-500") : ""}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
            <PaginationItem>
              <PaginationNext onClick={handleNextPage} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </motion.div>
    )
  );
}
