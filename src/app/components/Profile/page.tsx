"use client";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface ProfileProps {
  avatar: string | undefined;
  name: string;
  username: string;
  bio?: string;
  github: string;
  blog?: string | undefined;
  company?: string;
  location?: string;
  public_repos: number;
  followers: number;
  following: number;
  handleOpenFollowing: (pageNumber: number) => void;
}

const Profile: React.FC<ProfileProps> = ({
  avatar,
  name,
  username,
  bio,
  github,
  blog,
  company,
  location,
  public_repos,
  followers,
  following,
  handleOpenFollowing,
}) => {
  return (
    <div className="p-4 flex flex-col justify-start items-center max-w-xl pb-2">
      <div className="mt-3 justify-center items-center ">
        <Image
          src={avatar ? avatar : "/avatar.png"}
          alt="Avatar"
          width={256}
          height={256}
          className="rounded-full mt-2"
        />
      </div>
      <div className="flex flex-col mt-2 text-left">
        <p className="text-xl text-white font-medium">{name}</p>
        <span className=" text-gray-200">{username}</span>
        <div className="text-white bg-gray-700 rounded-md p-2 mt-2 text-center">
          <AlertDialog>
            <AlertDialogTrigger>Clique para ver a bio</AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Biografia</AlertDialogTitle>
                <AlertDialogDescription>
                  {bio ? bio : "Este usuário não possui bio :("}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        <div className="flex flex-row text-sm mt-3 mb-1">
          <Image src="icon-users.svg" alt="users" width={16} height={16} />
          <span className="text-white font-medium mr-1 ">{followers}</span>
          <p className="text-gray-200"> followers </p>
          <span className="text-white font-medium ml-2 mr-2 "> · </span>
          { following === 0 ? (
            <>
             <span className="text-white font-medium">{following}</span>
             <p className="text-gray-200 ml-1">following</p>
            </>
          ) : (
            <div
              className="flex items-center hover:cursor-pointer gap-1 border-0 hover:border-b-2"
              onClick={() => handleOpenFollowing(1)}
            >
              <span className="text-white font-medium">{following}</span>
              <p className="text-gray-200">following</p>
            </div>
          )}
        </div>
        {blog ? (
          <Link href={blog} className="text-white font-medium text-sm">
            {blog}
          </Link>
        ) : null}
        {github ? (
          <Link href={github} className="text-white font-medium text-sm">
            {github}
          </Link>
        ) : null}
        <div className="flex fle-row mt-2">
          {location ? (
            <Image
              src="icon-location.svg"
              alt="Location"
              width={16}
              height={16}
            />
          ) : null}
          <p className="text-gray-200 text-sm">{location}</p>
        </div>
        <p className="text-gray-200 text-sm">{company}</p>
        <p className="text-gray-200 text-sm">
          Public repositories: {public_repos}
        </p>
      </div>
    </div>
  );
};

export default Profile;
