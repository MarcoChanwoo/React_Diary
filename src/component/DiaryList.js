import { useState } from "react";
import Button from "./Button";
import "./DiaryList.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import DiaryItem from "./DiaryItem";

const sortOptionList = [ // 상단부 정렬기능
  { value: "latest", name: "최신순" },
  { value: "oldest", name: "오래된 순" },
];

const DiaryList = ({ data }) => {
  const [sortType, setSortType] = useState("latest"); // 좌상단 최신,오래된 순 설정
  const [sortedData, setSortedData] = useState([]); // 일기 데이터 정렬기능

  useEffect(() => { // 최신/오래된 순 정렬을 위한 설정
    const compare = (a, b) => {
      if (sortType === "latest") {
        return Number(b.date) - Number(a.date);
      } else {
        return Number(a.date) - Number(b.date);
      }
    };
    const copyList = JSON.parse(JSON.stringify(data));
    copyList.sort(compare);
    setSortedData(copyList);
  }, [data, sortType]);
  
  const onChangeSortType = (e) => {
    setSortType(e.target.value);
  };

  const navigate = useNavigate(); // 새일기 작성 시 새로운 페이지 생성
  const onClickNew = () => {
    navigate("/new");
  };


  return (
    <div className="DiaryList">
      <div className="menu_wrapper">
        <div className="left_col">
          <select value={sortType} onChange={onChangeSortType}>
            {sortOptionList.map((it, idx) => ( // 최신순, 오래된 순 표기
              <option key={idx} value={it.value}>
                {it.name}
              </option>
            ))}
          </select>
        </div>
        <div className="right_col">
          <Button
            type={"positive"}
            text={"새 일기 작성"}
            onClick={onClickNew}
          />
        </div>
      </div>
      <div className="list_wrapper">
        {sortedData.map((it) => (
          <DiaryItem key={it.id} {...it} />
        ))}
      </div>
    </div>
  );
}

export default DiaryList;