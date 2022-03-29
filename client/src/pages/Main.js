import {Link} from "react-router-dom"

function Main() {
  return (
    <div>
        <Link to="./testpage">
          <button>테스트 코딩 페이지 이동</button>
        </Link>
    </div>
  );
}

export default Main;