"use client";
import React, { useCallback, useState } from "react";
import Profile from "./components/Profile/page";
import api from "../services/api";
import { ToastMessage } from "@/lib/toastMessages";
import Following from "./components/Following/page";
import { IProfile } from "@/interfaces/profile.interface";
import { IUser } from "@/interfaces/user.interface";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  const [profile, setProfile] = useState<IProfile | null>(null);
  const [username, setUsername] = useState<string>("");

  const [following, setFollowing] = useState<boolean>(false);
  const [followingList, setFollowingList] = useState<IUser[]>([]);

  const handleGetProfile = async (userVariable?: string) => {
    try {
      const response = await api.get(
        `github/users/${userVariable === undefined ? username : userVariable}`
      );
      setProfile(response.data);
      setFollowingList([]);
      setFollowing(false);
    } catch (error) {
      ToastMessage("Usuário não encontrado");
      setProfile(null);
      setUsername("");
      setFollowingList([]);
      setFollowing(false);

    }
  };

  async function handleGetFollowing(pageNumber: number) {
    try {
      const response = await api.get(
        `github/users/${username}/following?page=${pageNumber}`
      );
      setFollowingList(response.data);
      setFollowing(true);
      console.log(response.data);
    } catch (error) {
      ToastMessage("Seguidores não encontrado");
      setFollowingList([]);
      setFollowing(false);
    }
  }

  function handleClearProfile() {
    setProfile(null);
    setUsername("");
    setFollowingList([]);
    setFollowing(false);
  }

  const handleChangeUser = async (username: string) => {
    setUsername(username);
    handleGetProfile(username);
    setFollowingList([]);
    setFollowing(false);
  };

  const handleChangeFollowingPage = useCallback(
    (pageNumber: number) => {
      handleGetFollowing(pageNumber);
    },
    [username]
  );

  return (
    <div>
      <div className="flex flex-row justify-center items-center h-screen w-screen">
        <div className="flex justify-center items-center">
          <div className="">
            {profile != null ? (
              <Profile
                handleOpenFollowing={handleGetFollowing}
                avatar={profile?.avatar_url}
                name={profile?.name}
                username={profile?.login}
                bio={profile?.bio}
                github={profile?.html_url}
                public_repos={profile?.public_repos}
                location={profile?.location}
                followers={profile?.followers}
                following={profile?.following}
                company={profile?.company}
                blog={profile?.blog}
              />
            ) : (
              <div></div>
            )}
            <div className="flex flex-col gap-2.5 justify-center pl-4 pr-4 w-96">
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Digite um usuário do Github"
                className="w-full px-3 py-2 border-transparent focus:border-transparent focus:ring-0"
              />
              <Button variant="outline"
                onClick={() => {
                  handleGetProfile();
                }}
              >
                Buscar usuário
              </Button>
              <Separator/>
               <Button variant="destructive"
                onClick={handleClearProfile}
              >
                Limpar estado
              </Button>
            </div>
          </div>
          <Following
            handleChangeUser={handleChangeUser}
            followingList={followingList}
            followingSize={profile ? profile.following : 0}
            handleChangeFollowingPage={handleChangeFollowingPage}
            followingOpened={following}
          />
        </div>
      </div>
    </div>
  );
}
