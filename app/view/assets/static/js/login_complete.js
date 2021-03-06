window.addEventListener('load', (event) =>{
    let check = getCookie('csrf_access_token');
    if (check == undefined) {
        alert("접근 권한이 없습니다.");
        window.location.replace("/")
    }

    alert("새로고침 되었습니다.");
    // access token이 유효한지 확인
    fetch("/check_access_token",{
        method:"post",
        headers:{
            'X-CSRF-TOKEN': getCookie('csrf_access_token'),
        }
    })
    .then((res) => res.json())
    .then((res) =>{
        if(res["msg"]=="token has expired"){
            // 엑세스 토큰이 만료된 블록
            // 2. 리프레시 토큰으로 다시 요청한다.
            fetch("/check_refresh_token",{
                method:"post",
                headers:{
                    'X-CSRF-TOKEN': getCookie('csrf_refresh_token')
                
                }
            })
            .then((res)=>res.json())
            .then((res)=>{
                if(res["msg"]=="token has expired"){
                    // 리프레시 토큰도 만료된 블록
                    console.log("리프레시 토큰 만료");
                    window.location.href="/"; // 로그인 화면으로 이동
                }
                else{
                    console.log("리프레시 토큰으로 접근 완료");
                    window.location.replace("/protected_page");
                }
            });
        }else{
            console.log("엑세스 토큰으로 접근 완료");
        }
    })
});


// 쿠키 가져오는 함수
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}
