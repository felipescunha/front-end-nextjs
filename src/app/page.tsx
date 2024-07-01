"use client";
import React, { useState } from "react";
import { IProfile } from "@/interfaces/profile.interface";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ToastMessage } from "@/lib/toastMessages";
import Profile from "./components/Profile/page";
import api from "@/services/api";

export default function Home() {
  const [username, setUsername] = useState<string>("");
  const [profile, setProfile] = useState<IProfile | null>(null);

  const handleGetProfile = async (userVariable?: string) => {
    console.log("aqui")
    try {
      const response = await api.get(
        `github/users/${userVariable === undefined ? username : userVariable}`
      );
      setProfile(response.data);
    } catch (error) {
      ToastMessage("Usuário não encontrado");
      setProfile(null);
      setUsername("");
    }
  };

  function handleClearProfile() {
    setUsername("");
  }
  
  return (
    <div>
    <div className="flex flex-row justify-center items-center h-screen w-screen">
      <div className="flex justify-center items-center">
        <div className="">
        {profile != null ? (
              <Profile
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
      </div>
    </div>
  </div>
  );
}
