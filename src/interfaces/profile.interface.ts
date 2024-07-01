export interface IProfile {
    avatar_url: string | undefined;
    name: string;
    login: string;
    bio?: string;
    html_url: string;
    location?: string;
    public_repos: number;
    followers: number;
    following: number;
    follower_url: string;
    company?: string;
    blog?: string | undefined;
  }
