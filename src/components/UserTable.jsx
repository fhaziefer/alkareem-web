import axios from "axios";
import React, { useEffect, useState } from "react";

const UserTable = () => {
  const [data, setData] = useState([]);
  console.log(data);

  useEffect(() => {
    async function fetchData() {
      try {
        const apiUrl = process.env.REACT_APP_BASE_URL;
        const search = "%";
        const userData = JSON.parse(window.localStorage.getItem("LOGIN_DATA"));
        const response = await axios.get(
          `${apiUrl}user/search?keyword=${search}`,
          {
            headers: {
              Authorization: userData.token,
            },
          }
        );
        setData(response.data.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  const UserList = () => {
    return data.map((data, i) => {
      return (
          <tbody>
            <tr className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600" key={i}>
              <td className="whitespace-nowrap px-6 py-4">{data.username}</td>
              <td className="whitespace-nowrap px-6 py-4">{data.profil.name}</td>
              <td className="whitespace-nowrap px-6 py-4">{data.profil.bani.bani_name}</td>
            </tr>
          </tbody>
      );
    });
  };

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full text-left text-sm font-light text-white">
              <thead className="border-b font-medium dark:border-neutral-500">
                <tr>
                  <th scope="col" className="px-6 py-4">
                    Username
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Bani
                  </th>
                </tr>
              </thead>
              <UserList />
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserTable;
