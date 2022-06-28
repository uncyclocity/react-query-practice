import axios from "axios";
import { useQueries } from "react-query";

const fetchAPI1 = () => {
  return axios.get("https://jsonplaceholder.typicode.com/todos/1");
};

const fetchAPI2 = () => {
  return axios.get("https://jsonplaceholder.typicode.com/todos/2");
};

const fetchAPI3 = () => {
  return axios.get("https://jsonplaceholder.typicode.com/todos/3");
};

function UseQueries() {
  const res = useQueries([
    { queryKey: "example1", queryFn: fetchAPI1 },
    { queryKey: "example2", queryFn: fetchAPI2 },
    { queryKey: "example3", queryFn: fetchAPI3 },
  ]);

  if (!res.map(({ isLoading }) => !isLoading).length) {
    return <h2>로딩 중...</h2>;
  }

  return <div>{JSON.stringify(res.map(({ data }) => data?.data))}</div>;
}

export default UseQueries;
