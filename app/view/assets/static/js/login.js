/* 로그인 
- form_data를 body에 포함시켜 요청
- 받은 데이터가 success일 경우
*/
async function login() {
  // form data 생성
  var formData = new FormData(document.getElementById("login_form"));
  
  // form data를 body에 포함시켜 요청
  await fetch('/signin', {
      method: 'post',
      body : formData
  })
  .then((response)=>response.json())
  .then((data)=>{
    if(data["msg"]=="success"){
      // 로그인이 완료되면, "/protected"페이지로 "변경"한다. // /protected API는 GET방식이어야한다.
      console.log("로그인성공");
      window.location.replace("/protected_page");
    }
    else{
      console.log("로그인 실패");
    }
  })
  .catch(()=>{
    alert("로그인에 실패했습니다.");
  });
  
}

// 로그아웃
async function logout() {
    await fetch('/logout_with_cookies', {method: 'post'});
    // logout시 logout form을 숨긴다.
    document.getElementById("logout_form").style.display = "none";

    // logout시 login form을 보여준다.
    document.getElementById("login_form").style.display = "";
  console.log(getCookie('csrf_access_token'));
}

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}
