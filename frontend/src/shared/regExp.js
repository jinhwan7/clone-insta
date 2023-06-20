export const idCheck = (id) => {
  let regExp = /^[a-z0-9]+@[a-z]+\.[a-z]{2,20}$/;
  // 대문자 포함
  console.log("id", regExp.test(id));
  return regExp.test(id);
};

export const pwCheck = (pw) => {
  let regExp = /^[a-z|A-Z|0-9|]{4,30}$/;
  console.log("pw", regExp.test(pw));
  return regExp.test(pw);
};

export const nickCheck = (nick) => {
  let regExp = /^[A-Za-z0-9]{4,10}$/;
  console.log("nick", regExp.test(nick));

  return regExp.test(nick);
};

export const nameCheck = (name) => {
  let regExp = /^[가-힣a-zA-Z]{2,15}$/;
  console.log("name", regExp.test(name));
  return regExp.test(name);
};
