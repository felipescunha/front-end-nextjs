"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  const [username, setUsername] = useState<string>("");

  function handleClearProfile() {
    setUsername("");
  }
  
  return (
    <div>
    <div className="flex flex-row justify-center items-center h-screen w-screen">
      <div className="flex justify-center items-center">
        <div className="">
          
          <div className="flex flex-col gap-2.5 justify-center pl-4 pr-4 w-96">
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Digite um usuário do Github"
              className="w-full px-3 py-2 border-transparent focus:border-transparent focus:ring-0"
            />
            <Button variant="outline"
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
