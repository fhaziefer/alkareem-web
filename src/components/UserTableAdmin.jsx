import axios from "axios";
import React, { useEffect, useState } from "react";
import { searchUser } from "../api/UserApi";

const UserTableAdmin = () => {
  const apiUrl = process.env.REACT_APP_BASE_URL;
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const userData = JSON.parse(window.localStorage.getItem("LOGIN_DATA"));
        const response = await axios.get(
          `${apiUrl}/user/search?keyword=%${searchQuery}&page=${currentPage}`,
          {
            headers: {
              Authorization: userData.token,
            },
          }
        );
        setData(response.data.data);
        setTotalPage(response.data.paging.total_page);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [searchQuery, currentPage]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

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

  const Pagination = () => {
    const next = () => {
      if (currentPage === totalPage) return;

      setCurrentPage(currentPage + 1);
    };

    const prev = () => {
      if (currentPage === 1) return;

      setCurrentPage(currentPage - 1);
    };

    return (
      <div>
        <div className="inline-flex mt-2 xs:mt-0">
          {currentPage === 1 ? (
            <button
              disabled={true}
              className="flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-gray-900 rounded-s  dark:bg-gray-900 dark:border-gray-800 dark:text-gray-500  "
            >
              Prev
            </button>
          ) : (
            <button
              onClick={prev}
              disabled={currentPage === 1}
              className="flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-gray-800 rounded-s hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Prev
            </button>
          )}

          {currentPage === totalPage ? (
            <button
              disabled={true}
              className="flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-gray-900 rounded-s  dark:bg-gray-900 dark:border-gray-800 dark:text-gray-500  "
            >
              Next
            </button>
          ) : (
            <button
              onClick={next}
              disabled={currentPage === totalPage}
              className="flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-gray-800 border-0 border-s border-gray-700 rounded-e hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Next
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-[800px] w-full h-screen mx-auto text-center flex flex-col justify-top">
      <div>
        <form
          className="max-w-lg mx-auto mb-4"
          onSubmit={(event) => event.preventDefault()}
        >
          <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Nama, Bani, Alamat..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
        </form>
      </div>
      <UserList />
      <Pagination />
    </div>
  );
};

export default UserTableAdmin;
