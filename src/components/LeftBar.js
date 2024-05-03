import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import UserContext from "@/context/UserContext";

export default function LeftBar() {
  const { token, loading, updateToken } = useContext(UserContext);
  const [userData, setUserData] = useState({});

  const handleLogout = () => {
    updateToken("");
  };

  useEffect(() => {
    const getUserData = async () => {
      if (!loading) {
        const data = await fetch(`http://localhost:3000/users/${token}`).then(
          (r) => r.json()
        );
        setUserData(data.user);
      }
    };
    getUserData();
  }, [token]);

  return (
    <>
      <div className="bg-[#151d26] w-3/12 flex flex-col justify-between p-6 ">
        <Link href="/">
          <Image
            src="/rettiwt.png"
            alt="logo Twitter"
            className="hover:cursor-pointer"
            width={50}
            height={40}
          />
        </Link>
        <div className="flex flex-col gap-y-3">
          <div className="text-white flex font-semibold items-center">
            <div className="size-14 rounded-full bg-sky-900 flex items-center justify-center">
              <Image
                src={userData.imageUrl}
                alt="Profil picture"
                className="size-11"
                width={50}
                height={50}
              />
            </div>
            <div className="p-2">
              <p>{userData.firstName}</p>
              <p className="text-xs text-[#65717e]">@{userData.username}</p>
            </div>
          </div>
          <button
            className="w-24 h-9 bg-transparent text-xs text-white rounded-2xl border-2 font-semibold"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
}
