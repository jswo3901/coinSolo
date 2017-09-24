
//헤더
const header = {
    "typ": "JWT",
    "alg": "HS256"
};


//정보
const payload = {
    "iss": "jswo3901.com",
    "exp": "1485270000000",
    "https://jswo3901.com/jwt_claims/is_admin": true,
    "userId": "11028373727102",
    "username": "shwntkd"
}

const encodedPayload = new Buffer(JSON.stringify(payload))
                            .toString('base64')
                            .replace('=', '');


//헤더 eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9
// 정보 eyJpc3MiOiJqc3dvMzkwMS5jb20iLCJleHAiOiIxNDg1MjcwMDAwMDAwIiwiaHR0cHM6Ly9qc3dvMzkwMS5j
// b20vand0X2NsYWltcy9pc19hZG1pbiI6dHJ1ZSwidXNlcklkIjoiMTEwMjgzNzM3MjcxMDIiLCJ1c2VybmFt
// ZSI6InNod250a2QifQ

//서명





