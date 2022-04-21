import {Link} from "react-router-dom"

function Main() {
  return (
    <div>
        <Link to="./signin">
          <button>회원가입</button>
        </Link>
        <Link to="./login">
          <button>로그인</button>
        </Link>
        <Link to = "./userInfo">
          <button>개인정보</button>
        </Link>
    </div>
  );
}

export default Main;