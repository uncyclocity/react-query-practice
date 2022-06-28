import axios from "axios";
import { useQuery } from "react-query";

const fetchAPI = () => {
  return axios.get("https://jsonplaceholder.typicode.com/todos/1");
};

function UseQuery() {
  const { data, isLoading } = useQuery("example", fetchAPI, {
    //cacheTime: 500, //언마운트 이후 데이터를 저장하여 캐싱하는 시간
    //staleTime: 500, //쿼리가 fresh 상태에서 stale 상태로 전환되는 시간
    //refetchOnMount: true, //컴포넌트 마운트 시 리페칭
    //refetchOnWindowFocus: true, //브라우저 포커싱되면 리페칭
    //refetchInterval: 500, //지정한 시간 간격으로 리페칭
    //refetchIntervalInBackground: true, //브라우저에 포커스가 없어도 refetchInterval에 지정한 시간만큼 리페칭
    //enabled: false, //컴포넌트가 마운트 되어도 리페칭X (useQuery Hook이 반환하는 referch 함수를 이용하여 리페칭할 수 있다)
    //onSuccess: (data) => console.log(data), //성공 시 동작
    //onError: (err) => console.error(err), //실패 시 동작
    //select: (data) => ({ ...data, data: { ...data.data, title: "김백괴" } }), //데이터 가공
  });

  if (isLoading) {
    return <h2>로딩 중...</h2>;
  }

  return <div>{JSON.stringify(data?.data)}</div>;
}

export default UseQuery;
