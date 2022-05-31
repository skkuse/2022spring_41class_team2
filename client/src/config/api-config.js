let backendhost;

const hostname = window && window.location && window.location.hostname;

if (hostname === "localhost"){
    backendhost = "http://ec2-3-34-43-169.ap-northeast-2.compute.amazonaws.com:8080";
}

export const API_BASE_URL = `${backendhost}`