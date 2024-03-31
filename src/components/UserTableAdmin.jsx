import axios from "axios";
import React, { useEffect, useState } from "react";

const UserTableAdmin = () => {
  const apiUrl = process.env.REACT_APP_BASE_URL;
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1)

  useEffect(() => {
    async function fetchData() {
      try {
        const search = "%";
        const userData = JSON.parse(window.localStorage.getItem("LOGIN_DATA"));
        const response = await axios.get(
          `${apiUrl}/user/search?keyword=${search}&page=${currentPage}`,
          {
            headers: {
              Authorization: userData.token,
            },
          }
        );
        setData(response.data.data);
        setTotalPage(response.data.paging.total_page)
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  const UserList = () => {
    return data.map((data, i) => {
      return (
        <div className="text-left" key={i}>
          <div className="p-4 flex items-center justify-between border-t cursor-pointer border-gray-700 hover:bg-gray-900">
            <div className="flex items-center">
              <img
                className="rounded-full md:h-15 md:w-15 sm:h-12 sm:w-12 h-10 w-10 mr-2"
                src={`${apiUrl}${data.profil.avatar}`}
              />
              <div className="md:max-w-[350px] max-w-[150px] ml-2 flex flex-col">
                <div className="leading-snug text-xs text-white font-bold md:text-md sm:text-sm">
                  {data.profil.name}
                </div>
                <div className="leading-snug text-[11px] md:text-sm sm:text-xs text-gray-500">
                  {data.profil.bani.bani_name}
                </div>
              </div>
            </div>
            <div>
              <button className="h-8 px-3 text-xs md:text-md sm:text-sm font-bold text-blue-400 border border-blue-900 rounded-full hover:bg-blue-400 hover:text-gray-900">
                Edit
              </button>
              <button className="h-8 ml-4 px-3 text-xs md:text-md sm:text-sm font-bold text-red-400 border border-red-900 rounded-full hover:bg-red-400 hover:text-black">
                Delete
              </button>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="max-w-[800px] w-full h-screen mx-auto text-center flex flex-col justify-top">
      <h1 className="text-white items-center font-bold text-md md:text-2xl sm:text-xl mb-5">
        User yang sudah mendaftar
      </h1>
      <UserList />
    </div>
  );
};

export default UserTableAdmin;
