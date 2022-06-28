import axios from "axios";
import { useRef, useState } from "react";
import { useQuery } from "react-query";

const fetchArrAPI = () => {
  return axios.get("https://jsonplaceholder.typicode.com/todos");
};

const fetchAPI = (id: number) => {
  return axios.get(`https://jsonplaceholder.typicode.com/todos/${id}`);
};

function Async() {
  const [selectedId, setSelectedId] = useState(1);
  const [active, setActive] = useState(false);
  const { data: arrData, isLoading: arrIsLoading } = useQuery(
    "exampleArr",
    fetchArrAPI,
    {
      select: (data) => ({
        ...data,
        data: data?.data?.map(({ id }: { id: any }) => id),
      }),
    }
  );
  const { data, isLoading } = useQuery("example", () => fetchAPI(selectedId), {
    enabled: !!active,
    refetchOnMount: true,
  });

  if (isLoading) {
    return <h2>로딩 중...</h2>;
  }

  return (
    <div>
      <div>{JSON.stringify(data?.data)}</div>
      {arrIsLoading ? (
        <div>로딩 중...</div>
      ) : (
        <select onChange={(e) => setSelectedId(+e?.target?.value)}>
          {Array.isArray(arrData?.data) &&
            arrData?.data?.map((id: number) => (
              <option value={id}>{id}</option>
            ))}
        </select>
      )}
      <button onClick={() => setActive((prev) => !prev)}>
        {active ? "활성화됨" : "비활성화됨"}
      </button>
    </div>
  );
}

export default Async;
